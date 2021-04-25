export const createSelect = () => {
  const dropdownValues = [
    { "text": "Price - Low to High", "value": "PASC" },
    { "text": "Price - High to low", "value": "PDESC"}
  ];
  const widget = document.createElement('select');

  for (const i of dropdownValues) {
    widget.appendChild(createOption(i));
  }
  widget.addEventListener('change', (event) => {

  });

  return widget;
};

/**
 * Creates an option in the select dropdown
 * @param {*} value 
 * @param {*} text 
 * @returns 
 */
const createOption = ({value, text}) => {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  return option;
}