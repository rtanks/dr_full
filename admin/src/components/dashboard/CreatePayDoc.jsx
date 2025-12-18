import { useState } from "react";
import TestHeader from "../generalComponent/HeaderTest";
import { IoCloseCircleOutline } from "react-icons/io5";
import ContainerDrawer from "../generalComponent/ContainerDrawer";

export default function CreatePayDoc({onClick}) {
    const [price, setPrice] = useState("");
    const onChange = (e) => {
        setPrice(e.target.value);
        console.log(price)
    }
    return (
        <ContainerDrawer header={"ایجاد پرداخت"} onClick={onClick}>
            <div className="w-[90%] mx-auto flex flex-col gap-2 pb-2">
                <div className="w-full text-[14px] text-[#676767] mb-4">
                    <p>دوست عزیز با توجه به موارد دکتر معرفی شده، شما نیاز به مراجعه به پزشک متخصص جراحی عمومی دارید.</p>
                    <p> احتمال نیاز به آزمایشات مرتبط با بیماری وجود دارد و اگر مدرکی از سابقه دارید در موقع ویزیت ذکر کنید.</p>
                    <p> موارد در بخش توضیحات نانداخته و می‌تواند کمک کننده به تشخیص بهتر پزشک شود.</p>
                </div>
                <p className="w-full text-[14px] text-[#676767]">
                    برای ویزیت پزشک پیشنهادی فیروز شاه مرادی متخصص جراحی عمومی کلیک کنید.
                </p>
                <a href="https://www.tda24.ir/ل1452" className="text-[14px] text-[#006ECF]">www.tda24.ir / 1245785</a>
                <p className="w-full text-[14px] text-[#676767] mt-3">لیست کامل پزشک متخصصین جراحی عمومی</p>
                <a href="https://www.tda24.ir/ل1452" className="text-[14px] text-[#006ECF]">www.tda24.ir /ل1452</a>
            </div>
            
            <div className="w-full sm:w-[402px] mr-auto border-t border-t-[#f5f5f5] fixed bottom-0 left-0 right-0 bg-white flex flex-col gap-3">
                <div className="w-full px-5 pt-2">
                    <span className="text-[14px] text-[#676767]">ایجاد سند پرداخت</span>
                    <div className="w-full h-[53px] text-[16px] flex flex-row items-center gap-2 px-4 border border-[#909090] rounded-[15px] mt-2">
                        <input onChange={(e) => onChange(e)} type="text" value={price} placeholder="ورود مبلغ" className="text-[#676767] placeholder:text-[#909090] border-0 outline-0 w-[90%]"/>
                        <span className="text-[#909090]">تومان</span>
                        <button type="button" onClick={() => setPrice("")}>
                            <IoCloseCircleOutline size={24} className="text-[#676767]"/>
                        </button>
                    </div>
                </div>
                <div className="w-full border-t border-t-[#eee] flex flex-row gap-2 px-5 py-4">
                    <button type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] border bg-transparent text-[#ff0000]">رد درخواست</button>
                    <button type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] bg-[#006ecf] text-white">انجام شد</button>
                </div>
            </div>
        </ContainerDrawer>
    )
}