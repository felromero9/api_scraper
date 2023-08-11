import { Router, Request, Response } from "express";
import { ProductScraper } from "./src/services/Scraper";

export default async () => {
  const api = Router();

  api.get("/products", async (req: Request, res: Response) => {
    const apiUrl = "https://fakestoreapi.com/products";
    const minPrice = 50;
    const maxPrice = 1_000;
    const maxDataPerCall = 1_000;

    const productScraper = new ProductScraper(apiUrl);

    try {
      const allProducts = await productScraper.fetchProducts(
        minPrice,
        maxPrice,
        maxDataPerCall
      );
      res.json(allProducts);
    } catch (error) {
      console.error(`Error /products: ${error}`);
    }
  });

  return api;
};
