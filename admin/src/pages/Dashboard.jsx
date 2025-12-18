import { Outlet, useLocation } from "react-router-dom";
import MainMenu from "../components/dashboard/MainMenu";
import Navbar from "../components/dashboard/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { changeToggleMenuStatus } from "../slices/statusMenuSlice";
import { useEffect } from "react";
import Cookies from "js-cookie"

export default function Dashboard() {
  const toggle = useSelector(state => state.statusMenu.toggle)
  const dispatch = useDispatch()
  const changeToggleStatus = () => {
      dispatch(changeToggleMenuStatus());
    };
  const location = useLocation();
  // useEffect(() => {
  //   const login = Cookies.get("AccessTokenA");
  //   if(login != undefined && login != "") {
  //     console.log(location.pathname);
  //     location.pathname = "user-login"
  //   }
  // }, [location.pathname])
  return (
    <div className="w-full h-max md:h-screen md:absolute md:left-0 md:top-0 flex flex-row bg-white md:bg-[#fafafa]">
      <MainMenu toggle={toggle} changeToggleStatus={changeToggleStatus} />
      <div className="w-full md:w-[82.8%] h-full">
        <Navbar />
        <div className="w-full sm:w-full h-max md:h-[90%] sm:bg-transparent p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
