export default function InputBox({type, placeholder,register,onChange}) {
    return(
        <input type={type} placeholder={placeholder} 
            className={`w-full h-12 rounded-xl border border-zinc-300 px-5 placeholder:text-zinc-400`}
        />
    )
}