import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/images/11.png'
import { getShowModal } from '../slices/modalSlice';
import { useEffect, useState } from 'react';
import { convertFormatDateToPersian } from '../services/func/transformDateJalali';
import { filterPatients } from '../slices/userSlice';


export default function NavBar() {
    const dispatch = useDispatch();
    const [showReset, setShowReset] = useState(false);
    const [valueInp, setValueInp] = useState('');
    const patients = useSelector(state => state.patients.patients)
    const patientsMain = useSelector(state => state.patients.patientsMain)
    const searchValueOnChange = (e) => {
      console.log(patients)
      const searchVal = e.target.value;
      setValueInp(searchVal);
      if(!(searchVal == '' || searchVal == null)) {
            console.log(searchVal)
            if(searchVal?.slice(0,2) == '09') {
                console.log("phone",patientsMain.filter(item => item.user.phoneNumber.includes(searchVal)))
                dispatch(filterPatients({patients: patientsMain.filter(item => item.user.phoneNumber.includes(searchVal))}))
            } else if(!isNaN(Number(searchVal))) {
                console.log("national",patientsMain.filter(item => item.user.nationalCode.includes(searchVal)))
                dispatch(filterPatients({patients: patientsMain.filter(item => item.user.nationalCode.includes(searchVal))}))
            } else {
                console.log("name",patientsMain.filter(item => item.user.fullName.includes(searchVal)))
                dispatch(filterPatients({patients: patientsMain.filter(item => item.user.fullName.includes(searchVal))}))
            }
        } else {
            dispatch(filterPatients({patients: patientsMain}));
        }
    }
    
    const changeThem = (e) => {
      // const themeSwitchWrap = document.getElementById('themeSwitchWrap');
      const THEME_KEY = 'tododr_theme_v1'; 
      const target = e.target.closest('.switch-option');
      if(target){
        const newTheme = target.dataset.themeVal;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
      }
    }
    return (
        <header>
          <div className="header-left">
            <div className="logo-wrapper" title="لوگو"><img src={logo} alt="logo" /></div>
            <div className="brand" style={{minWidth: 0}}>
              <h1>TODODR</h1>
              <div className="subtitle">سیستم نوبت‌دهی بیماران</div>
            </div>
            <div style={{width: "12px"}}></div>
            <div className="search-area">
              <div className="search-wrap" role="search" aria-label="جستجوی بیماران">
                <input id="searchInput" onChange={(e) => searchValueOnChange(e)} value={valueInp} onFocus={() => setShowReset(true)}  className="search-input" placeholder="جستجو با نام / تلفن / کد ملی" aria-label="جستجو" />
              </div>
              <div id="searchClearBox" onClick={() => {setValueInp("");dispatch(filterPatients({patients: patientsMain}))}} className={`search-clear-box ${showReset? 'block' : 'hidden'}`} title="پاک کردن جستجو">✕</div>
            </div>
          </div>
            
          <div className="header-center"><div className="header-date" id="headerDate">{convertFormatDateToPersian()}</div></div>
            
          <div className="header-right">
            <button id="manageDoctorsBtn" onClick={() =>{ dispatch(getShowModal({item: 'managementDoctors'})); console.log('hello')}} className="btn big font-bold" title="افزودن، حذف یا جابجایی پزشکان/ستون‌ها">مدیریت پزشکان</button>
            
            <button id="printBtn" className="btn primary big" title="چاپ جزئیات بیمار انتخاب‌شده">چاپ بیمار</button>
            
            <button onClick={() =>{ dispatch(getShowModal({item: 'registerInfo'})); console.log('hello')}} id="createBtn" className="btn primary big">ایجاد بیمار جدید</button>
            
            <div className="theme-switch-wrap" onClick={(e) => changeThem(e)} id="themeSwitchWrap">
                <div id="themeSlider" className="theme-slider"></div>
                <div className="switch-option" data-theme-val="light" id="lightOption">روشن</div>
                <div className="switch-option" data-theme-val="semi-dark" id="semiDarkOption">تاریک</div>
            </div>
          </div>
        </header>
    )
}