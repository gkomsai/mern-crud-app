const bcrypt = require("bcrypt");
const express = require("express");
const { connection } = require("./config/db.js");
const { todosRouter } = require("./routes/todos.router.js");
const { userRouter } = require("./routes/user.route.js");
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.use("/user", userRouter); //  by putting this /user userRouter logic will be applied only for the /user route
app.use("/todos", todosRouter)
app.get("/", (req, res) => {
  res.send("welcome to the home page");
});


app.listen(port, async () => {
  try {
    await connection;
    console.log("conneted to db");
  } catch (error) {
    console.log(error);
  }
});
