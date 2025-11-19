export default function RequestAndExplain({typeRequest, titleRequest}) {
    return(
        <div className="w-full flex flex-col items-center vazir-medium gap-3">
            <div className="w-full text-black text-[16px]">درخواست ثبت {typeRequest}</div>
            <div className="w-full text-[#676767] text-[14px]">{titleRequest}</div>
            <p className="w-full h-[128px] p-5 rounded-[20px] text-[14px] text-[#676767] bg-[#f7f7f7]">
                توضیحات : نمونه گیر ما در محل لوکیشن شما حضور پیدا کرده و بعد از دریافت نمونه به سرعت به
                 آزمایشگاه منتقل و جوابدهی خواهد شد و نتیجه در پرونده پزشکی اشکان حسنوندی درج میگردد .
            </p>
        </div>
    )
}