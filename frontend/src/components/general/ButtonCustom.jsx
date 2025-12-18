export default function ButtonCustom ({type, text, textSubmitting, isSubmitting, disable, onClick, additionalStyle}){
    
    return(
        <button type={type} onSubmit={() => console.log('hello')}  onClick={onClick}
        className={`w-full border
            rounded-xl flex items-center justify-center text-[15px] h-12
            ${disable ? "text-disable bg-disable-container border-gray-300" : additionalStyle }`} 
            disabled={disable}>{isSubmitting ? textSubmitting : text}</button>
    )
}