import { db } from "./db.server";

export async function getSellers() {
  const sellers = await db.user.findMany({
    where: {
        isSeller: true
    },
    select: {
        shopName: true,
        id: true,
    }
  });

  return sellers;
}