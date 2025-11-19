import {transformFormatWithSpread} from "../../services/func/transformFunc.js"

export default function FinancialHistorySubItem({price, shaba, trackingCode, status, explain, create, done}) {
    return (
        <div className="w-full h-max flex flex-col gap-2 vazir-medium text-[14px] border-b border-b-[#a9a9a9] pb-3 text-[#676767]">
            <p className="text-black text-[15px]">مبلغ : {transformFormatWithSpread(price)} تومان</p>
            <p>به شبا : {shaba}</p>
            <p>شماره پیگیری : {trackingCode}</p>
            <p>وضعیت : {status}</p>
            <p>توضیحات : {explain}</p>
            <div className="w-full h-max flex flex-row gap-2 items-center">
                <button className="w-max h-max px-3 py-2 rounded-[10px] bg-[#efefef] text-[#898989]">دریافت نسخه چاپی</button>
                <button className="w-max h-max px-3 py-2 rounded-[10px] bg-[#efefef] text-[#898989]">اشتراک‌گذاری</button>
                <button className="w-max h-max px-3 py-2 rounded-[10px] bg-[#efefef] text-[#898989]">نمایش</button>
                <button className="w-max h-max px-3 py-2 rounded-[10px] bg-[#efefef] text-[#898989]">کپی</button>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
                <span>ایجاد / {create}</span>
                <span>انجام / {done}</span>
            </div>
        </div>
    )
}