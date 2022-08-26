import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getUserId } from "utils/session.server";
import { getUserById, updateUser } from "utils/user.server";
import Button from "~/components/Button";
import Field from "~/components/Field";
import LocationMarker from "~/icons/LocationMarker";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (userID) {
    const user = await getUserById(userID);
    if (user.isVendor) {
      return redirect("/");
    }
    return {};
  }
  return redirect("/login");
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = {
    name: formData.get("name"),
    vendorAddress: formData.get("vendorAddress"),
    GSTNumber: formData.get("GSTNumber"),
    dailyConsumption: parseInt(formData.get("dailyConsumption")),
    aadharNumber: formData.get("aadharNumber"),
    isVendor: true,
  };

  const seller = await updateUser({ request, data });
  if (!seller) {
    return { error: "something went wrong" };
  }
  return redirect("/vendor/select-location");
}

export default function OnBoard() {
  return (
    <div className="flex justify-center flex-col items-stretch gap-8">
      <div>
        <p className="text-center font-medium text-2xl">Onboarding</p>
        <p className="text-center ">
          Provide this information to complete profile
        </p>
      </div>
      <Form
        className="relative grow flex justify-center flex-col items-stretch"
        method="post"
      >
        <div className="relative grow flex flex-col gap-4">
          <Field
            type="text"
            name="name"
            id="name"
            label="Enter name"
            placeholder="Eg. Saras"
            required
          />
          <Field
            type="text"
            name="vendorAddress"
            id="vendorAddress"
            label="Enter your business/org. address"
            placeholder="Eg. subhash nagar, bhilwara"
            required
          />
          <Field
            type="text"
            name="dailyConsumption"
            id="dailyConsumption"
            label="Enter your daily capacity in litres"
            placeholder="Eg. 100"
            required
          />
          <Field
            type="text"
            name="aadharNumber"
            id="aadharNumber"
            label="Enter your aadhar card number"
            placeholder="Eg. 1800xxxxxxxx69"
            required
          />
          <Field
            type="text"
            name="GSTNumber"
            id="GSTNumber"
            label="Enter your GST number"
            placeholder="Eg. 1800xxxxxxxx69"
            required
          />
        </div>
        <Button className="mt-12" type="submit" name="action" value="generate">
          <LocationMarker />
          Select Location
        </Button>
      </Form>
    </div>
  );
}
