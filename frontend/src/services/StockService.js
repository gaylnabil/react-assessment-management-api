import ServiceProvider from "../providers/ServiceProvider";

/**
 * A class representing a stock service that interacts with an API to perform CRUD operations on stocks.
 */
class StockService {
  /**
   * Creates an instance of StockService.
   **/
  constructor() {
    this.service = new ServiceProvider();
  }

  /**
   * Retrieves a single stock by ID from the API.
   *
   * @param {number} id - The ID of the stock to retrieve.
   * @returns {Promise<object>} - A promise that resolves with the retrieved stock object or rejects with an error message if unsuccessful.
   **/

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
