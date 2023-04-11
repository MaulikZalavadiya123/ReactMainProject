import { useState, useEffect } from "react";
import AddProduct from "./addproduct";
import ReactPaginate from "react-paginate";

const MyProduct=()=>{
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

    const delProduct = (pid) =>{
        let url = "http://localhost:1234/productlist/"+pid;
        var postData={ method:"DELETE" };
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverRes=>{
            getProduct();
        })
    }

    let [keyword, pickKeyword] = useState("");

    //for pagination

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }

    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="text-primary"> {allproduct.length} : Product Management </h2>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <AddProduct/>
                </div>
                <div className="col-lg-9">
                    <input type="text" className="form-control mb-3" placeholder="search here" onChange={obj=>pickKeyword(obj.target.value)}/>
                    <table className="table table-bordered mt-4 shadow-lg">
                            <thead>
                                <tr className="bg-light text-primary">
                                    <th> Item Id </th>
                                    <th> Name </th>
                                    <th> Price </th>
                                    <th> Photo </th>
                                    <th> Details </th>
                                    <th> Delete </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allproduct.filter(post =>{
                                        if(post.name.toLowerCase().includes(keyword.toLowerCase())){
                                                return post;
                                            }
                                    }).slice(offset, offset + PER_PAGE).map((product, index2)=>{
                                        return(
                                            <tr key={index2}>
                                                <td> {product.id} </td>
                                                <td> {product.name} </td>
                                                <td> {product.price} </td>
                                                <td> <img src={product.photo} height="40"/> </td>
                                                <td> {product.info} </td>
                                                <td> <button className="btn btn-danger btn-sm" onClick={delProduct.bind(this, product.id)}> Delete </button> </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="mb-4 mt-4">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyProduct;
