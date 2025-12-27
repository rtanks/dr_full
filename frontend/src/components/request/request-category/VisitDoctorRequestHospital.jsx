import React, { useState, useEffect, useRef } from 'react';
import TextSelector from './TextSelector';
import EditUserModal from '../../general/EditUserModal';
import MedicineHospital from '../../medicine/MedicineHospital';
import ServicesFooter from './ServicesFooter';
import DoctorInformation from './DoctorInformation';
import useGetDateCreated from '../../../services/hook/useGetDateCreated';

const STEPS_CONFIG = (userInfo, requestData) => ({
  welcome: {
    text: `سلام ${String(userInfo.fullName)} عزیز${'\n'} من تیدا ، دستیار هوشمند شما در دوران نقاهت هستم.${'\n'} هدف من اینه که مطمئن بشم روند درمان شما در منزل، به‌درستی و با خیال راحت پیش میره.${'\n'} در شرایط بیماری، ممکنه خوندن متن‌ها یا تمرکز روی توضیحات کمی سخت باشه. به همین دلیل، این امکان رو فراهم کردیم که راهنمای صوتی همزمان با متن براتون فعال باشه تا هیچ نکته‌ای از قلم نیفته.${'\n'}`,
    next: 'age',
    options: [
      { id: "need", text: "نیاز دارم", value: true },
      { id: "notNeed", text: "نیازی ندارم", value: false }
    ]
  },
  age: {
    text: `با تحلیل‌های عمیق سعی دارم بهترین خدمات رو به شما برسونم، پس لطفا به دو سوال که در علم پزشکی خیلی مهم است پاسخ دهید،${'\n'} 1-لطفا تاریخ تولد خود را تعیین کنید:`,
    next: 'gender',
    options: [
      { id: 'under30', text: "زیر ۳۰ سال", value: 'under30' },
      { id: '30-60', text: "۳۰ تا ۶۰ سال", value: '30-60' },
      { id: 'over60', text: "بالای ۶۰ سال", value: 'over60' }
    ]
  },
  gender: {
    text: "2-لطفاً جنسیت خود را انتخاب کنید:",
    next: 'confirmInfo',
    options: [
      { id: "man", text: "آقا", value: 'man' },
      { id: "woman", text: "خانم", value: 'woman' }
    ]
  },
  confirmInfo: {
    text: "اطلاعات شناسایی شما در سیستم به این صورت است:",
    next: 'medicalReport',
    custom: (
      <>

      <div className="bg-gray-50 p-4 flex flex-col gap-2 rounded-xl text-md border border-gray-100 my-2 animate-in fade-in zoom-in duration-500">
        <span><b className=''>نام:</b> {userInfo?.fullName}</span>
        <span><b className=''>کد ملی:</b> {userInfo?.nationalCode}</span>
        <span><b className=''>تماس:</b> {userInfo?.phoneNumber}</span>
        <span><b className=''>تاریخ تولد:</b> {userInfo?.birthday}</span>
        <span><b className=''>استان:</b> {userInfo?.province}</span>
        <span><b className=''>شهر:</b> {userInfo?.city}</span>
        <span><b className=''>آدرس:</b> {userInfo?.address}</span>
      </div>
      <p className='my-5'>لطفا اطلاعات را تایید یا ویرایش کنید.</p>
      </>
    ),
    options: [
      { id: "confirm", text: "تایید اطلاعات", value: 'confirm' },
      { id: "edit", text: "ویرایش اطلاعات", value: 'edit' }
    ]
  },
  medicalReport: {
    text: "اطلاعات دریافتی مرکز آموزشی درمانی شهدای عشایر به این شرح است:",
    custom: (
      <>
        <DoctorInformation doctor={requestData?.doctor} request={requestData?.request}/>
        <MedicineHospital medicines={requestData.request.request.medicine}/>
        <ServicesFooter/>
      </>
    ),
    options: null // مرحله پایان
  }
});

export default function VisitDoctorRequestHospital({ userInfo, requestData}) {
  const [modal, setModal] = useState(false);
  const [history, setHistory] = useState([]); // برای رندر مراحل در UI
  const [responses, setResponses] = useState({}); // ذخیره داده‌های هر مرحله
  const scrollRef = useRef(null);
  const {getDateNow} = useGetDateCreated();
  
  console.log(requestData?.request?.request?.dateRefer?.date)
  const allSteps = STEPS_CONFIG(userInfo, requestData);

  const startProcess = () => {
    setHistory([{ key: 'welcome', choice: '' }]);
  };

  const handleSelection = (currentKey, nextKey, choice) => {
    if(choice == 'edit') {
      setResponses(prev => ({ ...prev, [currentKey]: choice }));
      setModal(true)
      console.log('edit')
    } else {
      setResponses(prev => ({ ...prev, [currentKey]: choice }));
      const updatedHistory = history.map(item =>
        item.key === currentKey ? { ...item, choice: choice } : item
      );
      if (nextKey && allSteps[nextKey]) {
        setTimeout(() => {
          setHistory([...updatedHistory, { key: nextKey, choice: '' }]);
        }, 500);
      } else {
        setHistory(updatedHistory);
        console.log("تمام داده‌های جمع‌آوری شده:", { ...responses, [currentKey]: choice });
      }
    }
  };

  useEffect(() => {
    if(history.length >= 1) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div className='w-full text-md flex flex-col gap-5'>
      {history.length === 0 ? (
        <div className='flex justify-center items-center h-[60vh]'>
          <button 
            onClick={startProcess} 
            className='bg-main text-white px-8 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition-all'
          >
            شروع فرایند مدیریت درمانی
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div>{getDateNow()}</div>
          {history.map((item) => (
            <TextSelector
              key={item.key}
              currentKey={item.key}
              stepData={allSteps[item.key]}
              activeOption={item.choice}
              onSelect={handleSelection}
              initialBirthday={userInfo.birthday}
            />
          ))}
        </div>
      )}
      <div ref={scrollRef} className="h-20"></div>
      {modal && <EditUserModal close={() => setModal(false)}/>}
    </div>
  );
}