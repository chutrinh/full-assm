const Transaction = require("../model/transaction");

exports.postAddReserve = async (req, res, next) => {
  const transaction = new Transaction({
    user: req.user,
    hotel: req.body.hotelId,
    room: req.body.rooms,
    dateStart: req.body.startDate,
    dateEnd: req.body.endDate,
    price: req.body.totalPrice,
    payment: req.body.payment,
    status: "booked",
  });
  await transaction.save();
  res.json(req.body);
};

exports.getTransactions = async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.user._id })
    .populate("hotel")
    .exec();
  res.json(transactions);
};

exports.getTransactionsDetail = async (req, res, next) => {
  const hotelId = req.body.hotelId;
  const transaction = await Transaction.find({ hotel: hotelId });
  res.json(transaction);
};
