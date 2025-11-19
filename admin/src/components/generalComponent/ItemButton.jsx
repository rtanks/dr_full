import classNames from "classnames"

export function ListItemButton({onClick, title, index=0, selected, children, additionalStyle}) {
    const activeClass = classNames({
        "bg-gray-200 text-[#676767]": index == selected ? false : true,
        "bg-[#006ECF44] text-[#006ECF]" : index == selected
    })
    return(
        <button type="button" onClick={() => onClick(index)} className={`w-max h-10 px-2 whitespace-nowrap rounded-xl flex flex-row flex-wrap text-[16px] items-center justify-center ${activeClass}`}>
            {title}
            {children}
        </button>
    )
}
export function ListItemButtonTow({onClick, title, index=0, selected, children, additionalStyle}) {
    const activeClass = classNames({
        "bg-[#efefef] text-[#898989]": index == selected ? false : true,
        "bg-[#006ECF33] text-[#006ECF]" : index == selected
    })
    return(
        <button type="button" onClick={() => onClick(index)} className={`w-max h-10 px-2 whitespace-nowrap rounded-xl flex flex-row flex-wrap text-[14px] items-center justify-center ${activeClass}`}>
            {title}
            {children}
        </button>
    )
}
export function ItemButton({onClick, title, children, style}) {
    return(
        <button type="button" onClick={onClick} className={`w-max h-10 px-2 rounded-xl flex flex-row gap-1 whitespace-nowrap items-center justify-center bg-gray-200 text-[#676767] ${style}`}>
            {title}
            {children}
        </button>
    )
}
