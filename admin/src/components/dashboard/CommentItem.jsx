import { BiStar } from "react-icons/bi";

export default function CommentItem({doctor, expertise, patient, service, time, date, text}) {
    return (
        <div className="w-full h-max md:h-[124px] border-b border-b-[#e0e0e0] md:border-0 vazir-medium py-4 md:p-4 flex flex-col items-center justify-between bg-white md:rounded-[20px] text-[14px] text-[#676767]">
            <div className="w-full h-max flex flex-col md:flex-row md:justify-between gap-2 md:gap-5">
                <div className="w-full md:w-[49%] order-2 md:order-1 flex flex-col md:flex-row justify-between">
                    <div className="flex flex-row items-center gap-1">
                        <span>{doctor}</span>/
                        <span>{expertise}</span>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <span>{patient}</span>/
                        <span className="text-[#ff9f33]">{service}</span>
                    </div>
                </div>
                <div className="w-full md:w-[23.5%] order-1 md:order-2 flex flex-row items-center justify-between">
                    <div className="w-max flex flex-row items-center text-[#ff9f33] justify-center gap-1">
                        <BiStar size={11}/>
                        <BiStar size={11}/>
                        <BiStar size={11}/>
                        <BiStar size={11}/>
                        <BiStar size={11}/>
                    </div>
                    <div className="w-max flex flex-row items-center gap-2">
                        <span>{time}</span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-max flex flex-col md:flex-row justify-between items-center gap-2 md:gap-5">
                <p>{text}</p>
                <div className="w-full md:w-[23.5%] flex flex-row items-center gap-2 justify-end">
                    <button type="button" className="w-1/2 md:w-[120px] h-10 flex text-md items-center justify-center rounded-[10px] border bg-transparent text-[#ff0000]">تایید</button>
                    <button type="button" className="w-1/2 md:w-[120px] h-10 flex text-md items-center justify-center rounded-[10px] bg-[#006ecf] text-white">رد</button>
                </div>
            </div>
        </div>
    )
}