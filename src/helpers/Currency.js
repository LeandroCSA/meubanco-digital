function toBRL (str) {
  return (
    str
  ).toLocaleString(
    'pt-br',
    {
      style: 'currency',
      currency: 'BRL'
    }
  )
}

function toUSD (str) {
  return (
    str
  ).toLocaleString(
    'en-US',
    {
      style: 'currency',
      currency: 'USD'
    }
  )
}

function currencyFormatChange (currentCurrency, value, dollar) {
  return currentCurrency === "brl"
    ? toBRL(value)
    : toUSD(value / Number(parseFloat(dollar)));
};

export {
  toBRL,
  toUSD,
  currencyFormatChange
}