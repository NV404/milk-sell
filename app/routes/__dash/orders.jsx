import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getUserId } from "utils/session.server";
import { getOrders } from "utils/order.server";
import Order from "~/components/Order";
import { useCart } from "hooks/useCart";
import { useEffect } from "react";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (!userID) {
    return redirect("/login");
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const clearStorage = searchParams.get("success") === "true";

  const orders = await getOrders(request);

  return { orders, clearStorage };
}

export default function Index() {
  const loaderData = useLoaderData();
  const clearStorage = loaderData?.clearStorage;

  const { clear } = useCart();

  useEffect(() => {
    if (clearStorage) {
      clear();
    }
  }, [clearStorage, clear]);

  return (
    <div className="flex flex-col-reverse gap-2">
      {loaderData?.orders?.map((order, idx) => {
        return <Order key={order.id} id={idx} data={order} />;
      })}
    </div>
  );
}
