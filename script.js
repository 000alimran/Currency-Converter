// API URL
const API_URL = "https://open.er-api.com/v6/latest";

// Elements
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

// Fetch currency data
async function fetchCurrencies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        populateCurrencyDropdown(data.rates);
    } catch (error) {
        console.error("Error fetching currencies:", error);
        result.innerText = "Failed to fetch data.";
    }
}

// Populate currency dropdowns
function populateCurrencyDropdown(rates) {
    const currencies = Object.keys(rates);
    currencies.forEach(currency => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;

        const option2 = option1.cloneNode(true);

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });
}

// Convert currency
convertBtn.addEventListener("click", async () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    if (from && to && amountValue) {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const rate = data.rates[to];
            const convertedAmount = (amountValue * rate).toFixed(2);

            result.innerText = `${amountValue} ${from} = ${convertedAmount} ${to}`;
        } catch (error) {
            console.error("Conversion error:", error);
            result.innerText = "Failed to convert.";
        }
    } else {
        result.innerText = "Please fill out all fields.";
    }
});

// Initialize dropdowns
fetchCurrencies();
