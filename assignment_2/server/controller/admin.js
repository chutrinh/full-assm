const Transaction = require("../model/transaction");
const Hotel = require("../model/hotel");
const Room = require("../model/room");
const User = require("../model/user");

exports.gettransactionAll = async (req, res, next) => {
  const transactions = await Transaction.find()
    .populate("hotel")
    .populate("user")
    .exec();
  res.json(transactions);
};

exports.getDashboard = async (req, res, next) => {
  const transactions = await Transaction.find()
    .populate("hotel")
    .populate("user")
    .exec();
  const arr = transactions.length - 8;
  const transaction_8 = transactions.filter((item, i) => {
    if (i >= arr) {
      return item;
    }
  });
  res.json(transaction_8);
};

exports.getInfor = async (req, res, next) => {
  const user = await User.find();
  const transaction = await Transaction.find();
  const total = transaction.reduce((curr, item) => (curr += item.price), 0);
  const amountUer = user.length;
  const amountTransaction = transaction.length;
  const months = [];
  transaction.filter((item) => {
    if (months.length === 0) {
      months.push({
        month: new Date(item.dateStart).getMonth() + 1,
        total: item.price,
      });
    } else {
      const index = months.findIndex(
        (month) => month.month === new Date(item.dateStart).getMonth() + 1
      );
      if (index >= 0) {
        months[index].total += item.price;
      } else {
        months.push({
          month: new Date(item.dateStart).getMonth() + 1,
          total: item.price,
        });
      }
    }
  });
  const balance = months.reduce((curr, item) => (curr += item.total), 0);
  res.json({
    amountTransaction,
    total,
    amountUer,
    balance: (balance / 12).toFixed(2),
  });
};

exports.getHotels = async (req, res, next) => {
  const hotels = await Hotel.find();
  res.json(hotels);
};

exports.getRooms = async (req, res, next) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.postAddHotel = async (req, res, next) => {
  const hotel = new Hotel({
    name: req.body.name,
    title: req.body.title,
    type: req.body.type,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    photos: req.body.images,
    desc: req.body.description,
    featured: req.body.featured,
    rating: req.body.rating,
    cheapestPrice: req.body.price,
    rooms: req.body.checkbox,
  });
  await hotel.save();
  res.json(req.body);
};

exports.postDeletHotel = async (req, res, next) => {
  const transaction = await Transaction.findOne({ hotel: req.body.idHotel });
  if (!transaction) {
    await Hotel.findByIdAndRemove(req.body.idHotel);
    res.json({ message: "xóa thành công" });
  } else {
    res.json({ message: "hotel này đang được book" });
  }
};

exports.postAddRoom = async (req, res, next) => {
  const room = await new Room({
    title: req.body.title,
    price: req.body.price,
    maxPeople: req.body.maxPeople,
    desc: req.body.description,
    roomNumbers: req.body.rooms,
    hotel: req.body.chooseHotelId,
  });
  await room.save();
  res.json(req.body);
};

exports.postDeletRooml = async (req, res, next) => {
  Transaction.find().then((transaction) => {
    const trans = transaction.some((item) => {
      return item.room.some(
        (it) => it.id.toString() === req.body.roomId.toString()
      );
    });
    if (!trans) {
      Room.findByIdAndRemove(req.body.roomId).then(() => {
        res.json({ message: "xóa thành công" });
      });
    } else {
      res.json({ message: "room này đang được book" });
    }
  });
};

exports.getEditHotel = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.idHotel);
  res.json(hotel);
};

exports.postEditHotel = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.idHotel);
  hotel.name = req.body.name;
  hotel.title = req.body.title;
  hotel.type = req.body.type;
  hotel.city = req.body.city;
  hotel.address = req.body.address;
  hotel.distance = req.body.distance;
  hotel.photos = req.body.images;
  hotel.desc = req.body.description;
  hotel.featured = req.body.featured;
  hotel.rating = req.body.rating;
  hotel.cheapestPrice = req.body.price;
  hotel.rooms = req.body.checkbox;
  await hotel.save();
  res.json("thành công");
};

exports.getEditRoom = async (req, res, next) => {
  const room = await Room.findById(req.params.idRoom);
  res.json(room);
};

exports.postEditRoom = async (req, res, next) => {
  const room = await Room.findById(req.params.idRoom);
  room.title = req.body.title;
  room.price = req.body.price;
  room.maxPeople = req.body.maxPeople;
  room.desc = req.body.description;
  room.roomNumbers = req.body.rooms;
  room.hotel = req.body.chooseHotelId;
  await room.save();
  res.json("thành công");
};
