const mongodb = require("mongoose");
const Schema = mongodb.Schema;

// Đây là Model chứa các thông tin về khách sạn,
const hotelSchema = new Schema({
  //name: Tên của khách sạn
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // type: Loại khách sạn (Hotel, Apartments, Resorts, Villas, Cabins)
  type: {
    type: String,
    required: true,
  },
  // city: Thành phố của khách sạn đó
  city: {
    type: String,
    required: true,
  },
  // address: Địa chỉ cụ thể của khách sạn
  address: {
    type: String,
    required: true,
  },
  // distance: Khoảng cách từ khách sạn đến trung tâm thành phố
  distance: {
    type: Number,
    required: true,
  },
  // photos: Danh sách các link ảnh của khách sạn đó
  photos: [
    {
      type: String,
      required: true,
    },
  ],
  // desc: Giới thiệu về khách sạn
  desc: {
    type: String,
    required: true,
  },
  // rating: Đánh giá về khách sạn đó (trong khoảng 0 -> 5 điểm)
  rating: {
    type: Number,
    required: true,
  },
  // featured: Khách sạn có hỗ trợ các tiện ích khác không
  featured: {
    type: Boolean,
    required: true,
  },
  // rooms: Danh sách các phòng thuộc khách sạn này
  rooms: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "rooms",
    },
  ],
  cheapestPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongodb.model("hotels", hotelSchema);
