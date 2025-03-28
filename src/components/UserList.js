import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteUser } from "../services/api"; // Import delete function

const UserList = ({ fetchUsers }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch users from API
  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${page}`).then((response) => {
      setUsers(response.data.data);
    });
  }, [page]);

  // Handle delete user
  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers(); // Refresh user list after deletion
  };

  return (
    <div>
      <h2>Users List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th> {/* New column for Delete button */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><img src={user.avatar} alt="avatar" width="50" /></td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button> {/* Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default UserList;
