import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../../md.css'
// داده‌های اولیه
const SEED_DATA = [
  { id: 1, name: 'آموکسی‌سیلین', dose: '500mg', form: '💊', freq: 3, interval: 8, req: 'meal', duration: 7, set: false, times: [], consumedCount: 0 },
  { id: 2, name: 'آتورواستاتین', dose: '20mg', form: '💊', freq: 1, interval: 24, req: 'night', duration: 30, set: false, times: [], consumedCount: 0 },
  { id: 3, name: 'ب‌کمپلکس', dose: '1Amp', form: '💉', freq: 1, interval: 24, req: 'any', duration: 6, set: false, times: [], consumedCount: 0 },
  { id: 4, name: 'دیفن‌هیدرامین', dose: '5ml', form: '🧪', freq: 4, interval: 6, req: 'any', duration: 3, set: false, times: [], consumedCount: 0 }
];

const DB_KEY = 'SmartMeds_React_v1';

export default function Med() {
  const [drugs, setDrugs] = useState([]);
  const [meals, setMeals] = useState({ breakfast: 8, lunch: 14, dinner: 20 });
  const [activeDrug, setActiveDrug] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [currentAlarmDrug, setCurrentAlarmDrug] = useState(null);
  const [nextDoseInfo, setNextDoseInfo] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  // بارگذاری داده‌ها
  useEffect(() => {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setDrugs(parsed.drugs);
      setMeals(parsed.meals);
    } else {
      setDrugs(SEED_DATA);
    }
  }, []);

  // ذخیره داده‌ها
  useEffect(() => {
    if (drugs.length > 0) {
      localStorage.setItem(DB_KEY, JSON.stringify({ drugs, meals }));
    }
  }, [drugs, meals]);

  // منطق محاسبه نوبت بعدی
  const getNextActiveDose = useCallback((drug) => {
    const dailyConsumed = drug.consumedCount % drug.freq;
    let targetIndex = dailyConsumed;
    let isTomorrow = false;

    if (targetIndex >= drug.freq) {
      targetIndex = 0;
      isTomorrow = true;
    }

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const targetTimeStr = drug.times[targetIndex];
    const targetMins = parseInt(targetTimeStr) * 60;

    let diff = targetMins - currentMins;
    if (isTomorrow) diff += 1440;
    else if (diff < 0) { /* نوبت گذشته */ }

    const sortPriority = isTomorrow ? diff + 10000 : diff;
    return { diff, time: targetTimeStr, isTomorrow, sortPriority };
  }, []);

  // آپدیت ثانیه‌ای تایمر و آلارم
  useEffect(() => {
    const interval = setInterval(() => {
      const setDrugs = drugs.filter(d => d.set);
      if (setDrugs.length === 0) {
        setNextDoseInfo(null);
        return;
      }

      let bestDrug = null;
      let minPriority = 999999;

      setDrugs.forEach(d => {
        const info = getNextActiveDose(d);
        if (info.sortPriority < minPriority) {
          minPriority = info.sortPriority;
          bestDrug = { ...d, nextInfo: info };
        }
      });

      if (bestDrug) {
        setNextDoseInfo(bestDrug);
        updateCountdown(bestDrug);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [drugs, getNextActiveDose]);

  const updateCountdown = (drug) => {
    const now = new Date();
    const target = new Date();
    target.setHours(parseInt(drug.nextInfo.time), 0, 0, 0);
    if (drug.nextInfo.isTomorrow) target.setDate(target.getDate() + 1);

    const diffSec = Math.floor((target - now) / 1000);

    if (diffSec <= 0 && !drug.nextInfo.isTomorrow) {
      setTimeLeft("الان مصرف کنید");
      if (Math.abs(diffSec) < 2 && !showAlarm) {
        setCurrentAlarmDrug(drug);
        setShowAlarm(true);
      }
    } else {
      const h = Math.floor(diffSec / 3600).toString().padStart(2, '0');
      const m = Math.floor((diffSec % 3600) / 60).toString().padStart(2, '0');
      const s = (diffSec % 60).toString().padStart(2, '0');
      setTimeLeft(`${h}:${m}:${s}`);
    }
  };

  const handleConfirmDose = () => {
    setDrugs(prev => prev.map(d => 
      d.id === currentAlarmDrug.id ? { ...d, consumedCount: d.consumedCount + 1 } : d
    ));
    setShowAlarm(false);
  };

  return (
    <div className="app-viewport">
      {/* بخش اقدامات لازم */}
      {drugs.some(d => !d.set) && (
        <div className="container">
          <h3>اقدامات لازم <span className="badge-alert">{drugs.filter(d => !d.set).length}</span></h3>
          {drugs.filter(d => !d.set).map(drug => (
            <div key={drug.id} className="drug-card-unset" onClick={() => { setActiveDrug(drug); setShowConfig(true); }}>
              <div>
                <div className="drug-info-text">{drug.form} {drug.dose} {drug.name}</div>
                <div className="sub-text">روزی {drug.freq} بار</div>
              </div>
              <span className="badge-alert">تنظیم</span>
            </div>
          ))}
        </div>
      )}

      {/* برنامه روزانه */}
      <div className="container bg-gradient-to-br from-[#2e9989] via-main to-[#2c8e7f]">
        <h3>برنامه دارویی</h3>
        
        {nextDoseInfo && (
          <div className="timer-box">
            <div className="timer-desc">نوبت بعدی: <b>{nextDoseInfo.form} {nextDoseInfo.name}</b></div>
            <div className="timer-digits">{timeLeft}</div>
            <div className="timer-desc">ساعت {nextDoseInfo.nextInfo.time}:00</div>
          </div>
        )}

        <div className="list-plan">
          {drugs.filter(d => d.set)
            .sort((a, b) => getNextActiveDose(a).sortPriority - getNextActiveDose(b).sortPriority)
            .map(drug => (
              <DrugPlanItem key={drug.id} drug={drug} onEdit={() => { setActiveDrug(drug); setShowConfig(true); }} />
            ))}
        </div>
      </div>

      {/* مودال تنظیمات (کامپوننت جداگانه در پایین) */}
      {showConfig && (
        <ConfigModal 
          drug={activeDrug} 
          meals={meals} 
          onClose={() => setShowConfig(false)} 
          onSave={(updatedDrug) => {
            setDrugs(prev => prev.map(d => d.id === updatedDrug.id ? updatedDrug : d));
            setShowConfig(false);
          }}
        />
      )}

      {/* مودال هشدار */}
      {showAlarm && (
        <div className="modal-overlay">
          <div className="modal-content alert-border">
            <h2 className="danger-text">⏰ وقت دارو!</h2>
            <div className="alarm-icon">💊</div>
            <h3>{currentAlarmDrug?.name}</h3>
            <button className="btn btn-primary" onClick={handleConfirmDose}>✅ مصرف کردم</button>
            <button className="btn btn-text" onClick={() => setShowAlarm(false)}>بعداً</button>
          </div>
        </div>
      )}
    </div>
  );
}

// کامپوننت آیتم‌های لیست
function DrugPlanItem({ drug, onEdit }) {
  const dailyConsumed = drug.consumedCount % drug.freq;
  return (
    <div className="plan-item">
      <div className="plan-header">
        <div className="drug-title">{drug.form} <span className="dose-badge">{drug.dose}</span> {drug.name}</div>
        <button className="edit-btn" onClick={onEdit}>ویرایش</button>
      </div>
      <div className="dose-pills">
        {drug.times.map((t, i) => (
          <span key={i} className={`pill ${i < dailyConsumed ? 'done' : ''}`}>{t}:00</span>
        ))}
      </div>
    </div>
  );
}

// کامپوننت مودال تنظیمات
function ConfigModal({ drug, meals, onMealChange, onClose, onSave }) {
  const [selectedStart, setSelectedStart] = useState(8);

  // ۱. تعیین محدوده‌های زمانی ایده‌آل (Preferred Zones)
  const getPreferredZones = useCallback(() => {
    let zones = [];
    if (drug.req === 'meal') {
      // ساعت وعده‌ها و یک ساعت قبل و بعد از آن‌ها
      [meals.breakfast, meals.lunch, meals.dinner].forEach(m => {
        zones.push(m - 1, m, m + 1);
      });
    } else if (drug.req === 'night') {
      // ساعات انتهایی شب و بامداد
      [21, 22, 23, 0, 1, 2, 3].forEach(h => zones.push(h));
    }
    return zones;
  }, [drug.req, meals]);

  // ۲. الگوریتم پیدا کردن بهترین ساعت شروع (Best Start Time)
  const autoSelectBestTime = useCallback(() => {
    const zones = getPreferredZones();
    if (zones.length === 0) {
      setSelectedStart(8);
      return;
    }

    let bestStart = 0;
    let maxHits = -1;

    for (let h = 0; h < 24; h++) {
      let hits = 0;
      for (let k = 0; k < drug.freq; k++) {
        let t = (h + k * drug.interval) % 24;
        if (zones.includes(t)) hits++;
      }
      if (hits > maxHits) {
        maxHits = hits;
        bestStart = h;
      }
    }
    setSelectedStart(bestStart);
  }, [drug.freq, drug.interval, getPreferredZones]);

  // اجرای پیشنهاد خودکار هنگام باز شدن مودال
  useEffect(() => {
    autoSelectBestTime();
  }, [autoSelectBestTime]);

  const currentTimes = useMemo(() => {
    const times = [];
    for (let i = 0; i < drug.freq; i++) {
      times.push(((selectedStart + (i * drug.interval)) % 24).toString().padStart(2, '0'));
    }
    return times;
  }, [selectedStart, drug.freq, drug.interval]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{ marginTop: 0 }}>تنظیم زمان <span style={{ color: 'var(--primary)' }}>{drug.name}</span></h3>
        
        {/* توضیحات داینامیک بر اساس نوع دارو */}
        <p className="modal-desc">
          {drug.req === 'meal' && "⚠️ این دارو باید همراه غذا مصرف شود."}
          {drug.req === 'night' && "🌙 بهترین زمان مصرف: شب (۲۱ تا ۳ بامداد)"}
          {drug.req === 'any' && "زمان شروع مصرف را انتخاب کنید."}
        </p>

        {/* انتخابگر وعده‌های غذایی (فقط برای داروهای meal) */}
        {drug.req === 'meal' && (
          <div className="meal-grid">
            <div className="meal-item">
              <label>صبحانه</label>
              <select value={meals.breakfast} onChange={(e) => onMealChange('breakfast', parseInt(e.target.value))}>
                {Array.from({length:24}).map((_, i) => <option key={i} value={i}>{i}:00</option>)}
              </select>
            </div>
            <div className="meal-item">
              <label>ناهار</label>
              <select value={meals.lunch} onChange={(e) => onMealChange('lunch', parseInt(e.target.value))}>
                {Array.from({length:24}).map((_, i) => <option key={i} value={i}>{i}:00</option>)}
              </select>
            </div>
            <div className="meal-item">
              <label>شام</label>
              <select value={meals.dinner} onChange={(e) => onMealChange('dinner', parseInt(e.target.value))}>
                {Array.from({length:24}).map((_, i) => <option key={i} value={i}>{i}:00</option>)}
              </select>
            </div>
          </div>
        )}

        <button className="recalc-btn" onClick={autoSelectBestTime}>✨ پیشنهاد هوشمند بهترین زمان</button>

        {/* ساعت دایره‌ای */}
        <div className="clock-container">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 - 90) * (Math.PI / 180);
            const r = 95; const c = 120;
            const left = c + r * Math.cos(angle);
            const top = c + r * Math.sin(angle);

            const isSelected = i === selectedStart;
            const isAuto = currentTimes.includes(i.toString().padStart(2, '0')) && !isSelected;
            const isPref = getPreferredZones().includes(i);

            return (
              <div
                key={i}
                className={`clock-num ${isSelected ? 'selected' : ''} ${isAuto ? 'auto' : ''} ${isPref ? 'pref' : ''}`}
                style={{ left: `${left}px`, top: `${top}px` }}
                onClick={() => setSelectedStart(i)}
              >
                {i}
              </div>
            );
          })}
        </div>

        <button className="btn btn-primary" onClick={() => onSave({ ...drug, set: true, times: currentTimes.sort(), consumedCount: 0 })}>
          ثبت و شروع مصرف
        </button>
        <button className="btn btn-text" onClick={onClose}>انصراف</button>
      </div>
    </div>
  );
}