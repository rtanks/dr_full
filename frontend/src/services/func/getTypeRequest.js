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
];
export function getTypeRequest() {
    const pathName = window.location.pathname.slice(1);
    const targetKey = services.find(item => item.key == pathName);
    return targetKey.value; 
}
export function getTypeRequestService() {
    const pathName = window.location.pathname.slice(1);
    const targetKey = services.find(item => item.key == pathName);
    return targetKey.service; 
}
export function getKeyRequest() {
    const pathName = window.location.pathname.slice(1);
    const targetKey = services.find(item => item.key == pathName);
    return targetKey.key; 
}