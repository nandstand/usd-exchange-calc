const API_BASE_URL = 'https://openexchangerates.org/api';
const APP_ID = '1d9f15fd041c4af9b2518bdcc5909d3c'; 

export async function fetchExchangeRates() {
  const response = await fetch(`${API_BASE_URL}/latest.json?app_id=${APP_ID}`);

  if (!response.ok) {
    throw new Error(`Error fetching exchange rates: ${response.statusText}`);
  }

  const data = await response.json();
  return data.rates;
}

export async function fetchSupportedCurrencies() {
  const response = await fetch(`${API_BASE_URL}/currencies.json?app_id=${APP_ID}`);

  if (!response.ok) {
    throw new Error(`Error fetching supported currencies: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}