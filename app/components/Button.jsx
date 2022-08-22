const PADDINGS = {
  small: "px-2 py-1",
  medium: "px-4 py-2",
};

const THEMES = {
  monochrome: "bg-black text-neutral-100",
  red: "bg-red-100 text-red-900",
  green: "bg-green-100 text-green-900",
  blue: "bg-blue-100 text-blue-900",
  purple: "bg-purple-700 text-white",
};

export default function Button({
  as: As = "button",
  children,
  theme = "purple",
  size = "medium",
  round = true,
  className = "",
  ...otherProps
}) {
  return (
    <As
      className={[
        PADDINGS[size],
        round ? "rounded-lg" : "",
        "flex flex-row items-center justify-center gap-2",
        "font-bold leading-none",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        THEMES[theme],
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </As>
  );
}
