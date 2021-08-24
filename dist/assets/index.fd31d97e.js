class t{constructor(){}setTitle(t){document.title=t}async getHtml(){return""}}class e extends t{constructor(){super(),this.setTitle("IdStockTools - Home")}async getHtml(){return'\n        <h1>Welcome</h1>\n        <p> \n            Hai, website ini dibuat untuk keperluan pribadi saya yang aktif berinvestasi di pasar saham. <br>\n            Mungkin dapat bermanfaat bagi teman-teman investor lainnya. Saat ini fitur yang tersedia adalah kalkulator averaging.\n\n            <br>\n            <br>\n        </p>\n        <p>\n            <a class="link-to-page" href="/calculators" data-link>Lihat calculators</a> \n        </p> \n        '}}class n{constructor(){this.id="addCompButton",this.class="addCompButton",setTimeout((()=>{this.button=document.getElementById("addCompButton"),this.button.addEventListener("click",(t=>this.addNewCalculator(t)))}))}async getHtml(){return`\n        <button id="${this.id}" class="${this.class}">+</button>\n        `}addNewCalculator(t){const e=t.target,n=new a;(async()=>{e.insertAdjacentHTML("beforebegin",`${await n.getAvgCalc()}`)})()}}class a extends t{constructor(){super(),this.setTitle("IdStockTools - Calculator"),this.AveragePrice=new i}async getHtml(){let t=new n;return`\n        ${await this.getHeading()}\n        ${await this.getAvgCalc()}\n        ${await t.getHtml()}\n        `}async getHeading(){return"\n      <h1>Calculator</h1>\n      "}async getAvgCalc(){return'  \n        \x3c!-- Start of card --\x3e\n        <div id="stock-average-calc-card">\n          <fieldset>\n            <legend>Stock Average Price Calculator</legend>\n            <div id="flex-container">\n            \x3c!-- start of 1st column --\x3e\n              <div id="first-column" class=" card__column">\n                  <label class="input-label" for="ticker">Ticker</label>\n                  <div class="input-container">\n                  <input list="ticker" name="ticker" id="tickerInput" class="input-box" maxlength="4"  pattern="[A-Z]" autofocus>\n                  <datalist id="ticker" >\n                  </datalist>\n                  </div>\n\n                  <label class="input-label" for="current-average-price">Current average price</label> \n                  <div class="input-container">\n                    <div class="relative">\n                      <span class="input-details">\n                          Rp/lot\n                      </span>\n                    </div>\n                    <input type="number" id="currentAveragePrice" name="currentAveragePrice" min="50" step="2"  placeholder="50"  class="input-box">\n                  </div>\n\n                  <label class="input-label" for="current-share-quantity">Current share quantity</label>\n                    <div class="input-container">\n                        <div class="relative">\n                            <span class="input-details">\n                                Lot\n                            </span>\n                        </div>\n                        <input type="number" id="currentShareQuantity" name="currentShareQuantity" min="0" placeholder="0" class="input-box">\n                      </div>\n\n                    <label class="input-label" for="buying-price">Buying price</label>\n                    <div class="input-container">\n                        <div class="relative">\n                            <span class="input-details">\n                                Rp/lot\n                            </span>\n                        </div>\n                        <input type="number" id="buyingPrice" name="buyingPrice" min="50" placeholder="0" step="1"\n                        class="input-box">\n                    </div>\n\n                    <label class="input-label" for="buying-quantity">Buying quantity</label>\n                    <div class="input-container">\n                      <div class="relative">\n                        <span class="input-details">\n                            Lot\n                        </span>\n                      </div>\n                      <input type="number" id="buyingQuantity" name="buyingQuantity" min="0" placeholder="0" class="input-box">\n                    </div>\n\n                    <label class="input-label" for="target-price">Target price</label>\n                    <div class="input-container">\n                        <div class="relative">\n                          <span class="input-details">\n                                Rp\n                            </span>\n                        </div>\n                        <input type="number" id="targetPrice" name="targetPrice" min="0" placeholder="0" class="input-box">\n                      </div>\n          \n                <button id="calcAverageButton" \n                  class="calcAverageButton" >Calculate</button>  \n                \n\n              </div>\n              \x3c!-- end of 1st column --\x3e\n              \n              <div id="second-column" class="card__column">\n                  <label for="newAveragePrice" class="output-label">New average price</label>\n                  <p id="newAveragePrice" class="output-box">\n                          ...\n                  </p>\n\n                  <label for="currentEquity" class="output-label">Current equity</label>\n                  <p id="currentEquity" class="output-box">\n                          ...\n                  </p>\n                  <label for="additionalEquity" class="output-label">Additional equity</label>\n                  <p id="additionalEquity" class="output-box">\n                          ...\n                  </p>\n                  <label for="totalEquity" class="output-label">Total equity</label>\n                  <p id="totalEquity" class="output-box">\n                          ...\n                  </p>\n                  <label for="currentPotGL" class="output-label">Current Pot. G/L</label>\n                  <p id="currentPotGL" class="output-box">\n                          ...\n                  </p>\n                  <label for="newPotGL" class="output-label">New Pot. G/L</label>\n                  <p id="newPotGL" class="output-box">\n                          ...\n                  </p>\n                  <label for="targetPotGL" class="output-label">Target Pot. G/L</label>\n                  <p id="targetPotGL" class="output-box">\n                          ...\n                  </p>\n              </div>\n            </div>\n          </fieldset>\n        </div>\n        \x3c!-- CARD END HERE --\x3e\n        '}}class i{constructor(){this.listenEvent()}listenEvent(){console.log("listening the event"),document.addEventListener("click",(t=>{if(t.target.classList.contains("calcAverageButton")){let e=this.getInputValues(t.target);if(console.log("=========  input ==============="),console.log(e),Object.values(e).includes(NaN))return alert("Please fill all required inputs");let n=this.calcOutput(e);console.log("=========  output ==============="),console.log(n),this.printOutput(t.target,n)}}))}getInputValues(t){let e,n,a=t.parentElement.getElementsByTagName("input"),i={};i.ticker=a[0].value;for(let l=1,r=a.length;l<r;l++)n=a[l].id,e=parseFloat(a[l].value),i[n]=e;return i}calcOutput(t){let e={ticker:t.ticker,newAveragePrice:0,currentEquity:0,additionalEquity:0,totalEquity:0,currentPotGL:0,newPotGL:0,targetPotGL:0};return e.newAveragePrice=(t.currentAveragePrice*t.currentShareQuantity+t.buyingPrice*t.buyingQuantity)/(t.currentShareQuantity+t.buyingQuantity),e.currentEquity=t.currentAveragePrice*t.currentShareQuantity*100,e.additionalEquity=t.buyingPrice*t.buyingQuantity*100,e.totalEquity=e.currentEquity+e.additionalEquity,e.currentPotGL=(t.currentAveragePrice-t.buyingPrice)/t.buyingPrice*100,e.newPotGL=(e.newAveragePrice-t.buyingPrice)/t.buyingPrice*100,e.targetPotGL=(t.targetPrice-e.newAveragePrice)/e.newAveragePrice*100,e}printOutput(t,e){let n=t.parentElement.nextElementSibling.getElementsByClassName("output-box");for(let a,i,l=0,r=n.length;l<r;l++)a=n[l].id,i=e[a],["newAveragePrice","currentEquity","additionalEquity","totalEquity"].includes(a)?n[l].innerHTML=`Rp ${(new Intl.NumberFormat).format(i.toFixed(2))}`:["currentPotGL","newPotGL","targetPotGL"].includes(a)&&(n[l].innerHTML=`${i.toFixed(2)}%`)}}class l extends t{constructor(){super(),this.setTitle("IdStockTools - Portofolio")}async getHtml(){return this.getPortofolio(),'\n        <h1>IdStockTools - Portofolio</h1>\n        <p> \n            Fitur ini masih dalam pengembangan.\n            <br>\n            <br>\n        </p>\n        <p>\n            <a class="link-to-page" href="/calculators" data-link>View calculators</a> \n        </p> \n        '}getPortofolio(){null===window.localStorage.getItem("portofolio")?console.log("portofolio is null"):JSON.parse(window.localStorage.getItem("portofolio"))}}const r=async()=>{const t=[{path:"/",view:e},{path:"/calculators",view:a},{path:"/portofolio",view:l}];let n=t.map((t=>({route:t,isMatch:location.pathname===t.path}))).find((t=>t.isMatch));n||(n={route:t[0],isMatch:!0});const i=new n.route.view;document.querySelector("#app").innerHTML=await i.getHtml()};window.addEventListener("popstate",r),document.addEventListener("DOMContentLoaded",(()=>{document.body.addEventListener("click",(t=>{let e=t.target;var n;(e.matches("[data-link]")||e.parentElement.matches("[data-link]"))&&(t.preventDefault(),t.target.parentElement.matches("[data-link]")&&(e=t.target.parentElement),n=e.href,history.pushState(null,null,n),r())})),r()}));