export default function FinancialHistoryItem ({name, expertise, nationalCode, province, city, shaba, number, onClick}) {
    return (
        <div className="w-full h-max bg-white py-3 border-b border-b-[#e0e0e0] sm:border-0 sm:p-5 sm:rounded-[20px] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-0 vazir-medium text-[14px] text-[#676767]">
            <div className="w-full sm:w-max flex flex-row flex-wrap items-center gap-1">
                <span>{name}</span> /
                <span>{expertise}</span> /
                <span>{nationalCode}</span>
            </div>
            <div className="w-max hidden sm:flex flex-row items-center gap-1">
                <span>{province}</span> /
                <span>{city}</span>
            </div>
            <span className="w-full sm:w-max">شبا : {shaba}</span>
            <div className="w-full sm:w-max flex flex-row items-center gap-2">
                <div className="w-1/3 flex sm:hidden flex-row items-center gap-1">
                    <span>{province}</span> /
                    <span>{city}</span>
                </div>
                <span className="w-1/3 sm:w-max text-center sm:px-5">{number} تراکنش</span>
                <button type="button" onClick={onClick} className="w-1/3 sm:w-24 h-10 bg-gray-200 rounded-[10px]">سابقه</button>    
            </div>
        </div>
    )
}