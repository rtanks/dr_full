import { useNavigate } from "react-router-dom"

export default function AddTime({title, times, goTo}) {
    
    return (
        <div className="w-full h-max text-[14px] vazir-medium text-[#676767] flex flex-col gap-5 py-4 bg-white">
            <div className="w-full flex flex-row px-1 justify-between items-center">
                <span className="text-black text-[16px]">نوبت های {title}</span>
                
            </div>
            <div className="w-full flex flex-row gap-2 px-3">
                {
                    times.map((item, index) => (
                        <div key={index} className={`text-[16px] p-2 w-max h-10 flex flex-row gap-0.5 rounded-[10px] text-[#676767] bg-[#e9e9e9]`}>
                            <span>{item.start.hour}:{item.start.minute == 0 ? "00" : item.start.minute}</span>
                             تا 
                            <span>{item.end.hour}:{item.end.minute == 0 ? "00" : item.end.minute}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}