const Order = require("../../../model/orderSchema");

exports.createOrder = async (req, res) => {
  const userId = req.user._id;
  const { shippingAddress, paymentDetails, items, totalAmount } = req.body;
  if (!shippingAddress || !paymentDetails || !items || !totalAmount) {
    return res.status(400).json({
      message: "Please provide shippingAddress,paymentDetails,item,totalAmount",
    });
  }
  await Order.create({
    user: userId,
    shippingAddress,
    paymentDetails,
    items,
    totalAmount,
  });
  res.status(201).json({ message: "Order created successfully" });
};

exports.getMyOrders = async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ user: userId }).populate("items.product");
  if (orders.length === 0) {
    return res.status(404).json({ message: "No orders found", data: [] });
  }
  res
    .status(200)
    .json({ message: "Orders retrieved successfully", data: orders });
};
