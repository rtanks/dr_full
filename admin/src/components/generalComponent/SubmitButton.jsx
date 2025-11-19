export default function SubmitButton({title, title2, isSubmitting, onClick, additionalStyle, disabled=false}) {
    return (
        <button type="submit"
            className={`w-full h-14 rounded-2xl vazir-medium border flex items-center justify-center text-[16px] ${additionalStyle}`} 
            onClick={onClick}
            disabled={disabled}
        >{isSubmitting ? title2: title}</button>
    )
}