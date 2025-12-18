import Label from "../labelCard";
import TextError from "./TextError";

const Symptoms = ({ register, isError, messageError, isValid }) => {
    return (
        <div className='w-full mx-auto mt-5'>
            <Label labelName={"توضیح در مورد مشکل خود"} />

            <div className="w-full my-3">
                <textarea {...register}
                    placeholder={"برای درک بهتر پزشک از بیماری در مورد آن توضیح بدهید / مثال : علائم اصلی چیست؟ از چه زمانی شروع شده؟ سابقه بیماری مرتبط دارید؟"}
                    className={`w-full py-3 h-28 rounded-xl px-5 text-sm sm:text-md resize-none border-2 outline-none transition-colors duration-300
                    ${isError ? "border-red-400 text-red-500" : isValid ? "border-select" : "border-gray-300 placeholder:text-gray-600"}`}
                />
                {isError && <TextError message={messageError}/>}
            </div>

        </div>
    )
}

export default Symptoms;
