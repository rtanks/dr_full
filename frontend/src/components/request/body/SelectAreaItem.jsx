export default function SelectAreaItem({items, activeItem, getItem, boxSize}) {
    return (
        <>
            {
                items.map((item, index) => (
                    <div key={index} onClick={() => getItem(item)} className={`text-sm sm:text-md font-bold py-2 px-3 rounded-lg ${boxSize}
                        ${activeItem == item ? "bg-blue-200 text-blue-700" : "text-676767 bg-gray-200"} text-center hover:cursor-pointer
                        `}>
                        {item}
                    </div>
                ))
            }
        </>
    )
}