import HeaderTabMenu from '../components/request/HeaderTabMenu'
import CallInformation from '../components/support/CallInformation'
import QuestionItem from '../components/support/QuestionItem'
import { getKeyRequest, getTypeRequest } from '../services/func/getTypeRequest'
import '../support.css'
export default function Support() {
    return (
        <div className="w-full h-full bg-transparent rounded-2xl flex flex-col gap-1">
          <HeaderTabMenu text={'7 روز هفته 24 ساعت شبانه روز'} titleRequest={getTypeRequest()} keyRequest={getKeyRequest()}/>

          <div className="w-full h-[87%] bg-white rounded-2xl p-5 flex flex-col gap-10 overflow-y-scroll">
            {/* <!-- FAQ --> */}
              <div>
                  <div className="accordion" role="list">
                    <QuestionItem title={'ثبت‌نام و ورود'}>
                        <p>چطور در سامانه ثبت‌نام کنم؟ برای ثبت‌نام کافیست شماره همراه خود را وارد کنید. یک کد تأیید برایتان ارسال می‌شود که با وارد کردن آن، حساب کاربری شما فعال خواهد شد. پس از ورود، می‌توانید اطلاعات تکمیلی مثل نام و بیمه را اضافه کنید. این روش ساده طراحی شده تا همه کاربران بدون پیچیدگی وارد سامانه شوند.</p>
                        <p className='mt-2'>اگر کد تأیید برایم نیامد چه کنم؟ گاهی به‌دلیل مشکلات شبکه یا تنظیمات گوشی، پیامک تأیید دیر می‌رسد. ابتدا چند دقیقه صبر کنید، سپس دوباره درخواست ارسال کد بدهید. اگر باز هم موفق نشدید، با پشتیبانی تماس بگیرید تا به‌صورت دستی حساب شما فعال شود.</p>
                    </QuestionItem>
                    
                    <QuestionItem title={'خدمات پزشکی'}>
                        <p>آیا خدمات فقط مخصوص MRI است؟ خیر. سامانه طیف وسیعی از خدمات تصویربرداری و درمانی را پوشش می‌دهد: MRI، CT اسکن، گرافی، سونوگرافی، نوار قلب، فیزیوتراپی، آزمایش و حتی دارو. هدف این است که کاربر همه نیازهای پزشکی خود را در یک محیط واحد مدیریت کند.</p>
                        <p className='mt-2'>چطور درخواست حمل و نقل بیمار ثبت کنم؟ در بخش خدمات گزینه «حمل و نقل بیمار» وجود دارد. کافیست فرم مربوطه را پر کنید و زمان و مکان مورد نظر را مشخص کنید. تیم پشتیبانی هماهنگی لازم را انجام می‌دهد و وسیله نقلیه مناسب در زمان مقرر در اختیار شما قرار می‌گیرد.</p>
                    </QuestionItem>
                    
                    <QuestionItem title={'هزینه و پرداخت'}>
                        <p>هزینه مشاوره چگونه محاسبه می‌شود؟ هزینه هر خدمت به‌صورت شفاف قبل از پرداخت نمایش داده می‌شود. معمولاً مبلغ ثابت با تخفیف مشخص (مثلاً ۱۰٪) اعمال می‌شود. این شفافیت باعث می‌شود کاربر قبل از پرداخت بداند دقیقاً چه مبلغی باید بپردازد و چه خدماتی دریافت خواهد کرد.</p>
                        <p className='mt-2'>اگر پرداخت ناموفق بود چه کنم؟ در صورت خطا یا قطع ارتباط، وضعیت سفارش ذخیره می‌شود. کافیست دوباره وارد حساب کاربری شوید و پرداخت را تکرار کنید. اگر مشکل ادامه داشت، تیم پشتیبانی آماده است تا وضعیت را بررسی کرده و راه‌حل ارائه دهد.</p>
                    </QuestionItem>

                    <QuestionItem title={'بیمه و پوشش هزینه‌ها'}>
                        <p>آیا می‌توان از بیمه استفاده کرد؟ بله. گزینه‌های بیمه شامل سلامت، تأمین اجتماعی، نیروهای مسلح و آزاد در فرم ثبت خدمت وجود دارد. انتخاب بیمه باعث می‌شود هزینه‌ها کاهش یابد و پرداخت راحت‌تر شود.</p>
                        <p className='mt-2'>اگر بیمه من در لیست نبود چه کنم؟ در این حالت می‌توانید گزینه «آزاد» را انتخاب کنید. همچنین می‌توانید با پشتیبانی تماس بگیرید تا بررسی کنند آیا امکان اضافه کردن بیمه شما وجود دارد یا خیر.</p>
                    </QuestionItem>

                    <QuestionItem title={'نتایج و پیگیری'}>
                        <p>چطور نتیجه آزمایش یا تصویر را دریافت می‌کنم؟ پس از ثبت و پرداخت، نتیجه توسط متخصص بررسی و در حساب کاربری شما قرار می‌گیرد. همچنین امکان ارسال پیام به پشتیبانی وجود دارد تا در صورت نیاز توضیحات بیشتری دریافت کنید.</p>
                        <p className='mt-2'>آیا امکان پیگیری سوابق وجود دارد؟ بله. تمام خدمات ثبت‌شده در داشبورد کاربری شما قابل مشاهده و پیگیری هستند. این بخش به شما کمک می‌کند تاریخچه خدمات پزشکی خود را همیشه در دسترس داشته باشید.</p>
                    </QuestionItem>

                    <QuestionItem title={'پشتیبانی و امنیت'}>
                        <p>پشتیبانی چه زمانی در دسترس است؟ تیم پشتیبانی به‌صورت ۷ روز هفته و ۲۴ ساعت شبانه‌روز فعال است. می‌توانید از طریق تماس تلفنی یا رسانه‌های اجتماعی ارتباط بگیرید. این ویژگی باعث می‌شود در هر زمان که مشکلی داشتید، پاسخ سریع دریافت کنید.</p>
                        <p className='mt-2'>آیا اطلاعات من محرمانه است؟ بله. داده‌های پزشکی و شخصی شما فقط برای ارائه خدمات درمانی استفاده می‌شوند و در اختیار شخص ثالث قرار نمی‌گیرند. سامانه از استانداردهای امنیتی برای حفاظت از اطلاعات استفاده می‌کند.</p>
                    </QuestionItem>
                    
                    <QuestionItem title={'سوالات تکمیلی'}>
                        <p>آیا می‌توانم چند خدمت را همزمان ثبت کنم؟ بله. شما می‌توانید چند خدمت مختلف را در یک جلسه ثبت کنید. سامانه به‌صورت خودکار آن‌ها را دسته‌بندی کرده و هزینه نهایی را محاسبه می‌کند.</p>
                        <p className='mt-2'>آیا امکان لغو یا تغییر زمان وجود دارد؟ بله. تا قبل از شروع خدمت، می‌توانید از داشبورد کاربری درخواست لغو یا تغییر زمان بدهید. در صورت لغو، هزینه به حساب شما بازگردانده می‌شود یا برای خدمت بعدی ذخیره خواهد شد.</p>
                        <p className='mt-2'>چطور با پزشک یا متخصص ارتباط مستقیم داشته باشم؟ پس از ثبت خدمت، امکان ارسال پیام یا درخواست تماس با پزشک وجود دارد. این ارتباط مستقیم باعث می‌شود سوالات شما سریع‌تر پاسخ داده شوند.</p>
                    </QuestionItem>

                    <QuestionItem title={'ساعات پشتیبانی چیست؟'}>
                        <p>هر روز از ۹:۰۰ تا ۱۸:۰۰. خارج از این ساعات، درخواست‌ها در صف بررسی قرار می‌گیرند.</p>
                    </QuestionItem>
                  </div>
                </div>
                
              {/* <!-- Contact --> */}
                <div className="w-full h-max flex flex-col gap-5 ">
                  <div className="w-full h-max flex flex-col gap-5">
                    <div className="p-1 py-5">
                      <div className="e-full">
                        {/* <p><strong>ایمیل:</strong> <a href='mailto:tda24@tda24.ir'>tda24@tda24.ir</a></p> */}
                        {/* <p><strong>شماره تماس:</strong> ۰۲۱-xxxxxxx</p> */}
                        {/* <p className="helper">برای پیگیری سریع، شناسه تیکت خود را اعلام کنید.</p> */}
                      </div>
                      <CallInformation/>
                    </div>
                    {/* <div className="w-full h-max" style={{gridColumn:"span 6"}}>
                      <div className="w-full h-max">
                        <form id="contactForm g" className="form p-5">
                          <div className="field">
                            <label htmlFor='c_name' className="label required">نام</label>
                            <input id="c_name" className="input" type="text" placeholder="نام شما" />
                            <span className="error" id="errCName">نام را وارد کنید</span>
                          </div>
                          <div className="field">
                            <label htmlFor="c_email" className="label required">ایمیل</label>
                            <input id="c_email" className="input" type="email" placeholder="you@example.com" />
                            <span className="error" id="errCEmail">ایمیل معتبر وارد کنید</span>
                          </div>
                          <div className="field">
                            <label htmlFor="c_msg" className="label required">پیام</label>
                            <textarea id="c_msg" className="textarea" placeholder="پیام شما..."></textarea>
                            <span className="error" id="errCMsg">پیام را وارد کنید</span>
                          </div>
                          <div className="actions">
                            <button type="submit" className="btn btn-primary flex justify-center">ارسال پیام</button>
                          </div>
                        </form>
                      </div>
                    </div> */}
                  </div>
                </div>              
            <footer className="container pb-[60px]" role="contentinfo">
              <hr style={{border: 'none', borderTop: '1px solid var(--gray-300)', margin:'24px 0'}} />
              <p className="helper">© TDA24 — بخش پشتیبانی. برای تجربه بهتر، مرورگر خود را به‌روز نگه دارید.</p>
            </footer>
          </div>
    </div>
    )
}