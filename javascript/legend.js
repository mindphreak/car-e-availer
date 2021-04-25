import { createStringBlock } from './utility/utility.js';
import { createSelect } from './order-dropdown.js';

export const createLegend = (details, selectOption) => {
  const legend = document.getElementById('legend');
  if (!legend.innerHTML) {
    const content = createContent(details);
    legend.appendChild(content);
    const dropdown = createSelect(selectOption);
    legend.appendChild(dropdown);
  }
}

const createHeader = (string) => {
  const header = document.createElement('h4');
  const text = document.createTextNode(string);
  header.appendChild(text);
  return header;
}

const createContent = (details) => {
  const content = document.createElement('div');
  content.classList.add('legend-container');
  let text = ` Your Pickup from ${details.PickUpLocation['@Name'].toUpperCase()}
    on ${getLocaleTimeString(details['@PickUpDateTime'])}`;
  const pickupLocation = createStringBlock(text);
  text = `You Return to ${details.ReturnLocation['@Name'].toUpperCase()} 
    on ${getLocaleTimeString(details['@ReturnDateTime'])}`;
  const returnLocation = createStringBlock(text);
  content.appendChild(pickupLocation);
  content.appendChild(returnLocation);
  return content;
}

const getLocaleTimeString = (time) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: 'true'
  }
  return new Date(time).toLocaleString('en-GB', options);
}