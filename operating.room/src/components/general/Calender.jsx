import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Bg_Modal from "./BgModal";
import { FaStarOfLife } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { calculatePersianAgeFromDate } from "../../services/functions";

const Calender = ({
  title = "",
  name = "",
  set,
  alert,
  modal,
  style = "",
  data,
  setModal,
  disabled = false,
}) => {
  const [years, setYears] = useState();
  const [dateValue, setDateValue] = useState(data || '');
  useEffect(() => {
    dateValue ? setYears(calculatePersianAgeFromDate(dateValue)) : setYears(null);
    
  }, [dateValue]);

  return (
    <>
      <Bg_Modal modal={modal} setModal={setModal} />
      <div className={` ${style} child:bg-white top-0 right-0 bottom-0 left-0 flex flex-col mx-auto my-auto h-fit gap-1 overflow-hidden relative md:right-0 md:left-0 `}>
        <div
          className={`text-middle relative mx-auto h-12 w-full ${
            alert && "!mb-13"
          } flex cursor-pointer absolute top-0 right-0 left-0 mx-auto w-full items-center justify-between border-b px-4 font-semibold text-gray-500 rounded-xl border border-gray-300 bg-gray-100 placeholder-gray-400 outline-gray-300 focus:placeholder-transparent dark:bg-gray-100 placeholder`}
          onClick={() => {
            !disabled && setModal(true);
          }}
        >
          <p
            className={`${
              disabled && "cursor-not-allowed !text-green-700"
            } w-fit rounded-lg px-2 pt-0.5 text-green-500`}
          >
            {String(dateValue || "انتخاب تاریخ")}
          </p>

          {years > 0 && <p className="!text-green-500"> {years}سال</p>}
          {!alert && (
            <div className="absolute start-1 -bottom-6 flex items-center gap-2 text-sm text-red-400">
              <FaStarOfLife className="text-[10px]" />
              <span className="mt-0.5">{String(alert)}</span>
            </div>
          )}
        </div>
      </div>
      <Calendar
        className={`fixed top-1/4 right-0 left-0 z-[150] mx-auto !rounded-[14px] p-5 ease-in-out ${
          modal ? "" : "hidden"
        } `}
        value={dateValue}
        // id={name}
        // name={name}
        calendar={persian}
        locale={persian_fa}
        // calendarPosition="bottom-right"
        onChange={(date) => {
          set('birthday',`${date?.year}/${date?.month.number}/${date?.day}`);
          setDateValue(`${date?.year}/${date?.month.number}/${date?.day}`);
          setModal(false);
        }}
      />
    </>
  );
};

export default Calender;
