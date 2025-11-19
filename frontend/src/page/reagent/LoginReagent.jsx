import z from "zod";
import Button from "../../components/general/Button";
import LoginTitle from "../../components/login/LoginTitle";
import { Input } from "../../components/request/Inputs";
import { useForm } from "react-hook-form";
import TextError from "../../components/request/TextError";
import { zodResolver } from "@hookform/resolvers/zod";
import loginService from "../../services/api/reagent/loginService";

const schema = z.object({
    nationalCode: z.string().nonempty('این فیلد الزامی است').length(10, 'کد ملی وارد شده معتبر نیست'),
})
export default function LoginReagent() {
    const {register,handleSubmit, watch, getFieldState, control, formState:{errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            nationalCode: '',
        }
    })
    const getFieldStateValue = () => {
        const {invalid} = getFieldState('nationalCode', control);
        return !invalid;
    }
    const {loginReagentMutation} = loginService();
    const onSubmit = (data) => {
        console.log(data);
        loginReagentMutation.mutate(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-[402px] px-5 h-full flex flex-col gap-5 mx-auto items-center justify-start pt-24">
            <LoginTitle/>
            <div className="w-full h-max flex flex-col gap-1">
                <Input register={register('nationalCode')} isValid={watch('nationalCode')? getFieldStateValue(): false} hasError={errors.nationalCode} type={'text'} placeholder={'کدملی'}/>
                {errors.nationalCode && <TextError message={errors?.nationalCode?.message}/>}
            </div>
            <Button text={'ورود'} isSubmitting={loginReagentMutation.isPending} disable={!isValid} textSubmitting={"در حال ارسال اطلاعات"}/>
        </form>
    )
}