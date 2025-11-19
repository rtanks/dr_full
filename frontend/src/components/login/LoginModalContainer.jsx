import LoginTitle from './LoginTitle';
import { MdOutlineClose } from "react-icons/md";
import Login from './Login';
import { useState } from 'react';
import Register from './Register';

export default function LoginModalContainer({close}) {
    const [itemShow , setItemShow] = useState('login');
    const changeItemShow = (item) => {
        setItemShow(item);
    }
    const showProcess = () => {
        return itemShow == 'login' ? <Login changeItemShow={changeItemShow}/> : <Register changeItemShow={changeItemShow}/>;
    }
    return (
        <div onClick={close} className="w-full h-full flex justify-center absolute left-0 top-0 bg-[#0009]">
            <div className='w-full h-max absolute top-0 left-0 text-left sm:p-5'>
                <button type='button'>
                    <MdOutlineClose size={30} color='#ddd'/>
                </button>
            </div>

            <div onClick={(e) => e.stopPropagation()} className="w-[95%] sm:w-2/5 h-max mt-10 p-5 sm:items-center rounded-xl bg-white flex flex-col gap-5 pb-10">
                <div className='w-full h-max'>
                    <LoginTitle/>
                </div>
                <div className='w-full sm:w-[55%] h-max flex flex-col gap-5'>
                    {showProcess()}
                </div>
            </div>
        </div>
    )
}