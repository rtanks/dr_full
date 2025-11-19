import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ItemsAreaSelected({items,deleteItem}) {
    return (
        <>
            {
                items.map((item, index) => (
                    <div key={index} 
                    className={`text-sm max sm:text-md font-bold py-2 px-3 rounded-lg
                        bg-blue-200 text-blue-700 text-center hover:cursor-pointer
                        w-max h-max flex flex-row gap-2 items-center`}>
                        <span>{item}</span>
                        <button type="button" onClick={() => deleteItem(item)}>
                            <IoIosCloseCircleOutline size={22} color="#a7a7a7"/>
                        </button>
                    </div>
                ))
            }
        </>
    )
}