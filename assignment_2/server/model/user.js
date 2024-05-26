const mongodb = require("mongoose");
const Schema = mongodb.Schema;

// Model này tương ứng với một người dùng trong hệ thống
const userSchema = new Schema({
  // username: Tên đăng nhập
  username: {
    type: String,
    // required: true,
  },
  // password: Mật khẩu người dùng
  password: {
    type: String,
    required: true,
  },
  // fullName: Họ và tên của người dùng
  fullName: {
    type: String,
    // required: true,
  },
  // phoneNumber: Số điện thoại của người dùng
  phoneNumber: {
    type: Number,
    // required: true,
  },
  // email: Email của người dùng
  email: {
    type: String,
    required: true,
  },
  // isAdmin: Người dùng này có phải Admin không
  isAmin: {
    type: Boolean,
    // required: true,
  },
  token: {
    type: Number,
    required: true,
  },
});

module.exports = mongodb.model("users", userSchema);
