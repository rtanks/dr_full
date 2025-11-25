import { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default function ItemsAreaSelected({items, getAreas, deleteItem}) {
    useEffect(() => {
        getAreas(items)
    }, [items])
    return (
        <>
            {
                items.length != 0 ? (
                    items.map((item, index) => (
                        <div key={index} 
                        className={`text-sm max sm:text-md font-bold py-1.5 px-3 rounded-2xl bg-select-container text-select text-center hover:cursor-pointer
                            w-max h-max flex flex-row gap-2 items-center`}>
                            <span>{item}</span>
                            <button type="button" onClick={() => deleteItem(item)}>
                                <IoIosCloseCircle size={22} color="#a7a7a7"/>
                            </button>
                        </div>
                    ))
                ) : " "
            }
        </>
    )
}