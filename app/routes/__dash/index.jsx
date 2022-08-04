import { Form, useLoaderData } from "@remix-run/react";

import { getProducts } from "utils/product.server";
import Field from "~/components/Field";
import Button from "~/components/Button";
import Search from "~/icons/Search";
import Item from "~/components/Item";
import Toggles from "~/components/Toggles";
import Items from "~/components/Items";
// import { getBanner } from "utils/banner.server";
import { json } from "@remix-run/node";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const query = searchParams.get("search");
  let category = searchParams.get("category");
  if (category === "all") {
    category = null;
  }

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
    products = await getProducts(category);
  }

  return json(
    { products, query, category: category || "all" },
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
      <Form
        replace
        method="GET"
        className="flex flex-col items-stretch justify-start gap-2"
      >
        <div className="flex justify-between gap-2">
          <Field
            placeholder="Eg. Parle-G"
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
      </Form>

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

      <Items>
        {loaderData?.products?.map(function (product) {
          return <Item key={product.id} data={product} />;
        })}
      </Items>
    </div>
  );
}
