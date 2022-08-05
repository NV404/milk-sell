import { Link } from "@remix-run/react";

import Item from "~/components/Item";
import { useCart } from "hooks/useCart";
import Button from "~/components/Button";
import ArrowRight from "~/icons/ArrowRight";
import Items from "~/components/Items";

export default function Index() {
  const { cart, count, totalAmount } = useCart();

  if (count < 1) {
    return <NoItems />;
  }

  return (
    <div className="flex flex-col items-stretch justify-start gap-4">
      <div className="flex flex-row items-baseline justify-between gap-2">
        <p className="font-bold text-lg">
          <span className="text-blue-900">{count}</span> items in cart
        </p>
        <p className="font-bold text-lg text-green-900">₹{totalAmount}</p>
      </div>

      <Items>
        {cart.map((product) => {
          return <Item key={product.id} data={product} />;
        })}
      </Items>

      <Button as={Link} to="select-address" theme="green">
        <span>Continue</span>
        <ArrowRight />
      </Button>
    </div>
  );
}

const NoItems = () => (
  <p className="text-center text-lg font-bold">There are no items in cart.</p>
);
