// API URL
const API_URL = "https://open.er-api.com/v6/latest";

// Elements
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const selectedFlag = document.getElementById("selected-flag");
const selectedCurrencyName = document.getElementById("selected-currency-name");

// Currency details with names and flags
const currencyDetails = {
    USD: { name: "United States Dollar", flag: "us" },
    EUR: { name: "Euro", flag: "eu" },
    GBP: { name: "British Pound Sterling", flag: "gb" },
    JPY: { name: "Japanese Yen", flag: "jp" },
    AUD: { name: "Australian Dollar", flag: "au" },
    CAD: { name: "Canadian Dollar", flag: "ca" },
    BDT: { name: "Bangladeshi Taka", flag: "bd" },
    INR: { name: "Indian Rupee", flag: "in" },
    // Add more currencies as needed
};

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
    currencies.forEach((currency) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        if (currencyDetails[currency]) {
            const { name } = currencyDetails[currency];
            option1.value = currency;
            option1.textContent = `${currency} - ${name}`;
            option2.value = currency;
            option2.textContent = `${currency} - ${name}`;
        } else {
            option1.value = currency;
            option1.textContent = currency;

            option2.value = currency;
            option2.textContent = currency;
        }

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    // Set default selection
    if (fromCurrency.value) updateSelectedCurrency(fromCurrency.value);
}

// Update selected currency details
function updateSelectedCurrency(currencyCode) {
    if (currencyDetails[currencyCode]) {
        const { name, flag } = currencyDetails[currencyCode];
        selectedFlag.src = `https://flagcdn.com/w320/${flag}.png`; // High-quality flag image
        selectedFlag.classList.remove("hidden");
        selectedCurrencyName.textContent = `${currencyCode} - ${name}`;
    } else {
        selectedFlag.classList.add("hidden");
        selectedCurrencyName.textContent = "Select a currency";
    }
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

// Add change event listener to dropdown
fromCurrency.addEventListener("change", (e) => {
    updateSelectedCurrency(e.target.value);
});

// Initialize dropdowns
fetchCurrencies();
