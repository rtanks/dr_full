import { useNavigate } from "react-router-dom"
import CompleteTitle from '../CompleteTitle'
import YesNo from './YesOrNo'
import { useState, useRef, useEffect } from "react"
import MessageComp from './messageCompletetheapplication'
import ChoiceItem from "./ChoiseItem"
import RequestButton from "./RequestButton"
import GoBack from "./GoBack"
import registerRequestService from "../../services/api/registerRequestService"

export default function CompleteOrderStepTwo({selectStep}) {
    const navigate = useNavigate()
    const [yesNoSelected, setYesNoSelected] = useState('yes')
    const [choiceSelected, setChoiceSelected] = useState(null)
    const choiceRef = useRef(null)

    const handleYesNoChange = (val) => {
        setYesNoSelected(val)

        if (val === "no") {
            setChoiceSelected(null)
        }
    }

    useEffect(() => {
        if (yesNoSelected === "yes" && choiceRef.current) {
            choiceRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [yesNoSelected, choiceSelected])

    const {registerRequestMutation} = registerRequestService()
    const clickHandle = () => {
        const data = JSON.parse(localStorage.getItem('order'));
        const {myself, ...other} = data.step1;
        const dataFull = {title: data.title, service: data.service, ...other, ...data.step2};
        console.log(dataFull)
        registerRequestMutation.mutate(dataFull);
        if(!registerRequestMutation.isError) {
            selectStep('step3')
        } else {
            console.log('have error');
        }
    }
    return (
        <div className='w-full mx-auto relative flex flex-col gap-4'>
            <GoBack step={'step1'} selectStep={selectStep}/>
            <CompleteTitle title={'آیا نیاز به نمونه گیری و جواب دهی دارید ؟'} />
            <YesNo active={yesNoSelected} onChange={handleYesNoChange} />
            <MessageComp/>
            <div ref={choiceRef}>
                <ChoiceItem onChange={setChoiceSelected} disabled={yesNoSelected === "no"} />
            </div>
            <RequestButton type={'button'} onClick={clickHandle} isSubmitting={registerRequestMutation.isPending} textSubmitting={'در حال ارسال اطلاعات...'} text={'تکمیل سفارش'} disable={yesNoSelected === "no"? false : (choiceSelected == null? true : false)}/>
        </div>
    )    
}