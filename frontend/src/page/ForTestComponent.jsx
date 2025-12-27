import { useEffect, useRef, useState } from "react";
import { createArrayWithStartAndEndValue } from "../services/func/functionalFunc";
import DatePicker from "../components/general/date.picker/DatePicker";
import VoiceRecorder from "../components/request/VoiceRecorder";
import Med from "../components/medicine/Med";
import AudioTextSync from "../components/general/TestTextVoice";
import MedicineHospital from "../components/medicine/MedicineHospital";

export default function ForTestComponent() {
    const [modal, setModal] = useState(false);
    const [medicineSelected, setMedicineSelected] = useState({});

    const medicines = [
        {count: 30, dose: "500 میلی گرم", doseArray:[500, 250], freq:2, id:"medicine_cxy-24", name:"سیپروفلوکساسین"},
        {count: 3, dose: "20 میلی گرم", doseArray: [20], freq: 0.5, id: "medicine_cxy-83", name: "آمپول پیروکسیکام"},
        {count: 40,dose: "500 میلی گرم", doseArray: [500, 250], freq: 4, id: "medicine_cxy-23", name: "سفالکسین"},
        {count: 30,dose: "500 میلی گرم", doseArray: [500], freq: 2, id: "medicine_cxy-4", name: "ناپروکسن"}
    ]
    
    return (
        <div className="w-full h-full justify-center items-center p-10">
            {/* <VoiceRecorder/> */}
            {/* <Med/> */}
            {/* <AudioTextSync/> */}
            <MedicineHospital medicines={medicines}/>
        </div>
    )
}
// useEffect(() => {
//     const container = dayContainer.current;

//     const observe = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if(entry.isIntersecting) {
//                 entry.target.scrollIntoView({//scrollIntoView recall IntersectionObserver so create a loop for scroll 
//                     behavior: 'smooth',
//                     block: "center"
//                 })
//             }
//         })
//     }, {
//         root: container,
//         threshold: 0.6
//     });
//     itemDays.current.forEach((item) => {
//         if (item) observe.observe(item)
//     })
//     return () => observe.disconnect()
// }, [])