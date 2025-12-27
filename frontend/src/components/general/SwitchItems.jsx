export default function SwitchItems({items,selectedItem, getSelectedItem}) {
    return (
        <div className="w-full h-12 bg-[#f1f1f1] flex flex-row items-center gap-2 p-1.5  rounded-xl mb-1">
             {
                items.map(item => (
                    <button type="button" key={item.id} onClick={() => getSelectedItem(item.id)} 
                    className={`text-sm font-bold h-full w-1/2 rounded-lg 
                    ${selectedItem[item.id]? "bg-white text-blue-main" : "bg-transparent text-767676"}`}>{item.text}</button>
                ))
             }
         </div>
    )
}