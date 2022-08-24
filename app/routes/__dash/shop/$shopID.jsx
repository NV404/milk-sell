import { useLoaderData } from "@remix-run/react";
import { getShopProducts } from "utils/product.server";
import { getUserId } from "utils/session.server";
import { getUserById } from "utils/user.server";
import Button from "~/components/Button";
import Item from "~/components/Item";
import Items from "~/components/Items";

export async function loader({ params, request }) {
  const shopID = params.shopID;

  const userID = await getUserId(request);
  let user = null;
  if(userID){
    user = await getUserById(userID);
  }
  const products = await getShopProducts(shopID);

  if (products) {
    return { products, user };
  }

  return {};
}

export default function Shop() {
  const loaderData = useLoaderData();
  const products = loaderData.products;
  const user = loaderData?.user;
  const seller = loaderData?.products[0]?.seller;

  if (products.length <= 0) {
    return (
      <p className="text-center mt-10">Store does not any have products</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-5 flex flex-col gap-3">
        <p className="text-xl font-bold text-purple-700">
          <span className="text-black">Shop Name:</span> {seller.shopName}
        </p>
        <Button>Subscribe</Button>
        {user?.isVendor ? <Button theme="monochrome">Ask details</Button> : null}
      </div>

      <Items>
        {products?.map(function (product) {
          return <Item key={product.id} data={product} />;
        })}
      </Items>
    </div>
  );
}
