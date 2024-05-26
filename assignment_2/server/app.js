const express = require("express");
const mongooes = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const homeRouter = require("./router/home");
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use(homeRouter);

mongooes
  .connect(
    "mongodb+srv://trinhtvfx22649:lcm7V5M9JoUitZEL@cluster0.xmpc1ki.mongodb.net/booking?retryWrites=true&w=majority&appName=AtlasApp"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("server connect successfuly!");
    });
  });
