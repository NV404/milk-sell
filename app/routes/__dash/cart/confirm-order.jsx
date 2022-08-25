import { redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import { useCart } from "hooks/useCart";
import { useEffect, useState } from "react";
import { createRazorpayOrder } from "utils/payment.server";
import { createOrder } from "utils/order.server";
import { getUser, getUserId } from "utils/session.server";
import Button from "~/components/Button";
import Card from "~/components/Card";
import Field from "~/components/Field";
import Items from "~/components/Items";
import Cash from "~/icons/Cash";
import Check from "~/icons/Check";
import CreditCard from "~/icons/CreditCard";
import { addToCart } from "utils/cart.server";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (!userID) {
    return redirect("/login");
  }

  const user = await getUser(request);
  return { user };
}

export async function action({ request }) {
  const formData = await request.formData();

  const items = JSON.parse(formData.get("cart"));
  const amount = parseInt(formData.get("amount"));
  const paymentType = formData.get("paymentType");

  if (items) {
    if (paymentType === "razorpay") {
      const orderId = await createRazorpayOrder(amount);
      return {
        items,
        orderId,
        key: process.env.RAZORPAY_KEY_ID,
        razorpay: true,
      };
    }

    if (paymentType === "cash") {
      const cartItems = await addToCart({ items, request });
      if (cartItems) {
        const order = await createOrder({ request });
        if (order) {
          return redirect("/orders?success=true");
        }
      }
    }
  }

  return;
}

export default function ConfirmOrder() {
  const actionData = useActionData();
  const transition = useTransition();

  const loaderData = useLoaderData();
  const user = loaderData.user;

  const { cart, totalAmount } = useCart();
  const [isCashChecked, setIsCashChecked] = useState(true);

  const [paymentFailed, setPaymentFailed] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (actionData && actionData.razorpay === true && !actionData?.errors) {
        const { amount, id: order_id, currency } = actionData.orderId;

        const options = {
          key: actionData.key,
          amount: amount,
          currency: currency,
          name: "Gawala",
          order_id: order_id,
          handler: async function (response) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              items: actionData.items,
            };

            await fetch("/api/checkPayment", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(async (res) => {
              setLoading(true);
              const data = await res.json();
              if (data?.success) {
                navigate("/orders?success=true");
              }
              if (data?.error) {
                setPaymentFailed(true);
                setLoading(false);
              }
            });
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    },
    [actionData, navigate]
  );

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
        <p className="text-lg flex flex-row items-baseline justify-between gap-2 border-t border-dashed border-neutral-600 pt-2">
          <span className="font-bold">Total</span>
          <span className="text-green-900 font-bold">₹{totalAmount}</span>
        </p>
      </div>

      <Card theme="blue">
        <div
          className="flex flex-row items-center justify-start gap-4"
          onClick={() => setIsCashChecked(true)}
        >
          <input type="radio" checked={isCashChecked === true} />
          <Cash />
          <p className="">
            <span className="font-bold">Pay on delivery</span>
            <br />
            <span className="text-sm font-medium">
              Cash, Paytm, PhonePe or any UPI.
            </span>
          </p>
        </div>
      </Card>

      <Card theme="green">
        <div
          className="flex flex-row items-center justify-start gap-4"
          onClick={() => setIsCashChecked(false)}
        >
          <input type="radio" checked={isCashChecked === false} />
          <CreditCard />
          <p className="">
            <span className="font-bold">Pay now</span>
            <br />
            <span className="text-sm font-medium">
              UPI, debit/credit cards, Net Banking etc.
            </span>
          </p>
        </div>
      </Card>

      <Form
        method="post"
        className="flex flex-col items-stretch justify-start gap-2"
      >
        <input
          type="hidden"
          name="paymentType"
          value={isCashChecked ? "cash" : "razorpay"}
        />
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input type="hidden" name="amount" value={totalAmount} />
        <Button
          type="submit"
          disabled={transition.state === "submitting" || isLoading}
        >
          <Check />
          <p>Confirm order</p>
        </Button>
      </Form>
    </div>
  );
}
