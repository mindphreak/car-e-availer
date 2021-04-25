import { initializeApp } from "./main";

export const createSelect = (currentValue) => {
  const dropdownValues = [
    { "text": "Price - Low to High", "value": "PASC" },
    { "text": "Price - High to low", "value": "PDESC" }
  ];
  const widget = document.createElement('select');
  widget.id = 'order-select';
  for (const i of dropdownValues) {
    widget.appendChild(createOption(i));
  }
  widget.value = currentValue;
  widget.addEventListener('change', (event) => {
    initializeApp(event.currentTarget.value);
  });

  return widget;
};

/**
 * Creates an option in the select dropdown
 * @param {*} value 
 * @param {*} text 
 * @returns 
 */
const createOption = ({ value, text }) => {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  return option;
}