const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const transactionSchema = new Schema({
  // user: Username của người đặt phòng
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  // hotel: _Id của khách sạn đã đặt
  hotel: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "hotels",
  },
  // room: Danh sách các phòng đã đặt
  room: [
    {
      type: Object,
      required: true,
    },
  ],
  // dateStart: Ngày nhận phòng
  dateStart: {
    type: Date,
    required: true,
  },
  // dateEnd: Ngày trả phòng
  dateEnd: {
    type: Date,
    required: true,
  },
  // price: Chi phí
  price: {
    type: Number,
    required: true,
  },
  // payment: Hình thức thanh toán (Credit Card, Cash)
  payment: {
    type: String,
    required: true,
  },
  // status: Tình trạng (Booked, Checkin, Checkout)
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongodb.model("transactions", transactionSchema);
