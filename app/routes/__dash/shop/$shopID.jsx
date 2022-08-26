import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getShopProducts } from "utils/product.server";
import { subscribeSeller } from "utils/seller.server";
import { getUserId } from "utils/session.server";
import { getUserById } from "utils/user.server";
import Button from "~/components/Button";
import Dialog from "~/components/Dialog";
import Field from "~/components/Field";
import Item from "~/components/Item";
import Items from "~/components/Items";

export async function loader({ params, request }) {
  const shopID = params.shopID;

  const userID = await getUserId(request);
  let user = null;
  if (userID) {
    user = await getUserById(userID);
  }
  const products = await getShopProducts(shopID);

  if (products) {
    return { products, user };
  }

  return {};
}

export async function action({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");
  const sellerId = formData.get("sellerId");
  const message = formData.get("message");

  const userId = await getUserId(request);

  const data = {
    status: "active",
    userId,
    sellerId,
    message,
  };

  console.log(userId, sellerId, message, "anyway");

  if (action === "subscribe") {
    await subscribeSeller({ request, data });
    return redirect("/");
  }
}

export default function Shop() {
  const loaderData = useLoaderData();
  const products = loaderData.products;
  const user = loaderData?.user;
  const seller = loaderData?.products[0]?.seller;

  const [subscribe, setSubscribe] = useState(false);
  const [details, setDetails] = useState(false);

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
        <Dialog
          title="Subscribe"
          isOpen={subscribe}
          close={() => setSubscribe(false)}
        >
          <Form method="post">
            <input type="hidden" name="action" value="subscribe" />
            <input type="hidden" name="sellerId" value={seller.id} />
            <Field
              as="textarea"
              id="message"
              label="Message (for farmer)"
              type="text"
              name="message"
              className="bg-slate-200 h-28"
              placeholder="Eg. 1.5L milk at evening 5'o clock"
              required
            />
            <Button className="w-full mt-4">Subscribe</Button>
          </Form>
        </Dialog>
        <div className="w-full">
          <Button
            className="w-full"
            onClick={() => {
              if (user) setSubscribe(true);
            }}
          >
            Subscribe
          </Button>
        </div>
        {user?.isVendor ? (
          <>
            <Dialog
              title="Ask Details"
              isOpen={details}
              close={() => setDetails(false)}
            >
              <Form method="post">
                <input type="hidden" name="action" value="subscribe" />
                <input type="hidden" name="sellerId" value={seller.id} />
                <Field
                  as="textarea"
                  id="message"
                  label="Message (for farmer)"
                  type="text"
                  name="message"
                  className="bg-slate-200 h-28"
                  placeholder="Eg. how much milk can you provide in a week"
                  required
                />
                <Button className="w-full mt-4">Ask</Button>
              </Form>
            </Dialog>
            <Button onClick={() => setDetails(true)} theme="monochrome">
              Ask details
            </Button>
          </>
        ) : null}
      </div>

      <Items>
        {products?.map(function (product) {
          return <Item key={product.id} data={product} />;
        })}
      </Items>
    </div>
  );
}
