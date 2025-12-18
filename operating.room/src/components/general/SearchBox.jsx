export default function SearchBox({placeholder,mStyle}) {
    return (
        <input type="search" placeholder={placeholder} 
            className={`bg-white text-sm sm:text-xs px-5 h-14 sm:h-12 rounded-xl border placeholder:text-898989 border-a7a7a7 outline-0 ${mStyle}`}/>
    )
}