import { Outlet, Link, NavLink, useTransition } from "@remix-run/react";
import NProgress from "nprogress";
import nProgressStyles from "../styles/nprogress.css";
import { useEffect } from "react";
import Home from "~/icons/Home";
import Cart from "~/icons/Cart";
import Clock from "~/icons/Clock";
import Logo from "~/icons/Logo";
import { useCart } from "hooks/useCart";

export function links() {
  return [{ rel: "stylesheet", href: nProgressStyles }];
}

function NavL({ children, to, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={function ({ isActive }) {
        return `flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl font-bold ${
          isActive ? "text-black bg-purple-200" : "text-slate-700"
        }`;
      }}
    >
      <Icon size={25} />
      <span className="text-xs font-normal">{children}</span>
    </NavLink>
  );
}

export default function __Dash() {
  let transition = useTransition();
  const { count } = useCart();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    if (transition.state !== "idle") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [transition.state]);

  return (
    <>
      <div className="h-full flex flex-col items-stretch justify-start gap-4">
        <nav className="flex flex-row items-center justify-between flex-wrap gap-4">
          <Link
            to="/"
            className="flex flex-row items-center justify-center gap-2"
          >
            <Logo size={24} />
            <h1 className="text-center font-black text-lg">DairyValley</h1>
          </Link>

          <div className="flex flex-row items-center justify-end gap-4">
            <NavLink
              to="/"
              className={function ({ isActive }) {
                return isActive ? "hidden" : "";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width={24}
                height={24}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </NavLink>
            <NavLink
              to="/account"
              className={function ({ isActive }) {
                return isActive ? "hidden" : "";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width={24}
                height={24}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </NavLink>
          </div>
        </nav>

        <main className="flex-1 flex flex-col items-stretch justify-start pb-24">
          <Outlet />
        </main>
        <nav className="max-w-[640px] mx-auto fixed bottom-0 left-0 right-0 flex items-stretch justify-start gap-2 z-10 rounded-t-xl bg-neutral-50/80 backdrop-blur px-4 py-2">
          <NavL to="/" icon={Home}>
            Home
          </NavL>
          <NavL to="/cart" icon={Cart}>
            Cart
            {count > 0 ? (
              <span className="ml-1 text-xs text-blue-900">({count})</span>
            ) : null}
          </NavL>
          <NavL to="/orders" icon={Clock}>
            Orders
          </NavL>
        </nav>
      </div>
    </>
  );
}
