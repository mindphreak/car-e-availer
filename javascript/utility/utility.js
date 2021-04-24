export const createStringBlock = (string) => {
    const block = document.createElement('div');
    const text = document.createTextNode(string);
    block.appendChild(text);
    return block;
  }