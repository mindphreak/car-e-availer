export const createLegend = (details) => {
  const legend = document.getElementById('legend');
  const header = createHeader('Legend');
  legend.appendChild(header);
  const content = createContent(details);
  legend.appendChild(content);
}

const createHeader = (string) => {
  const header = document.createElement('h4');
  const text = document.createTextNode(string);
  header.appendChild(text);
  return header;
}

const createContent = (details) => {
  const content = document.createElement('div');
  let text = ` Your Pickup from ${details.PickUpLocation['@Name'].toUpperCase()}
    at ${getLocaleTimeString(details['@PickUpDateTime'])}`;
  const pickupLocation = createStringBlock(text);
  text = `You Return to ${details.ReturnLocation['@Name'].toUpperCase()} 
    at ${getLocaleTimeString(details['@ReturnDateTime'])}`;
  const returnLocation = createStringBlock(text);
  content.appendChild(pickupLocation);
  content.appendChild(returnLocation);
  return content;
}

const createStringBlock = (string) => {
  const block = document.createElement('div');
  const text = document.createTextNode(string);
  block.appendChild(text);
  return block;
}


const getLocaleTimeString = (time) => {
  return new Date(time).toLocaleString();
}