import { useState, useEffect } from "react";

import { useCart } from "hooks/useCart";
import Minus from "~/icons/Minus";
import Plus from "~/icons/Plus";
import Trash from "~/icons/Trash";
import Button from "./Button";

export default function Item({ data }) {
  const {
    cart,
    add,
    remove,
    incrementQuantity,
    decrementQuantity,
    getQuantity,
  } = useCart();

  const [currentQuantity, setCurrentQuantity] = useState(getQuantity(data.id));

  useEffect(
    function () {
      setCurrentQuantity(getQuantity(data.id));
    },
    [data, cart, getQuantity]
  );

  return (
    <article className="bg-neutral-100 rounded-xl p-4 flex flex-col items-stretch justify-start gap-2">
      <img
        src={data.imageURL}
        alt={`${data.name}`}
        loading="lazy"
        className="w-full h-[25vh] object-scale-down rounded-xl bg-white"
      />

      <div className="flex flex-col items-stretch justify-start">
        <p className="font-bold text-lg">{data.name}</p>
        {data?.category ? (
          <p className="text-sm text-neutral-600">{data.category.name}</p>
        ) : null}
      </div>

      <p className="">
        <span className="font-bold text-green-900">₹{data?.price}</span>
        {" per "}
        <span className="font-medium">
          {data?.weight} {data?.weightUnit}
        </span>{" "}
        ({data?.packageType})
      </p>

      {data?.description ? (
        <p className="text-neutral-600 text-sm">{data.description}</p>
      ) : null}

      <div className="flex flex-row items-center justify-end flex-wrap gap-2">
        <div className="flex flex-row items-stretch justify-start">
          {currentQuantity > 1 ? (
            <Button
              theme="red"
              size="small"
              className="mr-4"
              onClick={function () {
                remove(data.id);
              }}
            >
              <Trash />
            </Button>
          ) : null}

          <Button
            theme="red"
            size="small"
            round={false}
            className="rounded-l"
            onClick={() => {
              decrementQuantity(data.id);
            }}
            disabled={currentQuantity < 1}
          >
            <Minus />
          </Button>
          <div className="p-2 min-w-[3ch] text-center bg-white font-bold text-blue-900 leading-none">
            {currentQuantity}
          </div>

          <Button
            theme="green"
            size="small"
            round={false}
            className="rounded-r"
            onClick={function () {
              currentQuantity < 1 ? add(data) : incrementQuantity(data.id);
            }}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </article>
  );
}
