import { getCarData, generateCarList } from './data-handler.js';
import { createLegend } from './legend.js';
import { showCars } from './car-card.js';
import { createSelect } from './order-dropdown.js';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initializeApp();
  }
})

export const initializeApp = () => {
  getCarData().then((carsData) => {
    const { VehRentalCore, VehVendorAvails } = carsData[0].VehAvailRSCore;
    const carList = generateCarList(VehVendorAvails);
    createLegend(VehRentalCore);
    const dropdown  = createSelect();
    const legend = document.getElementById('legend');
    legend.appendChild(dropdown);
    showCars(carList);
  });
}
