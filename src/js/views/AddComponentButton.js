import Calculator from "./Calculator";
import {} from "../index.js"

export default class AddComponentButton {
    constructor() {
        // super();
        this.id = "addCompButton";
        this.class = "addCompButton";

        // workaround for getting the button element
        setTimeout( () => {
            this.button = document.getElementById("addCompButton")
            console.log(this);
            this.button.addEventListener("click", (e) => this.addNewCalculator(e))
        });
    }

   async getHtml() {
        return `
        <button id="${this.id}" class="${this.class}">+</button>
        `;
    }

    addNewCalculator(event) {
        const clickedButton = event.target;
        const newCalculatorObj = new Calculator;

        // change the innerHTML of newCalculator
        const getNewCalc = async () => {
            clickedButton.insertAdjacentHTML("beforebegin", `${await newCalculatorObj.getAvgCalc()}`)
        }
        getNewCalc();
    }

    // getEvent() {
    //     this.addEventListener("click", (e) => {
    //         console.log("clicked the add comp button")
    //     });
    // };

    // addNewCalculator() {
    //     const newCalculator = document.createElement("div")'
    //     '
    // }


}

    // getHtml() {

    // IMPLEMENTED
    //     let appDiv = document.querySelector("#app");
    //     console.log(appDiv);
    //     appDiv.appendChild(addCompButton);

    // NOT YET IMPLEMENTED
    //     addCompButton.addEventListener("click", (e) => {
    //         const newCalculator = document.createElement("div");
    //         e.target.parentNode.insertBefore(newCalculator, e.target);

    //         const addNewCalc = this.getAvgCalc();
    //         addNewCalc.then((resolve) => {
    //             newCalculator.innerHTML = resolve;
    //         });
    //     });
    // }