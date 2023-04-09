import ServiceProvider from "../providers/ServiceProvider";
import WholesalerService from "./WholesalerService";
import StockService from "./StockService";

/**
 * A service for managing orders and related data.
 *
 * This class provides methods for performing CRUD operations on orders,
 * retrieving orders with associated wholesalers and products, getting
 * information about a wholesaler's products, and checking stock levels
 * by wholesaler and product ID.
 **/
class OrderService {
  constructor() {
    this.service = new ServiceProvider();
  }

  // url: GET api/orders/:id
  async getOrder(id) {
    return await this.service.get("orders", id);
  }

  // url: GET api/orders
  async getAllOrders() {
    return await this.service.getAll("orders");
  }

  // url: POST api/orders
  async addOrder(data) {
    return await this.service.post("orders", data);
  }

  // url: PUT api/orders/:id
  async updateOrder(id, data) {
    return await this.service.update("orders", id, data);
  }

  // url: DELETE api/orders/:id
  async deleteOrder(id) {
    return await this.service.delete("orders", id);
  }

  // url: GET api/orders/wholesalers/products
  async getOrdersWithWholesalersAndProducts() {
    return await this.getOrdersWith("orders", "wholesalers", "products");
  }

  // url = api/wholesalers/${id}/products
  async getWholesalerItsProducts(wholesalerId) {
    return await new WholesalerService().getWholesalerItsProducts(wholesalerId);
  }

  async getStockByWholesalerAndProduct(wholesalerId, productId) {
    return await new StockService().getStockByWholesalerAndProduct(
      wholesalerId,
      productId
    );
  }

  async getOrdersWith(...args) {
    const url = args.join("/", args);
    return await this.service.getAll(url);
  }
}

export default OrderService;
