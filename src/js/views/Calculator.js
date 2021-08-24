import AbstractView from "./AbstractView.js";
import AddComponentButton from "./AddComponentButton.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("IdStockTools - Calculator");

        console.log("inside constructor");

    }

    async getHtml() {
      // creating instance of add component button
      let addCompButton = new AddComponentButton();
      
      // return the html which construct the calculator page
      return `
        ${await this.getHeading()}
        ${await this.getAvgCalc()}
        ${await addCompButton.getHtml()}
        `
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
                  <input list="ticker" name="ticker" id="tickerInput" class="input-box" maxlength="4"  pattern="[A-Z]" autofocus>
                  <datalist id="ticker" >
                  </datalist>

                  <label class="input-label" for="current-average-price">Current average price</label> 
                  <div id="input-container">
                    <div class="relative">
                      <span class="input-details">
                          Rp/lot
                      </span>
                    </div>
                    <input type="number" id="currentAveragePrice" name="currentAveragePrice" min="50" step="2"  placeholder="50"  class="input-box">
                  </div>

                  <label class="input-label" for="current-share-quantity">Current share quantity</label>
                    <div id="input-container">
                        <div class="relative">
                            <span class="input-details">
                                Lot
                            </span>
                        </div>
                        <input type="number" id="currentShareQuantity" name="currentShareQuantity" min="0" placeholder="0" class="input-box">
                      </div>

                    <label class="input-label" for="buying-price">Buying price</label>
                    <div id="input-container">
                        <div class="relative">
                            <span class="input-details">
                                Rp/lot
                            </span>
                        </div>
                        <input type="number" id="buyingPrice" name="buyingPrice" min="0" placeholder="0" step="1"
                        class="input-box">
                    </div>

                    <label class="input-label" for="buying-quantity">Buying quantity</label>
                    <div id="input-container">
                        <input type="number" id="buyingQuantity" name="buyingQuantity" min="0" placeholder="0" class="input-box">
                        <div class="relative">
                        <span class="input-details">
                              Lot
                          </span>
                      </div>
                    </div>

                    <label class="input-label" for="target-price">Target price</label>
                    <div id="input-container">
                        <div class="relative">
                          <span class="input-details">
                                Rp
                            </span>
                        </div>
                        <input type="number" id="targetPrice" name="targetPrice" min="0" placeholder="0" class="input-box">
                      </div>
          
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
              </div>
            </div>
          </fieldset>
        </div>
        <!-- CARD END HERE -->
        `;
    }
}