import ServiceProvider from "../providers/ServiceProvider";

/**
 * A class representing a product service that interacts with
 * an API to perform CRUD operations on products.
 * @class
 */
class ProductService {
  constructor() {
    this.service = new ServiceProvider();
  }

  // url: GET api/products/:id
  async getProduct(id) {
    return await this.service.get("products", id);
  }

  // url: GET api/products
  async getAllProducts() {
    return await this.service.getAll("products");
  }

  // url: POST api/products
  async addProduct(data) {
    return await this.service.post("products", data);
  }

  // url: PUT api/products/:id
  async updateProduct(id, data) {
    return await this.service.update("products", id, data);
  }

  // url: DELETE api/products/:id
  async deleteProduct(id) {
    return await this.service.delete("products", id);
  }

  async getProductsWith(...args) {
    const url = args.join("/", args);
    return await this.service.getAll(url);
  }
}

export default ProductService;
