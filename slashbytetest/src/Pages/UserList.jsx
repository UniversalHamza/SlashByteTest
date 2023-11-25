import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  console.log(users);

  const deleteUser = (userId) => {
    fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);
        } else {
          console.error("Error deleting user:", data.message);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <section className="page-section">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
          <div className="col-lg-8 col-xl-6 text-center">
            <h2 className="mt-0">User List</h2>
            <hr className="divider" />
          </div>
        </div>
      </div>

      <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
        <div className="col-lg-6">
          {users.length === 0 ? (
            <p className="text-muted mb-5">No users right now.</p>
          ) : (
            <ul>
              {users.map((user, index) => (
                <div className="justify-content-center border-bottom">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <div className="pt-2">
                        {user.name ? (
                          <h5 className="mt-4 font-weight-medium mb-3">
                            {user.name}
                          </h5>
                        ) : (
                          <></>
                        )}
                        {user.email ? (
                          <h6 className="subtitle mb-1">{user.email}</h6>
                        ) : (
                          <></>
                        )}
                        {user.role ? <p>{user.role}</p> : <></>}
                        <button
                          className="btn btn-primary mb-4"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div align="center">
        <Link to="/add-user">
          <button className="btn btn-primary ms-5">Add User</button>
        </Link>
      </div>
    </section>
  );
};

export default UserList;
