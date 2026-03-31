const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: [
      {
        quantity: { type: Number, required: true },
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["pending", "delivered", "cancelled", "ontheway", "preparation"],
      default: "pending",
    },
    paymentDetails: {
      method: { type: String, enum: ["COD", "khalti"] },
      status: {
        type: String,
        enum: ["paid", "unpaid", "pending"],
        default: "pending",
      },
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
