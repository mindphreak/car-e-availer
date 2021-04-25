import { createStringBlock } from './utility/utility.js';

/**
 * Switches between all-cars-view and details-view.
 * @param {*} showDetails 
 */
export const toggleDetailsView = (showDetails = false) => {
  const detailsElement = document.getElementById('details');
  const cardElement = document.getElementById('content');
  const dropdown = document.getElementById("order-select");

  detailsElement.style.display = showDetails ? 'block' : 'none';
  cardElement.style.display = showDetails ? 'none' : 'flex';
  dropdown.style.display = showDetails ? 'none' : 'block';
  if (showDetails) {
    detailsElement.innerHTML = "";
  }
}

/**
 * Creates the details view.
 * @param {*} car 
 */
export const showDetails = (car) => {
  toggleDetailsView(true);

  const vehicleDetails = car.Vehicle;
  const detailsElement = document.getElementById('details');
  const button = createButton()
  detailsElement.appendChild(button);
  appendImage(detailsElement, car.Vehicle['PictureURL']);
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
    appendtoParent(detailsElement, detail);
  }
}

/**
 * Attaches image to the parent specified.
 * @param {*} parent 
 * @param {*} source 
 */
const appendImage = (parent, source) => {
  const image = document.createElement('img');
  image.src = source;
  image.classList.add('card-img-top');
  parent.appendChild(image);
}

/**
 * Attaches block of string to the prent specified.
 * @param {*} parent 
 * @param {*} text 
 */
const appendtoParent = (parent, text) => {
  const block = createStringBlock(text);
  parent.appendChild(block);
}

/**
 * Creates a button.
 * @returns button element.
 */
const createButton = () => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-dark');
  const buttonText = document.createTextNode('Back to list');
  button.appendChild(buttonText);
  button.addEventListener('click', (event) => {
    toggleDetailsView(false);
  })
  return button;
}