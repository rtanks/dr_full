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