import ContainerDrawer from "../generalComponent/ContainerDrawer";
import FinancialHistorySubItem from "./FinancialHistorySubItem";


export default function FinancialHistoryDrawer({onClick}) {
    
    return (
        <ContainerDrawer onClick={onClick} header={"سابقه مالی"}>
            <div className="w-[90%] relative h-max mx-auto flex flex-col gap-5 mb-5">
               <FinancialHistorySubItem price={"845000000"} shaba={"87634548633553563453"} trackingCode={"452145221"} status={"موفق"}
                explain={"عیفغغ  ثقفهن صث نهق6 شصثی  فبغ6فس صث ضت6 8قعفی س4 فشف"} create={"1404/08/12  14:45"} done={"1404/08/12  14:45"}/>
               <FinancialHistorySubItem price={"845000000"} shaba={"87634548633553563453"} trackingCode={"452145221"} status={"موفق"}
                explain={"عیفغغ  ثقفهن صث نهق6 شصثی  فبغ6فس صث ضت6 8قعفی س4 فشف"} create={"1404/08/12  14:45"} done={"1404/08/12  14:45"}/>
            </div>
        </ContainerDrawer>
    )
}