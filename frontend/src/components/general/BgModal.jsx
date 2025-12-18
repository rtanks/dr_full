import React from "react";
import { useEffect } from "react";

const Bg_Modal = ({ modal, setModal, z = "z-20", FN = () => {} }) => {
  useEffect(() => {
    if (modal) {
      document.documentElement.classList.add("!overflow-y-hidden");
    } else {
      document.documentElement.classList.remove("!overflow-y-hidden");
    }

    return () => {
      document.documentElement.classList.remove("!overflow-y-hidden");
    };
  }, [modal]);

  return (
    modal && (
      <div
        onClick={() => {
          modal && setModal && setModal(false);
          FN();
        }}
        className={`fixed top-0 right-0 left-0 h-full w-full bg-black ${z} opacity-30`}
      ></div>
    )
  );
};

export default Bg_Modal;
