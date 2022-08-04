import { db } from "./db.server";

export async function getBanner() {
  const banner = await db.banner.findMany();
  if (banner) {
    return banner;
  }
}
