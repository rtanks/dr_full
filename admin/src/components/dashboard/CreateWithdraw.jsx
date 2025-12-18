import { useState } from "react";
import TestHeader from "../generalComponent/HeaderTest";
import { IoCloseCircleOutline } from "react-icons/io5";
import { transformFormatWithSpreadEn } from "../../services/func/transformFunc";
import SearchBox from "../generalComponent/SearchBox";
import Button from "../generalComponent/Button";
import { PiPlus } from "react-icons/pi";
import ContainerDrawer from "../generalComponent/ContainerDrawer";

export default function CreateWithdraw({goBack}) {
    const [price, setPrice] = useState("");
    const onChange = (e) => {
        setPrice(e.target.value);
    }
    return (
        <ContainerDrawer onClick={goBack} header={"ایجاد برداشت"}>
            <div className="w-[90%] mx-auto flex flex-col gap-1.5 pb-5 text-[14px] text-[#676767]">
                <SearchBox/>
                <div className="w-full flex flex-row gap-1 mt-4">
                    <span>اشکان حسنوندی</span> / 
                    <span>متخصص جراحی عمومی</span>
                </div>
                <div className="w-full">4060405531</div>
                <div className="w-full">موجودی : {transformFormatWithSpreadEn(406000000)} تومان</div>
                <div className="w-full flex flex-row gap-1">
                    <span>لرستان</span> / 
                    <span>خرم آباد</span>
                </div>
            </div>
            <div className="w-full h-max flex flex-col gap-4 border-t-[6px] border-t-[#f5f5f5] px-5 items-center pt-2 ">
                <div className="w-full text-[14px] text-[#676767] mt-3">ایجاد سند برداشت</div>
                <div className="w-full h-[53px] text-16px flex flex-row items-center gap-2 px-4 border border-[#909090] rounded-[15px]">
                    <input onChange={(e) => onChange(e)} type="text" value={price} placeholder="ورود مبلغ" className="text-[#676767] placeholder:text-[#909090] border-0 outline-0 w-[90%]"/>
                    <span className="text-[#909090]">تومان</span>
                    <button type="button" onClick={() => setPrice("")}>
                        <IoCloseCircleOutline size={24} className="text-[#676767]"/>
                    </button>
                </div>
                <input type="text" placeholder="شماره پیگیری" className="w-full h-[53px] text-[14px] text-[#676767] placeholder:text-[#909090] outline-0 border border-[#909090] rounded-[15px] px-4"/>
                <div className="w-full h-max flex flex-row justify-between items-center">
                    <span className="text-[14px] text-[#676767]">سند تراکنش</span>
                    <button className="h-max rounded-lg vazir-medium text-gray-500 bg-gray-200 p-4">
                        <PiPlus size={24}/>
                    </button>
                </div>
            </div>
            <div className="w-full sm:w-[402px] mr-auto fixed bottom-0 left-0 right-0">
                <div className="w-full border-t border-t-[#eee] flex flex-row gap-2 p-5">
                    <input inputMode="numeric" className="text-[#757575] text-[15px] border-0 outline-0" placeholder="میتوانید متنی وارد کنید"/>
                </div>
                <div className="w-full border-t border-t-[#eee] p-5">
                    <button type="button" className="w-full h-12 flex text-[15px] items-center justify-center rounded-[10px] bg-[#006ecf] text-white">انجام شد</button>
                </div>
            </div>
        </ContainerDrawer>
    )
}