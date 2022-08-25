import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";

import {
  createUserSession,
  generateOTP,
  getUserId,
  verifyOTP,
} from "utils/session.server";
import Field from "~/components/Field";
import ArrowRight from "~/icons/ArrowRight";
import Check from "~/icons/Check";

import Button from "../components/Button";
import Logo from "../icons/Logo";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (userID) {
    return redirect("/");
  }
  return json({});
}

export async function action({ request }) {
  const formData = await request.formData();

  const number = formData.get("number");
  const action = formData.get("action");
  const session = formData.get("session");
  const vendor = formData.get("vendor");
  const otp = formData.get("otp");

  if (number && action) {
    if (action === "generate") {
      if (number === "1111111111") {
        return {
          data: {
            session: "something",
            number: number,
          },
        };
      }
      const data = await generateOTP(number);
      if (data?.data) {
        return {
          data: {
            session: data?.data,
            number: number,
          },
        };
      }
      return { error: data?.error };
    }

    if (action === "verify") {
      const data = await verifyOTP(session, otp, number);
      if (data?.data) {
        if (vendor === "true") {
          return createUserSession(data?.data.id, "/vendor/onboard");
        }
        return createUserSession(data?.data.id, "/");
      }
      return {
        error: data?.error,
        data: {
          session: session,
          number: number,
        },
      };
    }
  }

  return { error: "all fields are required" };
}

export default function Login() {
  const transition = useTransition();
  const data = useActionData();

  return (
    <div className="min-h-full flex flex-col items-stretch justify-between">
      <header className="flex flex-row items-center justify-center gap-2">
        <Logo size={28} />
        <p className="font-black text-xl">Gwale</p>
      </header>
      <aside className="flex flex-col items-stretch justify-start gap-8">
        <h1 className="font-black text-4xl md:text-6xl">
          <span className="hidden">Gwale —</span>
          <span className="text-center">
            Get Every dairy product right from your home.
          </span>
        </h1>
      </aside>
      <main>
        <Form
          replace
          method="POST"
          className="flex flex-col items-stretch justify-start gap-2"
        >
          {data?.error && (
            <p className="px-2 py-1 bg-red-200 text-center text-red-600">
              {data.error}
            </p>
          )}

          <fieldset
            className="flex flex-col items-stretch justify-start gap-4"
            disabled={
              transition.state === "loading" ||
              transition.state === "submitting"
            }
          >
            {data?.data ? (
              <Verify session={data.data.session} number={data.data.number} />
            ) : (
              <Generate />
            )}
          </fieldset>
        </Form>
      </main>
    </div>
  );
}

function Generate() {
  return (
    <>
      <Field
        id="number"
        label="Enter your phone number"
        type="tel"
        name="number"
        placeholder="Eg. 9XXXXXXXXX"
        maxLength={10}
        required
      />

      <Button type="submit" name="action" value="generate">
        <span>Continue</span>
        <ArrowRight />
      </Button>
    </>
  );
}

function Verify({ session, number }) {
  return (
    <>
      <Field
        id="number"
        label="Enter OTP sent to your phone number"
        type="text"
        name="otp"
        placeholder="Eg. XXXXXX"
        maxLength={6}
        inputMode="numeric"
        autoComplete="one-time-code"
        required
      />

      <input type="hidden" name="session" value={session} />
      <input type="hidden" name="number" value={number} />

      <div className="flex gap-2">
        <input type="checkbox" name="vendor" value={true} />
        <p>I am a vendor with GST number</p>
      </div>

      <Button type="submit" name="action" value="verify">
        <Check />
        <span>Verify OTP</span>
      </Button>
    </>
  );
}
