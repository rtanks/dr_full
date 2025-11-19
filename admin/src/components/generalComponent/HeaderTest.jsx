import { LuArrowRight } from "react-icons/lu";
const TestHeader = ({title,onClick,children}) => {
    return (
        <div className='w-full py-4 sticky border-gray-300 bg-white shadow-md top-0 z-100 border-b mb-5 mx-auto'>
            <div className="w-[90%] mx-auto flex flex-col relative justify-center items-center">
                <LuArrowRight onClick={onClick} className='absolute text-xl right-0 hover:cursor-pointer' />
                <div className='vazir-medium text-xl text-[#262626]'>{title}</div>
                {children}
            </div>
        </div>
    )
}
export default TestHeader;