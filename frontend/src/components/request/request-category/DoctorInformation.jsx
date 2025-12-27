import { HiOutlineUserCircle } from "react-icons/hi";
import { convertDateToLocalFormat } from '../../../services/func/transformDate';
import MapModal from '../../general/MapModal';
import { useState } from "react";
import ItemSelector from "../../general/ItemSelector";
import useGetDateCreated from "../../../services/hook/useGetDateCreated";
import { IoLocationOutline } from "react-icons/io5";

export default function DoctorInformation({doctor, request}) {
    const [showMapDoctor, setShowMapDoctor] = useState({btn: false, modal: false});
    const {convertJalaliToGregorian} = useGetDateCreated();
    const [selectorAlarm, setSelectorAlarm] = useState('');
    const itemsYesNo = [{id: 'yes', text: 'بله'}, {id: 'no', text: 'نه'}];

    
    // تابع درخواست اجازه و تنظیم آلارم
    function setReminder(gregorianDate, referDatePersian,doctorName) {
        if (!("Notification" in window)) {
            alert("مرورگر شما از اعلان پشتیبانی نمی‌کند.");
            return;
        }
        Notification.requestPermission().then(permission => {
            setShowMapDoctor({btn: true, modal: false})
            if (permission === "granted") {
                const now = new Date();
                // ۱. ساختن شیء تاریخ میلادی برای ساعت ۹ صبح آن روز
                const scheduledTime = new Date(gregorianDate);
                scheduledTime.setHours(9, 0, 0); // تنظیم روی ساعت ۹ صبح
              // ۲. محاسبه فاصله زمانی تا آن تاریخ
              const timeout = scheduledTime.getTime() - now.getTime();
              if (timeout < 0) {
                  alert("این تاریخ گذشته است!");
                  return;
                }
                alert(`یادآور ویزیت ${doctorName} برای تاریخ ${referDatePersian} ثبت شد.`);
                // ۳. تنظیم تایمر
                setTimeout(() => {
                    new Notification("یادآور نوبت پزشک", {
                        body: `امروز نوبت ویزیت شما با ${doctorName} است.`,
                        icon: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
                        dir: "rtl"
                  });
                }, timeout);
            } else {
                alert("اجازه اعلان داده نشد.");
            }
        });
    }
    const changeShowMap = (val) => {
        setShowMapDoctor(val)
    }
    const getYesNoItemSelected = (item) => {
        setSelectorAlarm(item);
        if(item == 'yes') {
            setReminder(convertJalaliToGregorian(request.request.dateRefer.date), request.request.dateRefer.date,doctor?.fullName)
        }
    }
    return (
        <>
            <p>پزشک اصلی </p>
            <div className="space-y-4 my-3 p-2 rounded-2xl animate-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 shrink-0" id="avatarWrap">
                  {
                    doctor.profileImage ? (
                      <img className="w-14 h-14 rounded-full" src={doctor.profileImage} alt={doctor.fullName} />
                    ) : (
                      <div className="w-14 h-14 rounded-full flex justify-center items-center bg-gray-300">
                        <HiOutlineUserCircle size={55} color={'#a7a7a7'}/>
                      </div>
                    )
                  }
                  <button className="status-toggle" id="statusToggle" aria-label="تغییر وضعیت"></button>
                </div>
                <div>
                  <b className="block text-sm">دکتر {doctor?.fullName}</b>
                  <span className="text-xs text-gray-500">{doctor?.specialty}</span>
                </div>
              </div>
              <p>شما را در تاریخ {convertDateToLocalFormat(request.createdAt).dateValue} از مرکز آموزشی درمانی شهدای عشایر ترخیص کرده است.</p>
              <p>پزشک {doctor.fullName} مراجعه بعدی شما را به مطب خود در  تاریخ {request.request.dateRefer ? request.request.dateRefer.date : ""}  تعیین نموده است.</p>
    
              <div className="w-full flex flex-row items-center justify-between text-sm pt-2 text-gray-700">
                <div className='w-max h-max mb-2 flex flex-row items-center justify-between gap-5'>
                  <span className='text-767676 font-bold'>آیا تمایل به یاد آوری تاریخ مراجعه دارید؟</span>
                  <div className="w-max flex flex-row items-center gap-1">
                    <ItemSelector items={itemsYesNo} activeItem={selectorAlarm} getItem={getYesNoItemSelected} disabled={selectorAlarm}/>  
                  </div>
                </div>
              </div>
                  <span className=''>
                    در صورت فعال سازی یادآور لوکیشن و مسیر یابی مطب پزشک {doctor?.fullName || ""} در اختیار شما قرار میگیرد.
                  </span>
                  { 
                    showMapDoctor.btn ? (
                      <button type='button' onClick={() => changeShowMap({btn: true, modal: true})}
                      className='w-full h-max flex flex-row items-center justify-center gap-1 py-1.5 rounded-xl border border-a7a7a7'>
                        <span>مطب</span>
                        <IoLocationOutline size={20}/>
                      </button>
                    ):("")
                    
                  }
                <p>پزشک {doctor.fullName} دارو های مصرفی زیر را بعد از ترخیص به شرح زیر ثبت نموده است.</p>
            </div>
            {showMapDoctor.btn && showMapDoctor.modal && <MapModal location={{lat:33.502712939287,lng:48.360147217259765}} 
            close={() => setShowMapDoctor({btn: true, modal: false})}/>}
        </>
    )
}