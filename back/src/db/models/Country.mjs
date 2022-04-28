import { CountryModel } from "../schemas/country.mjs";

class Country {
  //전체 국가 조회 (이름, 좌표)
  static async getAllCountry() {
    const country = await CountryModel.find({}).lean();
    return country;
  }
}

export { Country };
