export default function ItemSelector({items, activeItem, getItem, boxSize}) {
    return (
        <>
            {
                items.map((item, index) => (
                    <div key={index} onClick={() => getItem(item.id)} className={`text-sm font-bold py-2 px-3 rounded-lg border ${boxSize}
                        ${activeItem == item.id ? "bg-select-container text-[#2c8073] border-main" : "text-[#888] bg-unselect-container border-[#aaa]"} text-center hover:cursor-pointer
                        `}>
                        {item.text}
                    </div>
                ))
            }
        </>
    )
}