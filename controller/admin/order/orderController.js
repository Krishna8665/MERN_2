const Order = require("../../../model/orderSchema");

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find({ user: userId }).populate("items.product");
  if (orders == 0) {
    return res.status(404).json({ message: "No orders found", data: [] });
  }
  res
    .status(200)
    .json({ message: "Orders retrieved successfully", data: orders });
};
