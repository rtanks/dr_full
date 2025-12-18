export default function Button({type, title, onClick, additionalStyle}) {
    return (
        <button type={type} onClick={onClick} 
        className={`h-13 rounded-2xl vazir-medium text-gray-500 px-5 ${additionalStyle}`}>
            {title}
        </button>
    )
}