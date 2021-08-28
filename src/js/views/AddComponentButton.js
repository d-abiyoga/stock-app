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
            // this.button.addEventListener("click", (e) => this.addNewCalculator(e));
            this.button.addEventListener("click", (e) => this.showComponentList(e.target));
        });
    }

   async getHtml() {
        return `
        <button id="${this.id}" class="${this.class}">+</button>
        <ul class="addComponent__list">
            <li class="addComponent__list-heading">
                Add calculator    
            </li>
            <li class="addComponent__item">
            <button class="addComponent__button">
                Average price calculator
            <button>
            
            </li>
            <li class="addComponent__item">
                <button class="addComponent__button">
                    CAGR calculator
                <button>
            </li>
        </ul>
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

    showComponentList(clickedButton) {
        // let componentListHtml = `
        // <ul class="addComponent__list">
        //     <li class="addComponent__item">Add average price calculator</li>
        //     <li class="addComponent__item">Add CAGR calculator</li>
        // </ul>
        // `
        // clickedButton.insertAdjacentHTML("afterend", componentListHtml)
        console.log("trigger showComponentList")
        let addComponentList = document.getElementsByClassName("addComponent__list")[0];
        console.log(addComponentList);
        addComponentList.classList.toggle("addComponent__list--collapse")
    }


}
