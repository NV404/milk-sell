import { useState } from "react";

import Button from "./Button";

export default function Toggles({
  name,
  triggerType = "submit",
  items = [],
  defaultValue = null,
  ...otherProps
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex flex-row items-stretch justify-start gap-2 overflow-x-auto">
      <input name={name} type="hidden" value={value} {...otherProps} />

      {items.map(function (item) {
        return (
          <Button
            key={item.value}
            type={triggerType}
            theme={value === item.value ? "blue" : "monochrome"}
            className="whitespace-nowrap"
            onClick={function () {
              setValue(value === item.value ? defaultValue : item.value);
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
