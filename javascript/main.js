import { getCarData, generateCarList } from './data-handler.js';
import { createLegend } from './legend.js';
import { showCars } from './car-card.js';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initializeApp();
  }
})

const initializeApp = () => {
  getCarData().then((carsData) => {
    const { VehRentalCore, VehVendorAvails } = carsData[0].VehAvailRSCore;
    const carList = generateCarList(VehVendorAvails);
    createLegend(VehRentalCore);
    showCars(carList);
  });
}
