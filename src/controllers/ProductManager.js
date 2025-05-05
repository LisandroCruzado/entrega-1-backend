import { promises as fs } from "fs";
import { nanoid } from "nanoid"; //A tiny, secure, URL-friendly, unique string ID generator for JavaScript.(https://www.npmjs.com/package/nanoid)

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json"; //ruta de la pseudo base de datos fs
  }

  /////////////////////////////////////SNIPPETS CUSTOM reutilizables para legibilidad y escalabilidad
  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8"); //guardo en variable la lectura + ruta donde estan los datos + formato
    return JSON.parse(products); //le paso la variable al variable y parseo
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product)); //espero una lectura
  };

  exist = async (id) => {
    // Llamamos todos los productos, y devuelve un objeto del producto si esta
    let products = await this.readProducts();
    return products.find((prod) => prod.id === id);
  };
  ////////////////////////////////////METODOS CRUD

  addProducts = async (product) => {
    //metodo asincrono de escritura de escritura de articulos
    let productsOld = await this.readProducts();
    product.id = nanoid(4);

    let productAll = [...productsOld, product]; //un array nuevo donde unifico el array viejo con el producto nuevo
    await this.writeProducts(productAll);
    return "Producto Agregado al JSON 🎁";
  };

  getProducts = async () => {
    // Maneja la solicitud GET de todos los productos
    return await this.readProducts();
  };

  getProductsById = async (id) => {
    let productsById = await this.exist(id); //Inyectamos un snippet
    if (!productsById) return `Producto no encontrado 🚫`;
    return productsById;
  };

  updateProducts = async (id, product) => {
    let productsById = await this.exist(id);
    if (!productsById) return `Producto no encontrado 🚫`;
    await this.deleteProducts(id);
    let productOld = await this.readProducts();
    let products = [{ ...product, id: id }, ...productOld]; // Unifico el id que entra por params con el contenido actualizado
    await this.writeProducts(products);
    return "Producto Actualizado ✔️";
  };

  deleteProducts = async (id) => {
    let products = await this.readProducts();
    /*Si hay concordancia de id(true/false) consecutivamente filtra un array de todos los prod cuyo
    id son distintos al ID que recibo*/
    let existProducts = products.some((prod) => prod.id === id);
    if (existProducts) {
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
      return "Producto Eliminado ✔️";
    }
    return "Producto a  Eliminar inexistente  🚫";
  };
}

export default ProductManager;
