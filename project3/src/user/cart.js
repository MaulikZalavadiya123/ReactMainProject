import { useState, useEffect } from "react";
const MyCart=()=>{
    let[allproduct, updateProduct] = useState( [] );
    const getProduct = () =>{
        let url = "http://localhost:1234/cart";
        fetch(url)
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct(productArray);
        })
    }

    useEffect(()=>{
        getProduct();
    },[1]);

    const delCart = (pid) =>{
        let url = "http://localhost:1234/cart/"+pid;
        var postData={ method:"DELETE" };
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverRes=>{
            getProduct();
        })
    }

    const one = (index) =>{
        var pdata = allproduct[index];
        var pid = allproduct[index].id;
        var newqty = pdata.qty+1;
        pdata["qty"] = newqty;

        let url = "http://localhost:1234/cart/"+pid;
        var postData={
            headers:{'Content-Type':'application/json'},
            method:"PUT",
            body:JSON.stringify(pdata)
        };
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverRes=>{
            getProduct();
        })
    }

    const two = (index) =>{
        var pdata = allproduct[index];
        var pid = allproduct[index].id;
        var newqty = pdata.qty-1;
        pdata["qty"] = newqty;
        if(newqty<=0){
            delCart(pid);
        }else{
            let url = "http://localhost:1234/cart/"+pid;
            var postData={
                headers:{'Content-Type':'application/json'},
                method:"PUT",
                body:JSON.stringify(pdata)
            };
            fetch(url, postData)
            .then(response=>response.json())
            .then(serverRes=>{
                getProduct();
            })
        }
    }

    let total = 0;

    let[uname, pickName] = useState("");
    let[mobile, pickMobile] = useState("");
    let[email, pickEmail] = useState("");
    let[address, pickAddress] = useState("");

    const placeorder = () =>{
        var orderdata = { name:uname, mobile:mobile, email:email, address:address, itemlist:allproduct };
        let url = "http://localhost:1234/order";
            var postData={
                headers:{'Content-Type':'application/json'},
                method:"POST",
                body:JSON.stringify(orderdata)
        };
        fetch(url, postData)
            .then(response=>response.json())
            .then(serverRes=>{
                alert("Hi ,"+ uname + "We Received Your Order.");
        })
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3">
                    <h3 className="text-center mb-3"> Customer Details </h3>
                    <div className="mb-3">
                        <label> Customer Name </label>
                        <input type="text" className="form-control" onChange={obj=>pickName(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label> Mobile No </label>
                        <input type="number" className="form-control" onChange={obj=>pickMobile(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label> e-Mail Id </label>
                        <input type="email" className="form-control" onChange={obj=>pickEmail(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label> Delivery Address </label>
                        <textarea className="form-control" onChange={obj=>pickAddress(obj.target.value)}></textarea>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-danger btn-lg" onClick={placeorder}> Place Order </button>
                    </div>
                </div>
                <div className="col-lg-9">
                    <h1 className="text-center">Cart is : {allproduct.length} </h1>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th> Item Id </th>
                                <th> Name </th>
                                <th> Price </th>
                                <th> Photo </th>
                                <th width="20%"> Action </th>
                                <th className="text-end"> Delete </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.map((product, index)=>{
                                    total = total + (product.price * product.qty);
                                    return(
                                        <tr key={index}>
                                            <td> {product.id} </td>
                                            <td> {product.name} </td>
                                            <td> {product.price} </td>
                                            <td> <img src={product.photo} height="40"/> </td>
                                            <td>
                                                <div className="input-group">
                                                    <button className="input-group-text btn btn-primary" onClick={one.bind(this, index)}> + </button>
                                                    <input type="text" className="form-control" value={product.qty} />
                                                    <button className="input-group-text btn btn-warning" onClick={two.bind(this, index)}> - </button>
                                                </div>
                                            </td>
                                            <td className="text-end"> 
                                                <button className="btn btn-danger btn-sm" onClick={delCart.bind(this, product.id)}> Delete </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <p className="text-center"> Total Payable Amount - Rs: {total} </p>
                </div>
            </div>
        </div>
    )
}
export default MyCart;
