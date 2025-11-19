export default function HistoryTitle({selectedHistory, getSelectedHistory}) {
    const items = [
        {key: "doctor", value: "مشاوره پزشکی"},
        {key: "paraClinic", value: "خدمات پاراکلنیک"}
    ]
    return (
        <div className="w-full h-14 bg-[#f1f1f1] flex flex-row items-center gap-2 p-1.5  rounded-xl mb-1">
             {
                items.map(item => (
                    <button key={item.key} onClick={() => getSelectedHistory(item.key)} 
                    className={`text-sm font-bold h-full w-1/2 rounded-lg 
                    ${selectedHistory == item.key? "bg-white text-blue-main" : "bg-transparent text-767676"}`}>{item.value}</button>
                ))
             }
         </div>
    )
}