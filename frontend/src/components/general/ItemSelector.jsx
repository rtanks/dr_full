export default function ItemSelector({items, activeItem, getItem, boxSize}) {
    return (
        <>
            {
                items.map((item, index) => (
                    <div key={index} onClick={() => getItem(item.id)} className={`text-sm font-bold py-2 px-3 rounded-lg ${boxSize}
                        ${activeItem == item.id ? "bg-blue-200 text-blue-700" : "text-676767 bg-gray-200"} text-center hover:cursor-pointer
                        `}>
                        {item.text}
                    </div>
                ))
            }
        </>
    )
}