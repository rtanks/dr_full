import { useRef, useState } from "react";
import TestHeader from "./generalComponent/HeaderTest";
import classNames from "classnames";
import {transformFormat, transformFormatWithSpread} from "../services/func/transformFunc"
import { LuCopy } from "react-icons/lu";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";

export default function Wallet({onClick}) {
    const payCode = useRef();

    const [active, setActive] = useState({withdraw: true, deposit: false});
    const changeActiveElem = (status) => {
      return classNames({
        "text-[#006ECF] bg-[#006ECF33]": status,
        "text-[#909090] bg-gray-200": !status,
      });
    };
    const copyHandler = () => {
        navigator.clipboard.writeText(payCode.current.value);
    }
    return (
        <div className="w-full h-full bg-white vazir-medium fixed left-0 top-0 z-50 overflow-y-scroll">
            <div className="w-[402px] mx-auto h-max">
                <TestHeader title={"کیف پول"} onClick={onClick}/>
                <div className="w-[90%] relative h-max mx-auto flex flex-col gap-5 mb-5">
                    <div className="w-full flex flex0row justify-between items-center">
                        <span>اعتبارشما</span>
                        <span>{transformFormatWithSpread(5000)} تومان</span>
                    </div>
                    <div className="w-full h-12 pb-2 flex flex-row justify-between items-center text-[#676767] border-b border-b-[#e7e7e7]">
                        <span>کد پرداخت</span>
                        <input ref={payCode} value={transformFormat(10000)} readOnly className="w-1/2 text-center"/>
                        <LuCopy size={24} onClick={copyHandler}/>
                    </div>
                    <div className="w-full h-10 flex flex-row gap-2">
                      <div onClick={() => setActive({withdraw: false, deposit: true})}
                        className={`w-[95px] hover:cursor-pointer rounded-[10px] h-[40.2px] flex items-center justify-center text-[16px] ${changeActiveElem(active.deposit)}`}>واریز</div>
                      <div onClick={() => setActive({withdraw: true, deposit: false})}
                        className={`w-[95px] hover:cursor-pointer rounded-[10px] h-[40.2px] flex items-center justify-center text-[16px] ${changeActiveElem(active.withdraw)}`}>برداشت</div>
                    </div>
                    <div className="w-full h-max">
                        {active.withdraw? (
                          <Withdraw />
                        ) : (
                          <Deposit/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}