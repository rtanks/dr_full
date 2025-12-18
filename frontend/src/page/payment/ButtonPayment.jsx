export function ButtonPayment({type, text, bg, color, additionalClass, onClick}) {
    return (
        <button type={type} onClick={onClick} className={`btn flex justify-center ${bg} ${color} ${additionalClass}`}>
            {text}
        </button>
    )
}