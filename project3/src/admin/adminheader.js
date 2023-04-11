import { Link } from "react-router-dom";

const AdminHeader=()=>{
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5 sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="javascript:void(0)"> React Shopping App </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item ps-4">
                        <Link className="nav-link active" to="/"> Dashboard </Link>
                    </li>
                    <li class="nav-item ps-4">
                        <Link className="nav-link active" to="/order"> Order Management </Link>
                    </li>
                    <li class="nav-item ps-4">
                        <Link className="nav-link active" to="/product"> Product Management </Link>
                    </li>
                    <li class="nav-item ps-4">
                        <a className="nav-link active">
                            Welcome - { localStorage.getItem("name") }
                            <a href="javascript:void(0)" onClick={logout}> Logout </a>
                        </a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
export default AdminHeader;

const logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/#/login";
    // window.location.href="http://127.0.0.1:5500/#/login";
    window.location.reload();
}