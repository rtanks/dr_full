import React, { useState, useEffect } from 'react'
import Choice from "./Choice"
import CompleteTitle from "../CompleteTitle"

const ChoiceItem = ({ onChange, disabled }) => {
    const [active, setActive] = useState('')

    const data = [
        { id: 'emergency', title: 'اورژانسی  285.000 تومان', des1: 'مبلغ نمونه گیری و هزینه انجام آزمایشات شما', des2: '6 صبح تا 12 شب / انتظار 30 دقیقه تا 4 ساعت بعد از ثبت' },
        { id: 'Timekeeper', title: 'زماندار  285.000 تومان', des1: 'مبلغ نمونه گیری و هزینه انجام آزمایشات شما', des2: '6 صبح تا 12 شب / انتظار 30 دقیقه تا 4 ساعت بعد از ثبت' },
    ]

    const handleSelect = (id) => {
        if (!disabled) {
            setActive(id)
            onChange(id)
        }
    }

    useEffect(() => {
        if (disabled) {
            setActive('')  
            onChange(null)    
        }
    }, [disabled, onChange])

    return (
        <div>
            <CompleteTitle title={"انتخاب مورد"} />
            <Choice Data={data} onSelect={handleSelect} disabled={disabled} active={active} />
        </div>
    )
}

export default ChoiceItem
