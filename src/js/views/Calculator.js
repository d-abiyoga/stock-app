import AbstractView from "./AbstractView.js";
import AddComponentButton from "./AddComponentButton.js";

export default class CalculatorsView extends AbstractView {
    constructor() {
        super();
        this.setTitle("IdStockTools - Calculator");

        this.passedFunction = new AveragePriceCalculator();
    }

    async getHtml() {
        // creating instance of add component button
        let addCompButton = new AddComponentButton();

        // return the html which construct the calculator page
        return `
        ${await this.getHeading()}
        ${await this.getAvgCalc()}
        ${await addCompButton.getHtml()}
        `;
    }

    async getHeading() {
        return `
      <h1>Calculator</h1>
      `;
    }

    async getAvgCalc() {
        return `  
        <!-- Start of card -->
        <div id="stock-average-calc-card">
          <fieldset>
            <legend>Stock Average Price Calculator</legend>
            <div id="flex-container">
            <!-- start of 1st column -->
              <div id="first-column" class=" card__column">
                  <label class="input-label" for="ticker">Ticker</label>                  
                  <input list="ticker" name="ticker" id="ticker" class="input-box" maxlength="4"  pattern="[A-Z]" autofocus>
                  <datalist id="ticker-datalist" >
                  </datalist>

                  <label class="input-label" for="current-average-price">Current average price</label> 
                  <div class="input-container">
                    <div class="relative">
                      <span class="input-details">
                          Rp/lot
                      </span>
                    </div>
                    <input type="number" id="currentAveragePrice" name="currentAveragePrice" min="50" step="2"  placeholder="50"  class="input-box">
                  </div>

                  <label class="input-label" for="current-share-quantity">Current share quantity</label>
                <input type="number" id="currentShareQuantity" name="currentShareQuantity" min="0" placeholder="0" class="input-box">

                    <label class="input-label" for="buying-price">Additional buy price</label>
                    <input type="number" id="buyingPrice" name="buyingPrice" min="50" placeholder="0" step="1"
                    class="input-box">

                    <label class="input-label" for="buying-quantity">Buying quantity</label>
                    <input type="number" id="buyingQuantity" name="buyingQuantity" min="0" placeholder="0" class="input-box">

                    <label class="input-label" for="target-price">Target price</label>
                    <input type="number" id="targetPrice" name="targetPrice" min="0" placeholder="0" class="input-box">
          
                <button id="calcAverageButton" 
                  class="calcAverageButton" >Calculate</button>  
                

              </div>
              <!-- end of 1st column -->
              
              <div id="second-column" class="card__column">
                  <label for="newAveragePrice" class="output-label">New average price</label>
                  <p id="newAveragePrice" class="output-box">
                          ...
                  </p>

                  <label for="currentEquity" class="output-label">Current equity</label>
                  <p id="currentEquity" class="output-box">
                          ...
                  </p>
                  <label for="additionalEquity" class="output-label">Additional equity</label>
                  <p id="additionalEquity" class="output-box">
                          ...
                  </p>
                  <label for="totalEquity" class="output-label">Total equity</label>
                  <p id="totalEquity" class="output-box">
                          ...
                  </p>
                  <label for="currentPotGL" class="output-label">Current Pot. G/L</label>
                  <p id="currentPotGL" class="output-box">
                          ...
                  </p>
                  <label for="newPotGL" class="output-label">New Pot. G/L</label>
                  <p id="newPotGL" class="output-box">
                          ...
                  </p>
                  <label for="targetPotGL" class="output-label">Target Pot. G/L</label>
                  <p id="targetPotGL" class="output-box">
                          ...
                  </p>
              </div>
            </div>
          </fieldset>
        </div>
        <!-- CARD END HERE -->
        `;
    }
}

// I think it is better to separate the calculator itself and the average price calc
export class AveragePriceCalculator {
    constructor() {
    }

    onButtonClick(clickedButton) {
        if (clickedButton.classList.contains("calcAverageButton")) {
            let input = this.getInputValues(clickedButton);
            if (Object.values(input).includes(NaN)) { return alert("Please fill all required inputs"); }
            let output = this.calcOutput(input);
            this.printOutput(clickedButton, output);
        }
    }

    getInputValues(clickedButton) {
        // the intention of targetedInputs is to only grab input values that we interested in, but it may require if-else step in the for loop below
        // let targetedInputs = ["currentAveragePrice", "newAveragePrice", "buyingPrice", "buyingQuantity"];
        let parentDiv = clickedButton.parentElement;
        let inputsHtmlCollection = parentDiv.getElementsByTagName("input");

        let inputValues = {};
        let inputValue, inputId;

        // grab ticker value
        inputValues["ticker"] = inputsHtmlCollection[0].value;

        // loop start from index of 1 to grab float values
        for (
            let i = 1, inputsLength = inputsHtmlCollection.length;
            i < inputsLength;
            i++
        ) {
            inputId = inputsHtmlCollection[i].id;
            inputValue = parseFloat(inputsHtmlCollection[i].value);

            inputValues[inputId] = inputValue;
        }
        return inputValues;
    }

    calcOutput(inputValues) {
        // output = {outputId: outputValue}
        let outputs = {
            ticker: inputValues.ticker,
            newAveragePrice: 0,
            currentEquity: 0,
            additionalEquity: 0,
            totalEquity: 0,
            currentPotGL: 0,
            newPotGL: 0,
            targetPotGL: 0
        };

        outputs.newAveragePrice =
            (inputValues.currentAveragePrice *
                inputValues.currentShareQuantity +
                inputValues.buyingPrice * inputValues.buyingQuantity) /
            (inputValues.currentShareQuantity + inputValues.buyingQuantity);
        outputs.currentEquity =
            inputValues.currentAveragePrice *
            inputValues.currentShareQuantity *
            100;
        outputs.additionalEquity =
            inputValues.buyingPrice * inputValues.buyingQuantity * 100;
        outputs.totalEquity = outputs.currentEquity + outputs.additionalEquity;
        outputs.currentPotGL =
            ((inputValues.buyingPrice - inputValues.currentAveragePrice) /
            inputValues.currentAveragePrice) *
            100;
        outputs.newPotGL =
            ((inputValues.buyingPrice - outputs.newAveragePrice) /
            outputs.newAveragePrice) *
            100;
        outputs.targetPotGL = (inputValues.targetPrice - outputs.newAveragePrice) / outputs.newAveragePrice * 100;

        return outputs;
    }

    // to be reconsidered to moved to "view"
    printOutput(clickedButton, obj) {
        let secondColumnDiv = clickedButton.parentElement.nextElementSibling;
        let outputBoxes = secondColumnDiv.getElementsByClassName("output-box");
        
        for (
            let i = 0, outputLength = outputBoxes.length, outputId, outputValue;
            i < outputLength;
            i++
        ) {
          outputId = outputBoxes[i].id;
          outputValue = obj[outputId];
          if (["newAveragePrice", "currentEquity", "additionalEquity", "totalEquity"].includes(outputId)) {
            outputBoxes[i].innerHTML = `Rp ${new Intl.NumberFormat().format(outputValue.toFixed(2))}`;
          } 
          else if (["currentPotGL", "newPotGL", "targetPotGL"].includes(outputId)) {
            outputBoxes[i].innerHTML = `${outputValue.toFixed(2)}%`;
          }
        }
    }
}
