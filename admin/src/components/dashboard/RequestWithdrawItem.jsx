import requestWithdrawService from "../../services/api/dashboard.api/requestWithdrawService"
import {transformFormatWithSpreadEn} from "../../services/func/transformFunc"

export default function RequestWithdrawItem({id, name, expertise, nationalCode, province, city, price, time, date}) {
    const {approveRequest, rejectRequest} = requestWithdrawService()
    const approve = () => {
        approveRequest({id: id});
    }
    const reject = () => {
        rejectRequest({id: id});
    }
    return (
        <div className="w-full h-max flex flex-col bg-white gap-3 py-3 border-b border-b-[#e0e0e0] sm:border-0 sm:p-5 rounded-none sm:rounded-[20px] vazir-medium text-[14px] text-[#676767]">
            <div className="w-full h-max flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between">
                <div className="w-full sm:w-1/3 flex flex-row items-center gap-1">
                    <span>{name}</span> /
                    <span>{expertise}</span> /
                    <span>{nationalCode}</span>
                </div>
                <div className="w-2/3 h-max hidden sm:flex flex-row items-center justify-between">
                    <div className="w-max flex flex-row items-center gap-1">
                        <span>{province}</span> /
                        <span>{city}</span>
                    </div>
                    <div className="w-max flex flex-row items-center gap-5">
                        <span>کیف پول : {transformFormatWithSpreadEn(price)} تومان</span>
                        <span>درخواست برداشت : {transformFormatWithSpreadEn(price)} تومان</span>
                    </div>
                    <div className="w-max flex flex-row items-center gap-2.5">
                        <span>{time}</span>
                        <span>{date}</span>
                    </div>
                </div>
                {/* ----------------------------------------------------- */}
                <div className="w-full h-max flex sm:hidden flex-col gap-2 sm:flex-row items-center justify-between">
                    <div className="w-full justify-between flex flex-row items-center gap-5">
                        <div className="w-max flex flex-row items-center gap-1">
                            <span>{province}</span> /
                            <span>{city}</span>
                        </div>
                        <span>درخواست برداشت : {transformFormatWithSpreadEn(price)} تومان</span>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <span>کیف پول : {transformFormatWithSpreadEn(price)} تومان</span>
                        <div className="w-max flex flex-row items-center gap-2.5">
                            <span>{time}</span>
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-max flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between">
                <div className="w-full sm:w-[62%] p-2 border border-[#e9e9e9] rounded-[10px]">
                    <span>توضیحات : </span>
                </div>
                <div className="w-full sm:w-[37%] flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between">
                    <div className="w-full sm:w-max flex flex-row gap-2">
                        <button type="button" className="w-1/2 sm:w-[88px] h-10 border border-[#d9d9d9] rounded-[10px]">شماره پیگیری</button>
                        <button type="button" className="w-1/2 sm:w-[88px] h-10 border border-[#d9d9d9] rounded-[10px]">سند تراکنش</button>
                    </div>
                    <div className="w-full sm:w-max flex flex-row gap-2">
                        <button type="button" onClick={approveRequest} className="w-1/2 sm:w-[120px] h-10 flex items-center justify-center rounded-[10px] border bg-transparent text-[#ff0000]">تایید</button>
                        <button type="button" onClick={rejectRequest} className="w-1/2 sm:w-[120px] h-10 flex items-center justify-center rounded-[10px] bg-[#006ecf] text-white">رد</button>
                    </div>
                </div>
            </div>
        </div>
    )
}