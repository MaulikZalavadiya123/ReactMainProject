import { useState, useEffect } from "react";

const MyOrder=()=>{
    let[allorder, updateOrder] = useState( [] );

    const getOrder = () =>{
        let url = "http://localhost:1234/order";
        fetch(url)
        .then(response=>response.json())
        .then(orderArray=>{
            updateOrder(orderArray.reverse());
        })
    }

    useEffect(()=>{
        getOrder();
    },[1]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3 className="text-primary mb-3"> Recent Orders : {allorder.length} </h3>
                </div>
            </div>
            {
                allorder.map((order, index)=>{
                    return(
                        <div className="row mb-4 border-bottom" key={index}>
                            <div className="col-lg-3">
                                <div className="shadow rounded p-3">
                                    <h5> {order.name} </h5>
                                    <p> {order.mobile} </p>
                                    <p> {order.email} </p>
                                    <p> {order.address} </p>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <h6 className="text-center"> {order.itemlist.length} - Total Items </h6>
                                <table className="table table-bordered mt-4 shadow-lg">
                                    <thead>
                                        <tr className="bg-light text-primary">
                                            <th> Item Id </th>
                                            <th> Name </th>
                                            <th> Price </th>
                                            <th> Quantity </th>
                                            <th> Total </th>
                                            <th> Photo </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.itemlist.map((product, index2)=>{
                                                return(
                                                    <tr key={index2}>
                                                        <td> {product.id} </td>
                                                        <td> {product.name} </td>
                                                        <td> {product.price} </td>
                                                        <td> {product.qty} </td>
                                                        <td> {product.price * product.qty} </td>
                                                        <td> <img src={product.photo} height="40"/> </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }
       </div>
    )
}
export default MyOrder;
