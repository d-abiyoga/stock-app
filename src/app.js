console.log("App.js has been loaded");

// Input
const currentAveragePriceHTML = document.getElementById("currentSharePrice");
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
    let currentPotGL = (currentEquity - (buyingPrice * currentShareQuantity * 100))/ (buyingPrice * 100 * currentShareQuantity) * 100;
    let newPotGL = (newAveragePrice - buyingPrice) / buyingPrice * 100 ;

    console.log(additionalEquity);

    console.log(` below equation: ${ (buyingPrice * 100 * (currentShareQuantity + buyingQuantity)) * 100 }`);


    // Print the calculated price
    printAveragePrice(newAveragePrice.toFixed(2));
    printEquity(currentEquity, additionalEquity, totalEquity);
    printPotGL(currentPotGL, newPotGL);

    /*
    // Checking the values
    console.log(`current average price: ${typeof currentAveragePrice}`);
    console.log(`currentShareQuantity: ${typeof currentShareQuantity}`);
    console.log(`buying price: ${typeof buyingPrice}`);
    console.log(`buying quantity: ${typeof buyingQuantity}`);

    console.log(`above:  ${((currentAveragePrice * currentShareQuantity) + (buyingPrice * buyingQuantity))}`);
    console.log(`below: ${currentShareQuantity + buyingQuantity}`);
    */  
}

function printAveragePrice(averagePrice) {
    newAveragePriceHTML.innerHTML = averagePrice;
}

function printEquity(currentEquity, additionalEquity, totalEquity) {
    currentEquityHTML.innerHTML = `Rp. ${currentEquity}`;
    additionalEquityHTML.innerHTML = `Rp. ${additionalEquity}`;
    totalEquityHTML.innerHTML = `Rp. ${totalEquity}`;
}

function printPotGL(currentPotGL, newPotGL) {
    currentPotGLHTML.innerHTML = `${currentPotGL.toFixed(2)}%`;
    newPotGLHTML.innerHTML = `${newPotGL.toFixed(2)}%`;
}
