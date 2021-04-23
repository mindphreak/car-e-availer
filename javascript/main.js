import { getCarData } from "./dataHandler.js"

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initializeApp();
    }
})

const initializeApp = () => {
    getCarData().then( (carsData) => {
        const legend = document.getElementById("legend");
        legend.innerHTML = `${carsData[0].VehAvailRSCore.VehRentalCore["@PickUpDateTime"]}`
    });    
}