console.log("App.js has been loaded");const e=document.getElementById("currentAveragePrice");document.getElementById("currentShareQuantity");const t=document.getElementById("buyingPrice");document.getElementById("buyingQuantity"),document.getElementById("targetPrice"),document.getElementById("newAveragePrice"),document.getElementById("currentEquity"),document.getElementById("additionalEquity"),document.getElementById("totalEquity"),document.getElementById("currentPotGL"),document.getElementById("newPotGL"),t.addEventListener("change",(e=>(console.log(e),e.target.value<200?e.target.step=1:e.target.value<500?e.target.step=2:500==e.target.value?e.target.step=5:2e3==e.target.value?e.target.step=10:e.target.value<2e3?e.target.step=5:5e3==e.target.value||e.target.value<5e3?e.target.step=10:e.target.value>5e3?e.target.step=25:void console.log("something error"))));const n=document.getElementById("ticker"),o=document.getElementById("tickerInput");let a=[];fetch("./idx-stock.json").then((e=>e.json())).then((e=>{e.forEach((e=>{a.push(e.KodeEmiten)})),function(e,t){t.forEach((t=>{let n=e.appendChild(document.createElement("option"));n.value=t,n.appendChild(document.createTextNode(t))}))}(n,a),o.placeholder=a[0]})).catch((e=>{console.log("fetching stock data error")})),o.addEventListener("keyup",(t=>{if("4"==t.target.value.length){console.log("the ticker is 4 char length");let n=t.target.value.toUpperCase();t.target.value=n,a.includes(n)&&(console.log(`${n} is in array`),e.focus())}else console.log("not 4 char length")}));
