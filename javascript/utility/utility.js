/**
 * Creates a DIV element with supplied string.
 * @param {*} string 
 * @returns 
 */
export const createStringBlock = (string) => {
    const block = document.createElement('div');
    const text = document.createTextNode(string);
    block.appendChild(text);
    return block;
  }