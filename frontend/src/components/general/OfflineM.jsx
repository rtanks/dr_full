import { useEffect, useState } from "react";
import { FaWifi } from "react-icons/fa6";
import { easeOut, motion } from "framer-motion";

export default function OfflineM({amount=2000}) {
    const [date, setDate] = useState('');
    useEffect(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth()+1).padStart(2,'0');
      const day = String(now.getDate()).padStart(2,'0');
      const hours = String(now.getHours()).padStart(2,'0');
      const minutes = String(now.getMinutes()).padStart(2,'0');
      // ترتیب: ساعت قبل از تاریخ
      setDate(`${hours}:${minutes}  ${year}/${month}/${day}`);
    },[])
    return(
      <div className="w-full h-full bg-[#f0f2f5] fixed left-0 top-0 px-5 flex justify-center py-5">
          <div className="status-box border-t-[5px] border-t-[#ffc107]">
            <motion.div animate={{scale: [0.5, 1], opacity:[0,1], transition:{duration: 0.5, ease: easeOut}}} 
            className="icon-wrapper flex justify-center ">
              <FaWifi color="#ffc107" size={70}/>
            </motion.div>
            <h1 className="main-title">اتصال اینترنت برقرار نیست</h1>
            <p className="message">لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش نمایید.</p>
            <button onClick={() => location.reload()} 
            className="btn btn-warning text-md flex items-center justify-center">تلاش دوباره</button>
            <p className="footer-note text-[#ffc107]">تی دا: سامانه آموزش و درمان کشور</p>
          </div>
      </div>
    )
}