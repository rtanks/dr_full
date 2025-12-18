export default function SelectAreaItem({items, activeItemFind, getActiveItems, deleteItem, boxSize}) {
    return (
        <>
            {
                items.map((item, index) => (
                    <div key={index} onClick={() => {getActiveItems(item);deleteItem(item);}} className={`text-sm sm:text-md font-bold py-2 px-3 rounded-lg ${boxSize}
                        ${activeItemFind(item) ? "bg-select-container text-main border border-main" : 
                        "text-[#888] border border-[#aaa] bg-unselect-container"} text-center hover:cursor-pointer`}>
                        {item}
                    </div>
                ))
            }
        </>
    )
}