import ServiceProvider from "../providers/ServiceProvider";

class BeerService {
  constructor() {
    this.service = new ServiceProvider();
  }

  // url: GET api/beers/:id
  async getBeer(id) {
    return await this.service.get("beers", id);
  }

  // url: GET api/beers
  async getAllBeers() {
    return await this.service.getAll("beers");
  }

  // url: POST api/beers
  async addBeer(data) {
    return await this.service.post("beers", data);
  }

  // url: PUT api/beers/:id
  async updateBeer(id, data) {
    return await this.service.update("beers", id, data);
  }

  // url: DELETE api/beers/:id
  async deleteBeer(id) {
    return await this.service.delete("beers", id);
  }

  async getBeersWith(...args) {
    const url = args.join("/", args);
    return await this.service.getAll(url);
  }
}

export default BeerService;
