import express from "express";
import tasks from "./routes/tasks.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", tasks);

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log("Server listening in: http://localhost:3000/");
});
