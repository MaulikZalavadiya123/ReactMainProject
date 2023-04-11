import { useState } from "react";

const MyLogin = () => {
    let[uname, pickUsername] = useState("");
    let[upass, pickPassword] = useState("");
    let[msg, updateMsg] = useState("Enter Login Details");

    const Gologin = () =>{
        if(uname == "" || upass == ""){
            updateMsg("Empty Email or Password !");
        }else{
            updateMsg("Please wait processing...");
            var url = "http://localhost:1234/account?email="+uname+"&password="+upass;
            fetch(url)
            .then(response=>response.json())
            .then(userinfo=>{
                if(userinfo.length >0){
                    updateMsg("Success ! Please wait Redirecting...");
                    localStorage.setItem("id", userinfo[0].id);
                    localStorage.setItem("name", userinfo[0].name);
                    window.location.href="http://localhost:3000/#/";
                    // window.location.href="http://127.0.0.1:5500/#/";
                    window.location.reload();
                }else{
                    updateMsg("Fail ! Invalid or not Exists...");
                }
            })
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                        <p className="text-danger text-center"> {msg} </p>
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white">
                            Login
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <label> e-mail Id <small className="text-danger">*</small> </label>
                                <input type="email" className="form-control" onChange={obj=>pickUsername(obj.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label> Password <small className="text-danger">*</small> </label>
                                <input type="password" className="form-control" onChange={obj=>pickPassword(obj.target.value)}/>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-danger" onClick={Gologin}> Login </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default MyLogin;