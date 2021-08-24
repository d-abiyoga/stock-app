import CalculatorsView from "./Calculator";
import {} from "../index.js"

export default class AddComponentButton {
    constructor() {
        // super();
        this.id = "addCompButton";
        this.class = "addCompButton";

        // workaround for getting the button element
        setTimeout( () => {
            this.button = document.getElementById("addCompButton");
            this.button.addEventListener("click", (e) => this.addNewCalculator(e));
        });
    }

   async getHtml() {
        return `
        <button id="${this.id}" class="${this.class}">+</button>
        `;
    }

    addNewCalculator(event) {
        const clickedButton = event.target;
        const newCalculatorObj = new CalculatorsView;

        // change the innerHTML of newCalculator
        const getNewCalc = async () => {
            clickedButton.insertAdjacentHTML("beforebegin", `${await newCalculatorObj.getAvgCalc()}`)
        }
        getNewCalc();
    }


}
