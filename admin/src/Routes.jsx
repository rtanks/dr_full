import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import RetrievePassword from "./pages/RetrievePassword";
import NeedForAction from "./pages/NeedForAction";
import Comments from "./pages/Comments";
import RecordDoctor from "./pages/RecordDoctor";
import RequestWithdraw from "./pages/RequestWithdraw";
import FinancialHistory from "./pages/FinancialHistory";
import Patient from "./pages/Patient";
import Dashboard from "./pages/Dashboard";
import UserIsLogin from "./pages/USerIsLogin";
import Cookies from "js-cookie";
import Payment from "./pages/Payment";
import Currency from "./pages/Currency";
import NotFound from "./pages/NotFound";

export default function Router() {
  const checkAccess = () => {
    const accessToken = Cookies.get("accessTokenA");
    if(accessToken && window.location.pathname == '/') {
      return true;
    } else {
      return false;
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* {checkAccess() ? <Route index element={<UserIsLogin/>}/> :<Route index element={<Login />}/>} */}
          <Route index element={<Login />}/>
          <Route path="retrieve-password" element={<RetrievePassword />} />
          <Route path="user-login" element={<UserIsLogin/>}/>
          <Route element={<Dashboard/>}>
            <Route path="/dashboard/need-for-action" element={<NeedForAction />}/>
            <Route path="/dashboard/comments" element={<Comments/>}/>
            <Route path="/dashboard/record-doctor" element={<RecordDoctor/>}/>
            <Route path="/dashboard/request-withdraw" element={<RequestWithdraw/>}/>
            <Route path="/dashboard/financial-history" element={<FinancialHistory/>}/>
            <Route path="/dashboard/patient" element={<Patient/>}/>
            <Route path="/dashboard/payment" element={<Payment/>}/>
            <Route path="/dashboard/currency" element={<Currency/>}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
