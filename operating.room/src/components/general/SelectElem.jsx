export default function SelectElem({children, width, firstValue, register, eventFunction}) {
    return (
        <div className={`${width} flex flex-col px-3 bg-white border border-[#e0e0e0] text-sm text-[#676767] outline-none  rounded-xl`}>
            
            <select {...register} onChange={eventFunction} className="w-full bg-white h-10 outline-0">
                <option value={firstValue}>{firstValue}</option>
                {
                    children
                }
            </select>
        </div>
    )
}