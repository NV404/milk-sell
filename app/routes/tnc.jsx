import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/Button";

export default function Index() {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col items-stretch h-full justify-between gap-6">
      <p className="font-bold text-3xl text-center">Terms & condition</p>
      <ul class="list-disc p-10">
        <li>
          The app is for connecting basic dairy farmers to consumers so that
          consumers don't have to pay any mediating or hidden expenses.
        </li>
        <li>
          Please note all products are raw and supplied directly from sellers.
          There is no interference whatsoever between the producer and the
          consumer.
        </li>
        <li>
          The application and developers, in any way, are NOT liable for the
          quality, transportation, or standards of the product mentioned in the
          application.
        </li>
        <li>
          Producers or Consumers are solely responsible for testing the product
          standards while accepting or receiving the orders.
        </li>
        <li>
          Our application strictly advises consumers with relevant testing
          equipment only to order directly from the source as there may or may
          not be the same conducted on the producer side.
        </li>
      </ul>
      <div className="flex flex-col gap-2">
        <Form method="post" className="flex gap-2">
          <input
            checked={isChecked}
            onChange={handleOnChange}
            type="checkbox"
            name="vendor"
            value={true}
          />
          <p onClick={handleOnChange}>I Agree</p>
        </Form>
        <Button disabled={!isChecked}>Next</Button>
      </div>
    </div>
  );
}
