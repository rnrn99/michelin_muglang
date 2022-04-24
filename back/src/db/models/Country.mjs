import { CountryModel } from "../schemas/country.mjs";

class Country {
  static async findByQuery(query) {
    const country = await CountryModel.find(query).lean();
    return country;
  }
}

export { Country };
