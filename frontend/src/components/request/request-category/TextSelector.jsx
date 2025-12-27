import React, { useState } from 'react';
import TypewriterText from '../../general/TypewriterText';
import { useSelector } from 'react-redux';
import Calender from '../../general/date.picker/Calender';
import { calculatePersianAgeFromDate } from '../../../services/functions';
import assistantTda from '../../../assets/images/assistant-tda.png'
import { FaCircle } from "react-icons/fa6";
import ItemSelector from '../../general/ItemSelector';
import Notification from '../../general/Notification';

export default function TextSelector({initialBirthday, currentKey, stepData, activeOption, onSelect}) {
    const [isComplete, setIsComplete] = useState(false);
    const userInfo = useSelector(state => state.request);
    const [birthday, setBirthday] = useState(initialBirthday);
    const [alertShow, setAlertShow] = useState(false);
    const getBirthday = (val) => {
        console.log(val);
        // handleChoice(val)
        setBirthday(val)
    }
    const showItemSelected = () => {
        switch(currentKey) {
            case 'age': return (
                <TypewriterText text={"راهنمایی : لمس رنگ قرمز به معنای نیاز ندارم و رنگ سبز نیاز دارم است."} 
                getCompleteStatus={() => console.log('hello')} />
            )
            case 'welcome': return (
                <TypewriterText text={"راهنمایی : لمس رنگ قرمز به معنای نیاز ندارم و رنگ سبز نیاز دارم است."} 
                getCompleteStatus={() => console.log('hello')} />
            )
            case 'gender': return (
                <div className='w-full border-b pb-5'>
                    <TypewriterText getCompleteStatus={() => console.log('hello')} 
                    text={"توجه : بسیاری از ساختارهای دارویی و تفسیر های آزمایشات وابسته به جنسیت هستند."}/>
                </div>
            )
            default: return ("")
        }
    }

    const handleChoice = (val) => {
        onSelect(currentKey, stepData.next, val);
    };
    const handleChoiceBirthday = (age) => {
        console.log(birthday)
        if(birthday.length < 8) {
            setAlertShow(true)
        } else {
            onSelect(currentKey, stepData.next, age);
        }
    };
    console.log(currentKey == 'welcome')
    const switchSelector = (keyTarget) => {
        switch(keyTarget) {
            case 'age': return (
                <div className='w-full h-max flex flex-row items-center gap-2'>
                    <Calender placeholder={'تاریخ تولد'} initialDate={birthday? birthday : ''} getDate={getBirthday} style={'w-44'}/>
                    <button type='button' disabled={activeOption} onClick={() => handleChoiceBirthday(calculatePersianAgeFromDate(birthday))} className='text-white bg-main w-24 h-12 flex justify-center items-center rounded-xl'>تایید</button>
                </div>
            );
            case 'welcome': return (
                isComplete ? (
                    stepData.options.map((item, index) => (
                        <button type='button' disabled={activeOption} key={index} onClick={() => handleChoice(item.id)} className={`text-sm bg-white font-bold py-2 px-3 rounded-lg border
                            ${activeOption ?activeOption  == item.id ? "opacity-100" : "opacity-50" : "opacity-100"} 
                            ${item.id == 'need'? "text-select border-select": "text-red-600 border-red-600"}
                            text-center hover:cursor-pointer flex flex-row items-center gap-1.5
                            `}>
                            <FaCircle size={11}/>
                            <span>{item.text}</span>
                        </button>
                    ))
                ): ("")
            );
            case 'confirmInfo': return (
                <ItemSelector 
                    items={stepData.options} 
                    activeItem={activeOption} 
                    getItem={handleChoice}
                    disabled={activeOption ? activeOption == 'confirm' : false}
                />)
            default: return (
                <ItemSelector 
                    items={stepData.options} 
                    activeItem={activeOption} 
                    getItem={handleChoice}
                    disabled={activeOption}
                />)
        }
    }
    return (
        <div className="w-full flex flex-col gap-3"> 
            <div className="w-full h-max">
                    <TypewriterText 
                        text={stepData.text} additionalItem={currentKey == 'welcome' ? (
                                <span className='h-[52px] w-[52px] float-right ml-2 relative'>
                                    <img src={assistantTda} alt='دستیار هوشمند تیدا' 
                                        className='h-[52px] w-[52px]  rounded-full'/>
                                    <button className="status-toggle" id="statusToggle" aria-label="تغییر وضعیت"></button>
                                </span>
                            ) : ("")}
                        getCompleteStatus={(status) => setIsComplete(status)} 
                        additionalText={currentKey == 'welcome'? (
                            <>
                                <div className='w-full bg-transparent h-3'></div>
                                <TypewriterText 
                                    text={" لطفاً مشخص کنید: آیا مایل هستید راهنمای صوتی همزمان با نمایش متن فعال باشد؟"} 
                                    getCompleteStatus={(status) => setIsComplete(status)} />
                            </>
                        ): ("")
                    }
                />
            </div>

            {isComplete && stepData.custom && (
                <div className="w-full">
                    {stepData.custom}
                </div>
            )}
            {isComplete && stepData.options && (
                <div className={`flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-500 ${currentKey == 'confirmInfo'? "border-b pb-5" :""}`}>
                    {
                        switchSelector(currentKey)
                    }
                    
                </div>
            )}
            <div className='w-full'>
                {
                    isComplete ? (
                       showItemSelected()
                    ) : ("")
                }
            </div>
            {alertShow && <Notification change={() => setAlertShow(false)} 
                text={"لطفا سن خود را وارد کنید!"} show={alertShow} bor={'border-red-500'} 
                bg={'bg-[#f3cece]'} color={'text-red-800'}/>}
        </div>
    );
}
