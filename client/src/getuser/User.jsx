import React, { useEffect, useState } from 'react';
import "./User.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users`);
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/delete/user/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success(response.data.message || "User deleted successfully", { position: "top-right" });
    } catch (error) {
      toast.error("Could not delete user", { position: "top-right" });
      console.log(error);
    }
  };

  return (
    <div className='userTable'>
      <Link to="/add" className="btn btn-primary">
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>S.No</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Address</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id || user.id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className='actionButtons'>
                  <Link to={`/edit/${user._id}`} className="btn btn-info">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;