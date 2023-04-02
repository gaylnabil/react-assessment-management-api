import ServiceProvider from "../providers/ServiceProvider";

/**
 * A class representing a company service that interacts
 * with an API to perform CRUD operations on companies
 * and their products.
 * (master branch)
 * @class
 */
class CompanyService {
  constructor() {
    this.service = new ServiceProvider();
  }

  // url: GET api/companies/:id
  async getProduct(id) {
    return await this.service.get("companies", id);
  }

  // url: GET api/companies
  async getAllCompanies() {
    return await this.service.getAll("companies");
  }

  // url: POST api/companies
  async addProduct(data) {
    return await this.service.post("companies", data);
  }

  // url: PUT api/companies/:id
  async updateProduct(id, data) {
    return await this.service.update("companies", id, data);
  }

  // url: DELETE api/companies/:id
  async deleteProduct(id) {
    return await this.service.delete("companies", id);
  }

  // url: GET api/companies/products
  async getBrewersWithProducts() {
    return await this.getCompaniesWith("companies", "products");
  }
  async getCompaniesWith(...args) {
    const url = args.join("/", args);
    return await this.service.getAll(url);
  }
}

export default CompanyService;
