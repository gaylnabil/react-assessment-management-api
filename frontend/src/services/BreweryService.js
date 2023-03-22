import ServiceProvider from "../providers/ServiceProvider";

class BreweryService {
  constructor() {
    this.service = new ServiceProvider();
  }

  // url: GET api/breweries/:id
  async getBeer(id) {
    return await this.service.get("breweries", id);
  }

  // url: GET api/breweries
  async getAllBreweries() {
    return await this.service.getAll("breweries");
  }

  // url: POST api/breweries
  async addBeer(data) {
    return await this.service.post("breweries", data);
  }

  // url: PUT api/breweries/:id
  async updateBeer(id, data) {
    return await this.service.update("breweries", id, data);
  }

  // url: DELETE api/breweries/:id
  async deleteBeer(id) {
    return await this.service.delete("breweries", id);
  }

  // url: GET api/breweries/beers
  async getBrewersWithBeers() {
    return await this.getBreweriesWith("breweries", "beers");
  }
  async getBreweriesWith(...args) {
    const url = args.join("/", args);
    return await this.service.getAll(url);
  }
}

export default BreweryService;
