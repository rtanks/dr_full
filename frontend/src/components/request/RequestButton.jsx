const RequestButton = ({ text, textSubmitting, type, valid, isSubmitting}) => {
    return (
        <div className='w-full flex justify-center items-center bg-white mb-5'>
            <button style={{fontWeight: 900, lineHeight: '1.6rem'}} type={type}
                className={`w-full h-max sm:h-14 px-1 py-2 sm:p-0 
                rounded-xl flex items-center justify-center text-sm sm:text-[17px]
                ${valid ? "bg-select-container text-main border border-main" : "bg-white text-[#888] border border-[#aaa]"}`}>{isSubmitting ? textSubmitting : text}</button>                      
        </div>
    )
}
export default RequestButton;
