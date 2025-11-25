export default function ItemSelector({items, activeItem, getItem, boxSize}) {
    return (
        <>
            {
                items.map((item, index) => (
                    <div key={index} onClick={() => getItem(item.id)} className={`text-sm font-bold py-2 px-3 rounded-lg ${boxSize}
                        ${activeItem == item.id ? "bg-select-container text-select" : "text-unselect bg-unselect-container"} text-center hover:cursor-pointer
                        `}>
                        {item.text}
                    </div>
                ))
            }
        </>
    )
}