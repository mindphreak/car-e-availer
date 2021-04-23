/**
 * GETs JSON response with cars and vendors.
 * @returns cars JSON.
 */
export const getCarData = () => {
  const url = "http://www.cartrawler.com/ctabe/cars.json";
  const encodedUrl = encodeURI(url);
  const data = requestData(encodedUrl);
  return data;
}

/**
 * Generic GET using fetch API.
 * @param {*} url 
 * @returns JSON response if status 200.
 */
const requestData = async (url) => {
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
