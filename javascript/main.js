import { getCarData, generateCarList } from './data-handler.js';
import { createLegend } from './legend.js';
import { showCars } from './car-card.js';

const PRICE_ASCENDING = 'PASC';

/**
 * Ensures that the application content is ready to load.
 */
document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initializeApp();
  }
})

export const initializeApp = (order = PRICE_ASCENDING) => {
  getCarData().then((carsData) => {
    const { VehRentalCore, VehVendorAvails } = carsData[0].VehAvailRSCore;
    const carList = generateCarList(VehVendorAvails);
    createLegend(VehRentalCore, order);
    showCars(carList, order);
  });
}
