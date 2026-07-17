const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("KENUEL AI Backend berjalan 🚀");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
