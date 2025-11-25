import classNames from "classnames";

const RequestButton = ({ text, textSubmitting, type, disable, isSubmitting}) => {
    const disabledClass = classNames({
        // "text-white bg-blue-500": !disable,
        // "text-gray-500 bg-gray-200":disable
        'bg-white': true
    })
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <button type={type} className={`w-full border border-select h-12
                rounded-xl flex items-center justify-center font-bold text-xs sm:text-[15px] text-select
                ${disabledClass}`} disabled={disable}>{isSubmitting ? textSubmitting : text}</button>                      
        </div>
    )
}
export default RequestButton;
