import EndItem from '../layout/EndItem';
import Menu from '../layout/Menu';
import Actions from '../layout/Actions';
import NavBar from '../layout/NavBar';
import OfflineM from '../components/general/OfflineM';
import { closeModal, getShowModal } from '../slices/modalSlice';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoginModalContainer from '../components/login/LoginModalContainer';
import PaymentModalContainer from '../components/payment/PaymentModalContainer';
import MessageModalContainer from '../components/messageBox/MessageModalContainer';
import axios from 'axios';
import HeaderAuth from '../services/api/headerAndUrlService';
import CheckAuth from '../services/hook/CheckAuth';
import Notification from '../components/general/Notification';

export default function MainPage() {
  const [offline, setOffline] = useState(false);
  const container = useRef(null);
  const snapsRef = useRef([]);
  const startX = useRef(0);
  const [activeSnap, setActiveSnap] = useState(1);
  const changeActiveSnap = (value) => {
    setActiveSnap(value);
  }
  const [messageModalData, setMessageModalData] = useState({})
  const [messageNotification, setMessageNotification] = useState(0);
  const showModal = useSelector(state => state.modal.showItem)
  const dispatch = useDispatch();

  const showModalSelected = () => {
    switch(showModal) {
      case 'login': return <LoginModalContainer close={() => dispatch(closeModal())}/>
      case 'payment': return <PaymentModalContainer close={() => dispatch(closeModal())}/>
      case 'message': return <MessageModalContainer messageId={messageModalData} close={() => dispatch(closeModal())}/>
    }
  }

  const snapCount = 3; // تعداد اسنپ‌ها

  const scrollToSnap = (index) => {
    const el = snapsRef.current[index - 1];
    if (!el || !container.current) return;
    const offset = el.offsetLeft - (container.current.clientWidth / 2) + (el.clientWidth / 2.02);
    container.current.scrollTo({
      left: offset,
      behavior: "smooth",
    });
  };

  const startY = useRef(0);
  const handleTouchStart = (e) => {
    // ذخیره کردن موقعیت ابتدایی لمس
    startX.current = e.touches[0].clientX;
  startY.current = e.touches[0].clientY;
};

const handleTouchMove = (e) => {
  
  const endX = e.touches[0].clientX;
  const endY = e.touches[0].clientY;
  const diffX = endX - startX.current;
  const diffY = endY - startY.current;
  
  const isVerticalScroll = Math.abs(diffY) > Math.abs(diffX); // تشخیص جهت حرکت عمودی یا افقی
  
  // اگر حرکت عمودی باشد، جلوگیری از اسکرول افقی
  if (isVerticalScroll) {
    e.preventDefault();
  }
};

const handleTouchEnd = (e) => {
  
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX.current;
  const diffY = endY - startY.current;
  const threshold = 30; // حساسیت swipe
  let next = activeSnap;
  
  // تشخیص حرکت افقی و عمودی
  const isVerticalScroll = Math.abs(diffY) > Math.abs(diffX);
  if (!isVerticalScroll) {
    // اگر حرکت افقی است (اسکرول افقی)
    if (diffX > threshold && activeSnap < snapCount) {
      next = activeSnap + 1;
    } else if (diffX < -threshold && activeSnap > 1) {
      next = activeSnap - 1;
    }
  }
  
  if (next !== activeSnap) {
    setActiveSnap(next);
    scrollToSnap(next);
  } else {
    scrollToSnap(activeSnap);
  }
};

const targetComponent = (i) => {
  switch(i) {
      case 1: return <Menu scrollHandler={scrollToSnap} changeActiveSnap={changeActiveSnap}/>;
      case 2: return <EndItem/>;
      case 3: return <Actions scrollHandler={scrollToSnap}/>
    }
  }

  
  useEffect(() => {
    const offlineHandler = () => {setOffline(true);console.log('offline')};
    const onlineHandler = () => {setOffline(false);console.log('online')};
    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    }
  }, [])

  const {checkAuthUser} = CheckAuth();
  const {baseUrl, headers, id} = HeaderAuth();
  useEffect(() => {
    const getCounterUnreadMessage = async() => {
      await axios.get(`${baseUrl}/user-messages/counter-unread/${id}`, {headers}).then(res => {
        if(res.data.type == 'modal') {
          setMessageModalData(res.data.messageId)
        }
        if(res.data.length != 0) {
          setMessageNotification(res.data.length)
        }
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
    if(checkAuthUser()) {
      getCounterUnreadMessage();
    }
  },[])
  return (
    <>
      { window.matchMedia("(max-width: 768px)").matches ? (
        <>
        {/* <div className='w-full h-[83vh] pt-4 px-2 sm:px-0 relative'> */}
        <div className='w-full h-screen pb-16 pt-1 px-0.5 relative'>
          <div
            ref={container} 
            id='mainScrollContainerMobile'
            className="w-full h-full flex overflow-hidden"
            dir="rtl" // مهم: container راست چین
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}  // اضافه کردن رویداد onTouchMove برای بررسی حرکت
          >
            {[...Array(snapCount)].map((_, i) => (
              <div 
                  key={i}
                  ref={(el) => {(snapsRef.current[i] = el)}}
                  className={`shrink-0 ${i == 1? "w-[97%]": "w-[98%]"} h-full rounded-xl mx-1.5 bg-transparent 
                  flex items-center justify-center gap-1 sm:p-3 overflow-y-scroll`}
                  
                > 
                  {
                    targetComponent(i + 1)
                  }
              </div>
              ))}
            </div>
          </div>
          <NavBar activeSnap={activeSnap} scrollHandler={scrollToSnap} changeActiveSnap={changeActiveSnap}/>
        </>
        ) : (
          <div className='w-full h-full px-1 sm:px-0 relative'>
           <div dir='rtl' className={`w-full h-full scroll-smooth snap-x snap-mandatory flex flex-row gap-1.5 sm:gap-5 py-2 px-4 sm:p-3 overflow-x-scroll sm:justify-center  sm:overflow-x-hidden`}>
              <Menu/>
              <EndItem/>
              <Actions/>
           </div>
         </div>
        )
      }
       {
         showModalSelected()
       }
       {offline && <OfflineM/>}
       {messageNotification != 0 && <Notification text={`${messageNotification} پیام جدید دارید`} bor={'border-red-500'} 
                bg={'bg-[#f3cece]'} color={'text-red-800'} show={messageNotification} change={() => setMessageNotification(0)}/>}
    </>
  );
}


// const handleTouchStart = (e) => {
//   startX.current = e.touches[0].clientX;
// };

// const handleTouchEnd = (e) => {
//   const endX = e.changedTouches[0].clientX;
//   const diff = endX - startX.current;
//   const threshold = 30; // حساسیت swipe

//   let next = activeSnap;

//   // RTL: swipe right → جلو، swipe left → عقب
//   if (diff > threshold && activeSnap < snapCount) {
//     // انگشت به راست → اسنپ بعدی
//     next = activeSnap + 1;
//   } else if (diff < -threshold && activeSnap > 1) {
//     // انگشت به چپ → اسنپ قبلی
//     next = activeSnap - 1;
//   }

//   if (next !== activeSnap) {
//     setActiveSnap(next);
//     scrollToSnap(next);
//   } else {
//     scrollToSnap(activeSnap);
//   }
// };