import { format } from "date-fns";
import { useState } from "react";
import Bolt from "~/icons/Bolt";
import Check from "~/icons/Check";
import Card from "./Card";
import Items from "./Items";

function X({ d }) {
  var countDownDate = new Date(d).getTime();
  const [y, setY] = useState(null);
  const [yo, setYo] = useState(null);
  setInterval(function () {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;

    setYo(
      Math.abs(-30 - Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)))
    );
    setY(Math.abs(-60 - Math.floor((timeleft % (1000 * 60)) / 1000)));
  }, 1000);

  return (
    <>
      {yo} min, {y} sec
    </>
  );
}

export default function Order({ data, id }) {
  return (
    <article className="bg-neutral-100 rounded-xl p-4 flex flex-col items-stretch justify-start gap-4">
      <div className="flex flex-col items-stretch justify-start">
        <p className="text-lg font-bold">#{id + 1}</p>
        <p className="text-xs">
          {format(new Date(data.createdAt), "dd MMM, yyyy")}
        </p>
      </div>

      {data.status === "in progress" ? (
        <Card theme="green">
          <Bolt />
          <p className="text-sm">
            <span className="font-bold">Order on the way,</span>
            <br />
            <span className="">
              <span className="font-medium">Estimated delivery in</span>
              <br />
              <span className="font-bold">
                <X d={data.createdAt} />
              </span>
              <span className="font-medium">.</span>
            </span>
          </p>
        </Card>
      ) : null}

      {data.status === "success" ? (
        <Card theme="blue">
          <Check />
          <p className="text-sm">
            <span className="font-medium">Order was</span>{" "}
            <span className="font-bold">delivered</span>
            <span className="font-medium">.</span>
          </p>
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
          ₹{parseFloat(data.price) + parseFloat(data.deliveryCharge)}
        </span>{" "}
        <span className="text-sm font-medium">total</span>
      </p>
    </article>
  );
}
