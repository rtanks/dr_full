import { HiOutlineDocument } from "react-icons/hi2";
import profile from '../../assets/IMG_20230207_204057_763.jpg'
export default function HistoryItem() {
    return (
        <div className='w-full h-16 bg-[#f1f1f1] rounded-xl p-1 flex flex-row gap-2 items-center'>
            <div className="w-1/6 h-full bg-white rounded-xl flex justify-center items-center">
                <HiOutlineDocument size={24} />
            </div>
            <div className="w-5/6 h-max flex flex-col gap-2">
                <div className="text-sm font-bold">ویزیت: نورولوژی</div>
                <div className="w-full h-max flex flex-row items-center justify-between">
                    <div className="w-max h-max flex flex-row items-center gap-2">
                        <img src={profile} className="w-6 h-6 rounded-full"/>
                        <span className="text-xs">وارن لیون</span>
                    </div>
                    <span className="text-xs">1404/08/15</span>
                </div>
            </div>
        </div>
    )
}