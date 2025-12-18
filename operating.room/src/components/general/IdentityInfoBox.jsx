import TextError from "../request/TextError"
import { InputWithLabel } from '../request/Inputs'

export default function StatusBox({errors, register, watch, getFieldStateValue}) {
    return (
        <>
            <div className='w-full h-max flex flex-col sm:flex-row gap-3 sm:gap-2'>
                <div className='w-full sm:w-1/2'>
                    <InputWithLabel  type={'text'} label={'نام و نام خانوادگی بیمار'} 
                        placeholder={"مثال : اشکان حسنوندی"} register={register('fullName')} 
                        hasError={errors.fullName} isValid={watch('fullName') ? getFieldStateValue('fullName'): false}/>
                    {errors.fullName && <TextError message={errors.fullName.message}/>}
                </div>
                <div className='w-full sm:w-1/2'>
                    <InputWithLabel label={'کد ملی '} placeholder={"مثال : 1234567890"}
                        register={register('nationalCode')} isValid={watch('nationalCode') ? getFieldStateValue('nationalCode') : false} 
                        hasError={errors.nationalCode}/>
                    {errors.nationalCode && <TextError message={errors.nationalCode.message}/>}
                </div>
            </div>
    
            <div className='w-full h-max flex flex-row gap-2 sm:gap-2'>
                <div className='w-1/2 h-max'>
                    <InputWithLabel type={'text'} label={'استان'} 
                        placeholder={"مثال : 1234567890"} register={register('province')} 
                        hasError={errors.province} isValid={watch('province') ? getFieldStateValue('province') : false}/>
                    {errors.province && <TextError message={errors.province.message}/>}
                </div>
                <div className='w-1/2 h-max'>
                    <InputWithLabel label={'شهر'} placeholder={"مثال : 1234567890"}
                        register={register('city')} isValid={watch('city') ? getFieldStateValue('city') : false} 
                        hasError={errors.city}/>
                    {errors.city && <TextError message={errors.city.message}/>}
                </div>
            </div>
        </>
    )
}