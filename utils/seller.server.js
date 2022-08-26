import { db } from "./db.server";
import { getUserId } from "./session.server";
import { getUserById } from "./user.server";

export async function getSellers() {
  const sellers = await db.user.findMany({
    where: {
      isSeller: true,
    },
    select: {
      shopName: true,
      id: true,
      dailyProduction: true,
    },
  });

  return sellers;
}

export async function subscribeSeller({ request, data }) {
  const subscribe = await db.subscription.create({
    data,
  });

  return subscribe;
}
