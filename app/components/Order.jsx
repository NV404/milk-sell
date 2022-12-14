import { format } from "date-fns";
import Bolt from "~/icons/Bolt";
import Check from "~/icons/Check";
import Card from "./Card";
import Items from "./Items";

export default function Order({ data, id }) {
  return (
    <article className="bg-white rounded-xl p-4 flex flex-col items-stretch justify-start gap-4">
      <div className="flex flex-col items-stretch justify-start">
        <p className="text-lg font-bold">#{id + 1}</p>
        <p className="text-xs">
          {format(new Date(data.createdAt), "dd MMM, yyyy")}
        </p>
      </div>

      {data.status === "pending" ? (
        <Card theme="yellow">
          <p className="text-sm font-bold text-center w-full">
            Waiting for confirmation from farmer
          </p>
        </Card>
      ) : null}

      {data.status === "accepted" ? (
        <Card theme="green">
          <Bolt />
          <p className="text-sm font-bold">Your order is accepted</p>
        </Card>
      ) : null}

      {data.status === "rejected" ? (
        <Card theme="red">
          <p className="text-sm font-bold">Your order is rejected</p>
        </Card>
      ) : null}

      <Items>
        <p className="font-bold">
          <span className="text-blue-900">{data.carts.length}</span>{" "}
          <span>items</span>
        </p>
        {data.carts.map((item) => {
          return (
            <div key={item.id}>
              <p className="font-bold">{item.product.name}</p>
              <p className="text-sm">
                <span className="text-green-900 font-medium">
                  ₹{item.product.price}
                </span>
                {" x "}
                <span className="text-blue-900 font-medium">
                  {item.quantity}
                </span>
                {" = "}
                <span className="text-green-900 font-bold">
                  ₹{parseFloat(item.product.price) * item.quantity}
                </span>
              </p>
            </div>
          );
        })}
      </Items>

      <p className="md:text-center border-t border-neutral-400 border-dashed pt-2">
        <span className="text-green-900 font-bold">
          ₹{parseFloat(data.price)}
        </span>{" "}
        <span className="text-sm font-medium">total</span>
      </p>
    </article>
  );
}
