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
                        className={`text-sm sm:text-md font-bold py-1.5 pr-2.5 pl-1.5 rounded-2xl 
                        bg-select-container text-main border border-main text-center hover:cursor-pointer
                            w-max h-max flex flex-row gap-1.5 items-center`}>
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