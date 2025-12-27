import { useEffect, useState } from 'react';
import {toJalaali, toGregorian} from 'jalaali-js';
import { transformFormat } from '../func/transformFunc';

export default function useGetDateCreated() {
    const persianMonths = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    const [dateTime, setDateTime] = useState({date: '', time: ""});
    const [getNow, setGetNow] = useState({})
    const twoDigitNumber = (num) => {
        return num < 10 ? `0${num}` : num;
    }
    useEffect(() => {
        const now = new Date();
        const nowFs = toJalaali(now.getFullYear(), now.getMonth(), now.getDate());
        setGetNow({y: now.getFullYear(), m: now.getMonth(), d: now.getDate(), w: now.getDay()});
        setDateTime({date: `${twoDigitNumber(nowFs.jy)}/${twoDigitNumber(nowFs.jm + 1)}/${twoDigitNumber(nowFs.jd)}`, time: `${twoDigitNumber(now.getHours())}:${twoDigitNumber(now.getMinutes())}`})
        // console.log(nowFs);
    }, []) 
    const changeDateGetDateTime = (dateInp) => {
        const nowFs = toJalaali(dateInp.getFullYear(), dateInp.getMonth(), dateInp.getDate());
        const date = `${twoDigitNumber(nowFs.jy)}/${twoDigitNumber(nowFs.jm + 1)}/${twoDigitNumber(nowFs.jd)}`;
        const time = `${twoDigitNumber(dateInp.getHours())}:${twoDigitNumber(dateInp.getMinutes())}`;
        return {date, time}
    }
    const changeDate = (dateInp) => {
        const nowFs = toJalaali(dateInp.getFullYear(), dateInp.getMonth(), dateInp.getDate());
        const date = `${twoDigitNumber(nowFs.jy)}/${twoDigitNumber(nowFs.jm + 1)}/${twoDigitNumber(nowFs.jd)}`;
        return date;
    }

    const convertJalaliToGregorian = (date) => {
        const arrayDate = date.split(' ');
        const result = toGregorian(Number(arrayDate[3]), persianMonths.findIndex(m => m == arrayDate[2]) + 1, Number(arrayDate[1]))
        console.log(`${result.gd}-${result.gm}-${result.gy}`)
        return `${result.gd}-${result.gm}-${result.gy}`
    }

    const getDateNow = () => {
        console.log(getNow);
        const jDate = toJalaali(getNow.y, getNow.m, getNow.d);
        
        return `${transformFormat(jDate.jd)} ${persianMonths[jDate.jm]} ${transformFormat(jDate.jy)}`
    }
    return {dateTime, changeDate, changeDateGetDateTime, convertJalaliToGregorian, getDateNow}
}