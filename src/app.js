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
    currentEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(currentEquity)}`;
    additionalEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(additionalEquity)}`;
    totalEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(totalEquity)}`;
}

function printPotGL(currentPotGL, newPotGL) {
    currentPotGLHTML.innerHTML = `${currentPotGL.toFixed(2)}%`;
    newPotGLHTML.innerHTML = `${newPotGL.toFixed(2)}%`;
}




// Under development
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
    // break value at 200
    else if (e.target.value == 200) {
        if (e.key == "ArrowUp") // e.target.value = parseInt(e.target.value) + 1;
        return e.target.step = 2;
    }  
    else if (e.target.value < 500) {
        return e.target.step = 2;
    } 
    //break value at 500
    else if (e.target.value == 500) {
        if (e.key == "ArrowDown") return e.target.step = 2;
        return e.target.step = 5;
    }

    //break value at 2000
    else if (e.target.value == 2000) {
        if (e.key == "ArrowDown") return e.target.step = 5;
        return e.target.step = 10;
    }

    else if (e.target.value < 2000) {
        return e.target.step = 5;
    } 

    //break value at 5000
    else if (e.target.value == 5000) {
        if (e.key == "ArrowDown") return e.target.step = 5;
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

// By Using "keyup" as below, we can check the key pressed

// buyingPriceHTML.addEventListener("keyup", (e) => {
//     console.log(e.target);
//     console.log(e.target.step);
//     console.log(e);

//     // Set step (share price fraction) value based on input price 
//     if (e.target.value < 200) {
//         return e.target.step = 1;
//     } 
//     // break value at 200
//     else if (e.target.value == 200) {
//         if (e.key == "ArrowUp") // e.target.value = parseInt(e.target.value) + 1;
//         return e.target.step = 2;
//     }  
//     else if (e.target.value < 500) {
//         return e.target.step = 2;
//     } 
//     //break value at 500
//     else if (e.target.value == 500) {
//         if (e.key == "ArrowDown") return e.target.step = 2;
//         return e.target.step = 5;
//     }
    
//     //break value at 2000
//     else if (e.target.value == 2000) {
//         if (e.key == "ArrowDown") return e.target.step = 5;
//         return e.target.step = 10;
//     }
    
//     else if (e.target.value < 2000) {
//         return e.target.step = 5;
//     } 
    
//     //break value at 5000
//     else if (e.target.value == 5000) {
//         if (e.key == "ArrowDown") return e.target.step = 5;
//         return e.target.step = 10;
//     }
//     else if (e.target.value < 5000) {
//         return e.target.step = 10;
//     } 
    
//     else if (e.target.value > 5000 ) {
//         return e.target.step = 25;
//     } else {
//         console.log("something error");
//     }
// });
