import { useEffect, useState } from 'react';
import {toJalaali} from 'jalaali-js'

export default function useGetDateCreated() {
    const [dateTime, setDateTime] = useState({date: '', time: ""})
    const twoDigitNumber = (num) => {
        return num < 10 ? `0${num}` : num;
    }
    useEffect(() => {
        const now = new Date();
        const nowFs = toJalaali(now.getFullYear(), now.getMonth(), now.getDate());
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

    return {dateTime, changeDate, changeDateGetDateTime}
}