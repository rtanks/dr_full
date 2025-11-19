export default function SearchBox({placeholder,mStyle}) {
    return (
        <input type="search" placeholder={placeholder} 
            className={`bg-white text-xs px-5 h-12 rounded-lg border placeholder:text-898989 border-a7a7a7 outline-0 ${mStyle}`}/>
    )
}