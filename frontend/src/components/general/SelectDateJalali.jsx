import { useEffect } from 'react'
import '../../dateSelector.css'
export default function SelectDateJalali({getDate}) {
    useEffect(() => {
        // --- تنظیمات اصلی ---
        const ITEM_HEIGHT = 50; 
        const CURRENT_YEAR = 1403;
        const MIN_YEAR = 1300;
        // FIX: تغییر تاریخ پیش‌فرض به ۱۸/۰۵/۱۳۷۰
        const DEFAULT_DATE = { year: 1370, month: 5, day: 18 }; 
        // وضعیت فعلی
        let state = { year: null, month: null, day: null };
        // تبدیل اعداد انگلیسی به فارسی
        const toPersianNum = (num) => String(num).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
        // تعداد روزهای ماه شمسی
        function getDaysInMonth(y, m) {
            if (m <= 6) return 31;
            if (m <= 11) return 30;
            const isLeap = ((((y + 38) * 31) % 128) <= 30);
            return isLeap ? 30 : 29;
        }
        const wheels = {
            year: document.getElementById('yearWheel'),
            month: document.getElementById('monthWheel'),
            day: document.getElementById('dayWheel')
        };
        // const confirmBtn = document.getElementById('confirmBtn');
        // --- توابع ساخت آیتم ---
        function createItem(val, text) {
            const div = document.createElement('div');
            div.className = 'item';
            div.textContent = text;
            div.dataset.val = val;
            return div;
        }
        function initPicker() {
            // مقداردهی اولیه استیت
            Object.assign(state, DEFAULT_DATE);
        
            // پر کردن سال (نزولی)
            for (let y = CURRENT_YEAR; y >= MIN_YEAR; y--) {
                wheels.year.appendChild(createItem(y, toPersianNum(y)));
            }
            // پر کردن ماه
            for (let m = 1; m <= 12; m++) {
                wheels.month.appendChild(createItem(m, toPersianNum(String(m).padStart(2, '0'))));
            }
            // پر کردن روز (اولیه)
            updateDays(state.year, state.month);
            // اسکرول به موقعیت پیش‌فرض
            setTimeout(() => {
                scrollToValue(wheels.year, state.year, true);
                scrollToValue(wheels.month, state.month, true);
                scrollToValue(wheels.day, state.day, true);
                updateButton();
            }, 10);
        }
        function updateDays(year, month) {
            const currentDay = state.day || DEFAULT_DATE.day;
            wheels.day.innerHTML = '';
            const maxDays = getDaysInMonth(year, month);
            
            for (let d = 1; d <= maxDays; d++) {
                wheels.day.appendChild(createItem(d, toPersianNum(String(d).padStart(2, '0'))));
            }
            
            if (currentDay > maxDays) {
                state.day = maxDays;
            }
        }
        // --- منطق اسکرول و انتخاب ---
        function scrollToValue(wheel, value, instant = false) {
            const items = Array.from(wheel.children);
            const index = items.findIndex(i => parseInt(i.dataset.val) === value);
            if (index !== -1) {
                wheel.scrollTo({
                    top: index * ITEM_HEIGHT,
                    behavior: instant ? 'instant' : 'smooth'
                });
                updateHighlight(wheel, index);
                updateStateFromWheel(wheel, index);
            }
        }
        
        function updateHighlight(wheel, activeIndex) {
            Array.from(wheel.children).forEach((item, idx) => {
                if (idx === activeIndex) item.classList.add('selected');
                else item.classList.remove('selected');
            });
        }
        
        function updateStateFromWheel(wheel, index) {
            const item = wheel.children[index];
            if (!item) return;
            const val = parseInt(item.dataset.val);
            const id = wheel.id;
            let needsDayUpdate = false;
            // آپدیت استیت
            if (id === 'yearWheel' && state.year !== val) {
                state.year = val;
                needsDayUpdate = true;
            } else if (id === 'monthWheel' && state.month !== val) {
                state.month = val;
                needsDayUpdate = true;
            } else if (id === 'dayWheel') {
                state.day = val;
            }
            // منطق وابسته
            if (needsDayUpdate) {
                updateDays(state.year, state.month);
                // بازگرداندن اسکرول روز به موقعیت صحیح
                const targetDay = state.day;
                const items = Array.from(wheels.day.children);
                const dayIndex = items.findIndex(i => parseInt(i.dataset.val) === targetDay);
                
                if (dayIndex !== -1) {
                     wheels.day.scrollTo({ top: dayIndex * ITEM_HEIGHT, behavior: 'instant' });
                     updateHighlight(wheels.day, dayIndex);
                }
            }
        
            updateButton();
        }
        
        // --- لیسنرهای اسکرول ---
        Object.values(wheels).forEach(wheel => {
            let timeout;
            wheel.addEventListener('scroll', () => {
                const index = Math.round(wheel.scrollTop / ITEM_HEIGHT);
                updateHighlight(wheel, index);
            
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    const snappedIndex = Math.round(wheel.scrollTop / ITEM_HEIGHT);
                    updateStateFromScroll(wheel);
                    
                    // اصلاح اسنپ نرم
                    if (Math.abs(wheel.scrollTop - (snappedIndex * ITEM_HEIGHT)) > 2) {
                        wheel.scrollTo({ top: snappedIndex * ITEM_HEIGHT, behavior: 'smooth' });
                    }
                }, 150);
            });
            
            function updateStateFromScroll(wheel) {
                const index = Math.round(wheel.scrollTop / ITEM_HEIGHT);
                updateStateFromWheel(wheel, index);
            }
        });
        
        
        // --- مدیریت دکمه ---
        function updateButton() {
            if (state.year && state.month && state.day) {
                const dateStr = `${toPersianNum(state.year)}/${toPersianNum(String(state.month).padStart(2,'0'))}/${toPersianNum(String(state.day).padStart(2,'0'))}`;
                // confirmBtn.innerHTML = `تأیید تاریخ <span dir="ltr">${dateStr}</span>`;
                getDate(dateStr)
            }
        }
        
        // شروع برنامه
        document.addEventListener('DOMContentLoaded', initPicker);
    }, [])
    return (
            <div className="picker-area border border-black text-black">
                <div className="highlight-bar"></div>
                
                <div className="fade-overlay-top"></div>
                <div className="fade-overlay-bottom"></div>
            
                <div className="col">
                    <div className="wheel" id="yearWheel"></div>
                </div>
            
                <div className="col">
                    <div className="wheel" id="monthWheel"></div>
                </div>
            
                <div className="col">
                    <div className="wheel" id="dayWheel"></div>
                </div>
            </div>
    )
}