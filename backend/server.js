const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware
app.use(express.json({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
//   console.log("Backend hit!");
  res.json({message: "Hello World!"});
});

app.use('/api/openai', require('./routes/Openai'))


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
