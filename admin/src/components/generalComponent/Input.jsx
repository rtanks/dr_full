export default function Input({placeholder, register, type, mode, onChange}) {
    return (
        <input
            type={type} 
            placeholder={placeholder}
            inputMode={mode} 
            onChange={onChange} 
            {...register}
            className="w-full h-13 rounded-2xl vazir-medium text-gray-500 border border-gray-500 px-5 mt-2"
        />
    )
}