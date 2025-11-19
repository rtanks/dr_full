import { useState } from "react";

export default function useSelectRequest() {
    const [step, setStep] = useState('');

    const selectStep = (value) => {
        setStep(value);
    }

    return {step, selectStep}
}