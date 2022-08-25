import { useEffect } from "react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
} from "@remix-run/react";

import indexStylesRef from "./styles/index.css";
import { CartProvider } from "hooks/useCart";

export const meta = () => ({
  charset: "utf-8",
  title: "Gwale — Fast, fresh, and on time.",
  viewport: "width=device-width,initial-scale=1",

  "theme-color": "#000000",
});

export function links() {
  return [
    { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      href: "/icons/apple-touch-icon.png",
    },

    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    },
    { rel: "stylesheet", href: indexStylesRef },

    {
      rel: "manifest",
      href: "/resources/manifest.json",
    },
  ];
}
export default function App() {
  let location = useLocation();
  let matches = useMatches();

  let isMount = true;
  useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location]);

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta /> <Links />
      </head>
      <body className="h-full bg-purple-150">
        <div className="w-[min(640px,_100%)] h-full mx-auto p-4">
          <CartProvider>
            <Outlet />
          </CartProvider>
        </div>
        <ScrollRestoration />{" "}
        <script defer src="https://checkout.razorpay.com/v1/checkout.js" />
        <Scripts /> <LiveReload />
      </body>
    </html>
  );
}
