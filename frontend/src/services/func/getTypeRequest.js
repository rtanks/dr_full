export function getTypeRequest() {
    const services = [
        {key: 'mri', value: 'ثبت ام ار آی'},
        {key: 'graph', value: 'ثبت گرافی'},
        {key: 'ct-scan', value: 'ثبت سی تی اسکن'},
        {key: 'ultrasound', value: 'ثبت سونوگرافی'},
        {key: 'strip-test', value: 'ثبت تست نواری'},
        {key: 'physiotherapy', value: 'ثبت فیزیوتراپی'},
        {key: 'test', value: 'ثبت آزمایش'},
        {key: 'medicine', value: 'ثبت دارو'},
        {key: 'transport', value: 'ثبت حمل و نقل'},
    ];
    const pathName = window.location.pathname.slice(1);
    const targetKey = services.find(item => item.key == pathName);
console.log(targetKey)
    return targetKey.value; 
}