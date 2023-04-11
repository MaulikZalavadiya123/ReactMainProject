import { HashRouter,Routes,Route } from "react-router-dom";

import AdminHeader from "./adminheader";
import MyDashboard from "./dashboard";
import MyOrder from "./order";
import MyProduct from "./product";

const AdminApp=()=>{
    return (
        <HashRouter>
            <AdminHeader/>
            <Routes>
                <Route exact path="/" element={ <MyDashboard/> }/>
                <Route exact path="/order" element={ <MyOrder/> }/>
                <Route exact path="/product" element={ <MyProduct/> }/>
            </Routes>
        </HashRouter>
    )
}
export default AdminApp;
