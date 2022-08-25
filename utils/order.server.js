import { emptyCart, getCart } from "./cart.server";
import { db } from "./db.server";
import { addTransaction } from "./payment.server";
import { getUserId } from "./session.server";
import { getUserById } from "./user.server";

export async function createOrder({ request, paymentMode = "cash" }) {
  const userID = await getUserId(request);
  const user = await getUserById(userID);
  const cart = await getCart(request);
  let price = 0;

  cart.map((item) => {
    price += item.product.price * item.quantity;
    return null;
  });

  const order = await db.order.create({
    data: {
      price: price,
      userID: userID,
      sellerId: cart[0]?.product.sellerId,
      addressLine1: user.addressLine1,
      addressLine2: user.addressLine2,
      lat: user.lat,
      lng: user.lng,
      paymentMode,
      carts: { connect: cart.map((item) => ({ id: item.id })) },
    },
    include: {
      carts: { include: { product: true } },
      user: true,
    },
  });
  if (order) {
    const cart = await emptyCart(request);
    if (cart) {
      return cart;
    }
    return;
  }
  return;
}

export async function getOrders(request) {
  const userID = await getUserId(request);
  const order = await db.order.findMany({
    where: {
      userID: userID,
    },
    include: {
      carts: { include: { product: true } },
    },
  });
  if (order) {
    return order;
  }
}
