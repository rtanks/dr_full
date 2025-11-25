import { useState } from "react";
import {IoAlertCircleOutline, IoNotificationsOutline, IoSettingsOutline} from 'react-icons/io5'
import {LiaAngleDownSolid } from 'react-icons/lia'
import HistoryTitle from "../components/history/HistoryTitle";
import HistoryDoctor from "../components/history/HistoryDoctor";
import HistoryParaClinic from "../components/history/HistoryParaClinic";


export default function Actions() {
    const [selectHistoryItem, setSelectHistoryItem] = useState('doctor');
    const getSelectedHistoryItem = (value) => {
      setSelectHistoryItem(value);
    }
    const showHistoryItems = () => {
      return selectHistoryItem == 'doctor'? <HistoryDoctor/> : <HistoryParaClinic/>; 
    }
    return (
        <section id="snap3" className='sm:w-[23%] w-[98%] h-full shrink-0 bg-transparent snap-end flex flex-col gap-4 sm:pt-2'>
            <div className="w-full h-[7%] hidden sm:flex flex-col">
                <div className='w-full h-full shrink-0 snap-end flex flex-row-reverse gap-2 sm:gap-5 items-center'>
                    <div className='w-max h-max flex flex-row-reverse gap-1 sm:gap-3 text-sm pr-2 sm:pr-5 relative after:contents-[""] after:absolute after:right-0 after:top-2 after:w-px after:h-4/6 after:bg-[#bbb]'>
                      <button className='w-24 sm:w-28 h-[43px] bg-main text-white rounded-xl flex flex-row items-center justify-center gap-1 sm:gap-2'>
                        <IoAlertCircleOutline size={22}/>
                        <span>آموزش</span>
                      </button>
                      <button className='w-24 sm:w-28 h-[43px] flex flex-row items-center justify-center gap-1 sm:gap-2 text-[#2C8073] border-2 border-[#2C8073] bg-transparent rounded-xl'>
                        <span className='pb-1.5 w-14'></span>
                        <LiaAngleDownSolid size={16}/>
                      </button>
                    </div>
                    <div className='w-max h-max flex flex-row items-center justify-center gap-2 sm:gap-5'>
                      <IoSettingsOutline size={24}/>
                      <IoNotificationsOutline size={24}/>
                    </div>
                </div>
            </div>
            <div className="w-full h-full sm:h-[91%] shrink-0 bg-white rounded-2xl flex flex-col gap-2 p-1">
              <HistoryTitle selectedHistory={selectHistoryItem} getSelectedHistory={getSelectedHistoryItem}/>
              <div className="w-full h-[90%] bg-white rounded-2xl overflow-y-scroll">
                  {
                    showHistoryItems()
                  }
              </div>
            </div>
        </section>
    )
}
