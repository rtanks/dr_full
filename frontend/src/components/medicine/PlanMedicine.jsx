import {CiPill} from 'react-icons/ci';
import { BiInjection } from "react-icons/bi";
import { useState, useEffect, useCallback } from 'react';
import DrugPlanItem from './DrugPlanItem';

export default function PlanMedicine({drugs, changeShowConfig, activeDrug, getActiveDrug}){
    const [nextDoseInfo, setNextDoseInfo] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");

    const showIcon = (val) => {
        if(val.includes('آمپول')) {
            return <BiInjection size={24}/>
        } else {
            return <CiPill size={24}/>
        }
    }
    const getNextActiveDose = useCallback((drug) => {
      const now = new Date();
      const currentMins = now.getHours() * 60 + now.getMinutes();
      
      let bestDiff = Infinity;
      let targetTimeStr = "";
      let isTomorrow = false;
      
      // بررسی تک تک نوبت‌های این دارو
      drug.times.forEach((timeStr) => {
          const targetMins = parseInt(timeStr) * 60;
          let diff = targetMins - currentMins;
      
          // اگر زمان نوبت گذشته است، آن را برای فردا در نظر بگیر
          if (diff <= 0) {
              diff += 1440; // +24 hours
          }
        
          // پیدا کردن نوبتی که کمترین فاصله زمانی (مثبت) را دارد
          if (diff < bestDiff) {
              bestDiff = diff;
              targetTimeStr = timeStr;
              // اگر برای رسیدن به این نوبت مجبور شدیم 1440 دقیقه اضافه کنیم، یعنی فرداست
              isTomorrow = (targetMins - currentMins <= 0);
          }
      });
    
      // اولویت‌بندی کلی (برای مقایسه با سایر داروها)
      const sortPriority = isTomorrow ? bestDiff + 1440 : bestDiff;
    
      return { 
          diff: bestDiff, 
          time: targetTimeStr, 
          isTomorrow, 
          sortPriority 
      };
    }, []);
    useEffect(() => {
      const interval = setInterval(() => {
        const setDrugs = drugs.filter(d => d.set);
        if (setDrugs.length === 0) {
          setNextDoseInfo(null);
          return;
        }
      
        let bestDrug = null;
        let minPriority = Infinity;
      
        setDrugs.forEach(d => {
          const info = getNextActiveDose(d);

          // منطق اصلاح شده:
          // اگر نوبت گذشته است (diff < 0)، آن را به فردا منتقل کن
          let currentDiff = info.diff;
          let currentIsTomorrow = info.isTomorrow;
        
          if (currentDiff <= 0) { 
            currentDiff += 1440; // اضافه کردن ۲۴ ساعت
            currentIsTomorrow = true;
          }
        
          // محاسبه اولویت: نوبت‌های فردا وزن بیشتری می‌گیرند تا در انتهای لیست باشند
          const priority = currentIsTomorrow ? currentDiff + 2000 : currentDiff;
        
          if (priority < minPriority) {
            minPriority = priority;
            // بروزرسانی اینفو با مقادیر اصلاح شده
            bestDrug = { 
              ...d, 
              nextInfo: { ...info, diff: currentDiff, isTomorrow: currentIsTomorrow } 
            };
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

      // جدا کردن ساعت و دقیقه (اگر فرمت رشته تغییر کرد)
      const [targetHour] = drug.nextInfo.time.split(':'); 
      target.setHours(parseInt(targetHour), 0, 0, 0);
    
      // اگر طبق منطق بالا مشخص شده که نوبت برای فرداست
      if (drug.nextInfo.isTomorrow) {
        target.setDate(target.getDate() + 1);
      }
    
      const diffSec = Math.floor((target - now) / 1000);
    
      if (diffSec <= 0) {
        setTimeLeft("الان مصرف کنید");
        // منطق آلارم...
      } else {
        const h = Math.floor(diffSec / 3600).toString().padStart(2, '0');
        const m = Math.floor((diffSec % 3600) / 60).toString().padStart(2, '0');
        const s = (diffSec % 60).toString().padStart(2, '0');
        setTimeLeft(`${h}:${m}:${s}`);
      }
    };
    return (
      <div className="w-full h-max flex flex-col gap-3 mt-5">
      
              {nextDoseInfo && (
                <>
                  <div className="container bg-gradient-to-br from-[#2e9989] via-main to-[#2c8e7f] px-1">
                    <h3>برنامه دارویی</h3>
                    <div className="list-plan">
                      {drugs.filter(d => d.set)
                        .sort((a, b) => getNextActiveDose(a).sortPriority - getNextActiveDose(b).sortPriority)
                        .map(drug => (
                          <DrugPlanItem key={drug.id} drug={drug} onEdit={() => { getActiveDrug(drug); changeShowConfig() }} />
                        ))}
                    </div>
                    <div className="timer-box w-full h-max rounded-xl flex flex-col gap-1 justify-center items-center py-5 mb-6">
                      <div className='w-full text-sm h-max flex flex-row items-center justify-center gap-1'>
                        <span>نوبت بعدی:</span>
                        <span>{showIcon(nextDoseInfo.name)}</span>
                        <span>{nextDoseInfo.name}</span>
                      </div>
                      <div className="font-bold text-2xl">{timeLeft}</div>
                      <div className="timer-desc">ساعت {nextDoseInfo.nextInfo.time}:00</div>
                    </div>
                  </div>
                </>
              )}
          
              
        </div>
    )
}