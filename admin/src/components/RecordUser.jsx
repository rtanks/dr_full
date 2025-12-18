import TestHeader from "./generalComponent/HeaderTest";
import InputWithLabel from "./generalComponent/InputWithLabel";
import SubmitButton from "./generalComponent/SubmitButton";
import TextAreaWithLabel from "./generalComponent/TextAreaWithLabel";

export default function RecordUser({onClick}) {
    return (
        <div className="w-full h-full bg-white vazir-medium fixed left-0 top-0 z-50 overflow-y-scroll">
            <div className="w-[402px] mx-auto">
                <TestHeader title={"ثبت کاربر"} onClick={onClick}/>
                <div className="w-[90%] h-max mx-auto flex flex-col gap-6 mb-5">
                    <div className="flex flex-row items-center gap-[14px]">
                        <div className="w-[62px] h-[62px] text-xs bg-[#d9d9d9] rounded-full"></div>
                        <span className="text-[16px] text-[#5f5f5f]">تصویر پروفایل</span>
                    </div>
                    <InputWithLabel label={"نام و نام خانوادگی معرف"} type={"text"} />
                    <InputWithLabel label={"شماره همراه معرف"} type={"text"} />
                    <InputWithLabel label={"نام مرکز"} type={"text"} />
                    <InputWithLabel label={"شماره ثبت"} type={"text"} />
                    <TextAreaWithLabel label={"لوکیشن"} type={"text"} styleI={"w-[361px] h-[163px]"}/>
                    <InputWithLabel label={"استان"} type={"text"} />
                    <InputWithLabel label={"شهر"} type={"text"} />
                    <TextAreaWithLabel label={"آدرس"} type={"text"} styleI={"w-[361px] h-[120px]"}/>
                    <TextAreaWithLabel label={"درباره من "} type={"text"} styleI={"w-[361px] h-[241px]"}/>
                    <SubmitButton title={"ثبت اطلاعات"} additionalStyle={"bg-[#E9E9E9] text-[#676767] border-none"} disabled={false}/>
                </div>
            </div>
        </div>
    )
}