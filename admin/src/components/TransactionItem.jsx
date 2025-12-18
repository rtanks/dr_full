import classNames from "classnames"
import { RxArrowDown, RxArrowUp, RxLapTimer } from "react-icons/rx"
import { transformFormat, transformFormatWithSpread } from "../services/func/transformFunc"

export default function TransactionItem({status, typeTransAction, price, shaba, time, date}) {
    const iconStatus = () => {
        if(status == "در حال بررسی") {
            return <RxLapTimer size={22} color="#FF9E33"/>
        } else {
            if(typeTransAction == "withdraw") {
                return <RxArrowUp size={22} color="#a00"/>
            } else {
                if(status == "رد شد") {
                    return <RxArrowUp size={22} color="#a00"/>
                } else {
                    return <RxArrowDown size={22} color="#0a0"/>
                }
            }
        }
    }
    const colorClass = classNames({
        "text-[#FF9E33]": status == "در حال بررسی",
        "text-[#27C840]": status == "تایید شد",
        "text-[#ff0000]": status == "رد شد"
    })
    return (
        <div className="w-full text-[14px] vazir-medium flex flex-col gap-2 border-b-[1px] border-b-[#f5f5f5] pb-3">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="w-max flex flex-row items-center gap-2">
                    {iconStatus()}
                    <span>برداشت {transformFormatWithSpread(price)} به تومان</span>
                </div>
                <span className={colorClass}>{status}</span>
            </div>
            <div className="w-full flex flex-row items-center justify-between text-[#676767]">
                <span>شبا : {transformFormat(shaba)}</span>
                <div className="flex flex-row gap-2 items-center justify-between">
                    <span>{transformFormat(time)}</span>
                    <span>{transformFormat(date)}</span>
                </div>
            </div>
            <span className={colorClass}>شسیسش صطسصش</span>
        </div>
    )
}