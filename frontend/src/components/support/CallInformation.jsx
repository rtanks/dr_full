import { useEffect, useState } from 'react'
import eitaa from '../../assets/images/E1.png'
import telegram from '../../assets/images/E2.png'
import rubika from '../../assets/images/E3.png'
import whatsapp from '../../assets/images/E4.png'
import phone from '../../assets/images/E5.png'
import CallInformationItem from './CallInformationItem'


export default function CallInformation() {
    const [randomValues, setRandomValues] = useState({
      phone: '',
      eitaa: '',
      telegram: '',
      rubika: '',
      whatsapp: ''
    })
    useEffect(() => {
        function randomOnline(){
          return Math.floor(Math.random() * (43 - 3 + 1)) + 3;
        }
        // مقداردهی به هر بخش آنلاین
        setRandomValues({
          phone: randomOnline(),
          eitaa: randomOnline(),
          telegram: randomOnline(),
          rubika: randomOnline(),
          whatsapp: randomOnline()
        })
    }, [])
    return (
        <div className="w-full my-5 sm:mx-auto px-0 sm:px-[18px]">
            <footer className="mt-10 py-5 sm:px-5 text-center">
              <div className="font-bold text-md mb-2 text-[#000] text-right">ارتباط با پشتیبانی در رسانه‌های اجتماعی</div>
              <div className="text-sm mb-5 text-right">۷ روز هفته، ۲۴ ساعت شبانه‌روز</div>
              <div className="flex justify-center gap-2 sm:gap-[30px] flex-row-reverse flex-wrap">
                {/* <!-- تماس تلفنی --> */}
                <CallInformationItem title={'تماس تلفنی'} src={phone} href={'tel:09206919291'}
                onlineUser={` اپراتور آنلاین ${randomValues.phone}`}/>
    
                {/* <!-- ایتا --> */}
                <CallInformationItem title={'ایتا'} src={eitaa} href={"https://eitaa.com/aht_support"}
                onlineUser={` کاربر آنلاین ${randomValues.eitaa}`}/>

                {/* <!-- تلگرام --> */}
                <CallInformationItem title={'تلگرام'} src={telegram} href={"https://t.me/aht_support"}
                onlineUser={` کاربر آنلاین ${randomValues.telegram}`}/>
                
                {/* <!-- روبیکا --> */}
                <CallInformationItem title={"روبیکا"} src={rubika} href={"https://rubika.ir/aht_support"}
                onlineUser={` کاربر آنلاین ${randomValues.rubika}`}/>
                {/* <!-- واتساپ --> */}
                <CallInformationItem title={"واتساپ"} src={whatsapp} href={"https://wa.me/989206919291?text=کاربر%20سامانه%20آموزش%20و%20درمان%20کشور:%20تی%20دا%0Aلطفا%20نام%20و%20نام%20خانوادگی%20و%20کد%20ملی%20خود%20را%20وارد%20کنید.%0A%0A"}
                onlineUser={` کاربر آنلاین ${randomValues.whatsapp}`}/>
              </div>
            </footer>
        </div>
    )
}