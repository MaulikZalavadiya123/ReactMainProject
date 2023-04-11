
import PublicApp from "./user/publicapp";
import AdminApp from "./admin/adminapp";

function App() {
  let userid = localStorage.getItem("id");

  if( userid == null ){
    return ( <PublicApp/> );
  }else{
    return ( <AdminApp/> );
  }
}

export default App;
