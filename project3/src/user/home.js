import { useState, useEffect } from "react";

const MyHome=()=>{
    let[allproduct, updateProduct] = useState( [] );
    const getProduct = () =>{
        let url = "http://localhost:1234/productlist";
        fetch(url)
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct(productArray);
        })
    }

    useEffect(()=>{
        getProduct();
    },[1]);

    const addtocart = (pdata) =>{
        pdata["qty"] = 1;
        let url = "http://localhost:1234/cart";
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(pdata)
        }
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverRes=>{
            alert(pdata.name + "Added in your Cart !");
        })
    }

    const wishlist = (pdata) =>{
        let url = "http://localhost:1234/wishlist";
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(pdata)
        }
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverRes=>{
            alert(pdata.name + "Added in your Wishlist !");
        })
    }

    return (
        <>
            <section className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div id="banner"></div>
                    </div>
                </div>
            </section>
            <div className="container mt-4">
                <div className="row">
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
                                        <p className="text-center">
                                            <button className="btn btn-danger btn-sm" onClick={addtocart.bind(this, product)}> Add To Cart </button>
                                            &nbsp; &nbsp;
                                            <button className="btn btn-info btn-sm" onClick={wishlist.bind(this, product)}> Wishlist </button>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default MyHome;