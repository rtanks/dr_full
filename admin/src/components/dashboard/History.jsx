import { useEffect, useState } from "react";
import {  ListItemButtonTow } from "../generalComponent/ItemButton";
import HistoryMoreServiceItem from "./HistoryMoreServiceItem";
import useCalender from "../../services/hooks/useCalender";
import { transformFormat } from "../../services/func/transformFunc";
import { first } from "../../services/hooks/useCalender";
import { isEqual } from "lodash";
import ContainerDrawer from '../generalComponent/ContainerDrawer'

export default function History({getPatientHistory ,onClick}) {
    const utilities = ["دریافت نسخه چاپی", "اشتراک‌گذاری", "نمایش", "کپی"]
    const [select, setSelect] = useState(null);
    const [dateSelected, setDateSelected] = useState(null);
    const {getDates} = useCalender()
    const getSelected = (index) => {
        setSelect(index)
    }
    useEffect(() => {
        getPatientHistory();
    }, [])
    return (
        <ContainerDrawer onClick={onClick} header={"سابقه"}>
            <div className="w-[90%] mx-auto h-max">
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full h-[76px] mx-auto flex flex-row items-center justify-between bg-white overflow-x-scroll">
                        {
                            getDates().map((date, index) => (
                                <div onClick={() => setDateSelected(date)} key={index}
                                className={`w-max flex flex-col rounded-[10px] items-center gap-[2px] justify-center py-1 px-4 text-[14px] 
                                ${ (dateSelected == null ? isEqual(first, date): isEqual(dateSelected, date)) ? "bg-[#e6f3ff] text-[#006ECF]": "text-[#b9b9b9] bg-white"}`}>
                                    <span>{date.weekDay}</span>
                                    <span>{transformFormat(`${date.year}/${date.month}/${date.day}`)}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="w-full h-max flex flex-col gap-1">
                        <div className="w-full flex flex-row items-center gap-3">
                            <span className="w-[10px] h-[10px] rounded-full border border-[#27C840]"></span>
                            <span className="text-[16px]">موضوع : آزمایش سلامت مردان</span>
                        </div>
                        <div className="text-[14px] text-[#676767]">موارد :  - bun - na - k - cbc diff </div>
                        <div className="text-[14px] text-[#676767]">پزشک : محمد علی دانش / فوق تخصص بیماری های داخلی</div>
                        <div className="w-full text-[14px] text-[#676767] flex flex-row items-center justify-between">
                            <span>وضعیت : ثبت شد / کد پیگیری <span className="text-[#f00]">4658795</span></span>
                            <span className="text-[14px] text-[#b9b9b9]">12:45</span>
                        </div>
                    </div>
                    <div className="w-full h-max flex flex-col gap-1">
                        <div className="w-full flex flex-row items-center gap-3">
                            <span className="w-[10px] h-[10px] rounded-full border border-[#27C840]"></span>
                            <span className="text-[16px]">خدمات ضمیمه : نمونه گیری و انجام آزمایش</span>
                        </div>
                        <div className="w-full text-[14px] text-[#676767] flex flex-row items-center justify-between">
                            <span>نمونه گیر : اشکان حسنوندی </span>
                            <span className="text-[14px] text-[#b9b9b9]">12:45</span>
                        </div>
                        <div className="w-full text-[14px] text-[#676767] flex flex-row items-center justify-between">
                            <span>مرکز خدمات : آزمایشگاه نور</span>
                            <span className="text-[14px] text-[#b9b9b9]">12:45</span>
                        </div>
                    </div>
                    <div className="w-full h-max flex flex-col gap-2">
                        <div className="w-full flex flex-row items-center gap-3">
                            <span className="w-[10px] h-[10px] rounded-full border border-[#27C840]"></span>
                            <span className="text-[16px]">امکانات</span>
                        </div>
                        <div className="w-full flex flex-row gap-2 items-center">
                            {
                                utilities.map((item,index) => <ListItemButtonTow key={index} index={index} title={item} selected={select} onClick={getSelected}/>)
                            }
                        </div>
                    </div>
                    <div className="w-full h-max flex flex-col gap-3">
                        <div className="w-full flex flex-row items-center gap-3">
                            <span className="w-[10px] h-[10px] rounded-full border border-[#27C840]"></span>
                            <span className="text-[16px]">خدمات بیشتر</span>
                        </div>
                        <div className="w-full flex flex-col gap-2 items-center">
                            <HistoryMoreServiceItem title={"نیاز به تفسیر پزشک دارید ؟"} explain={"هزینه ویزیت پزشک 185.000 تومان"}/>
                            <HistoryMoreServiceItem title={"تفسیر هوش مصنوعی تی دا"} explain={"رایگان"}/>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerDrawer>
    )
}