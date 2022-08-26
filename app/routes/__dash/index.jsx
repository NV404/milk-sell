import { Link, useLoaderData } from "@remix-run/react";

import { getSellers } from "utils/seller.server";
import { getProducts } from "utils/product.server";
import Field from "~/components/Field";
import Button from "~/components/Button";
import Search from "~/icons/Search";
import Items from "~/components/Items";
import Sparkles from "~/icons/Sparkles";
import { getUserId } from "utils/session.server";
import { getUserById } from "utils/user.server";
import LangShow from "~/components/LanguageToggle";

export async function loader({ request }) {
  const userID = await getUserId(request);
  let user = null;
  if (userID) {
    user = await getUserById(userID);
  }
  const sellers = await getSellers();
  const products = await getProducts();

  return { sellers, products, user };
}

export default function Index() {
  const loaderData = useLoaderData();
  const user = loaderData.user;

  return (
    <div className="flex flex-col items-stretch justify-start gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <LangShow />
          <Link to="/cart/select-location?fromIndex=true">
            <fieldset className="h-full flex flex-col items-stretch justify-start gap-1 disabled:opacity-60 disabled:cursor-not-allowed">
              <label className="font-medium text-sm">Select Location</label>
              <div
                className="bg-white px-4 text-sm
             py-2 rounded-lg h-full text-black"
              >
                <p>
                  {user?.lat}, {user?.lng}
                </p>
              </div>
            </fieldset>
          </Link>
        </div>
        <Link
          to="/search"
          className="flex flex-col items-stretch justify-start gap-2"
        >
          <div className="flex justify-between gap-2">
            <Field
              placeholder="Eg. Milk"
              type="text"
              name="search"
              autoComplete="off"
            />
            <Button type="submit">
              <Search />
            </Button>
          </div>
        </Link>
      </div>

      {user ? (
        <>
          {user.isVendor ? (
            <div className="w-full rounded-lg bg-white p-5">
              <p className="text-lg font-bold">Name: {user.name}</p>
              <p className="font-medium">{user.vendorAddress}</p>
              <p>Daily capacity: 100 Litters</p>
              <p>Average Price: 20 ₹</p>
            </div>
          ) : null}
        </>
      ) : (
        <div className="w-full rounded-lg bg-white p-5">
          <p className="text-lg font-medium">Are you a company/org.?</p>
          <p className="font-medium">
            Click here to join and connect with farmers -
          </p>
          <Button as={Link} to="/login" className="mt-2">
            Join
          </Button>
        </div>
      )}

      <p>Categories</p>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between items-center px-8">
          <Link
            to="/category/milk"
            className="flex flex-col gap-2 items-center"
          >
            <div className="w-14 h-14 rounded-full bg-purple-200 overflow-hidden">
              <img src="/milk.png" />
            </div>
            <p className="text-medium">Milk</p>
          </Link>
          <Link
            to="/category/dahi"
            className="flex flex-col gap-2 items-center"
          >
            <div className="w-14 h-14 rounded-full bg-purple-200 overflow-hidden">
              <img src="/dahi.png" />
            </div>
            <p className="text-medium">Dahi</p>
          </Link>
          <Link
            to="/category/chach"
            className="flex flex-col gap-2 items-center"
          >
            <div className="w-14 h-14 rounded-full bg-purple-200 overflow-hidden">
              <img src="/chaach.png" />
            </div>
            <p className="text-medium">Chach</p>
          </Link>
        </div>
        <div className="w-full flex justify-between items-center px-8">
          <Link
            to="/category/panner"
            className="flex flex-col gap-2 items-center"
          >
            <div className="w-14 h-14 rounded-full bg-purple-200 overflow-hidden">
              <img src="/panner.png" />
            </div>
            <p className="text-medium">Panner</p>
          </Link>
          <Link
            to="/category/cow-dunk"
            className="flex flex-col gap-2 items-center"
          >
            <div className="w-14 h-14 rounded-full bg-purple-200 overflow-hidden">
              <img src="/cowDunk.png" />
            </div>
            <p className="text-medium">Cow Dunk</p>
          </Link>
          <Link
            to="/category/others"
            className="flex flex-col gap-2 items-center"
          >
            <div className="w-14 h-14 rounded-full bg-purple-200 overflow-hidden">
              <img src="/others.png" />
            </div>
            <p className="text-medium">Others</p>
          </Link>
        </div>
      </div>

      <p className="font-bold text-lg">diary's near you</p>

      <Items>
        {loaderData?.sellers?.map(function (seller) {
          return (
            <Link
              key={seller.id}
              to={`/shop/${seller.id}`}
              className="bg-white rounded-xl overflow-hidden flex flex-col items-stretch justify-start"
            >
              <div className="flex flex-col items-stretch justify-start gap-2 p-5">
                <p className="font-bold text-lg">{seller.shopName}</p>
                <span className="flex gap-2 items-center">
                  <Sparkles fill="green" />
                  <p>
                    <span className="font-medium">3.8</span> (100)
                  </p>
                </span>
              </div>
            </Link>
          );
        })}
      </Items>
    </div>
  );
}
