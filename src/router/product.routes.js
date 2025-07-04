import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js"; //importo el ProductManager para utilizar sus metodos

const ProductRouter = Router();
const product = new ProductManager();

ProductRouter.get("/", async (req, res) => {
  res.send(await product.getProducts());
});

ProductRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.getProductsById(id));
});

ProductRouter.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updateProduct = req.body;
  res.send(await product.updateProducts(id, updateProduct));
});

ProductRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deleteProducts(id));
});

ProductRouter.post("/", async (req, res) => {
  let newProduct = req.body; //alojo en una variable el objeto que el usuario me envia desde el cliente
  res.send(await product.addProducts(newProduct)); //envio el producto nuevo al json utilizando metodos del PM
});

export default ProductRouter;
