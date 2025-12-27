export const showTimeFreq = (freq) => {
        switch(Number(freq)) {
            case 0.5: return "یک روز در میان"
            case 1: return "روزی یکبار"
            case 2: return "هر 12 ساعت"
            case 3: return "هر 8 ساعت"
            case 4: return "هر 6 ساعت"
            default: return ""
        }
    }