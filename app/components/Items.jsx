export default function Items({ children, className = "", ...otherProps }) {
  return (
    <div
      className={[
        "flex flex-col items-stretch justify-start gap-2",
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </div>
  );
}
