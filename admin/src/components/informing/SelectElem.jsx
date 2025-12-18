export default function SelectElem({children, width, firstValue, register, eventFunction}) {
    return (
        <div className={`${width} flex flex-col px-3 bg-gray-200 text-sm text-[#676767] outline-none  rounded-xl`}>
            
            <select {...register} onChange={eventFunction} className="w-full h-10 outline-0">
                <option value={firstValue}>{firstValue}</option>
                {
                    children
                }
            </select>
        </div>
    )
}