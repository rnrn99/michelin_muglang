import { CurrencyModel } from "../schemas/currency.mjs";

class Currency {
  static async findByCode({ currencyName }) {
    const currency = await CurrencyModel.findOne({ currency: currencyName });
    return currency;
  }
}

export { Currency };
