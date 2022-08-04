import { emptyCart, getCart } from "./cart.server";
import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function createOrder(request) {
  const userID = await getUserId(request);
  const cart = await getCart(request);
  const deliveryCharge = await calculateDeliveryCharge(request);
  let price = 0;

  cart.map((item) => {
    price += item.product.price * item.quantity;
    return null;
  });

  const discount = price >= 100 ? Math.round((price / 100) * 5) : 0;

  const order = await db.order.create({
    data: {
      price: price - discount,
      userID: userID,
      deliveryCharge: deliveryCharge,
      carts: { connect: cart.map((item) => ({ id: item.id })) },
    },
    include: {
      carts: { include: { product: true } },
      user: true,
    },
  });
  if (order) {
    const newLine = "\n";
    const tabSpace = "  ";

    const textX = [
      `# Order`,
      newLine,
      `ID: ${order.id}`,
      newLine,
      newLine,

      `# Customer`,
      newLine,
      `Name: ${order.user.name}`,
      newLine,
      `Phone No.: ${order.user.number}`,
      newLine,
      newLine,

      `# Products`,
      newLine,
      order.carts.map(function (cartItem, index) {
        return [
          `${index + 1}. `,
          `${cartItem.product.name}`,
          cartItem.product?.weight
            ? ` (${cartItem.product.weight} ${cartItem.product.weightUnit})`
            : ``,
          newLine,
          `Quantity: ${cartItem.quantity} (${cartItem.product.packageType})`,
          newLine,
          `Price: ₹${cartItem.product.price} x ${cartItem.quantity} = ₹${(
            parseFloat(cartItem.product.price) * parseInt(cartItem.quantity)
          ).toFixed(2)}`,
          newLine
        ].join("");
      }),
      newLine,

      `# Address`,
      newLine,
      `${order.user.addressLine1}`,
      newLine,
      `${order.user?.addressLine2}`,
      newLine,
      newLine,

      `# Map Link`,
      newLine,
      `${order.user.addressLink}`,
      newLine,
      newLine,

      `# Billing`,
      newLine,
      `Final discounted price: ₹${parseFloat(order.price).toFixed(2)}`,
      newLine,
      `+ Delivery price: ₹${parseFloat(order.deliveryCharge).toFixed(2)}`,
      newLine,
      "--------------------",
      newLine,
      `= ₹${(parseFloat(order.price) + parseInt(order.deliveryCharge)).toFixed(
        2
      )} (final amount)`,
    ].join("");

    let text = `Price: ${
      parseInt(order.price) + parseInt(order.deliveryCharge)
    } \nName: ${order.user.name} \nNumber: ${order.user.number} \nAddress: ${
      order.user.addressLine1 + " " + order.user.addressLine2
    } \nAddress Link: ${order.user.addressLink} ${order.carts
      .map(
        (item) =>
          `\n_____________________\nProduct name: ${item.product.name} \nProduct qty: ${item.quantity}`
      )
      .join(" ")}\n_____________________\nOrder ID: ${order.id}`;

    await fetch(
      `https://api.telegram.org/bot5319732387:AAGMUJ2YZb0Wl4VaN3ugta_bUqId6rjwbjE/sendMessage?chat_id=-765178933&text=${encodeURIComponent(
        textX
      )}`,
      {
        method: "GET",
      }
    );
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

export async function calculateDeliveryCharge(request) {
  const userID = await getUserId(request);
  const order = await db.order.count({
    where: {
      userID: userID,
    },
  });
  if (order > 0) {
    return 20;
  }

  return order;
}
