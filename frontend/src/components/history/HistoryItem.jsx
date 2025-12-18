import { HiOutlineDocument } from "react-icons/hi2";
import profile from '../../assets/IMG_20230207_204057_763.jpg'
import { convertDateToLocalFormat } from "../../services/func/transformDate";
import useGetIcon from "../../services/hook/useGetIcon";
import { getKeyRequestWithService } from "../../services/func/getTypeRequest";

export default function HistoryItem({id,date,service, onClick, payed}) {
    const {dateValue} = convertDateToLocalFormat(date);
    const {getIconForHeader} = useGetIcon();
    return (
        <div onClick={() => onClick(id)} className={`w-full h-16 hover:cursor-pointer bg-[#f1f1f1]
          rounded-xl p-1 flex flex-row gap-2 items-center`}>
            <div className="w-[19%] h-full bg-white rounded-xl flex justify-center items-center">
                {
                    getIconForHeader(27, '#676767',getKeyRequestWithService(service))
                }
            </div>
            <div className="w-5/6 h-full flex flex-row justify-between items-center gap-2">
                <div className="w-max h-max flex flex-col items-start justify-center">
                    <div className="text-sm font-bold mb-[7px]">{service}</div>
                    <div className="w-max h-max flex flex-row items-center gap-2">
                        <img src={profile} className="w-6 h-6 rounded-full"/>
                        <span className="text-xs">وارن لیون</span>
                    </div>
                </div>
                <div className="w-max h-full flex flex-col items-start justify-center gap-4">
                    <span className={`text-xs font-bold ${payed? "text-success": "text-failed"}`}>{payed ? "پرداخت شده" : "پرداخت نشده"}</span>
                    <span className="text-xs self-end">{dateValue}</span>
                </div>
            </div>
        </div>
    )
}