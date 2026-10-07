import React, { useEffect, useState } from "react";
import "../adduser/AddUser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const Edit = () => {
  const [user, setUser] = useState({ name: "", email: "", address: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`${API_URL}/api/update/user/${id}`, user)
      .then((response) => {
        toast.success(response.data.message || "User updated successfully", { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Something went wrong!", { position: "top-right" });
        console.log(error);
      });
  };

  return (
    <div className="addUser">
      <Link to="/" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={user.name} onChange={inputChangeHandler} autoComplete="off" placeholder="Enter your name:" />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={inputChangeHandler} autoComplete="off" placeholder="Enter your Email:" />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={user.address} onChange={inputChangeHandler} autoComplete="off" placeholder="Enter your Address:" />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;