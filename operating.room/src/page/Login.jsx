import LogoApp from "../components/logoApp";
import LoginAppTitle from "../components/LoginAppTitle";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import loginService from "../services/api/loginService";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nationalCode: z.string().nonempty("وارد کردن این فیلد الزامی است").length(10, "شماره تلفن وارد شده معتبر نیست"),
  password: z.string().nonempty("وارد کردن این فیلد الزامی است")
})

export default function Login() {
  const {loginDoctorMutation} = loginService()
  const navigate = useNavigate();
  
  const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues:{
      nationalCode: "",
      password: ""
    }
  })
  const disabledClass = classNames({
    "bg-[#006ECF] text-white": isValid,
    "bg-gray-200 text-gray-500": !isValid,
  });
  
  const onSubmit = (data) => {
    console.log(data)
    loginDoctorMutation.mutate(data)
  }
  
  return (
    <div className="w-[90%] sm:w-[380px] mt-10 mx-auto flex flex-col items-center">
      <LogoApp />
      <LoginAppTitle />
      <div className="w-full mt-12 text-right font-semibold text-lg text-[16px]">ورود </div>

      <form onSubmit={handleSubmit(onSubmit)}  className="w-full h-max">
        <Input register={register("nationalCode")} type={"text"} placeholder={"کدملی"} mode={"numeric"}/>
        {errors.nationalCode && <p className="text-red-500 text-sm">{errors.nationalCode.message}</p>}

        <Input register={register("password")} type={"password"} placeholder={"رمز عبور"}/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <SubmitButton title={"ورود"} title2={"در حال ارسال اطلاعات..."} isSubmitting={loginDoctorMutation.isPending} 
        additionalStyle={`${disabledClass} mt-6`}/>
      </form>

      {/* <div className="w-full h-max mb-14 flex flex-col gap-2 text-[16px] mt-[32px] text-gray-500">
        <div className="w-full h-10 flex flex-row justify-between items-center">
          <span>رمز ندارم / بازیابی رمز عبور</span>
          <button type="button" onClick={() => {navigate("/retrieve-password"); localStorage.setItem("counter", 120)}} className="w-[84px] h-full bg-gray-200 rounded-[10px]">
            شروع
          </button>
        </div>
      </div> */}
    </div>
  );
}
