import { promises as fs } from "fs";
import { nanoid } from "nanoid"; //A tiny, secure, URL-friendly, unique string ID generator for JavaScript.(https://www.npmjs.com/package/nanoid)
import ProductManager from "./ProductManager.js";

const productALL = new ProductManager();

class CartManager {
  constructor() {
    this.path = "./src/models/carts.json";
  }
  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8"); //guardo en variable la lectura + ruta donde estan los datos + formato
    return JSON.parse(carts); //le paso la variable al variable y parseo
  };

  writeCarts = async (carts) => {
    await fs.writeFile(this.path, JSON.stringify(carts)); //espero una lectura
  };

  addCarts = async () => {
    let cartsOld = await this.readCarts();
    let id = nanoid();
    let cartsConcat = [{ id: id, products: [] }, ...cartsOld];
    await this.writeCarts(cartsConcat);
    return "Carrito agregado 🛒";
  };

  exist = async (id) => {
    // Llamamos todos los productos, y devuelve un objeto del producto si esta
    let carts = await this.readCarts();
    return carts.find((cart) => cart.id === id);
  };

  getCartsById = async (id) => {
    let cartById = await this.exist(id); //Inyectamos un snippet
    if (!cartById) return `Carrito no encontrado 🚫`;
    return cartById;
  };

  addProductInCart = async (cartId, productId) => {
    let cartById = await this.exist(cartId); //Inyectamos un snippet
    if (!cartById) return `Carrito no encontrado 🚫`;
    let productById = await productALL.exist(productId);
    if (!cartById) return `Producto no encontrado 🚫`;

    let cartsALL = await this.readCarts();
    let cartFilter = cartsALL.filter((cart) => cart.id != cartId);

    if (cartById.products.some((prod) => prod.id === productId)) {
      let moreProductInCart = cartById.products.find(
        (prod) => prod.id === productId
      );
      moreProductInCart.cantidad++;
      let cartsConcat = [cartById, ...cartFilter];
      await this.writeCarts(cartsConcat);
      return "Producto sumado al Carrito ✔️🛒";
    }

    cartById.products.push({
      id: productById.id,
      cantidad: 1,
    });

    let cartsConcat = [cartById, ...cartFilter];
    await this.writeCarts(cartsConcat);
    return "Producto Agregado al Carrito ✔️🛒";
  };
}

export default CartManager;
