import { convertDateToLocalFormat } from "../../services/func/transformDate";
import useGetIcon from "../../services/hook/useGetIcon";
import { getKeyRequestWithService } from "../../services/func/getTypeRequest";
import classNames from 'classnames';
import { HiOutlineUserCircle } from "react-icons/hi";

export default function HistoryItem({id,date,service, doctor,onClick, payed}) {
    const {dateValue} = convertDateToLocalFormat(date);
    const {getIconForHeader} = useGetIcon();
    const params = new URLSearchParams(location.search);

    const statusClass = classNames({
        'text-success': payed == 'success',
        'text-main': payed == 'pending',
        'text-failed': payed == 'failed',
        'text-white': params.get('id') == id
    })
    return (
        <div onClick={() => {onClick();}} className={`w-full h-16 hover:cursor-pointer
            ${params.get('id') == id ? "bg-main text-white": " bg-[#f1f1f1]"} rounded-xl p-1 
            flex flex-row gap-2 items-center`}>
            <div className="w-[56px] h-[56px] bg-white rounded-lg flex justify-center items-center">
                {
                    getIconForHeader(27, '#676767',getKeyRequestWithService(service))
                }
            </div>
            <div className="w-5/6 h-full flex flex-row justify-between items-center gap-2">
                <div className="w-[71%] sm:w-max h-max flex flex-col items-start justify-center">
                    <div className="text-sm font-bold mb-[7px]">{service}</div>
                    <div className="w-full sm:w-max h-max flex flex-row items-center gap-2">
                        {/* <img src={profile} className="w-7 h-7 rounded-full border"/> */}
                        <HiOutlineUserCircle className={`w-7 h-7 rounded-full ${params.get('id') == id ? "text-white": " text-[#a7a7a7]"}`}/>
                        <span className="text-xs whitespace-break-spaces">{doctor? doctor : "در انتظار تعیین پزشک مرتبط"}</span>
                    </div>
                </div>
                <div className="w-max h-full flex flex-col items-center justify-center gap-4">
                    <span className={`text-xs w-max font-bold ${statusClass}`}>{payed == 'success' ? "پرداخت شده" :(payed == 'failed'? "پرداخت نشده": "درحال انجام")}</span>
                    <span className="text-xs w-max self-end">{dateValue}</span>
                </div>
            </div>
        </div>
    )
}