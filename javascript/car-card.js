import { createStringBlock } from './utility/utility.js';
import { showDetails } from './car-details.js';

export const showCars = (cars) => {
    for (const car of cars) {
        createCarCard(car);
    }
}

const createCarCard = (car) => {
    const vehicleDetails = car.Vehicle;
    const container = document.getElementById('content');
    const card = document.createElement('div');
    card.classList.add('card');
    const image = document.createElement('img');
    image.src = car.Vehicle['PictureURL'];
    image.classList.add('card-img-top');
    card.appendChild(image);
    container.appendChild(card);
    let text = `Name: ${vehicleDetails.VehMakeModel['@Name']}`;
  const name = createStringBlock(text);
  card.appendChild(name);

     text = `Vendor: ${car.Vendor}`;
  const vendor = createStringBlock(text);
  card.appendChild(vendor);

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-dark');
  const buttonText = document.createTextNode('Show more...');
  button.appendChild(buttonText);
  button.addEventListener('click', (event) => {
      showDetails(car);
  })
  card.appendChild(button);

}
