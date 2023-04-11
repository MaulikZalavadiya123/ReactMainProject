import { useState, useEffect } from "react";
const Wishlist = () =>{
    let[allproduct, updateProduct] = useState( [] );
    const getProduct = () =>{
        let url = "http://localhost:1234/wishlist";
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
        let url = "http://localhost:1234/wishlist/"+pid;
        var postData={ method:"DELETE" };
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverRes=>{
            getProduct();
        })
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <h1 className="text-center"> My Wish List : {allproduct.length} </h1>
                {
                    allproduct.map((product, index)=>{
                        return(
                            <div className="col-lg-3 mb-4" key={index}>
                                <div className="p-4 rounded shadow">
                                    <h3 className="text-center text-primary"> {product.name} </h3>
                                    <img src={product.photo} height="180" width="100%" className="rounded" />
                                    <p className="text-center">
                                        <del className="text-danger m-1"> Rs.{product.price + (product.price * 15 / 100)} </del>
                                        <ins className="text-primary m-1"> Rs.{product.price} </ins>
                                    </p>
                                    <p  className="text-center"> {product.info} </p>
                                    <p className="text-center"> <button className="btn btn-danger btn-sm" onClick={delCart.bind(this, product.id)}> Delete </button> </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Wishlist;