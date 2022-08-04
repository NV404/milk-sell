import { json } from "@remix-run/node";

export let loader = () => {
  return json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.DairyValley.in",
        sha256_cert_fingerprints: [
          "8F:31:FC:D5:72:FB:81:81:64:DE:25:B5:96:22:74:F1:B0:25:49:AF:53:39:C5:01:5E:C1:89:F1:D1:66:EB:B2",
        ],
      },
    },
  ]);
};
