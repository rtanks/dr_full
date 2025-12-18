import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Input = ({
  FN = () => {},
  data = "",
  name = "",
  type = "text",
  inputMode = "text",
  title = "",
  placeholder = "",
  disabled = false,
  style = "",
  alert = "",
  readOnly=false
}) => {
  const [eye, setEye] = useState(true);

  return (
    <div
      className={` ${style} relative mx-auto mt-6 h-12 w-full sm:w-1/2 [input&&!rounded-b-none]  ${
        alert && "!mb-13"
      } `}
    >
      <label
        htmlFor={name}
        className={`absolute start-1 -top-6 !h-fit rounded-2xl px-2 text-sm text transition-all ease-linear`}
      >
        {title}
      </label>
      <div className="peer h-12 w-full rounded-xl border border-gray-300 bg-gray-100 placeholder-gray-400 outline-gray-300 focus:placeholder-transparent dark:bg-gray-100 placeholder">
        <input
          className={`${
            disabled
              ? "cursor-not-allowed bg-gray-200 text-gray-600"
              : "text-gray-500"
          } w-4/5 h-full px-5 rounded-r-xl bg-transparent outline-none`}
          id={name}
          name={name}
          disabled={disabled}
          type={type === "password" ? (eye ? "password" : "text") : type}
          value={data}
          inputMode={inputMode}
          placeholder={placeholder}
          onChange={FN}
          readOnly={readOnly}
        />
        <span className="text-sm text-main font-bold">تایید شده</span>
      </div>

      {alert && (
        <label
          htmlFor={name}
          className={`absolute start-1 -bottom-6 flex !h-fit items-center gap-2 text-sm text-red-400 transition-all ease-linear`}
        >
          <FaStarOfLife className="text-[10px]" />
          <p className="mt-0.5">{alert}</p>
        </label>
      )}
      {type === "password" && (
        <label
          className={`absolute end-1 mt-1 h-full w-10 px-2 pt-2.5 text-xl text-gray-400`}
          onClick={() => {
            setEye((i) => !i);
          }}
        >
          {eye ? <IoMdEyeOff /> : <IoMdEye />}
        </label>
      )}
    </div>
  );
};
export default Input;
