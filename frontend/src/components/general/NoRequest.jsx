import nothing from '../../assets/images/nothing.png'
export default function NoRequest({text,hCon, wImg, additionalStyleCon, additionalStyle}){
    return (
        <div className={`w-full ${hCon} flex justify-center ${additionalStyleCon}`}>
            <div className={`${wImg} h-max flex flex-col gap-5 items-center mt-[10%] ${additionalStyle}`}>
                <img src={nothing} className={`w-1/2`}/>
                <div className='text-[#ccc] font-bold'>{text}</div>
            </div>
        </div>
    )
}