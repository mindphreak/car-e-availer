import { initializeApp } from './main.js';
import { createStringBlock } from './utility/utility.js';

export const toggleDetailsView = (showDetails = false) => {
  const detailsElement = document.getElementById('details');
  const cardElement = document.getElementById('content');

  detailsElement.style.display = showDetails ? 'block' : 'none';
  cardElement.style.display = showDetails ? 'none' : 'flex';
  if (showDetails) {
    detailsElement.innerHTML = "";
  }
}

export const showDetails = (car) => {
  toggleDetailsView(true);

  const vehicleDetails = car.Vehicle;
  const detailsElement = document.getElementById('details');
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-dark');
  const buttonText = document.createTextNode('Back to list');
  button.appendChild(buttonText);
  button.addEventListener('click', (event) => {
    toggleDetailsView(false);
  })
  detailsElement.appendChild(button);
  const image = document.createElement('img');
  image.src = car.Vehicle['PictureURL'];
  image.classList.add('card-img-top');
  detailsElement.appendChild(image);
}