import ServiceProvider from "../providers/ServiceProvider";
import WholesalerService from "./WholesalerService";
import StockService from "./StockService";
class OrderService {
  constructor() {
    this.service = new ServiceProvider();
  }

  async getOrder(id) {
    return await this.service.get("orders", id);
  }

  async getAllOrders() {
    return await this.service.getAll("orders");
  }

  async addOrder(data) {
    return await this.service.post("orders", data);
  }

  async updateOrder(id, data) {
    return await this.service.update("orders", id, data);
  }

  async deleteOrder(id) {
    return await this.service.delete("orders", id);
  }

  // url: GET api/orders/wholesalers/beers
  async getOrdersWithWholesalersAndBeers() {
    return await this.getOrdersWith("orders", "wholesalers", "beers");
  }

  // url = api/wholesalers/${id}/beers
  async getWholesalerItsBeers(wholesalerId) {
    return await new WholesalerService().getWholesalerItsBeers(wholesalerId);
  }

  async getStockByWholesalerAndBeer(wholesalerId, beerId) {
    return await new StockService().getStockByWholesalerAndBeer(
      wholesalerId,
      beerId
    );
  }

  async getOrdersWith(...args) {
    const url = args.join("/", args);
    return await this.service.getAll(url);
  }
}

export default OrderService;
