import { useEffect, useState } from "react";
import MedicineItem from "./MedicineItem";

export default function AddMedicineH({medicineSelected, getMedicineSelected}) {
    const presets = [
        {id: 'medicine_cxy-23',name:'سفالکسین', doseArray:[500,250], dose: '500 میلی گرم', count:40, freq: "4 — چهار بار در روز"},
        {id: 'medicine_cxy-24',name:'سیپروفلوکساسین', doseArray:[500,250], dose: '500 میلی گرم', count:30, freq: "2 — دو بار در روز"},
        {id: 'medicine_cxy-4',name:'ناپروکسن', doseArray:[500], dose: '500 میلی گرم', count:30, freq: "2 — دو بار در روز"},
        {id: 'medicine_cxy-83',name:'آمپول پیروکسیکام 20mg', doseArray:[20], dose: '20 میلی گرم', count:3, freq: "0.5 — یک روز در میان"}
    ];
    const generateId = () => {
        const randomNum = Math.random() * 100
        return `medicine_cxy-${randomNum}`;
    }
    const addMedicine = (id,name, dose, count, freq, doseArray) => {
        console.log([...medicineSelected, doseArray? {id,name, dose, count, freq, doseArray}: {id, name, dose, count, freq}])
        getMedicineSelected([...medicineSelected, doseArray? {id,name, dose, count, freq, doseArray}: {id, name, dose, count, freq}]);
    }
    const addMedicineNew = () => {
        console.log([...medicineSelected, {id: generateId(), name: '', dose: '', count: 1, freq: '1 — یک‌بار در روز'}])
        getMedicineSelected([...medicineSelected, {id: generateId(), name: '', dose: '', count: 1, freq: '1 — یک‌بار در روز'}]);
    }
    const onChangeValues = (id, key, value) => {
        getMedicineSelected(medicineSelected.map(item => id == item.id ? (
            {...item, [key]: value} ): item ));
        console.log(medicineSelected.map(item => id == item.id ? (
            {...item, [key]: value} ): item ));
    }
    const deleteMedicine = (id) => {
        getMedicineSelected(medicineSelected.filter(item => item.id != id))
    }
    return (
        <>
            <label>داروها (پیش‌فرض‌های ارتوپدی؛ کلیک کن تا پارامترها سریع اعمال شوند) </label>

            <div className="flex flex-wrap gap-2 mb-2 items-center" id="presetMedsWrap">
                {
                    presets.map((item, index) => (
                        <button type="button" key={item.id} disabled={medicineSelected.find(medicine => medicine.id == item.id)}  
                            onClick={() => addMedicine(item.id,item.name, item.dose, item.count, item.freq, item.doseArray)} 
                            className={`preset-med ${medicineSelected.find(medicine => medicine.id == item.id) ? "opacity-50" : "opacity-100"}`}
                            >{item.name}</button>
                    ))
                }
            </div>
            <button onClick={() => addMedicineNew()}  className="btn primary" id="addMedBtn" type="button">+ افزودن دارو</button>
            <div className="small-muted">برای هر دارو: نام، دوز (انتخابی)، تعداد، روش مصرف (یک‌بار/دو بار/سه بار/چهار بار/یک روز در میان)</div>
            <div className="med-list" id="medList">
                {
                    medicineSelected.map(item => (
                        <MedicineItem key={item.id} medicine={item} onChangeMedicine={onChangeValues} deleteMedicine={deleteMedicine}/>
                    ))
                }
            </div>
        </>
    )
}