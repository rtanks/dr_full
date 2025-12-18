export default function SubmitButtonFixed({title, title2, isSubmitting, onClick, additionalStyle, disabled=false}) {
    return (
        <div className="w-full sm:w-[402px] h-max mr-auto fixed bottom-0 left-0 right-0 py-3 px-4 bg-white border-t border-t-[#e9e9e9]">
            <button type="submit"
            className={`w-full h-14 rounded-2xl vazir-medium border flex items-center justify-center text-[16px] ${additionalStyle}`} 
            onClick={onClick}
            disabled={disabled}>{isSubmitting ? title2: title}</button>
        </div>
    )
}