import { useLoaderData } from "@remix-run/react";
import { getProductsByCategory } from "utils/product.server";
import Button from "~/components/Button";
import Item from "~/components/Item";
import Items from "~/components/Items";

export async function loader({ params }) {
  const slug = params.slug;

  const products = await getProductsByCategory(slug);

  if (products) {
    return { products };
  }

  return {};
}

export default function Shop() {
  const loaderData = useLoaderData();
  const products = loaderData.products;
  const category = loaderData?.products[0]?.category;

  if (products.length <= 0) {
    return (
      <p className="text-center mt-10">Category does not any have products</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-5 flex flex-col gap-3">
        <p className="text-xl font-bold text-purple-700">{category.name}</p>
      </div>

      <Items>
        {products?.map(function (product) {
          return <Item key={product.id} data={product} />;
        })}
      </Items>
    </div>
  );
}
