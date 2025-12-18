import { useState } from 'react';
import CheckAuth from '../../services/hook/CheckAuth';
import Notification from './Notification';

const Examination = ({ imgSrc,onClick, active=false}) => {
    const [show, setShow] = useState(false);

    const { checkAuthUser } = CheckAuth();
    const clickHandler = () => {
        if(checkAuthUser()) {
            onClick();
        } else {
            setShow(true);
        }
    }
    const change = (val) => {
        setShow(val);
    }
    return (
        <>
            <div className={`w-[77px] sm:w-[97px] hover:cursor-pointer h-[100px] ${active? "opacity-100":"opacity-50"} opa sm:h-32 mt-1 flex items-center justify-center`}>
                <img onClick={clickHandler}
                    className="h-full w-full object-fit rounded-md"
                    src={imgSrc}
                    alt="examination"
                />
            </div>
            {show && <Notification show={show} change={change} text={'برای ادامه لطفاً وارد حساب کاربری‌ تان شوید'}/>}
        </>
    );
};

export default Examination;
