import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("IdStockTools - Portofolio");
    }

    async getHtml() {
        this.getPortofolio();
        return `
        <h1>IdStockTools - Portofolio</h1>
        <p> 
            Fitur ini masih dalam pengembangan.
            <br>
            <br>
        </p>
        <p>
            <a class="link-to-page" href="/calculators" data-link>View calculators</a> 
        </p> 
        `
    }

    getPortofolio() {
        let portofolio;
        if (window.localStorage.getItem("portofolio") === null) {
            console.log(`portofolio is null`)
            portofolio = [{stock: "PTBA"}];
            // console.log(`portofolio created ===>`)
            // console.log(portofolio)
        } else {
            portofolio = JSON.parse(window.localStorage.getItem("portofolio"));
            // console.log(`portofolio is loaded ===>
            // ${portofolio}`)
        }
    }
}

// https://github.com/developedbyed/vanilla-todo/blob/master/app.js
