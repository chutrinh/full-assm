import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product({ setEditProd }) {
  const navigate = useNavigate();

  // check login
  useEffect(() => {
    axios({
      url: "http://localhost:5000/auth/check",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      if (res.data.status !== 200) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    setEditProd(null);
  });

  const [products, setProducts] = useState(null);
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    console.log(products);
    axios("http://localhost:5000/admin/product", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setProducts(res.data.data);
        } else {
          if (res.data.message === "Not Found Product!") {
            setProducts(null);
          }
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [rerender]);

  // tìm kiếm sản phẩm
  const search = useRef();
  const handleSearch = () => {
    if (!search.current.value) {
      return alert("vui lòng nhập vào ô tìm kiếm tên sản phẩm");
    }
    axios(
      "http://localhost:5000/admin/product/search-product?keyword=" +
        search.current.value,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        withCredentials: true,
      }
    )
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.data);
          setProducts(res.data.data);
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // delet
  const handleDelete = (e) => {
    const prodId = e.target.getAttribute("id");
    axios({
      url: "http://localhost:5000/admin/product/delete-product",
      headers: {
        "Content-Type": "application/json",
      },
      data: { productId: prodId },
      method: "POST",
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.status === 200) {
          setRerender(!rerender);
          alert(response.data.message);
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // edit
  const handleEdit = (e) => {
    const prodId = e.target.getAttribute("id");
    axios({
      url: "http://localhost:5000/admin/product/edit-product/" + prodId,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.status === 200) {
          setEditProd(response.data.data);
          navigate("/add-new-product");
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <h3 className="mt-5">Product</h3>
      <input
        ref={search}
        className="form-control w-25 d-inline"
        type="text"
        placeholder="search"
      />
      <button onClick={handleSearch} className="btn btn-success ms-3">
        search
      </button>
      <table className="table text-start ">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Price</th>
            <th style={{ width: "7%" }}>Image</th>
            <th>Catagory</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <tr key={product._id} className="align-middle">
                  <th>{product._id}</th>
                  <td>{product.name}</td>
                  <td>{Number(product.price).toLocaleString("vi-VN")} VND</td>
                  <td>
                    <img
                      className="w-100"
                      src={"http://localhost:5000/" + product.img1}
                      alt=""
                    />
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <p
                      onClick={handleEdit}
                      id={product._id}
                      className="btn btn-warning mx-2"
                    >
                      Edit
                    </p>
                    <p
                      onClick={handleDelete}
                      id={product._id}
                      className="btn btn-danger "
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default Product;
