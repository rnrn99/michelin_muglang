import { CurrencyModel } from "../schemas/currency.mjs";

class Currency {
  static async findByCode({ code }) {
    const currency = await CurrencyModel.findOne({ code }).lean();
    return currency;
  }
}

export { Currency };
