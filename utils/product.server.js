import { db } from "./db.server";

export async function getProducts() {
  const products = await db.product.findMany({});

  return products;
}

// export async function getProductsByCategory(slug) {
//   const products = await db.product.findMany({
//     where: {
//       category: {
//         slug: slug,
//       },
//     },
//     include: {
//       category: true,
//     },
//   });
//   return products;
// }

// export async function searchProducts(query) {
//   const products = await db.product.findMany({
//     where: {
//       ...(category ? { categoryID: category } : {}),
//       OR: [
//         { name: { search: query } },
//         { description: { search: query } },
//         { keywords: { search: query } },
//       ],
//     },
//     include: {
//       category: true,
//     },
//   });
//   return products;
// }
