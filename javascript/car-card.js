import { createStringBlock } from './utility/utility.js';
import { showDetails } from './car-details.js';

export const showCars = (cars, order) => {
    const container = document.getElementById('content');
    container.innerHTML = "";
    const orderedCars = orderCars(cars, order);
    for (const car of orderedCars) {
        createCarCard(car);
    }
}

/**
 * Sorts the list according to the order parameter.
 * @param {*} cars 
 * @param {*} order 
 * @returns 
 */
const orderCars = (cars, order = 'PASC') => {
    const orderDecider = order === 'PASC' ? 1 : -1;
    return cars.sort((a, b) => {
        return orderDecider * (parseFloat(a.TotalCharge['@EstimatedTotalAmount']) - parseFloat(b.TotalCharge['@EstimatedTotalAmount']));
    });
}

/**
 * Creates a single car card.
 * @param {*} car 
 */
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

/**
 * Attaches image to the parent element supplied.
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
 * Attaches block to the parent specified.
 * @param {*} parent 
 * @param {*} text 
 */
const appendtoParent = (parent, text) => {
    const block = createStringBlock(text);
    parent.appendChild(block);
}
