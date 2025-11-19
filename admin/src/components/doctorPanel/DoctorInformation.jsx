import RadarCircle from "../generalComponent/Radar";
import DoctorOne from "../../assets/images/پزشک زن.jpg";
import { BiStar } from "react-icons/bi";
import {transformFormat,transformFormatWithSpread} from '../../services/func/transformFunc'

export default function DoctorInformation() {
    return (
        <div className="w-[90%] h-max flex flex-col gap-[7px] vazir-medium">
            <div className="w-full h-max flex flex-row justify-between">
                <div className="relative">
                    <RadarCircle />
                     <div className="w-[76px] h-[76px] border border-blue-400 rounded-full">
                         <img className="h-full rounded-full w-full" src={DoctorOne}></img>
                     </div>
                </div>
                <div className="w-[236px] h-max mt-1 flex flex-row gap-[10px]">
                    <div className="w-[71px] flex flex-col gap-[6px] items-center justify-center">
                        <div className="w-full h-7 flex flex-row justify-center items-center text-[#FF9E33] text-sm bg-[#FF9E333f] rounded-[5px]">
                            {transformFormat(4.8)}
                            <BiStar size={14}/> 
                        </div>
                        <span className="text-xs text-[#676767]">از {transformFormatWithSpread(7120)} امتیاز</span>
                    </div>
                    <div className="w-[71px] flex flex-col gap-[6px] items-center justify-center">
                        <div className="w-full h-7 flex flex-row justify-center items-center text-[#006ECF] text-sm bg-[#006ECF3f] rounded-[5px]"> {transformFormatWithSpread(11000)}+</div>
                        <span className="text-xs text-[#676767]">از {transformFormatWithSpread(7120)} امتیاز</span>
                    </div>
                    <div className="w-[71px] flex flex-col gap-[6px] items-center justify-center">
                        <div className="w-full h-7 flex flex-row justify-center items-center text-sm text-[#676767] bg-[#F2F2F2] rounded-[5px]">{transformFormat(1854654)}</div>
                        <span className="text-xs text-[#676767]">نظام پزشکی</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-max flex flex-col">
                <span className="text-black text-[15px]">دکتر مینا بیرانوند</span>
                <span className="text-[#676767] text-[13px]">دکترای تخصصی روانشناسی و مشاوره</span>
            </div>
        </div>
    )
}