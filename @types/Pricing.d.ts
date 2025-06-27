declare namespace Pricing {
  // Common ISO 4217 currency codes like "USD", "EUR", "JPY"
  type CurrencyCode = string & { readonly __brand: unique symbol };

  // Base type for price values
  interface Price {
    /**
     *  Always stored in minor units (e.g. cents)
     */
    amount: number;
    currency?: CurrencyCode | "USD"; // Default to USD if not specified
  }

  // Optionally, tag price types if needed
  type PriceType = "total" | "tax" | "discount" | "shipping" | "unit";

  interface PriceLabel<T extends PriceType = PriceType> extends Price {
    /**
     * Optional human-friendly label like "Total Price", "Tax", etc.
     */
    label: string;
    type: T;
  }
}
