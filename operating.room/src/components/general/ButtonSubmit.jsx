import classNames from "classnames";

const ButtonSubmit = ({type, text, textSubmitting, isSubmitting, disable, onClick})=>{
    const disabledClass = classNames({
        "text-white bg-blue-500": !disable,
        "text-gray-500 bg-gray-200":disable
    })
    return(
        <button type={type} onSubmit={() => console.log('hello')}  onClick={onClick}
        className={`w-[90%] mx-auto border border-gray-300 h-14 my-2 
            rounded-2xl flex items-center justify-center text-md
            ${disabledClass}`} disabled={disable}>{isSubmitting ? textSubmitting : text}</button>
    )
}
export default ButtonSubmit;
                        