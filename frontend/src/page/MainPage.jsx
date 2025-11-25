import EndItem from '../layout/EndItem';
import Menu from '../layout/Menu';
import Actions from '../layout/Actions';
import { useEffect, useRef, useState } from 'react';
import NavBar from '../layout/NavBar';
import LoginModalContainer from '../components/login/LoginModalContainer';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../slices/modalSlice';
import HistoryModalContainer from '../components/history/HistoryModalContainer';
import PaymentModalContainer from '../components/payment/PaymentModalContainer';
// import ModalInformation from '../components/request/ModalInformation';

export default function MainPage() {
  const container = useRef();
  const [activeSnap, setActiveSnap] = useState('snap1');
  const [preScroll, setPrevScroll] = useState(8);
  const showModal = useSelector(state => state.modal.showItem)
  const dispatch = useDispatch();

  const showModalSelected = () => {
    switch(showModal) {
      case 'login': return <LoginModalContainer close={() => dispatch(closeModal())}/>
      case 'payment': return <PaymentModalContainer close={() => dispatch(closeModal())}/>
      case 'history': return <HistoryModalContainer close={() => dispatch(closeModal())}/>
      // case 'information': return <ModalInformation close={() => dispatch(closeModal())}/>
    }
  }
  useEffect(() => {
    const sections = container.current.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            setActiveSnap(entry.target.id);
          }
        })
      },
      { root:container.current, threshold: 0.8 }//min 50% from element
    );
    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
    
  },[]) 
  const changeSnap = (val) => {
    setActiveSnap(val);
  }
  const scrollHandler = (targetElem) => {
    const targetElement = document.getElementById(targetElem);
    const valueOffset = targetElement.offsetLeft - (container.current.clientWidth / 2)+ (targetElement.clientWidth / 2)
    container.current.scrollTo({left: valueOffset, behavior: "smooth"})
  }
  return (
      <>
        <div className='w-full h-full px-1 sm:px-0 relative'>
          <div ref={container} dir='rtl' className={`w-full h-full scroll-smooth snap-x snap-mandatory flex flex-row gap-1.5 sm:gap-5 p-2 sm:p-3 overflow-x-scroll sm:justify-center sm:overflow-x-hidden`}>
            <Menu/>
            <EndItem/>
            <Actions/>
          </div>
        </div>
        <NavBar activeSnap={activeSnap} scrollHandler={scrollHandler}/>
        {
          showModalSelected()
        }
      </> 
  )
}