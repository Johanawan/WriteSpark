const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
//   console.log("Backend hit!");
  res.json({message: "Home Page"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
