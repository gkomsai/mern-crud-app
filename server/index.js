const bcrypt = require("bcrypt");
const express = require("express");
const cors =require("cors");

const { albumRouter } = require("./routes/album.route.js");

const { userRouter } = require("./routes/user.route.js");
const { connection } = require("./config/db.js");
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());


app.use("/", userRouter);
app.use("/albums", albumRouter);


app.get("/", async (req, res) => {
  return res.send("Welcome to music app backend server home page")
})

app.listen(port, async () => {
  try {
    await connection;
    console.log(`app is litening on port ${port}`)
    console.log("conneted to db");
  } catch (error) {
    console.log(error);
  }
});
