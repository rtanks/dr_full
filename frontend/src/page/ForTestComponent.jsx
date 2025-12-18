import { useEffect, useRef, useState } from "react";
import { createArrayWithStartAndEndValue } from "../services/func/functionalFunc";
import DatePicker from "../components/general/date.picker/DatePicker";
import VoiceRecorder from "../components/request/VoiceRecorder";

export default function ForTestComponent() {
    
    return (
        <div className="w-full h-full justify-center items-center">
            <VoiceRecorder/>
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