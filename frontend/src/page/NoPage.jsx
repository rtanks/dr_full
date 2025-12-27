import { useNavigate } from "react-router-dom";
import { ButtonPayment } from "./payment/ButtonPayment";

export default function NoPage() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full bg-[#f0f2f5] px-5 flex justify-center py-5">
            <div className={`status-box success-page border-t-[5px] border-t-failed`}>
                <div class="icon-wrapper"><i class=""></i></div>
                <h1 class="main-title">صفحه یافت نشد (404)</h1>
                <p class="message">آدرس وارد شده اشتباه است یا صفحه موردنظر وجود ندارد.</p>
                <ButtonPayment type={"button"} bg={'bg-failed'} text={"بازگشت به سامانه تی دا"}
                color={"text-[#fff]"} additionalClass={"btn-failed text-center"}
                onClick={() => {location.href="https://tda24.ir"}}/>
                <button onClick={() => navigate('/')} class="btn btn-outline flex justify-center items-center">برگشت به صفحه قبل</button>
                <p class="footer-note">تی دا: سامانه آموزش و درمان کشور</p>
            </div>
        </div>
    )
}