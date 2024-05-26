const mongodb = require("mongoose");
const Schema = mongodb.Schema;

// Mỗi khách sạn sẽ có những loại phòng khác nhau
const roomsSchema = new Schema({
  // title: Tên loại phòng
  title: {
    type: String,
    required: true,
  },
  // price: Mức giá của loại phòng đó (tính theo ngày)
  price: {
    type: Number,
    required: true,
  },
  // maxPeople: Số người tối đa
  maxPeople: {
    type: Number,
    required: true,
  },
  // desc: Mô tả về loại phòng
  desc: {
    type: String,
    required: true,
  },
  // roomNumbers: Danh sách số phòng của loại phòng này
  roomNumbers: [
    {
      type: Number,
      required: true,
    },
  ],
  hotel: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "hotels",
    },
  ],
});

module.exports = mongodb.model("rooms", roomsSchema);
