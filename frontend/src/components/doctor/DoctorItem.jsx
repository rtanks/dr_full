import { use, useEffect } from "react"
import profile from '../../assets/IMG_20230207_204057_763.jpg'

export default function DoctorItem({doctor}) {
    useEffect(() => {
        const statusToggle = document.getElementById('statusToggle');
    
    // مدیریت وضعیت آنلاین
    function setOnlineState(isOnline) {
      statusToggle.classList.toggle('status-online', isOnline);
      if(isOnline){
          statusToggle.style.background = 'var(--success)';
      } else {
          statusToggle.style.background = '#9ca3af';
      }
    }
    
    // وضعیت پیش‌فرض آنلاین
    setOnlineState(true);
    
    statusToggle.addEventListener('click', () => {
      const isOnline = statusToggle.classList.contains('status-online');
      setOnlineState(!isOnline);
    });
    
    // مدیریت انتخاب (Single Select) سرویس‌ها
    const chips = Array.from(document.querySelectorAll('.chip'));
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        
        // --- منطق تک انتخابی ---
        
        // 1. تمام گزینه‌ها را غیرفعال کن
        chips.forEach(c => c.setAttribute('aria-pressed', 'false')); 
        
        // 2. گزینه انتخابی را فعال کن
        chip.setAttribute('aria-pressed', 'true');
        
        // 3. اجرای اکشن (در محیط واقعی، این مرحله کاربر را به صفحه رزرو هدایت می‌کند)
        const serviceText = chip.innerText.trim();
        alert(`سرویس "${serviceText}" انتخاب شد. اکنون به مرحله رزرو منتقل می‌شوید.`);
      });
    });

    }, []);
    return (
        <section className="w-full h-max rounded-xl flex flex-col shadow-[0_5px_10px_rgba(15,23,42,0.12)]">
          <header className="w-full h-max flex flex-col sm:flex-row gap-2 justify-between items-center p-5 ">
            
            <div className="w-max h-max flex flex-col sm:flex-row gap-5 items-center">
                <div className="avatar-wrap" id="avatarWrap">
                    <img className="w-20 h-20 rounded-full" src={profile} alt={doctor.fullName} />
                    <button className="status-toggle" id="statusToggle" aria-label="تغییر وضعیت"></button>
                </div>
                <div className="w-full sm:w-max h-max flex flex-col items-center sm:items-start sm:gap-2">
                    <h2 className="text-lg font-bold">دکتر {doctor.fullName}</h2>
                    <p className="w-max h-mx whitespace-break-spaces text-md font-bold text-[#334155]">{doctor.specialty}</p>
                </div>
            </div>
            
            <div className="w-max h-max flex flex-row items-center gap-2">
              <div className="w-max flex flex-row gap-2 items-center h-mwx rounded-lg px-8 text-center py-2 border border-main text-main bg-select-container" data-type="rating">
                <div>
                  <div className="font-bold text-sm">۴.۸</div>
                  <div className="font-semibold text-sm">امتیاز</div>
                </div>
              </div>
              <div className="w-max flex flex-row gap-2 items-center h-mwx rounded-lg px-8 text-center py-2 border border-[#dc8d18] text-[#b95e3c] bg-[#fff3e0]" data-type="count">
                <div>
                  <div className="font-bold text-sm">+۱٬۰۰۰</div>
                  <div className="font-semibold text-sm">مشاوره</div>
                </div>
              </div>
            </div>
          </header>
        
          <div className="w-full h-max flex flex-col gap-4 p-5 border-t border-t-[rgba(2, 132, 199, 0.14)]">
            <h3 className="text-md font-bold text-main">برای شروع مشاوره انتخاب کنید</h3>
            <div className="w-full h-max flex flex-row flex-wrap gap-1 sm:gap-2" onScroll={e => e.stopPropagation()}>
              <button className="chip" type="button" data-service="urgent" aria-pressed="false">
                <svg className="chip-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                اورژانسی
              </button>
              
              <button className="chip" type="button" data-service="scheduled" aria-pressed="false">
                <svg className="chip-icon" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                زمان‌دار
              </button>
              
              <button className="chip" type="button" data-service="text" aria-pressed="false">
                <svg className="chip-icon" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                 متنی
              </button>
              
              <button className="chip" type="button" data-service="video" aria-pressed="false">
                <svg className="chip-icon" viewBox="0 0 24 24">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                تصویری
              </button>
              
              <button className="chip" type="button" data-service="inperson" aria-pressed="false">
                <svg className="chip-icon" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                حضوری
              </button>
            </div>
            
          </div>
        </section>
    )
}