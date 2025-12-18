import classNames from "classnames";

const Button = ({type, text, textSubmitting, isSubmitting, disable, onClick})=>{
    const disabledClass = classNames({
        "text-white bg-select": !disable,
        "text-disable bg-disable-container":disable
    })
    return(
        <button type={type} onSubmit={() => console.log('hello')}  onClick={onClick}
        className={`w-full border border-gray-300 h-12
            rounded-xl flex items-center justify-center text-[15px]
            ${disabledClass}`} disabled={disable}>{isSubmitting ? textSubmitting : text}</button>
    )
}
export default Button;
                        // border border-[#ffcc80] text-[#b95e3c] bg-[#fff3e0]