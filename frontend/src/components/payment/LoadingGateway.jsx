import { useEffect, useState } from "react"
import loadingImage from "../../assets/images/loading.png"
import { transformFormatWithSpreadEn } from "../../services/func/transformFunc";


export default function LoadingGateway({amount=2000}) {
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
            <div className={`status-box success-page border-t-[5px] border-t-success`}>
                <div className="icon-wrapper">
                  <img src={loadingImage} alt="آیکون لودینگ" className="loading-image mx-auto"/>
                </div>
                <h1 className="main-title">در حال اتصال به درگاه بانک</h1>
                <p className="message">لطفاً تا هدایت شما به صفحه پرداخت، شکیبا باشید و از بستن مرورگر خودداری کنید.</p>
                <div className="details">
                  <div className="detail-item">
                    <span>مبلغ تراکنش:</span>
                    <strong>{transformFormatWithSpreadEn(amount)} ریال</strong>
                  </div>
                  <div className="detail-item">
                    <span>زمان شروع:</span>
                    <strong id="date-time">{date}</strong>
                  </div>
                </div>
                <p className="footer-note2">
                  بعد از پرداخت موفق، اطلاعات شما برای پزشک جهت شروع مشاوره ارسال می‌گردد.<br/>
                  در پنل <b>در حال انجام</b> قادر به مشاهده مشاوره و ادامه مراحل درخواست می‌باشید.
                </p>
                <p className="tida-guide-note">تی دا: سامانه آموزش و درمان کشور</p>
            </div>
        </div>
    )
}