export default function TooltipText({text}) {
    return (
        <div className="tooltip after:right-[48%] sm:after:right-[50%] md:after:right-[40%] lg:after:right-[28%]">
            {text}
        </div>
    )
}