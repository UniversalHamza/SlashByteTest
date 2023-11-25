import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = ({ setUsers, users }) => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [role, setRole] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const newUser = { ID, name, email, role };

    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);

        setID("");
        setName("");
        setEmail("");
        setRole("");

        // Navigate to the user list page
        navigate("/");
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <>
      {/* <!-- Contact--> */}
      <section className="page-section" id="contact">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div className="col-lg-8 col-xl-6 text-center">
              <h2 className="mt-0">Add User</h2>
              <hr className="divider" />
            </div>
          </div>
          <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div className="col-lg-6">
              <form id="contactForm" onSubmit={submitHandler}>
                {/* <!-- Name --> */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    value={name}
                    required
                    placeholder="Enter Name"
                    type="text"
                    data-sb-validations="required"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label>Name</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    A name is required.
                  </div>
                </div>
                {/* <!-- Email address input--> */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    value={email}
                    required
                    placeholder="Enter Email Address"
                    type="email"
                    data-sb-validations="required,email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label>Email</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:required"
                  >
                    An email is required.
                  </div>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:email"
                  >
                    Email is not valid.
                  </div>
                </div>
                {/* <!-- Role --> */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="role"
                    value={role}
                    required
                    placeholder="Enter Role"
                    type="text"
                    data-sb-validations="required"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  />
                  <label>Role</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    A role is required.
                  </div>
                </div>

                {/* <!-- Submit Button--> */}
                <div className="mt-5" align="center">
                  <button className="btn btn-primary btn-xl" type="submit">
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserForm;
