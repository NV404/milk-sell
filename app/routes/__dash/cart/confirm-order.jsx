import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useCart } from "hooks/useCart";
import { addToCart } from "utils/cart.server";
import { calculateDeliveryCharge, createOrder } from "utils/order.server";
import { getUser, getUserId } from "utils/session.server";
import Button from "~/components/Button";
import Card from "~/components/Card";
import Field from "~/components/Field";
import Items from "~/components/Items";
import Cash from "~/icons/Cash";
import Check from "~/icons/Check";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (!userID) {
    return redirect("/login");
  }

  const user = await getUser(request);
  const deliveryCharge = await calculateDeliveryCharge(request);
  return { user, deliveryCharge };
}

export async function action({ request }) {
  const formData = await request.formData();

  const items = JSON.parse(formData.get("cart"));

  if (items) {
    const cartItems = await addToCart({ items, request });
    if (cartItems) {
      const order = await createOrder(request);
      if (order) {
        return redirect("/orders?success=true");
      }
    }
  }

  return;
}

export default function ConfirmOrder() {
  const loaderData = useLoaderData();
  const user = loaderData.user;
  const deliveryCharge = loaderData.deliveryCharge;

  const { cart, totalAmount } = useCart();

  const discount =
    totalAmount >= 100 ? Math.round((totalAmount / 100) * 5) : false;

  return (
    <div className="flex flex-col justify-start gap-4">
      <fieldset
        className="flex-1 flex flex-col items-stretch justify-start gap-2"
        disabled
      >
        <Field
          id="name"
          label="Name"
          placeholder="Eg. Wolf Gupta"
          type="text"
          name="name"
          defaultValue={user.name}
          required
        />
        <Field
          id="address"
          label="Address"
          type="text"
          defaultValue={user.addressLine1}
          placeholder="House No."
          name="address-1"
          required
        />
        <Field
          type="text"
          defaultValue={user.addressLine2}
          placeholder="Colony/Street/Landmark"
          name="address-2"
        />
      </fieldset>

      <div className="flex flex-col items-stretch justify-start gap-2 p-4 rounded-xl bg-neutral-100">
        <Items>
          <p className="font-bold">
            <span className="text-blue-900">{cart.length}</span>{" "}
            <span>items</span>
          </p>
          {cart.map((item) => {
            return (
              <div key={item.id}>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm flex flex-row items-baseline justify-between gap-2">
                  <span>
                    <span className="text-green-900 font-medium">
                      ₹{item.price}
                    </span>
                    {" x "}
                    <span className="text-blue-900 font-medium">
                      {item.quantity}
                    </span>
                  </span>
                  <span className="text-green-900 font-bold">
                    ₹{parseFloat(item.price) * parseInt(item.quantity)}
                  </span>
                </p>
              </div>
            );
          })}
        </Items>
        <p className="flex flex-row items-baseline justify-between gap-2">
          <span className="font-bold">Subtotal</span>
          <span className="text-green-900 font-bold">₹{totalAmount}</span>
        </p>
        {discount ? (
          <p className="text-sm flex flex-row items-baseline justify-between gap-2 border-t border-dashed border-neutral-400 pt-2">
            <span className="font-bold">- Discount (5%)</span>
            <span className="text-green-900 font-bold">₹{discount}</span>
          </p>
        ) : null}
        <p className="text-sm flex flex-row items-baseline justify-between gap-2 border-t border-dashed border-neutral-400 pt-2">
          <span className="font-bold">+ Delivery charges</span>
          <span className="text-green-900 font-bold">₹{deliveryCharge}</span>
        </p>
        <p className="text-lg flex flex-row items-baseline justify-between gap-2 border-t border-dashed border-neutral-600 pt-2">
          <span className="font-bold">Total</span>
          <span className="text-green-900 font-bold">
            ₹
            {deliveryCharge + (discount ? totalAmount - discount : totalAmount)}
          </span>
        </p>
      </div>

      <Card theme="blue">
        <Cash />
        <p className="">
          <span className="font-bold">Pay on delivery</span>
          <br />
          <span className="text-sm font-medium">
            Cash, Paytm, PhonePe or any UPI.
          </span>
        </p>
      </Card>

      <Form
        method="post"
        className="flex flex-col items-stretch justify-start gap-2"
      >
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <Button
          type="submit"
          theme="green"
          className="umami--click--confirm-order"
        >
          <Check />
          <p>Confirm order</p>
        </Button>
      </Form>
    </div>
  );
}
