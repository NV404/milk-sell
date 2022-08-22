import { Form, useLoaderData } from "@remix-run/react";
import { searchProducts } from "utils/product.server";
import Button from "~/components/Button";
import Field from "~/components/Field";
import Item from "~/components/Item";
import Items from "~/components/Items";
import Search from "~/icons/Search";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const query = searchParams.get("search");

  if (query) {
    const tokens = query
      .trim()
      .split(" ")
      .map(function (token) {
        return encodeURIComponent(token.trim());
      });
    const tokensStringWithOR = tokens.join(" | ");

    const products = await searchProducts(tokensStringWithOR);

    if (products) {
      return { products, query };
    }

    return { query };
  }
  return { query };
}

export default function SearchPage() {
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
            placeholder="Eg. Milk"
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            defaultValue={loaderData?.query}
          />
          <Button type="submit">
            <Search />
          </Button>
        </div>
      </Form>

      {loaderData.products?.length > 0 ? (
        <Items>
          {loaderData.products?.map(function (product) {
            return <Item key={product.id} data={product} />;
          })}
        </Items>
      ) : null}
    </div>
  );
}
