import React, { useEffect, useState } from "react";
// import { provinces } from "../utils/constant";
import { IoIosCloseCircle } from "react-icons/io";
import Bg_Modal from "./BgModal";

const FullModal = ({
  modal,
  setModal,
  title,
  FA = () => {},
  data = [],
  icon = "",
  children,
  style = "",
}) => {
  // console.log(title, data);

  return (
    <>
      <Bg_Modal modal={modal} setModal={setModal} />

      {modal && (
        <div className="px- child:bg-white fixed top-0 right-0 bottom-0 left-0 z-20 mx-auto my-auto h-fit w-[calc(100%-30px)] gap-2 overflow-hidden rounded-3xl border border-gray-300 bg-white pt-1.5 md:right-0 md:left-0 md:w-[500px]">
          <div
            className="absolute top-0 right-0 left-0 z-30 mx-auto flex h-14 w-[calc(100%)] items-center justify-between gap-2 border-b border-gray-300 bg-white px-4 py-2 font-semibold text-gray-500"
            onClick={() => setModal(false)}
          >
            <div className="flex items-center gap-4">
              {/* <TbFilter className="text-2xl " /> */}
              {icon}
              <p> {title}</p>
            </div>
            <IoIosCloseCircle className={`text-2xl text-gray-300`} />
          </div>

          <div className="p relative mt-12 block text-left">
            <div
              dir=""
              className={`right-0 mt-2 h-fit max-h-[calc(100vh-150px)] w-full overflow-y-scroll rounded-md bg-white md:max-h-[550px]`}
            >
              {children}
              {data?.length >= 0 &&
                data.map((i, index) => (
                  <div
                    onClick={() => FA(i)}
                    className={` ${
                      !!i?.disabled
                        ? "!bg-gray-50 text-gray-600"
                        : "font-bold text-gray-700 hover:bg-gray-200"
                    } block border-b border-gray-300 px-4 py-1 text-right ${style} `}
                    key={index}
                    value={i.id}
                  >
                    {i?.name || i?.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullModal;
