import { getCarData } from "./dataHandler.js";
import { createLegend } from "./legend.js";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initializeApp();
  }
})

const initializeApp = () => {
  getCarData().then((carsData) => {
    const rentalDetails = carsData[0].VehAvailRSCore.VehRentalCore;
    createLegend(rentalDetails);
  });
}