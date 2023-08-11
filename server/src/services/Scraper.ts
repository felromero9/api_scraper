import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface productResult {
  total: number;
  count: number;
  products: Product[];
}

export class ProductScraper {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async fetchProducts(
    minPrice: number,
    maxPrice: number,
    maxDataPerCall: number
  ): Promise<productResult> {
    try {
      const response = await axios.get<Product[]>(this.apiUrl, {
        params: {
          limit: maxDataPerCall,
        },
      });

      const filteredProducts = response.data.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice;
      });

      const result: productResult = {
        total: response.data.length,
        count: filteredProducts.length,
        products: filteredProducts,
      };
      return result;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("An error occurred while fetching products.");
    }
  }
}
