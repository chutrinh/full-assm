import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddNewProduct({ editProd }) {
  const [loading, setLoading] = useState(false);
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

  const name = useRef();
  const category = useRef();
  const price = useRef();
  const count = useRef();
  const shortDesc = useRef();
  const longDesc = useRef();
  const images = useRef();

  const handleAdd = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("category", category.current.value);
    formData.append("price", price.current.value);
    formData.append("count", count.current.value);
    formData.append("shortDesc", shortDesc.current.value);
    formData.append("longDesc", longDesc.current.value);
    // Sử dụng images.current.files để lấy tất cả các tệp trong trường input file
    for (let i = 0; i < images.current.files.length; i++) {
      formData.append("images", images.current.files[i]);
    }
    axios({
      url: `http://localhost:5000/admin/product/${
        editProd ? "edit-product/" + editProd._id : "add-product"
      }`,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // Đặt Content-Type thành multipart/form-data
      },
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setLoading(false);
          alert(res.data.message);
          navigate("/product");
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };
  return (
    <>
      <div className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            ref={name}
            type="text"
            className="form-control"
            defaultValue={editProd ? editProd.name : ""}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            ref={category}
            type="text"
            className="form-control"
            defaultValue={editProd ? editProd.category : ""}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            ref={price}
            type="number"
            className="form-control"
            defaultValue={editProd ? editProd.price : ""}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Count</label>
          <input
            ref={count}
            type="number"
            className="form-control"
            defaultValue={editProd ? editProd.count : ""}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <textarea
            ref={shortDesc}
            className="form-control"
            rows="3"
            defaultValue={editProd ? editProd.short_desc : ""}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Long Description</label>
          <textarea
            ref={longDesc}
            className="form-control"
            rows="5"
            defaultValue={editProd ? editProd.long_desc : ""}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image (4 images)</label>
          <input ref={images} type="file" multiple className="form-control" />
        </div>
        <button
          onClick={handleAdd}
          type="submit"
          className="btn btn-primary mb-3"
        >
          Submit
        </button>
        {loading && (
          <span
            className="spinner-border ms-4 align-middle text-danger"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </span>
        )}
      </div>
    </>
  );
}

export default AddNewProduct;
