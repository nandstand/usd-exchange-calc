import { fetchExchangeRates, fetchSupportedCurrencies } from './exchangeRateAPI.js';
import { convertCurrency } from './currencyConverter.js';


// Wait for DOM to load

document.addEventListener('DOMContentLoaded', async () => {
  const amountInput = document.getElementById('amount');
  const currencySelect = document.getElementById('currency');
  const convertButton = document.getElementById('convert');
  const resultParagraph = document.getElementById('result');

  // Fetch exchange rates and supported currencies from API
  // Then populate the currency select element with the supported currencies

  let exchangeRates;

  try {
    exchangeRates = await fetchExchangeRates();
    const supportedCurrencies = await fetchSupportedCurrencies();

    for (const currencyCode in supportedCurrencies) {
      const option = document.createElement('option');
      option.value = currencyCode;
      option.textContent = `${currencyCode} - ${supportedCurrencies[currencyCode]}`;
      currencySelect.appendChild(option);
    }
  } catch (error) {
    resultParagraph.textContent = `Error: ${error.message}`;
    return;
  }




  // Load previous app state from local storage
  // This just just resets the input fields to their previous values at the moment

  // TODO: Could add a way to save the API data to local storage to avoid
  // making a request on every page load -- would need to check if the data
  // is old, though

  const savedAmount = localStorage.getItem('amount');
  const savedTargetCurrency = localStorage.getItem('targetCurrency');

  if (savedAmount !== null) {
    amountInput.value = savedAmount;
  }

  if (savedTargetCurrency !== null) {
    currencySelect.value = savedTargetCurrency;
  }





  // Add event listener to convert button
  // Saves app state to local storage
  // Then converts the currency and displays the result

  convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const targetCurrency = currencySelect.value;

    // Save app state to local storage

    localStorage.setItem('amount', amount);
    localStorage.setItem('targetCurrency', targetCurrency);


    const usdRate = exchangeRates['USD'];
    const targetRate = exchangeRates[targetCurrency];

    if (isNaN(amount)) {
      resultParagraph.textContent = 'Error: Invalid amount';
      return;
    }

    const convertedAmount = convertCurrency(amount, usdRate, targetRate);
    resultParagraph.textContent = `${amount} USD is equal to ${convertedAmount.toFixed(2)} ${targetCurrency}`;
  });
});