import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { getUser, getUserId } from "utils/session.server";
import { updateUser } from "utils/user.server";
import Button from "~/components/Button";
import Field from "~/components/Field";
import Pencil from "~/icons/Pencil";

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

  const name = formData.get("name");
  const addressLine1 = formData.get("address-1");
  const addressLine2 = formData.get("address-2");
  const user = await getUser(request);

  if (user && name) {
    if (
      user?.name !== name ||
      user?.addressLine1 !== addressLine1 ||
      user?.addressLine2 !== addressLine2
    ) {
      const data = {
        ...(user?.name !== name ? { name } : {}),
        ...(user?.addressLine1 !== addressLine1 ? { addressLine1 } : {}),
        ...(user?.addressLine2 !== addressLine2 ? { addressLine2 } : {}),
      };
      await updateUser({ request, data });
    }
    return {};
  }

  return { error: "values missing" };
}

export default function Index() {
  const loaderData = useLoaderData();
  const user = loaderData.user;
  const [name, setName] = useState(user?.name);
  const [address1, setAddress1] = useState(user?.addressLine1);
  const [address2, setAddress2] = useState(user?.addressLine2);
  // const address2 = useRef();

  return (
    <Form
      replace
      method="post"
      className="flex-1 flex flex-col items-stretch justify-start gap-2"
    >
      {/* <div className="rounded-xl p-4 flex flex-col text-center text-lg font-medium items-stretch justify-start gap-2">
        Contact us at 9079341254
      </div> */}
      <p className="text-lg font-bold">Edit your profile</p>
      <Field
        id="name"
        label="Name"
        placeholder="Eg. Wolf Gupta"
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        defaultValue={user?.name}
      />
      <Field
        id="number"
        label="Phone Number"
        type="text"
        defaultValue={user.number}
        disabled
      />
      <Field
        id="address"
        label="Address"
        type="text"
        onChange={(e) => setAddress1(e.target.value)}
        defaultValue={user?.addressLine1}
        placeholder="House No."
        name="address-1"
      />
      <Field
        type="text"
        placeholder="Colony/Street/Landmark"
        defaultValue={user?.addressLine2}
        onChange={(e) => setAddress2(e.target.value)}
        name="address-2"
      />
      <div className="flex-1"></div>
      <Button
        type="submit"
        disabled={
          user?.name == name &&
          user?.addressLine1 == address1 &&
          user?.addressLine2 == address2
        }
      >
        <Pencil />
        <span>Save new details</span>
      </Button>
      <Button as={Link} theme="red" to="/logout">
        Logout
      </Button>
    </Form>
  );
}
