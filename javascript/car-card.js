import { createStringBlock } from './utility/utility.js';
import { showDetails } from './car-details.js';

export const showCars = (cars) => {
    const orderedCars = orderCars(cars); 
    for (const car of orderedCars) {
        createCarCard(car);
    }
}

const orderCars = (cars, order = 'ASC') => {
    return cars.sort((a,b) => parseFloat(a.TotalCharge['@EstimatedTotalAmount']) - parseFloat(b.TotalCharge['@EstimatedTotalAmount']));

}

const createCarCard = (car) => {
    const vehicleDetails = car.Vehicle;
    const container = document.getElementById('content');
    const card = document.createElement('div');
    card.classList.add('card');
    appendImage(card, car.Vehicle['PictureURL']);
    const details = [
      `Name: ${vehicleDetails.VehMakeModel['@Name']}`,
      `Vendor: ${car.Vendor}`,
      `Passengers: ${car.Vehicle['@PassengerQuantity']}`,
      `Baggage: ${car.Vehicle['@BaggageQuantity']}`,
      `A/C: ${car.Vehicle['@AirConditionInd']}`,
      `Transmission Type: ${car.Vehicle['@TransmissionType']}`,
      `Fuel Type: ${car.Vehicle['@FuelType']}`,
      `Estimated Total Amount: ${car.TotalCharge['@EstimatedTotalAmount']} ${car.TotalCharge['@CurrencyCode']}`,
    ];
  
    for (const detail of details) {
      appendtoParent(card, detail);
    }
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-dark');
  const buttonText = document.createTextNode('Show more...');
  button.appendChild(buttonText);
  button.addEventListener('click', (event) => {
      showDetails(car);
  })
  card.appendChild(button);
  container.appendChild(card);
}

const appendImage = (parent, source) => {
    const image = document.createElement('img');
    image.src = source;
    image.classList.add('card-img-top');
    parent.appendChild(image);
  }
  
  const appendtoParent = (parent, text) => {
    const block = createStringBlock(text);
    parent.appendChild(block);
  }
