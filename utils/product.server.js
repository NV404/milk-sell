import { db } from "./db.server";

export async function getProducts() {
  const products = await db.product.findMany({});

  return products;
}

export async function getShopProducts(sellerId) {
  const products = await db.product.findMany({
    where: {
      sellerId
    },
    include: {
      seller: true
    }
  });

  return products;
}


export async function getProductsByCategory(slug) {
  const products = await db.product.findMany({
    where: {
      category: {
        slug: slug,
      },
    },
    include: {
      seller: true,
      category: true
    },
  });
  return products;
}

export async function searchProducts(query) {
  const products = await db.product.findMany({
    where: {
      name: { contains: query },
      description: { contains: query },
    },
    include: {
      seller: true
    },
  });
  return products;
}
