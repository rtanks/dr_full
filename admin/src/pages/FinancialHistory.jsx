import { CgMenuRight } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { changeToggleMenuStatus } from "../slices/statusMenuSlice";
import SearchBoxWithMenu from "../components/generalComponent/SearchBoxWithMenu";
import UserRole from "../components/UserRole";
import FinancialHistoryItem from "../components/dashboard/FinancialHistoryItem";
import FinancialHistoryDrawer from "../components/dashboard/FinancialHistoryDrawer";
import { useEffect, useState } from "react";
import financialService from "../services/api/dashboard.api/financialService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import SearchBoxWithBtn from "../components/generalComponent/SearchBoxWithBtn";
import { PiPlus } from "react-icons/pi";

export default function FinancialHistory() {
    const dispatch = useDispatch();
    const [role, setRole] = useState({fa:"پزشک", en: "doctor"})
    const {getFinancialWithRole} = financialService({role: role.en});
    const [itemSelected, setItemSelected] = useState(null);
    const changeToggleStatus = () => {
      dispatch(changeToggleMenuStatus());
    };
    const getItemSelected = (item) => {
      setItemSelected(item)
    }

    const {isLoading, error} = useQuery({queryKey: ["financial", role], queryFn: () => getFinancialWithRole(role.en)});
    if(isLoading) return <Loading/>
    // if(error) return <div className="fixed inset-0 bg-white flex items-center justify-center z-50">{error.message}</div>
    return (
        <>
            {/* {
              itemSelected == null ? ( */}
                  <>
                    <SearchBoxWithBtn onClick1={() => changeToggleStatus()}>
                      {{
                        menu: <CgMenuRight size={24}/>,
                        icon: <PiPlus size={24} />,
                      }}
                    </SearchBoxWithBtn>
                    <UserRole role={role} getRole={(role) => setRole(role)}/>
                    <div className="w-full h-max flex flex-col gap-5">
                      <FinancialHistoryItem name={"اشکان حسنوندی"} expertise={"متخصص جراحی عمومی"} nationalCode={"4060405531"} 
                        province={"لرستان"} city={"خرم آباد"} shaba={"57856782854567874374867388"} number={12} onClick={() => getItemSelected("hi")}/>
                    </div>
                  </>   
              {/* ) : ( */}
                {itemSelected != null && <FinancialHistoryDrawer onClick={() => getItemSelected(null)}/>}
              {/* )
            } */}
        </>
    )
}