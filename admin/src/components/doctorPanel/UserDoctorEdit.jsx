import TestHeader from "../generalComponent/HeaderTest";
import InputWithLabel from "../generalComponent/InputWithLabel";
import SubmitButton from "../generalComponent/SubmitButton";
import TextAreaWithLabel from "../generalComponent/TextAreaWithLabel";

export default function UserDoctorEdit({onClick}) {
    
    return (
        <div className="w-full h-full bg-white vazir-medium fixed left-0 top-0 z-50 overflow-y-scroll">
            <form className="w-[402px] mx-auto">
                <TestHeader title={"ویرایش کاربر"} onClick={onClick}/>
                <div className="w-[90%] h-max mx-auto flex flex-col gap-6 mb-5">
                    <div className="flex flex-row items-center gap-[14px]">
                        <div className="w-[62px] h-[62px] text-xs bg-[#d9d9d9] rounded-full"></div>
                        <span className="text-[16px] text-[#5f5f5f]">تصویر پروفایل</span>
                    </div>
                    <InputWithLabel label={"شماره همراه"} type={"text"} />
                    <InputWithLabel label={"کد ملی"} type={"text"} />
                    <InputWithLabel label={"شماره نظام پزشکی / روانشناسی"} type={"text"} />
                    <InputWithLabel label={"فوق تخصص / فلوشیپ"} type={"text"} />
                    <InputWithLabel label={"تخصص"} type={"text"} />
                    <InputWithLabel label={"استان"} type={"text"} />
                    <InputWithLabel label={"شهر"} type={"text"} />
                    <InputWithLabel label={"سال آخرین فارغ التحصیلی"} type={"text"} />
                    <InputWithLabel label={"آخرین دانشگاه محل تحصیل"} type={"text"} />
                    <TextAreaWithLabel label={"درباره من "} type={"text"} styleI={"w-[361px] h-[241px]"}/>
                    <SubmitButton title={"ثبت اطلاعات"} additionalStyle={"bg-[#E9E9E9] text-[#676767] border-none"} disabled={false}/>
                </div>
            </form>
        </div>
    )
}