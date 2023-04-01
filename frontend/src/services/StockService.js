import ServiceProvider from "../providers/ServiceProvider";

class StockService {
  constructor() {
    this.service = new ServiceProvider();
  }

  async getStock(id) {
    return await this.service.get("stocks", id);
  }

  async getAllStocks() {
    return await this.service.getAll("stocks");
  }

  async addStock(data) {
    return await this.service.post("stocks", data);
  }

  async updateStock(id, data) {
    return await this.service.update("stocks", id, data);
  }

  async deleteStock(id) {
    return await this.service.delete("stocks", id);
  }

  // GET: `api/stocks/wholesalers/${wId}/products/${bId}`
  async getStockByWholesalerAndProduct(wholesalerId, productId) {
    return await this.getStocksWith(
      "stocks",
      "wholesalers",
      wholesalerId,
      "products",
      productId
    );
  }

  // // GET: `api/stocks/wholesalers/{wholesalerId}/products/{productId}/quantities` return Quantity
  // async getQuantityStockByWholesalerAndProduct(wholesalerId, productId) {
  //   return await this.getStocksWith(
  //     "stocks",
  //     "wholesalers",
  //     wholesalerId,
  //     "products",
  //     productId,
  //     "quantities"
  //   );
  // }

  async getStocksWith(...args) {
    const url = args.join("/", args);
    return await this.service.getAll(url);
  }
}

export default StockService;
