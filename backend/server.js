const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = "mysecretkey"; // Change this for security

app.use(cors());
app.use(express.json());

function encryptMessage(message) {
  return Buffer.from(message).toString("base64");
}

function decryptMessage(encoded) {
  return Buffer.from(encoded, "base64").toString("utf-8");
}

app.post("/crypto", (req, res) => {
  const { message, mode } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  let result = mode === "encrypt" ? encryptMessage(message) : decryptMessage(message);
  res.json({ result });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
