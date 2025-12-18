import {LuCreditCard} from "react-icons/lu"
import {IoCloseCircle} from "react-icons/io5"
import {FaCircleCheck} from "react-icons/fa6"

export default function ModalWithdraw({showModal ,onClick}) {
    return (
        <div className={`w-[402px] h-full absolute -left-5 -top-5 bg-[#0006] ${showModal ? "flex" : "hidden"} justify-center`}>
            <div className="w-[370px] h-[500px] rounded-3xl mt-10 bg-white">
                <div className="w-full border-b-2 border-b-[#e9e9e9] flex flex-row text-[#676767] p-5 items-center justify-between">
                    <div className="w-max flex flex-row gap-1">
                        <LuCreditCard size={24}/>
                        <span>برداشت وجه</span>
                    </div>
                    <button type="button" onClick={onClick}>
                        <IoCloseCircle size={24} color="#a7a7a7"/>
                    </button>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-5 px-5 py-3">
                    <div className="w-full flex flex-col justify-center items-center gap-3">
                        <FaCircleCheck size={32} color="#083"/>
                        <span className="text-[16px] text-black">درخواست برداشت با موفقیت انجام شد</span>
                        <span className="text-[16px] text-black">بعد از تایید اپراتور به حساب شما واریز کی گردد</span>
                    </div>
                    <p className="w-full text-[14px] text-[#909090]">
                        به دستور بانک مرکزی، سقف واریز در هر روز به هر حساب بانکی 100 میلیون تومان خواهد بود. برای برداشت مبالغ بیشتر از چند حساب بانکی استفاده کنید و یا در روزهای متوالی درخواست برداشت کنید.
                    </p>
                    <p className="w-full text-[14px] text-[#909090] border-t border-t-[#e9e9e9] pt-3">
                        درخواست‌های برداشت ثبت‌شده، وارد صف سیکل‌های پایا شده و در اولین سیکل تسویه خواهد شد.<br/>
                        سیکل‌های پایا روزهای کاری<br/>
                        ثبت پیش از 13 ظهر: ساعت 13:45 همان روز<br/>
                        ثبت بین 13:00 تا 18:00 عصر: ساعت 18:45 همان روز<br/>
                        ثبت پس از ساعت 18:00 عصر: ساعت 13:45 روز کاری بعد<br/>
                        سیکل‌های پایا روزهای تعطیل<br/>
                        ساعت 13:45 روز کاری بعد<br/>
                    </p>
                </div>
            </div>
        </div>
    )
}