import Home from "./views/Home.js";
import Calculator from "./views/Calculator.js";
import Portofolio from "./views/Portofolio.js";

// GLOBAL VARIABLE
let passedFunction;

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

// 
const router = async () => {
    const routes = [
        { path: "/" , view: Home },
        { path: "/calculators" , view: Calculator },
        { path: "/portofolio" , view: Portofolio }
    ];

    // test each routes for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    // if there is no match, set route to `root`
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();

    // TESTING
    // console.log(view);
    passedFunction = view.passedFunction;
};

// to check if "back/forward button" triggered and call the router function
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        // console.log("document body addeventlistener triggered")
        let targetedElement = e.target;
        if (targetedElement.matches("[data-link]") || targetedElement.parentElement.matches("[data-link]")) {
            e.preventDefault();

            // if the one that is clicked is children data-link, assign data-link element as the targetedElement 
            if (e.target.parentElement.matches("[data-link]")) {
                targetedElement = e.target.parentElement; 
            }
            navigateTo(targetedElement.href);
        }

        // console.log("clicked")
        
        if (targetedElement.id == "calcAverageButton") { 
            console.log(passedFunction)
            passedFunction.onButtonClick(targetedElement)
        }



        
    })
    router();
});