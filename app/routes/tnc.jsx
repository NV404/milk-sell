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
          Our application is only for users who have ability to and willing to
          test the products.
        </li>
        <li>We are not responsible for any damage caused by the products.</li>
        <li>blah blah blah</li>
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
