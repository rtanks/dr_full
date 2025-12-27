import { useState } from "react";
import ConfigMedicineModal from "./ConfigMedicineModal";
import MedicineItem from "./MedicineItem"
import PlanMedicine from "./PlanMedicine"
import AlarmModal from "./AlarmModal";

export default function ManagementMedicine({medicines}) {
    const [showConfig, setShowConfig] = useState(false);
    const [medicinesAll, setMedicinesAll] = useState(medicines)
    const [selectedMedicine, setSelectedMedicine] = useState({})
    const [activeDrug, setActiveDrug] = useState(null);
    const [showAlarm , setShowAlarm] = useState(false);
    const [meals, setMeals] = useState({ breakfast: 8, lunch: 14, dinner: 20 });
    const getActivateDrug = (val) => {
        setActiveDrug(val)
    }
    // console.log(medicines)
    console.log(medicinesAll)
    const handleConfirmDose = () => {
      setMedicinesAll(prev => prev.map(d => 
        d.id === currentAlarmDrug.id ? { ...d, consumedCount: d.consumedCount + 1 } : d
      ));
      setShowAlarm(false);
    };
    const triggerAlarm = (drug) => {
    if (showAlarm) return; // جلوگیری از باز شدن چند آلارم همزمان
        
    setCurrentAlarmDrug(drug);
    setShowAlarm(true);
        
    // لرزش گوشی (اگر پشتیبانی شود)
    if ("vibrate" in navigator) {
        navigator.vibrate([500, 200, 500, 200, 500]);
      }
    
      // ارسال اعلان مرورگر
      if (Notification.permission === "granted") {
        new Notification("⏰ وقت مصرف دارو", {
          body: `زمان مصرف ${drug.name} (${drug.dose}) فرا رسیده است.`,
          icon: "/logo192.png" // آیکون اپلیکیشن شما
        });
      }
    };
    return (
        <div className="w-full h-max flex flex-col gap-1 mt-5">
            {/* <div className="w-full h-7 flex items-center text-sm font-bold mb-2 border-r-4 pr-2 border-r-main">داروهای ثبتی</div> */}
            {
                medicinesAll ? (
                    medicinesAll.map(medicine => (
                        <MedicineItem key={medicine.id} medicine={medicine} onClick={() => {
                            setShowConfig(true);
                            setSelectedMedicine({...medicine, req: medicine.freq >1 ? 'any' : 'night', interval: 24 / medicine.freq, times: [], duration: medicine.count, consumedCount: 0})
                            }}/>
                    ))
                ) : ("")
            }
            <PlanMedicine drugs={medicinesAll} changeShowConfig={() => setShowConfig(true)} 
                activeDrug={activeDrug} getActiveDrug={getActivateDrug}/>
            
            {showConfig && (
                <ConfigMedicineModal
                drug={selectedMedicine} 
                meals={meals} 
                onClose={() => setShowConfig(false)} 
                onSave={(newTimes) => {
                    console.log(medicinesAll.map(d => d.id === selectedMedicine.id ? { ...d, set: true, times: newTimes, consumedCount: 0 } : d));
                    setMedicinesAll(prev => prev.map(d => d.id === newTimes.id ? newTimes : d));
                    setMedicinesAll(prev => prev.map(d => d.id === selectedMedicine.id ? { ...d, set: true, times: newTimes, consumedCount: 0 } : d));
                    setShowConfig(false);
                }}
                />
            )}
            {showAlarm && <AlarmModal drug={activeDrug} onConfirm={handleConfirmDose} onSnooze={triggerAlarm}/>}
        </div>
    )
}