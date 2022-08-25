import Razorpay from "razorpay";
import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function createRazorpayOrder(count) {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const orderOptions = {
    amount: parseFloat(count) * 100,
    currency: "INR",
  };

  const order = await instance.orders.create(orderOptions);

  return order;
}

export async function addTransaction({
  request,
  sellerId,
  amount,
  paymentMode,
}) {
  const userId = await getUserId(request);
  const transaction = await db.payments.create({
    data: {
      userId,
      sellerId,
      amount,
      paymentMode,
    },
  });
  if (transaction) {
    return transaction;
  }
}
