import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./Pages/UserList";
import UserForm from "./Pages/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<UserList users={users} setUsers={setUsers} />}
        />
        <Route
          path="/add-user"
          element={<UserForm setUsers={setUsers} users={users} />}
        />
      </Routes>
    </Router>
  );
};

export default App;