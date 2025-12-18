export default function UserItemBtn({onClick, children}) {
    return (
        <button type="button" onClick={onClick} 
        className="p-2 rounded-[10px] bg-[#efefef] hover:cursor-pointer text-[#676767] text-[14px] flex flex-row gap-1.5 items-center justify-center">
            {children}
        </button>
    )
}