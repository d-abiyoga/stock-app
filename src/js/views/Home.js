import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("IdStockTools - Home");
    }

    async getHtml() {
        return `
        <h1>Welcome</h1>
        <p> 
            Hai, website ini dibuat untuk keperluan pribadi saya yang aktif berinvestasi di pasar saham. <br>
            Mungkin dapat bermanfaat bagi teman-teman investor lainnya. Saat ini fitur yang tersedia adalah kalkulator averaging.

            <br>
            <br>
        </p>
        <p>
            <a class="link-to-page" href="/calculators" data-link>Lihat calculators</a> 
        </p> 
        `
    }
}