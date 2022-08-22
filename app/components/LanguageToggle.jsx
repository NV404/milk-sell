import React from "react";
import { Form } from "@remix-run/react";
import Dropdown from "./Dropdown";

// Whether user is logged in needs to be taken from api
function LangShow() {
  let isLoggedIn = false;
  return <div>{isLoggedIn || <LangDr />}</div>;
}
export default LangShow;

function LangDr() {
  return (
    <div>
      <Form>
        <Dropdown
          label="Language"
          id="language"
          name="language"
          className="w-fit"
          options={[
            { value: "hindi", text: "Hindi" },
            { value: "english", text: "English" },
            { value: "tamil", text: "Tamil" },
          ]}
          required
        />
      </Form>
    </div>
  );
}
