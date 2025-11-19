import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log("Server listening in: http://localhost:3000/");
});
