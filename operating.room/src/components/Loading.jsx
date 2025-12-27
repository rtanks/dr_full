import { useEffect } from "react"
import logo from '../assets/images/loading.png';

export default function Loading() {
    // useEffect(() => {
    //     function hideLoading() {
    //         document.getElementById('loading-overlay').style.display = 'none';
    //     }
    //     setTimeout(() => {
    //         hideLoading(); 
    //     }, 5000);
    // },[])
    return (
        <>
            <div id="loading-overlay">
                <img src={logo} alt="در حال بارگذاری" className="loading-image"/>
                <p>در حال بارگذاری اطلاعات، لطفاً صبر کنید...</p>
            </div>

        </>
    )
}