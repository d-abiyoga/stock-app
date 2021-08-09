console.log("App.js has been loaded");

// Input
const currentAveragePriceHTML = document.getElementById("currentAveragePrice");
const currentShareQuantityHTML = document.getElementById("currentShareQuantity"); 
const buyingPriceHTML = document.getElementById("buyingPrice"); 
const buyingQuantityHTML = document.getElementById("buyingQuantity"); 
const targetPriceHTML = document.getElementById("targetPrice");

// Output
const newAveragePriceHTML = document.getElementById("newAveragePrice");
const currentEquityHTML = document.getElementById("currentEquity");
const additionalEquityHTML = document.getElementById("additionalEquity");
const totalEquityHTML = document.getElementById("totalEquity");
const currentPotGLHTML = document.getElementById("currentPotGL");
const newPotGLHTML = document.getElementById("newPotGL");

// Function
function calcAveragePrice() {
    // Retrieve the float value
    let currentAveragePrice = parseFloat(currentAveragePriceHTML.value);
    let currentShareQuantity = parseFloat(currentShareQuantityHTML.value);
    let buyingPrice = parseFloat(buyingPriceHTML.value);
    let buyingQuantity = parseFloat(buyingQuantityHTML.value);

    // Calculating new average price
    let newAveragePrice = 0;
    newAveragePrice = ((currentAveragePrice * currentShareQuantity) + (buyingPrice * buyingQuantity)) / (currentShareQuantity + buyingQuantity);
    
    // Calculating equity and pot G/L
    let currentEquity = (currentAveragePrice * currentShareQuantity) * 100;
    let additionalEquity = (buyingPrice * buyingQuantity) * 100;
    let totalEquity = currentEquity + additionalEquity;
    let currentPotGL = (buyingPrice - currentAveragePrice)/ currentAveragePrice * 100;
    let newPotGL = (buyingPrice - newAveragePrice ) / buyingPrice * 100 ;

    console.log(additionalEquity);

    console.log(` below equation: ${ (buyingPrice * 100 * (currentShareQuantity + buyingQuantity)) * 100 }`);


    // Print the calculated price
    printAveragePrice(newAveragePrice.toFixed(2));
    printEquity(currentEquity, additionalEquity, totalEquity);
    printPotGL(currentPotGL, newPotGL);
}

function printAveragePrice(averagePrice) {
    newAveragePriceHTML.innerHTML = averagePrice;
}

function printEquity(currentEquity, additionalEquity, totalEquity) {
    currentEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(currentEquity)}`;
    additionalEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(additionalEquity)}`;
    totalEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(totalEquity)}`;
}

function printPotGL(currentPotGL, newPotGL) {
    currentPotGLHTML.innerHTML = `${currentPotGL.toFixed(2)}%`;
    newPotGLHTML.innerHTML = `${newPotGL.toFixed(2)}%`;
}


// ===========  Under development  ===================
/*
    Apply share price fraction based on idx regulation on https://www.idx.co.id/investor/mekanisme-perdagangan/
    Kelompok Kerja (Rp)          |   Fraksi Harga           | Maksimum Perubahan
    <200                                     |    Rp. 1                        |   Rp 10
    200 - 500                             |    Rp. 2                        |   Rp 20
    500 - 2000                           |    Rp. 5                        |   Rp 50
    2000 - 5000                         |    Rp. 10                      |   Rp 100
    >= 5000                                |    Rp. 25                      |   Rp 250
    Known bug: in transition number such as 200, 500, 2000, 5000

 */

    buyingPriceHTML.addEventListener("change" , (e) => {
    console.log(e.target);
    console.log(e.target.step);
    console.log(e);

    // Set step (share price fraction) value based on input price 
    if (e.target.value < 200) {
        return e.target.step = 1;
    } 
    // CURRENTLY TINKERING: break value at 200
    // else if (e.target.value == 200) {
    //     return e.target.step = 2;
    // }  

    else if (e.target.value < 500) {
        return e.target.step = 2;
    } 
    // CURRENTLY TINKERING: break value at 500
    else if (e.target.value == 500) {
        return e.target.step = 5;
    }

    // CURRENTLY TINKERING: break value at 2000
    else if (e.target.value == 2000) {
        return e.target.step = 10;
    }

    else if (e.target.value < 2000) {
        return e.target.step = 5;
    } 

    // CURRENTLY TINKERING: break value at 5000
    else if (e.target.value == 5000) {
        return e.target.step = 10;
    }
    else if (e.target.value < 5000) {
        return e.target.step = 10;
    } 

    else if (e.target.value > 5000 ) {
        return e.target.step = 25;
    } else {
        console.log("something error");
    }
});

// FEATURE: Retrieve ticker option from an array
const STOCKS = [
    {ticker: "ADMF", name: "Adira Dinamika Multi Finance Tbk PT" },
    {ticker: "BBNI", name: "Bank Negara Indonesia (Persero) Tbk PT" },
    {ticker: "SIDO", name: "Adaro Energy Tbk PT" },
    {ticker: "PBID", name: "Panca Budi Idaman Tbk PT" },
    {ticker: "SMDR", name: "Panca Budi Idaman Tbk PT" }
];

const tickerHTML = document.getElementById("ticker");

function generateTickerList(parentDiv, data) {
        data.forEach ( stock => {
        let option = parentDiv.appendChild(document.createElement("option"))
        option.value = stock.ticker;
        option.appendChild(document.createTextNode(stock.ticker));
    });
}

// Function call to generate ticker list
generateTickerList(tickerHTML, STOCKS);