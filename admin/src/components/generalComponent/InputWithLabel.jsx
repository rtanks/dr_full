import classNames from "classnames"

export default function InputWithLabel({label, type, placeholder, register, flag, error, onChange, styleL, styleI}) {
    const statusInput = classNames({
        'outline-green-500': !error && flag,
        'outline-red-600': error && flag,
        "outline-black": !(error && flag)  
    })
    return (
        <div className="w-full h-max flex flex-col gap-1 font-bold">
            <label className={`w-full ${styleL}`}>{label}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                {...register}
                onChange={(e) => {
                  register?.onChange?.(e); 
                  onChange?.(e);
                }}
                className={`w-full h-13 rounded-2xl vazir-medium ${statusInput} bg-[#f9f9f9] text-gray-500 placeholder:text-[#757575] border border-[#e3e3e3] px-5 mt-2 ${styleI}`}
            />
        </div>
    )
}