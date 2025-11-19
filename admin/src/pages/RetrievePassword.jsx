import Input from "../components/generalComponent/Input";
import { LiaAngleLeftSolid } from "react-icons/lia";
import InputWithLabel from "../components/generalComponent/InputWithLabel";
import SubmitButton from "../components/generalComponent/SubmitButton";
import useRetrieveCode from "../services/hooks/useRetrieveCode";
import { useNavigate } from "react-router-dom";

export default function RetrievePassword() {
  const { showTime, resendCode } = useRetrieveCode();
  const navigate = useNavigate();

  return (
    <div className="w-[90%] mt-10 vazir-medium mx-auto flex flex-col items-center gap-5">
      <div className="w-full h-10 flex flex-row justify-between items-center">
        <div className="w-max text-lg text-black">بازیابی رمز عبور</div>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-[71px] h-[28px] text-[16px] text-red-600 flex flex-row items-center"
        >
          بازگشت
          <LiaAngleLeftSolid />
        </button>
      </div>
      <div className="mt-3 text-gray-500 text-[14px]">
        کد پیامکی ورود به شماره 09216919291 ارسال گردید.لطفا آن را در کادر زیر
        وارد نمایید
      </div>
      <Input type={"text"} placeholder={"ورود کد"} mode={"numeric"} />
      <div
        onClick={() => resendCode()}
        className="w-full text-left text-[16px] text-[#909090]"
      >
        {showTime()}
      </div>

      <InputWithLabel
        label={"رمز جدید"}
        type={"password"}
        placeholder={"حداقل ۸ کاراکتر"}
      />
      <InputWithLabel
        label={"تکرار رمز جدید"}
        type={"password"}
        placeholder={"حداقل ۸ کاراکتر"}
      />
      <SubmitButton
        title={"ثبت اطلاعات"}
        additionalStyle={"bg-[#006ECF] text-white mt-11"}
      />
    </div>
  );
}
