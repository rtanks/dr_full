import { useParams } from "react-router-dom";

const services = [
    {key: 'mri', value: 'ثبت ام ار آی', service: 'ام ار آی'},
    {key: 'graph', value: 'ثبت گرافی', service: 'گرافی'},
    {key: 'ct-scan', value: 'ثبت سی تی اسکن', service: 'سی تی اسکن'},
    {key: 'ultrasound', value: 'ثبت سونوگرافی', service: 'سونوگرافی'},
    {key: 'strip-test', value: 'ثبت تست نواری', service: 'تست نواری'},
    {key: 'physiotherapy', value: 'ثبت فیزیوتراپی', service: 'فیزیوتراپی'},
    {key: 'test', value: 'ثبت آزمایش', service: 'آزمایش'},
    {key: 'medicine', value: 'ثبت دارو', service: 'دارو'},
    {key: 'transport', value: 'ثبت حمل و نقل', service: 'حمل و نقل'},
    {key: 'message-box', value: 'صندوق پیام', service: 'صندوق پیام'},
    {key: 'request', value: 'درخواست', service: 'درخواست'},
    {key: 'about', value: 'درباره ما', service: 'درباره ما'},
    {key: 'visit-doctor', value: 'ویزیت دکتر', service: 'ویزیت دکتر'},
    {key: 'support', value: 'سوالات متداول / پشتیبانی', service: 'پشتیبانی'},
    {key: '', value: 'سوالات متداول / پشتیبانی', service: 'پشتیبانی'},//this for main page
];
export function getTypeRequest() {
    const pathName = window.location.pathname.slice(1);
    const targetKey = services.find(item => item.key == pathName);
    return targetKey?.value; 
}
export function getTypeRequestService() {
    const pathName = window.location.pathname.slice(1);
    const targetKey = services.find(item => item.key == pathName);
    return targetKey?.service; 
}
export function getKeyRequest() {
    const pathName = window.location.pathname.slice(1);
    const targetKey = services.find(item => item.key == pathName);
    return targetKey?.key; 
}
export function getKeyRequestWithService(service) {
    const targetKey = services.find(item => item.service == service);
    return targetKey?.key; 
}
export function getServiceRequest(service) {
    const targetKey = services.find(item => item.service == service);
    return targetKey?.value; 
}

export const getCategory = (service) => {
    switch(service) {
        case 'سونوگرافی': 
        case 'سی تی اسکن': 
        case 'تست نواری': 
        case 'گرافی': 
        case 'ام ار آی': 
        case 'فیزیوتراپی': 
        return 'paraClinic';

        case 'ویزیت دکتر': return 'doctorConsulting'

        case 'دارو': return 'medicine';
        case 'آزمایش': return 'test';
        case 'حمل و نقل': return 'transport';
        // case "": return 'equipment';
        // case "": return 'nurse';
        // case "": return 'triage';
        default: return undefined;
    }
}
export const getNavBarText = () => {
    const params = useParams();
    const pathName = params.id? window.location.pathname.replace('/' + params.id, '') :window.location.pathname.slice(1);
    console.log(pathName.replace('/' + params.id, ''))
    const targetKey = services.find(item => item.key == pathName);
    const service = targetKey.service;
    switch(service) {
        case 'سونوگرافی': 
        case 'سی تی اسکن': 
        case 'تست نواری': 
        case 'گرافی': 
        case 'ام ار آی': 
        case 'فیزیوتراپی': 
        case 'دارو': 
        case 'آزمایش':
        case 'حمل و نقل':
        case 'ویزیت دکتر':
            return {name:'در حال انجام', key: 'other'};

        case "پشتیبانی": return {name:'پشتیبانی', key: 'support'};
        case "درباره ما": return {name:'درباره ما', key: 'about'};
        case "صندوق پیام": return {name:'صندوق پیام', key: 'message-box'};
        case "درخواست": return {name:'درخواست', key: 'request'};
    }
}