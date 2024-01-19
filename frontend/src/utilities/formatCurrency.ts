const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  })
  
  export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
  }


  export function formatPriceInDollarsAndCents(cents: number) {
    const dollars = Math.floor(cents / 100);
    const remainderCents = cents % 100;
    const formattedPrice = `$${dollars}.${remainderCents.toString().padStart(2, '0')}`;
    return formattedPrice;
  }