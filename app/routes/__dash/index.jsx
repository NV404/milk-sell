import { useLoaderData } from "@remix-run/react";

import { getSellers } from "utils/seller.server";
import { getProducts } from "utils/product.server";
import Field from "~/components/Field";
import Button from "~/components/Button";
import Search from "~/icons/Search";
import Item from "~/components/Item";
import Toggles from "~/components/Toggles";
import Items from "~/components/Items";
// import { getBanner } from "utils/banner.server";
import { json } from "@remix-run/node";
import Sparkles from "~/icons/Sparkles";
import Categories from "~/components/Categories";
import LangShow from "~/components/LangCh";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const query = searchParams.get("search");
  let category = searchParams.get("category");
  if (category === "all") {
    category = null;
  }

  let sellers = [];
  let products = [];

  if (query) {
    // const tokens = query
    //   .trim()
    //   .split(" ")
    //   .map(function (token) {
    //     return encodeURIComponent(token.trim());
    //   });
    // const tokensStringWithOR = tokens.join(" | ");
    // products = await searchProducts(tokensStringWithOR, category);
  } else {
    sellers = await getSellers();
    products = await getProducts();
  }

  return json(
    { sellers, products, query, category: category || "all" },
    {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=10800",
      },
    }
  );
}

export default function Index() {
  const loaderData = useLoaderData();

  return (
    <div className="flex flex-col items-stretch justify-start gap-6">
      <div
        // replace
        // method="GET"
        className="flex flex-col items-stretch justify-start gap-2"
      >
        <div className="flex justify-between gap-2">
         
         
         
         
         <LangShow/>
        
        
          <Field
            placeholder="Eg. Milk"
            type="text"
            name="search"
            autoComplete="off"
            defaultValue={loaderData?.query}
          />
          <Button type="submit" theme="blue">
            <Search />
          </Button>
        </div>

        <Toggles
          triggerType="submit"
          name="category"
          items={loaderData?.categories?.map(function (cat) {
            return {
              value: cat.id,
              label: cat.name,
            };
          })}
          defaultValue={loaderData?.category}
        />
      </div>
      {/*
      <p className="text-sm">
        <span className="font-bold">{loaderData?.products?.length}</span>{" "}
        <span>products found</span> <span>in category</span>{" "}
        <span className="font-bold">
          {loaderData?.categories?.find(function (category) {
            return category.id === loaderData?.category;
          })?.name || "Unknown"}
        </span>
        {loaderData?.query ? (
          <>
            {" "}
            <span>for</span>{" "}
            <span className="font-bold">{loaderData?.query}</span>
          </>
        ) : null}
        {"."}
      </p>                                                                                                                                                                                                       
        */}

      
      <p className="font-bold">
        diary's near you{" "}
        <span className="font-medium text-sm">
          (a new page is needed to be created for card before 16)
        </span>
      </p>

      <Items>
        {loaderData?.sellers?.map(function (seller) {
          return (
            
            <div key   className="bg-neutral-100 rounded-xl overflow-hidden flex flex-col items-stretch justify-start">
              <img src="cow.jpg" alt="cow" className="rounded-xl" />
              <div className="flex flex-col items-stretch justify-start gap-2 p-5">
                <p className="font-bold text-lg">{seller.shopName}</p>
                <span className="flex gap-2 items-center">
                  <Sparkles fill="green" />
                  <p>
                    <span className="font-medium">3.8</span> (100)
                  </p>
                </span>
              </div>
            </div>
          );
        })}
      </Items>

      <p className="font-bold">
        products{" "}
        <span className="font-medium text-sm">
          (this section will be removed before 16)
        </span>
      </p>

      <Items>
        {loaderData?.products?.map(function (product) {
          return <Item key={product.id} data={product} />;
        })}
      </Items>
    </div>
  );
}
