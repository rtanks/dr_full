import { useEffect, useState } from "react"
import {toJalaali} from "jalaali-js"

export let first = {};
export const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
export default function useCalender() {
    const daysOfWeek = ["یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه", "جمعه", "شنبه"]
    const [firstDate, setFirstDate] = useState({}); 
    useEffect(() => {
        const dateNow = new Date();
        const newDate = toJalaali(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
        setFirstDate({year: newDate.jy, month: newDate.jm, day: newDate.jd, weekDay: dateNow.getDay()});
        first = {year: newDate.jy, month: newDate.jm + 1, day: newDate.jd, weekDay: daysOfWeek[dateNow.getDay()]}
        localStorage.setItem("firstDate", JSON.stringify({year: newDate.jy, month: newDate.jm + 1, day: newDate.jd, weekDay: daysOfWeek[dateNow.getDay()]}))
    }, [])
    const generateDate = () => {
        const dates = [{
            year: firstDate.year,
            month: firstDate.month + 1,
            day: firstDate.day, 
            weekDay: daysOfWeek[firstDate.weekDay]
        }];
        const kabiseh = [1, 5, 9, 13, 17, 22, 26, 30];
        let weekDayCounter = firstDate.weekDay;
        let yearCounter = firstDate.year;
        let monthCounter = firstDate.month + 1;
        let dayCounter = firstDate.day;
        
        for(let i = 1; i <= 6; i++) {
            weekDayCounter = (weekDayCounter + 1) > 6 ? 0: weekDayCounter + 1;
            
            if(monthCounter < 7) {
                if((dayCounter + 1) > 31) {
                    monthCounter += 1;
                    dayCounter = 1;
                    dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                } else {
                    dayCounter += 1;
                    dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                }
            } else {
                if(monthCounter == 12) {
                    if(kabiseh.includes(yearCounter / 33)) {
                        if((dayCounter + 1) > 30) {
                            yearCounter += 1;
                            monthCounter = 1;
                            dayCounter = 1;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                        } else {
                            dayCounter += 1;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                        }
                    } else {
                        if((dayCounter + 1) > 29) {
                            yearCounter += 1;
                            monthCounter = 1;
                            dayCounter = 1;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                        } else {
                            dayCounter += 1;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                        }
                    }
                } else {
                    if((dayCounter + 1) > 30) {
                        monthCounter += 1;
                        dayCounter = 1;
                        dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                    } else {
                        dayCounter += 1;
                        dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                    }
                }
            }
        }
        return dates;
    }
    
    const generateSimilarWeekDay = (year, month, day, weekDay) => {
        const dates = [{
            year: year,
            month: month,
            day: day, 
            weekDay: weekDay
        }];
        const kabiseh = [1, 5, 9, 13, 17, 22, 26, 30];
        let yearCounter = year;
        let monthCounter = month;
        let dayCounter = day;

        for(let i = 1; i <= 3; i++) {
            if(monthCounter < 7) {
                if((dayCounter + 7) > 31) {
                    monthCounter += 1;
                    dayCounter = 7;
                    dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: weekDay})
                } else {
                    dayCounter += 7;
                    dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: weekDay})
                }
            } else {
                if(monthCounter == 12) {
                    if(kabiseh.includes(yearCounter / 33)) {
                        if((dayCounter + 7) > 30) {
                            yearCounter += 1;
                            monthCounter = 1;
                            dayCounter = 7;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: weekDay})
                        } else {
                            dayCounter += 7;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: weekDay})
                        }
                    } else {
                        if((dayCounter + 7) > 29) {
                            yearCounter += 1;
                            monthCounter = 1;
                            dayCounter = 7;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: weekDay})
                        } else {
                            dayCounter += 7;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: weekDay})
                        }
                    }
                } else {
                    if((dayCounter + 7) > 30) {
                        monthCounter += 1;
                        dayCounter = 7;
                        dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: weekDay})
                    } else {
                        dayCounter += 7;
                        dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: weekDay})
                    }
                }
            }
        }
        return dates;
    }

    const generateDateAfterToday = (year, month, day, weekDay) => {
        const dates = [];
        const kabiseh = [1, 5, 9, 13, 17, 22, 26, 30];
        let weekDayCounter = daysOfWeek.findIndex(item => item == weekDay);
        let yearCounter = year;
        let monthCounter = month;
        let dayCounter = day;
        
        for(let i = 1; i <= 6; i++) {
            weekDayCounter = (weekDayCounter + 1) > 6 ? 0: weekDayCounter + 1;
            
            if(monthCounter < 7) {
                if((dayCounter + 1) > 31) {
                    monthCounter += 1;
                    dayCounter = 1;
                    dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                } else {
                    dayCounter += 1;
                    dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                }
            } else {
                if(monthCounter == 12) {
                    if(kabiseh.includes(yearCounter / 33)) {
                        if((dayCounter + 1) > 30) {
                            yearCounter += 1;
                            monthCounter = 1;
                            dayCounter = 1;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                        } else {
                            dayCounter += 1;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                        }
                    } else {
                        if((dayCounter + 1) > 29) {
                            yearCounter += 1;
                            monthCounter = 1;
                            dayCounter = 1;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                        } else {
                            dayCounter += 1;
                            dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                        }
                    }
                } else {
                    if((dayCounter + 1) > 30) {
                        monthCounter += 1;
                        dayCounter = 1;
                        dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                    } else {
                        dayCounter += 1;
                        dates.push({year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]})
                    }
                }
            }
        }
        return dates;
    }
    const generateDateAfterDay = (year, month, day, weekDay) => {
        let dates = {};
        const kabiseh = [1, 5, 9, 13, 17, 22, 26, 30];
        let weekDayCounter = daysOfWeek.findIndex(item => item == weekDay);
        let yearCounter = year;
        let monthCounter = month;
        let dayCounter = day;
        weekDayCounter = (weekDayCounter + 1) > 6 ? 0: weekDayCounter + 1;
        if(monthCounter < 7) {
            if((dayCounter + 1) > 31) {
                monthCounter += 1;
                dayCounter = 1;
                dates = {year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]}
            } else {
                dayCounter += 1;
                dates = {year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]}
            }
        } else {
            if(monthCounter == 12) {
                if(kabiseh.includes(yearCounter / 33)) {
                    if((dayCounter + 1) > 30) {
                        yearCounter += 1;
                        monthCounter = 1;
                        dayCounter = 1;
                        dates = {year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]}
                    } else {
                        dayCounter += 1;
                        dates = {year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]}
                    }
                } else {
                    if((dayCounter + 1) > 29) {
                        yearCounter += 1;
                        monthCounter = 1;
                        dayCounter = 1;
                        dates = {year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]}
                    } else {
                        dayCounter += 1;
                        dates = {year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]}
                    }
                }
            } else {
                if((dayCounter + 1) > 30) {
                    monthCounter += 1;
                    dayCounter = 1;
                    dates = {year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]}
                } else {
                    dayCounter += 1;
                    dates = {year: yearCounter, month: monthCounter, day: dayCounter, weekDay: daysOfWeek[weekDayCounter]}
                }
            }
        }
        return dates;
    }
    const getDates = () => {
        return generateDate();
    }
    return {getDates, generateSimilarWeekDay, generateDateAfterToday, generateDateAfterDay}
}