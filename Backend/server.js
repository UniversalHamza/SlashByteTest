const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [];
let userIdCounter = 1;

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const newUser = {
    id: userIdCounter++,
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  users.push(newUser);
  res.json(newUser);
});

app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ success: true, message: "User deleted successfully" });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});