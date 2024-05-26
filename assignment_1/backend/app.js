const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const genreRouter = require("./routers/genre");
const authenticationRouter = require("./middleware/authentication");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// thêm có chế xác thực user bằng token
app.use(authenticationRouter);

// midleware này sẽ chạy khi nào xác thực được hoàn tất và token trùng nhau
app.use("/api/movies", genreRouter);

// trả về kết quả trang lỗi nếu url bị sai
app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});

app.listen(5000);
