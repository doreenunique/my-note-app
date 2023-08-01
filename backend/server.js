const express = require("express");
const app = express();
app.use(express.json());
require("./connection")
require("dotenv").config();
const port = 3636;
const cors = require("cors");

const userRouter = require("./router/userRouter");
const noteRouter = require("./router/noteRouter");


app.use(
  cors({
    origin: "*",
  })
)

app.use("/user", userRouter);
app.use("/notes", noteRouter);

app.listen(port, "localhost", err => {
  if(err) {
    console.log(err)
  } else {
    console.log(`Server is running at http://localhost:${port}`)
  }
});
