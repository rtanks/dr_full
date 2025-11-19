import { useNavigate } from "react-router-dom"

export default function AddTime({title, times, goTo}) {
    const navigate = useNavigate();
    
    return (
        <div className="w-full h-max text-[14px] vazir-medium text-[#676767] flex flex-col gap-5 p-4 bg-white">
            <div className="w-full flex flex-row px-1 justify-between items-center">
                <span className="text-black text-[16px]">نوبت های {title}</span>
                <button type="button" className="text-[#676767] bg-[#e9e9e9] py-2 px-3 rounded-[10px]">افزودن تایم</button>
            </div>
            <div className="w-full flex flex-row gap-2 px-3">
                {
                    times.map(time => (
                        <button key={time.id} type="button" onClick={() => goTo()} disabled={!time.active} 
                            className={`py-2 px-3 rounded-[10px] ${time.active ? "text-[#00A51E] bg-[#CDF2D3]" : "text-[#676767] bg-[#e9e9e9]"} `}>
                            {time.start} تا {time.end}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}