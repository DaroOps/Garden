import { getRequestDetailsByProductCode, getGamaByName  } from "../helper.js";

const port = 5006
const endpoint = `http://localhost:${port}/products`


export const getProductByCode = async (code) => {
 const res = await fetch(`${endpoint}?code_product=${code}`);
 const data = await res.json();
 return data;
};

// 15. Devuelve un listado con todos los productos que pertenecen a la gama `Ornamentales` y que tienen más de `100` unidades en stock. El listado deberá estar ordenado por su precio de venta, mostrando en primer lugar los de mayor precio.

export const getProductsWithGammaOrnamentales = async () => {
 const res = await fetch(`${endpoint}?gama=Ornamentales&stock_gt=100`);
 const data = await res.json();
 return data.sort((a, b) => b.price_sale - a.price_sale);
};

// 8. Devuelve un listado de los productos que nunca han aparecido en un pedido.

export const getProductsWithoutRequest = async () => {
 const res = await fetch(`${endpoint}`);
 const products = await res.json();

 const productsWithoutRequest = await Promise.all(
   products.map(async (product) => {
     const details = await getRequestDetailsByProductCode(product.code_product);
     return details.length === 0 ? product : null;
   })
 );

 return productsWithoutRequest.filter(Boolean).map(({ code_product, name, gama }) => ({
   product_code: code_product,
   product_name: name,
   gama,
 }));
};

// 9. Devuelve un listado de los productos que nunca han aparecido en un pedido. El resultado debe mostrar el nombre, la descripción y la imagen del producto.

export const getProductsWithoutRequestWithDescription = async () => {
 const res = await fetch(`${endpoint}`);
 const products = await res.json();

 const productsWithoutRequest = await Promise.all(
   products.map(async (product) => {
     const details = await getRequestDetailsByProductCode(product.code_product);
     return details.length === 0 ? product : null;
   })
 );

 return productsWithoutRequest.filter(Boolean).map(({ code_product, name, description }) => ({
   product_code: code_product,
   product_name: name,
   description,
 }));
};