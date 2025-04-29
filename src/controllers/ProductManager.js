import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json"; //ruta de la pseudo base de datos fs
  }

  writeProducts = async (product) => {
    //metodo de escritura de articulos
    let products = await fs.readFile(this.path, "utf-8"); //guardo en variable la lectura + ruta donde estan los datos + formato
    let productsParse = JSON.parse(products); //le paso la variable al variable y parseo
    let productAll = [...productsParse, product]; //unifico en un mismo array la bse de datos + el producto nuevo
    await fs.writeFile(this.path, JSON.stringify(productAll));
  };
}

const product = new ProductManager();
product.writeProducts();
