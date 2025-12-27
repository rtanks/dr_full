import { useState } from "react";
import ItemSelector from "../general/ItemSelector";
import Label from "../labelCard";
import SelectSide from "./body/SelectSide";
import TextError from "./TextError";
import VoiceRecorder from "./VoiceRecorder";
import SwitchItems from "../general/SwitchItems";

const Symptoms = ({ register, isError, messageError, isValid }) => {
    const [activeItems, setActiveItems] = useState({text: true, voice: false, both: false})
    const sides = [{id: 'text', text: 'متنی'}, {id: 'voice', text: 'صدا'}, {id: 'both', text: 'هر دو'}]
    const changeActivate = (key) => {
        if(key == 'text') {
            setActiveItems({text: true, voice: false, both: false})
        } else if(key == 'voice') {
            setActiveItems({text: false, voice: true, both: false}) 
        } else if(key == 'both') {
            setActiveItems({text: false, voice: false, both: true})  
        }
    }
    return (
        <div className='w-full mx-auto mt-5'>
            <div className="flex flex-row items-center justify-start gap-5">
                <Label labelName={"توضیح در مورد مشکل خود"} />
                <div className="w-52 h-max flex flex-row gap-2">
                    {/* {
                        sides.map((item, index) => (
                            <div key={index} onClick={() => changeActivate(item.id)} className={`text-sm font-bold py-2 px-3 rounded-lg border w-16
                                ${activeItems[item.id] ? "bg-select-container text-[#2c8073] border-main" : "text-[#888] bg-white border-[#aaa]"} text-center hover:cursor-pointer
                                `}>
                                {item.text}
                            </div>
                        ))
                    } */}
                    <SwitchItems items={sides} selectedItem={activeItems} getSelectedItem={changeActivate}/>
                </div>
            </div>
            <div className="w-full my-3">
                <textarea {...register}
                    placeholder={"برای درک بهتر پزشک از بیماری در مورد آن توضیح بدهید / مثال : علائم اصلی چیست؟ از چه زمانی شروع شده؟ سابقه بیماری مرتبط دارید؟"}
                    className={`${activeItems.text? "block" : activeItems.both? "block" : "hidden"} w-full py-3 h-28 rounded-xl px-5 text-sm sm:text-md resize-none border-2 outline-none transition-colors duration-300
                    ${isError ? "border-red-400 text-red-500" : isValid ? "border-select" : "border-gray-300 placeholder:text-gray-600"}`}
                />
                {isError && <TextError message={messageError}/>}
                <div className={`${activeItems.voice ? "block" : activeItems.both? "block" : "hidden"} w-full h-max`}>
                    <p className={`w-full text-justify h-max text-sm py-5 px-2 text-676767
                    ${!activeItems.text ? activeItems.both? "hidden" : "block" : "hidden"}`}>برای درک بهتر پزشک از بیماری در مورد آن توضیح بدهید / مثال : علائم اصلی چیست؟ از چه زمانی شروع شده؟ سابقه بیماری مرتبط دارید؟</p>
                    <VoiceRecorder/>
                </div>
            </div>

        </div>
    )
}

export default Symptoms;
