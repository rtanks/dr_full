import { useState, useEffect, useCallback, useMemo  } from "react";

// // کامپوننت مودال تنظیمات
// export default function ConfigMedicineModal({ drug, meals, onMealChange, onClose, onSave }) {
//   const [selectedStart, setSelectedStart] = useState(8);
//   console.log(drug)

//   // ۱. تعیین محدوده‌های زمانی ایده‌آل (Preferred Zones)
//   const getPreferredZones = useCallback(() => {
//     let zones = [];
//     if (drug.req === 'meal') {
//       // ساعت وعده‌ها و یک ساعت قبل و بعد از آن‌ها
//       [meals.breakfast, meals.lunch, meals.dinner].forEach(m => {
//         zones.push(m - 1, m, m + 1);
//       });
//     } else if (drug.req === 'night') {
//       // ساعات انتهایی شب و بامداد
//       [21, 22, 23, 0, 1, 2, 3].forEach(h => zones.push(h));
//     }
//     return zones;
//   }, [drug.req, meals]);

//   // ۲. الگوریتم پیدا کردن بهترین ساعت شروع (Best Start Time)
//   const autoSelectBestTime = useCallback(() => {
//     const zones = getPreferredZones();
//     if (zones.length === 0) {
//       setSelectedStart(8);
//       return;
//     }

//     let bestStart = 0;
//     let maxHits = -1;

//     for (let h = 0; h < 24; h++) {
//       let hits = 0;
//       for (let k = 0; k < drug.freq; k++) {
//         let t = (h + k * drug.interval) % 24;
//         if (zones.includes(t)) hits++;
//       }
//       if (hits > maxHits) {
//         maxHits = hits;
//         bestStart = h;
//       }
//     }
//     setSelectedStart(bestStart);
//   }, [drug.freq, drug.interval, getPreferredZones]);

//   // اجرای پیشنهاد خودکار هنگام باز شدن مودال
//   useEffect(() => {
//     autoSelectBestTime();
//   }, [autoSelectBestTime]);

//   const currentTimes = useMemo(() => {
//     const times = [];
//     for (let i = 0; i < drug.freq; i++) {
//       times.push(((selectedStart + (i * drug.interval)) % 24).toString().padStart(2, '0'));
//     }
//     return times;
//   }, [selectedStart, drug.freq, drug.interval]);

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h3 style={{ marginTop: 0 }} className="w-full flex flex-row justify-between items-center">
//           <span>تنظیم زمان </span>
//           <span style={{ color: 'var(--primary)' }}>{drug.name}</span>
//         </h3>
        
//         {/* توضیحات داینامیک بر اساس نوع دارو */}
//         <p className="modal-desc">
//           {drug.req === 'meal' && "⚠️ این دارو باید همراه غذا مصرف شود."}
//           {drug.req === 'night' && "🌙 بهترین زمان مصرف: شب (۲۱ تا ۳ بامداد)"}
//           {drug.req === 'any' && "زمان شروع مصرف را انتخاب کنید."}
//         </p>

//         {/* انتخابگر وعده‌های غذایی (فقط برای داروهای meal) */}
//         {drug.req === 'meal' && (
//           <div className="meal-grid">
//             <div className="meal-item">
//               <label>صبحانه</label>
//               <select value={meals.breakfast} onChange={(e) => onMealChange('breakfast', parseInt(e.target.value))}>
//                 {Array.from({length:24}).map((_, i) => <option key={i} value={i}>{i}:00</option>)}
//               </select>
//             </div>
//             <div className="meal-item">
//               <label>ناهار</label>
//               <select value={meals.lunch} onChange={(e) => onMealChange('lunch', parseInt(e.target.value))}>
//                 {Array.from({length:24}).map((_, i) => <option key={i} value={i}>{i}:00</option>)}
//               </select>
//             </div>
//             <div className="meal-item">
//               <label>شام</label>
//               <select value={meals.dinner} onChange={(e) => onMealChange('dinner', parseInt(e.target.value))}>
//                 {Array.from({length:24}).map((_, i) => <option key={i} value={i}>{i}:00</option>)}
//               </select>
//             </div>
//           </div>
//         )}

//         <button className="recalc-btn" onClick={autoSelectBestTime}>✨ پیشنهاد هوشمند بهترین زمان</button>

//         {/* ساعت دایره‌ای */}
//         <div className="clock-container">
//           {Array.from({ length: 24 }).map((_, i) => {
//             const angle = (i * 15 - 90) * (Math.PI / 180);
//             const r = 95; const c = 120;
//             const left = c + r * Math.cos(angle);
//             const top = c + r * Math.sin(angle);

//             const isSelected = i === selectedStart;
//             const isAuto = currentTimes.includes(i.toString().padStart(2, '0')) && !isSelected;
//             const isPref = getPreferredZones().includes(i);

//             return (
//               <div
//                 key={i}
//                 className={`clock-num ${isSelected ? 'selected' : ''} ${isAuto ? 'auto' : ''} ${isPref ? 'pref' : ''}`}
//                 style={{ left: `${left}px`, top: `${top}px` }}
//                 onClick={() => setSelectedStart(i)}
//               >
//                 {i}
//               </div>
//             );
//           })}
//         </div>

//         <button className="btn btn-primary hover:bg-main flex justify-center items-center" 
//         onClick={() => onSave({ ...drug, set: true, times: currentTimes.sort(), consumedCount: 0 })}>
//           ثبت و شروع مصرف
//         </button>
//         <button className="btn btn-text flex justify-center items-center" onClick={onClose}>انصراف</button>
//       </div>
//     </div>
//   );
// }

export default function ConfigMedicineModal({ drug, meals, setMeals, onClose, onSave }) {
  // استیت برای ساعت شروع (بیت اول چرخه دارو)
  const [selectedStart, setSelectedStart] = useState(8);
  console.log(drug)
  // ۱. محاسبه محدوده‌های زمانی بهینه (Preferred Zones)
  const getPreferredZones = () => {
    let zones = [];
    if (drug.req === 'meal') {
      // برای هر وعده: یک ساعت قبل، خود ساعت، و یک ساعت بعد
      [meals.breakfast, meals.lunch, meals.dinner].forEach(m => {
        zones.push((m - 1 + 24) % 24, m, (m + 1) % 24);
      });
    } else if (drug.req === 'night') {
      zones = [21, 22, 23, 0, 1, 2, 3];
    }
    return zones;
  };

  const prefZones = getPreferredZones();

  // ۲. الگوریتم پیشنهاد هوشمند (پیدا کردن ساعتی که بیشترین همپوشانی را با زمان غذا دارد)
  const autoSelectBestTime = () => {
    const zones = getPreferredZones();
    if (zones.length === 0) {
      setSelectedStart(8); // پیش‌فرض ۸ صبح برای داروهای معمولی
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
  };

  // آپدیت خودکار ساعت پیشنهادی هنگام باز شدن یا تغییر ساعت غذا
  useEffect(() => {
    if (!drug.set) {
      autoSelectBestTime();
    } else if (drug.times.length > 0) {
      setSelectedStart(parseInt(drug.times[0]));
    }
  }, [meals]);

  // محاسبه تمام نوبت‌ها بر اساس ساعت شروع انتخاب شده
  const currentSchedule = Array.from(
    { length: drug.freq },
    (_, k) => (selectedStart + k * drug.interval) % 24
  ).sort((a, b) => a - b);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000] flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-[1.8rem] p-6 w-full max-w-[400px] max-h-[95vh] overflow-y-auto shadow-2xl border border-white/20">
        
        {/* هدر مودال */}
        <h3 className="text-lg font-bold text-center text-main mb-1 flex flex-row items-center justify-between">
          تنظیم زمان <span className="text-main">{drug.name}</span>
        </h3>
        
        <p className="text-sm text-center text-slate-500 mb-4 leading-relaxed">
          {drug.req === 'meal' 
            ? "⚠️ این دارو باید همراه غذا مصرف شود. لطفاً ساعت وعده‌های خود را تأیید کنید:" 
            : drug.req === 'night' 
            ? "🌙 بهترین زمان مصرف برای این دارو در ساعات پایانی شب است." 
            : "ساعت شروع مصرف اولین دوز را انتخاب کنید."}
        </p>

        {/* بخش تنظیمات وعده‌های غذایی */}
        {drug.req === 'meal' && (
          <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            {['breakfast', 'lunch', 'dinner'].map((meal) => (
              <div key={meal} className="flex flex-col items-center">
                <label className="text-[10px] text-slate-400 mb-1 font-bold">
                  {meal === 'breakfast' ? 'صبحانه' : meal === 'lunch' ? 'ناهار' : 'شام'}
                </label>
                <select 
                  value={meals[meal]} 
                  onChange={(e) => setMeals({...meals, [meal]: parseInt(e.target.value)})}
                  className="bg-white border border-slate-200 rounded-lg text-xs p-1.5 w-full text-center focus:ring-2 focus:ring-main outline-none"
                >
                  {Array.from({length: 24}, (_, i) => <option key={i} value={i}>{i}:00</option>)}
                </select>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={autoSelectBestTime}
          className="mx-auto block bg-[#eee] text-main text-xs px-5 py-2 rounded-full font-bold hover:bg-indigo-100 transition-all active:scale-95 shadow-sm"
        >
          ✨ پیشنهاد هوشمند بهترین زمان
        </button>

        {/* ساعت دایره‌ای (Clock Face) */}
        <div className="relative w-[270px] h-[270px] mx-auto my-6 bg-white rounded-full border-[2px] border-slate-50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * 15 - 90) * (Math.PI / 180);
            const radius = 110; // شعاع قرارگیری اعداد
            const x = 133 + radius * Math.cos(angle);
            const y = 133 + radius * Math.sin(angle);

            const isSelected = i === selectedStart;
            const isAuto = currentSchedule.includes(i) && !isSelected;
            const isPref = prefZones.includes(i);

            return (
              <button
                key={i}
                onClick={() => setSelectedStart(i)}
                style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                className={`absolute w-9 h-9 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center
                  ${isSelected ? 'bg-main text-white scale-125 z-20 shadow-lg shadow-a7a7a7' : 
                    isAuto ? 'bg-[#53ad9f] text-white z-10' : 
                    isPref ? 'bg-emerald-100 text-emerald-700' : 'bg-transparent text-slate-300 hover:bg-slate-50'}
                `}
              >
                {i}
              </button>
            );
          })}
          {/* مرکز ساعت */}
          {/* <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-slate-200 rounded-full -translate-x-1/2 -translate-y-1/2"></div> */}
        </div>

        {/* فیدبک وضعیت و نوبت‌ها */}
        <div className="text-center mb-6 min-h-[40px]">
          <div className="flex gap-1 justify-center mb-2">
            {currentSchedule.map((t, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-md font-bold">
                {t}:00
              </span>
            ))}
          </div>
          {currentSchedule.every(t => drug.req === 'any' || prefZones.includes(t)) ? (
            <span className="text-emerald-600 text-xs font-bold flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> زمان‌بندی با وعده‌های غذایی مطابقت دارد
            </span>
          ) : (
            <span className="text-rose-500 text-xs font-bold flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span> {currentSchedule.filter(t => !prefZones.includes(t)).length} نوبت خارج از زمان ایده‌آل است
            </span>
          )}
        </div>

        {/* دکمه‌های عملیاتی */}
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => onSave(currentSchedule.map(h => h.toString().padStart(2, '0')))}
            className="w-full bg-main text-white py-4 rounded-2xl font-bold active:scale-95 transition-all hover:bg-[#326b63]"
          >
            ثبت و شروع مصرف
          </button>
          <button 
            onClick={onClose} 
            className="w-full py-1.5 text-slate-400 text-md font-bold hover:text-slate-600 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};
