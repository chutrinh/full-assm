const User = require("../model/user");

// đăng ký user
exports.posRegister = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.formData.email });
    if (user.length === 0) {
      const newUser = new User({
        email: req.body.formData.email,
        password: req.body.formData.password,
        token: Math.random(),
        isAmin: false,
      });
      await newUser.save();
      res.json({ message: true });
    }
    if (user.length > 0) {
      res.json({ message: false });
    }
  } catch (error) {
    console.log(error);
  }
};

// đăng nhập user
exports.postogin = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.formData.email,
    password: req.body.formData.password,
  });
  if (user) {
    res.json(user);
  } else {
    res.json(false);
  }
};

// kiểm tra người dùng đã đăng nhập hay chưa khi thoat ứng dụng và vào lại ứng dụng
exports.getLogin = async (req, res, next) => {
  if (req.query.token) {
    const user = await User.find({
      token: Number(req.query.token),
    });
    if (user.length > 0) {
      res.json({ token: user[0].token });
    } else {
      res.json({ toke: null });
    }
  } else {
    res.json({ toke: null });
  }
};

// admin
exports.postLoginAdmin = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    if (user.isAmin) {
      res.status(200).json(user);
    } else {
      res.json({ message: "bạn không phải là admin" });
    }
  } else {
    res.json({ message: "tài khoản không đúng" });
  }
};
