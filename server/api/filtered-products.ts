import { Product } from "~/models/product.module";

export interface Query {
  field: keyof Product;
  name: string;
}
const getFilteredProducts = (products: Product[], query: Query) => {
  if (query.field && query.name) {
    return products.filter((card) => card[query.field] === query.name);
  } else {
    return products;
  }
};

export default defineEventHandler(async (event) => {
  const { field, name }: Query = getQuery(event);
  const products: Product[] = await $fetch(
    "https://wb-nuxt-default-rtdb.firebaseio.com/data.json"
  );
  return getFilteredProducts(products, {
    field,
    name,
  });
});
