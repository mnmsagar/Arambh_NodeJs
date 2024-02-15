const express = require("express");
const app = express();
const { userRouter } = require("./routes/users.routes");
const { crudRouter } = require("./routes/crud.routes");

app.use(express.json());

app.use("/", crudRouter);
app.use("/users", userRouter);
app.use("*", (req, res) => {
  res.json({
    message: "Not Valid !!!",
    statusCode: 401,
  });
});

app.listen(3000, () => {
  console.log("Server Started !!");
});
