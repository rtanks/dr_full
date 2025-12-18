export function gregorianToJalali(gy, gm, gd){
  const g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];
  let jy, jm, jd;
  let gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm-1];
  jy = -1595 + (33 * Math.floor(days / 12053));
  days = days % 12053;
  jy += 4 * Math.floor(days / 1461);
  days = days % 1461;
  if(days > 365){
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if(days < 186){
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy, jm, jd];
}
const persianMonths = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const persianWeekdays = ['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'];

export function convertFormatDateToPersian(){
  const now = new Date();
  const [jy,jm,jd] = gregorianToJalali(now.getFullYear(), now.getMonth()+1, now.getDate());
  const wd = persianWeekdays[now.getDay()];
  return `امروز ${wd} ${jd} ${persianMonths[jm-1]} ${jy}`;
}

export function convertAndGetDateFormatToPersian(day){
  const today = new Date();
  const target = new Date(new Date().setDate(today.getDate() + day));
  console.log(today);
  console.log(target)
  const [jy,jm,jd] = gregorianToJalali(target.getFullYear(), target.getMonth() + 1, target.getDate());
  const wd = persianWeekdays[target.getDay()];
  console.log(`${wd} ${jd} ${persianMonths[jm-1]} ${jy}`)
  return `${wd} ${jd} ${persianMonths[jm-1]} ${jy}`;
}