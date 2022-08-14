import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getUser, getUserId } from "utils/session.server";
import { updateUser } from "utils/user.server";
import Button from "~/components/Button";
import Field from "~/components/Field";
import LocationMarker from "~/icons/LocationMarker";

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
    return redirect("/cart/select-location");
  }

  return { error: "values missing" };
}

export default function SelectAddress() {
  const loaderData = useLoaderData();
  const user = loaderData?.user;

  return (
    <div className="flex-1 flex flex-col items-stretch justify-start gap-4">
      <div className="flex flex-row items-end justify-start">
        <p className="font-bold text-lg">Enter delivery details</p>
      </div>
      <Form
        method="post"
        className="flex-1 flex flex-col items-stretch justify-start gap-2"
      >
        <Field
          id="name"
          label="Name"
          placeholder="Eg. Wolf Gupta"
          type="text"
          name="name"
          defaultValue={user?.name}
          required
        />
        <Field
          id="address"
          label="Address"
          type="text"
          defaultValue={user?.addressLine1}
          placeholder="House No."
          name="address-1"
          required
        />
        <Field
          type="text"
          defaultValue={user?.addressLine2}
          placeholder="Colony/Street/Landmark"
          name="address-2"
        />

        <div className="flex-1"></div>
        <Button theme="green" type="submit">
          <LocationMarker />
          <span>Confirm details</span>
        </Button>
      </Form>
    </div>
  );
}
