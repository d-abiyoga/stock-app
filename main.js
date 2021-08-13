import './tailwind.css'

console.log("App.js has been loaded");

// ================================= Function =================================
window.addEventListener("click", (e) => {
    // console.log(e.target);
    if ( e.target.classList.contains("calcAverageButton")) {
        let input = getInputValues(e.target)
        console.log(input);

        let output = calculateAveragePrice(input);
        // console.log("Output:")
        // console.log(output)
        // getOutputHTML();

        // Print the calculated price
         printAveragePrice(e.target, output.newAveragePrice.toFixed(2));
         printEquity(e.target, output.currentEquity, output.additionalEquity, output.totalEquity);
         printPotGL(e.target, output.currentPotGL, output.newPotGL);
    }

});

function getInputValues(clickedButton) {
    let parentDiv = clickedButton.parentElement;
    let elementList = ["currentAveragePrice", "currentShareQuantity", "buyingPrice", "buyingQuantity"] 
    let elementValue = {};
    elementList.forEach( value => {
        let elementName = value + '-fieldset';
        elementValue[value] =  parseFloat(parentDiv.children.namedItem(elementName).children[1].children[1].value)
    });
    return elementValue;
};

function calculateAveragePrice(input) {
    console.log("calculate average price button is loaded")
    let newAveragePrice = 0;
    newAveragePrice = ((input.currentAveragePrice * input.currentShareQuantity) + (input.buyingPrice * input.buyingQuantity)) / (input.currentShareQuantity + input.buyingQuantity);
    
    // TEST ONLY
    console.log(`newAveragePrice value is ... ${newAveragePrice}`)

    // Calculating equity and pot G/L
    let currentEquity = (input.currentAveragePrice * input.currentShareQuantity) * 100;
    let additionalEquity = (input.buyingPrice * input.buyingQuantity) * 100;
    let totalEquity = currentEquity + additionalEquity;
    let currentPotGL = (input.currentAveragePrice - input.buyingPrice)/ input.buyingPrice * 100;
    let newPotGL = (newAveragePrice - input.buyingPrice ) / input.buyingPrice * 100 ;

    return {newAveragePrice, currentEquity, additionalEquity, totalEquity, currentPotGL, newPotGL}
};

function printAveragePrice(clickedButton, averagePrice) {
    let clickedButtonParentDiv = clickedButton.parentElement;
    let newAveragePriceHTML = clickedButtonParentDiv.children.namedItem("newAveragePrice-fieldset").children[1];
    newAveragePriceHTML.innerHTML = averagePrice;
}

function printEquity(clickedButton, currentEquity, additionalEquity, totalEquity) {
    let clickedButtonParentDiv = clickedButton.parentElement;
    let currentEquityHTML = clickedButtonParentDiv.nextElementSibling.children.namedItem("currentEquity-fieldset").children[1];
    let additionalEquityHTML = clickedButtonParentDiv.nextElementSibling.children.namedItem("additionalEquity-fieldset").children[1];
    let totalEquityHTML = clickedButtonParentDiv.nextElementSibling.children.namedItem("totalEquity-fieldset").children[1];
    console.log(totalEquityHTML);

    currentEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(currentEquity)}`;
    additionalEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(additionalEquity)}`;
    totalEquityHTML.innerHTML = `Rp. ${new Intl.NumberFormat().format(totalEquity)}`;
}

function printPotGL(clickedButton, currentPotGL, newPotGL) {
    let clickedButtonParentDiv = clickedButton.parentElement;
    let currentPotGLHTML = clickedButtonParentDiv.nextElementSibling.children.namedItem("currentPotGL-fieldset").children[1];
    let newPotGLHTML = clickedButtonParentDiv.nextElementSibling.children.namedItem("newPotGL-fieldset").children[1];

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

class BuyingPrice {
    constructor() {
        this.html = document.getElementById("buyingPrice")
    }
}

let buyingPriceObj = new BuyingPrice;

const buyingPriceHTML = document.getElementById("buyingPrice"); 
buyingPriceHTML.addEventListener("change" , (e) => {
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
const tickerHTML = document.getElementById("ticker");
const tickerInputHTML = document.getElementById("tickerInput");

function generateTickerList(parentDiv, data) {
    data.forEach ( stock => {
        let option = parentDiv.appendChild(document.createElement("option"))
        option.value = stock;
        option.appendChild(document.createTextNode(stock));
    });
}

//Set ticker input placeholder
function setPlaceHolder(htmlElement, placeholder) {
    htmlElement.placeholder = placeholder;
}

//  Load ticker list from JSON and then 
let tickerList = [];

const STOCK_JSON = fetch('idx-stock.json')
    .then( resp => resp.json())
    .then( data => {
        data.forEach( individualStock => {
            tickerList.push(individualStock.KodeEmiten);
        });
        generateTickerList(tickerHTML, tickerList);
        setPlaceHolder(tickerInputHTML, tickerList[0]);
    })
    .catch( err => {
        console.log("fetching stock data error");
    });

// ===================  FEATURE: save current price / portofolio from local price ===============
tickerInputHTML.addEventListener("change", (e) => {
        if (e.target.value.length == "4") {
            console.log("the ticker is 4 char length"); 
            let selectedTicker = e.target.value.toUpperCase();
            e.target.value = selectedTicker;
            if (tickerList.includes(selectedTicker)) {
                console.log(`${selectedTicker} is in array`); 
                focusToElement(currentAveragePriceHTML);
            }
        } else { console.log("not 4 char length")}
    });

// it might be better if after the ticker input reach maxlength, then it focus to the next input . Not applied yet
function focusToElement(HTMLElement) {
    HTMLElement.focus();
};