import {AboutIcon} from '../layout/Icons';
import CheckAuth from '../services/hook/CheckAuth'
import sign from '../assets/images/Untitled-2.png'

export default function About() {
    const {checkAuthUser} = CheckAuth();
    return(
        <div className={`w-full h-full bg-white ${checkAuthUser() ? "px-5 border-none" :"px-2"} overflow-y-scroll flex flex-col gap-4  py-3`}>
            <div className="w-full h-max flex flex-col items-center justify-center text-center my-2">
                <AboutIcon size={80}/>
                <div className='w-max h-max'>
                    <h1 className="text-md font-bold mt-4">تی دا : سامانه آموزش و درمان کشور</h1>
                    <div className="text-sm text-676767">همه ی سلامتی اینجاست</div>
                </div>
            </div>
            <div className="w-full h-max">
                <div className="text-md font-bold mb-1 text-main">مقدمه: سلامی به گرمی سلامتی</div>
                <p className=" w-full h-max text-justify text-sm px-1 ">کاربر گرامی، به خانواده بزرگ تی دا خوش آمدید. در دنیای پرشتاب امروز،
                 ما معتقدیم که «سلامتی» نباید دغدغه‌ای پیچیده و زمان‌ بر باشد. تی دا متولد شد تا فاصله‌ی
                 میان شما و خدمات پزشکی را به کوتاهی یک کلیک برساند. اینجا تنها یک سامانه نوبت‌ دهی نیست؛
                 اینجا خانه‌ای امن برای مدیریت هوشمند سلامت شما و عزیزانتان است. ما با تلفیق دانش پزشکی
                 و تکنولوژی روز، فضایی را خلق کرده‌ایم که در آن، اولویت اول و آخر، آسودگی خیال شماست.</p>
            </div>
            <div className="w-full h-max">
                <div className="text-md font-bold mb-1 text-main">داستان ما: از دغدغه تا راهکار</div>
                <p className="text-sm text-justify px-1">داستان تی دا از یک نگاه ساده اما عمیق آغاز شد: «چگونه
                 می‌توانیم رنج بیماری را با حذف رنج‌های حاشیه‌ای کم کنیم؟» ما دیدیم که گرفتن نوبت ام‌ار‌آی، پیدا کردن یک
                 متخصص حاذق، یا حتی تفسیر یک آزمایش ساده، گاهی چقدر می‌تواند استرس‌زا و وقت‌گیر باشد. تیمی متشکل
                 از نخبگان حوزه فناوری اطلاعات و پزشکان برجسته گرد هم آمدند تا پاسخی شایسته به این نیاز بدهند.
                 ما باور داریم که دسترسی به خدمات درمانی باکیفیت، حق تمامی افراد است، فارغ از اینکه
                 در کجای این سرزمین پهناور زندگی می‌کنند. تی دا، پلی است میان شما و برترین مراکز درمانی کشور.</p>
            </div>
            <div className="w-full h-max">
                <div className="text-md font-bold mb-1 text-main">مأموریت ما: سلامت، بدون مرز</div>
                <p className="text-sm text-justify px-1">هدف ما شفاف و روشن است: «خلق تجربه‌ای بدون اصطکاک در مسیر درمان».
                 در تی دا، ما تلاش می‌کنیم تا پیچیدگی‌های اداری و کاغذبازی‌های
                 مرسوم پزشکی را حذف کنیم. مأموریت ما فراهم کردن بستری است که در آن:</p>
                <ul className="w-full pr-[7.5%] pl-2 mt-1 list-disc text-[13.5px] text-justify">
                    <li>زمان شما در صف‌های انتظار تلف نشود.</li>
                    <li>انتخاب شما بر اساس آگاهی و شفافیت کامل باشد.</li>
                    <li>دسترسی شما به خدمات پاراکلینیکی (مثل رادیولوژی،
                     سونوگرافی و فیزیوتراپی) به ساده‌ترین شکل ممکن، حتی به صورت بصری
                      و روی مدل بدن انسان، امکان‌پذیر باشد.</li>
                </ul>
            </div>
            <div className="w-full h-max">
                <div className="text-md font-bold mb-1 text-main">ارزش‌های بنیادین ما</div>
                <p className="text-sm px-1">ما بر روی ستون‌هایی استوار هستیم که اعتماد شما را نگه می‌دارند:</p>
                <ul className="w-full text-justify pr-[7.5%] pl-2 flex flex-col gap-1.5 mt-1 list-disc text-[13.5px] text-justify">
                    <li>امانت‌داری و محرمانگی: اطلاعات پزشکی شما، 
                    خصوصی‌ترین دارایی شماست. ما با استفاده از پیشرفته‌ترین پروتکل‌های امنیتی،
                     متعهد به حفظ حریم خصوصی شما همچون یک رازدار امین هستیم.</li>
                    <li>دقت و کیفیت: ما در انتخاب پزشکان و مراکز طرف قرارداد،
                     وسواس به خرج می‌دهیم تا مطمئن شویم شما خدماتی شایسته دریافت می‌کنید.</li>
                    <li>احترام و همدلی: در هر مرحله از فرآیند، از ثبت نوبت تا پیگیری درمان، تیم
                     پشتیبانی ما با صبر و احترام در کنار شماست. ما شنونده‌ی دغدغه‌های شما هستیم.</li>
                </ul>
            </div>
            <div className="w-full h-max">
                <div className="text-md font-bold text-justify mb-1 text-main">چشم‌انداز آینده</div>
                <p className="text-sm px-1">ما به فرداهای روشن‌تری می‌نگریم. تی دا در مسیر رشد خود،
                 قصد دارد با بهره‌گیری از هوش مصنوعی و تحلیل داده‌ها،
                 گامی فراتر از درمان برداشته و به سمت «پیشگیری» حرکت کند.
                 آرزوی ما روزی است که هر ایرانی، یک پرونده سلامت هوشمند
                 و یک مشاور پزشکی همیشه در دسترس در جیب خود داشته
                 باشد تا بیماری‌ها را پیش از وقوع، شناسایی و مدیریت کند.</p>
            </div>

            <div className="w-max font-bold px-1 mr-2 text-md mt-5 pb-1 ">همه ی سلامتی اینجاست</div>
            <div className='w-full mb-5 flex flex-row-reverse'>
                <img src={sign} className='w-40'/>
            </div>
        </div>
    )
}