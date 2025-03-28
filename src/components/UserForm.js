import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserForm = ({ fetchUsers, editingUser }) => {
  const { id } = useParams(); // Get user ID from URL (if exists)
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  // Fetch user data if an ID is provided (for editing)
  useEffect(() => {
    if (id) {
      axios
        .get(`https://reqres.in/api/users/${id}`)
        .then((response) => setUser(response.data.data))
        .catch((error) => console.error("Error fetching user", error));
    } else if (editingUser) {
      setUser({ first_name: editingUser.first_name, last_name: editingUser.last_name, email: editingUser.email });
    }
  }, [id, editingUser]);

  // Handle form submission (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // If ID exists, update user
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      navigate("/users");
    } else {
      // If no ID, create new user
      await axios.post("https://reqres.in/api/users", user);
      fetchUsers(); // Refresh user list after creation
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit User" : "Add New User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default UserForm;
