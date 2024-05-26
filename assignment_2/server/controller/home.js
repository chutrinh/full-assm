const Hotel = require("../model/hotel");
const Room = require("../model/room");
const User = require("../model/user");
const Transaction = require("../model/transaction");

exports.getHotels = async (req, res, next) => {
  const holtels = await Hotel.find();
  res.json(holtels);
};

exports.getDetailHotel = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const hotel = await Hotel.find({ _id: hotelId }).populate("rooms").exec();
  const transaction = await Transaction.find({ hotel: hotelId })
    .populate("hotel")
    .exec();
  res.json({ hotel: hotel[0], transaction });
};

exports.postSearch = async (req, res, next) => {
  const dataSearch = req.body;
  const arr = await Hotel.find().populate("rooms").exec();
  // tìm theo thành phố
  const filterHotels = arr.filter(
    (hotel) =>
      hotel.city.toLocaleLowerCase() === req.body.city.toLocaleLowerCase()
  );

  // tìm theo số người thỏa mãn của hotel trong 1 room
  const hotels = filterHotels.filter((hotel) => {
    const thisRoom = hotel.rooms.filter((room) => {
      return (
        room.maxPeople >= dataSearch.maxPeople &&
        room.roomNumbers.length >= dataSearch.amountRoom
      );
    });
    if (thisRoom.length > 0) {
      return hotel;
    }
  });

  // tìm theo ngày
  if (hotels.length > 0) {
    const findTransactionByHotel = hotels.map(async (hotel) => {
      const trans = await Transaction.find({ hotel: hotel._id });
      if (trans.length > 0) {
        const check = coNgayTrungNhau(
          {
            batDau: new Date(dataSearch.startDate),
            ketThuc: new Date(dataSearch.endDate),
          },
          {
            batDau: new Date(trans[0].dateStart),
            ketThuc: new Date(trans[0].dateEnd),
          }
        );

        if (check) {
          const a = trans[0].room.reduce((curr, item) => {
            return (curr += item.roomNumbers.length);
          }, 0);
          const b = hotel.rooms.reduce((curr, item) => {
            return (curr += item.roomNumbers.length);
          }, 0);
          const c = b - a;
          if (c >= dataSearch.amountRoom) {
            return hotel;
          }
        }
      } else {
        return hotel;
      }
    });
    const transs = await Promise.all(findTransactionByHotel);
    res.json(transs);
  } else {
    res.json("no found");
  }

  function coNgayTrungNhau(khoangThoiGian1, khoangThoiGian2) {
    if (
      khoangThoiGian1.batDau <= khoangThoiGian2.ketThuc &&
      khoangThoiGian1.ketThuc >= khoangThoiGian2.batDau
    ) {
      return true;
    } else {
      return false;
    }
  }
};
