import TestHeader from "../generalComponent/HeaderTest";
import { months } from "../../services/hooks/useCalender";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { transformFormat } from "../../services/func/transformFunc";
import ProgressBar from "./ProgressBar";
import ListOfTime from "./ListOfTime";
import { editInPersonTimesConsulting } from "../../slices/doctorSlice";
import { times } from "lodash";

export default function EditInPerson({goBack, onClick}) {
    const dateSelected = useSelector(state => state.doctor.consulting.inPerson.times.date);
    const [timeConsulting, setTimeConSulting] = useState(5);
    const [timeRest, setTimeRest] = useState(5);
    const dispatch = useDispatch();
    const getRestTime = (time) => {
        setTimeRest(time)
    }
    const getConsultingTime = (time) => {
        setTimeConSulting(time)
    }
    useEffect(()=>{
        dispatch(editInPersonTimesConsulting({times: []}))
        console.log(dateSelected)
    },[])
    return (
        <div className="w-full h-full bg-white vazir-medium fixed left-0 top-0 z-50 overflow-y-scroll">
            <div className="w-[402px] h-[89%] mx-auto">
                <TestHeader title={`ویرایش ${dateSelected[0].weekDay} ${transformFormat(dateSelected[0].day)} ${months[dateSelected[0].month - 1]} ${transformFormat(dateSelected[0].year)}`} onClick={goBack}/>
                <div className="w-full h-max flex flex-col gap-5">
                    <p className="text-[14px] text-[#676767] p-5">ویرایش ها تنها بر روی تاریخ انتخابی اعمال میگردد . 
                        در صورت نیاز به ایجاد روتین مشاوره در ایام هفته
                         بر روی دکمه ایجاد روتین مشاوره در صفحه قبل کلیک کنید.
                    </p>
                    <div className="w-full h-max flex flex-col mt-5">
                        <p className="text-[14px] text-[#676767] pr-5">زمان مشاوره با بیمار</p>
                        <ProgressBar getValue={getConsultingTime}/>
                    </div>
                    <div className="w-full h-max flex flex-col my-5">
                        <p className="text-[14px] text-[#676767] pr-5">استراحت بین  هر مشاوره</p>
                        <ProgressBar getValue={getRestTime}/>
                    </div>
                    <div className="w-full border-t-[6px] border-t-[#f5f5f5] p-5 pb-72 flex flex-col gap-4">
                        <p className="text-[14px] text-[#676767]">انتخاب زمان مشاوره</p>
                        {
                            timeConsulting == 5 && timeRest == 5 ? "" : (
                                <ListOfTime timeConSulting={timeConsulting} timeRest={timeRest}/>
                            )
                        }
                    </div>
                </div>
                <div className="w-full sm:w-[402px] mx-auto fixed bottom-0 left-0 right-0 p-5 bg-white flex flex-row gap-2 border-t border-t-[#eee]">
                    <button type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] border bg-transparent text-[#ff0000]">لغو اقدام</button>
                    <button onClick={onClick} type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] bg-[#006ecf] text-white">ثبت اطلاعات</button>
                </div>
            </div>
        </div>
    )
}