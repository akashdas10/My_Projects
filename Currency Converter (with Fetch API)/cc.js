const BASE_URL = "https://v6.exchangerate-api.com/v6/c271f64332f8eb2a1f1d9202/latest/";

const dropdowns = document.querySelectorAll("select");
const fromFlag = document.querySelector(".from img");
const toFlag = document.querySelector(".to img");
const amount = document.querySelector(".amount input");
const convertBtn = document.querySelector("button");
const result = document.querySelector(".result");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

for (let select of dropdowns){
    for (let currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        select.append(newOption);
    }
    
    if (select.name === "from") {
        select.value = "USD";
    } else if (select.name === "to") {
        select.value = "INR";
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

function updateFlag(element){
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

convertBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let fromCurr = dropdowns[0].value;
    let toCurr = dropdowns[1].value;
    let amountVal = amount.value;

    if (fromCurr === toCurr) {
        result.innerText = "You can't convert the same currency.";
        return;
    }

    if (amountVal === "" || amountVal <= 0) {
        result.innerText = "Please enter a valid amount.";
        amountVal = 1;
        amount.value = amountVal;
        return;
    }

    result.innerText = "Converting...";
    result.style.color = "#333";
    result.style.fontSize = "1.5rem";
    result.style.fontWeight = "bold";

    try {
        const URL = `${BASE_URL}${fromCurr}`;
        const response = await fetch(URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data);
        
        if (data.result === "success") {
            const rate = data.conversion_rates[toCurr];
            const finalAmount = (amountVal * rate).toFixed(2); // Convert to 2 decimal places
            result.innerText = `${amountVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
        } else {
            throw new Error('Currency conversion failed');
        }
    } catch (error) {
        result.innerText = "Error fetching exchange rate!";
        console.error("Error:", error);
    }
});

// Initialize flags on page load
window.addEventListener('load', () => {
    updateFlag(fromCurrency);
    updateFlag(toCurrency);
});