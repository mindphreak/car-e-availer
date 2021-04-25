/**
 * GETs JSON response with cars and vendors.
 * @returns cars JSON.
 */
export const getCarData = () => {
  const url = "http://www.cartrawler.com/ctabe/cars.json";
  return requestData(url);
}

/**
 * Generic GET using fetch API.
 * @param {*} url 
 * @returns JSON response if status 200.
 */
const requestData = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Generates array of all cars with added vendor identification keys.
 * @param {*} vehVendorAvails 
 * @returns car list.
 */
export const generateCarList = (vehVendorAvails) => {
  let cars = [];
  vehVendorAvails.forEach(vendor => {
    let vendorCars = vendor.VehAvails.map(car => {
      return {
        ...car,
        Vendor: vendor.Vendor['@Name'],
        VendorCode: vendor.Vendor['@Code']
      };
    });
    cars = cars.concat(vendorCars);
  });
  return cars;
}

