import { useState, useEffect } from "react";

const MyDashboard=()=>{
    let[allproduct, updateProduct] = useState( [] );
    let[allorder, updateOrder] = useState( [] );
    const getProduct = () =>{
        let url = "http://localhost:1234/productlist";
        fetch(url)
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct(productArray);
        })
    }

    const getOrder = () =>{
        let url = "http://localhost:1234/order";
        fetch(url)
        .then(response=>response.json())
        .then(orderArray=>{
            updateOrder(orderArray);
        })
    }

    useEffect(()=>{
        getProduct();
        getOrder();
    },[1]);

    return (
       <div className="container mt-5">
            <div className="row text-center text-primary">
                <div className="col-lg-3 mb-4">
                    <div className="bg-light shadow-lg rounded p-4">
                        <h3> Total Product <hr/> {allproduct.length} </h3>
                    </div>
                </div>
                <div className="col-lg-3 mb-4">
                    <div className="bg-light shadow-lg rounded p-4">
                        <h3> Total Order <hr/> {allorder.length} </h3>
                    </div>
                </div>
            </div>
       </div>
    )
}
export default MyDashboard;
