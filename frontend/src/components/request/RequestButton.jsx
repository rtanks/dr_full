import classNames from "classnames";

const RequestButton = ({ text, textSubmitting, type, disable, isSubmitting, onClick}) => {
    const disabledClass = classNames({
        // "text-white bg-blue-500": !disable,
        // "text-gray-500 bg-gray-200":disable
        'bg-white': true
    })
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <button type={type} onSubmit={() => console.log('hello')}  onClick={onClick}
                className={`w-full border border-main h-12
                rounded-xl flex items-center justify-center font-bold text-[15px] text-main
                ${disabledClass}`} disabled={disable}>{isSubmitting ? textSubmitting : text}</button>                      
        </div>
    )
}
export default RequestButton;
