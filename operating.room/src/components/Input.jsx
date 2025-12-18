export default function Input({placeholder, register, type, mode}) {
    return (
        <input
            type={type} 
            {...register}
            placeholder={placeholder}
            inputMode={mode} 
            className="w-full h-13 font-bold rounded-2xl text-gray-500 border border-gray-500 px-5 mt-2"
            style={{width: '100%', height: '52px', border: '1px solid #6b7280', color:"#6b7280", borderRadius: "16px", padding: "0px 20px"}}
        />
    )
}