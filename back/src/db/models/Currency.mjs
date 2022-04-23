import { CurrencyModel } from "../schemas/currency.mjs";

class Currency {
  static async findByCode({ currency }) {
    const currency = await CurrencyModel.findOne({ currency });
    return currency;
  }
}

export { Currency };
