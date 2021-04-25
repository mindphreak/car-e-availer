// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"javascript/data-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCarList = exports.getCarData = void 0;

/**
 * GETs JSON response with cars and vendors.
 * @returns cars JSON.
 */
const getCarData = () => {
  const url = "http://www.cartrawler.com/ctabe/cars.json";
  return requestData(url);
};
/**
 * Generic GET using fetch API.
 * @param {*} url 
 * @returns JSON response if status 200.
 */


exports.getCarData = getCarData;

const requestData = async url => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
/**
 * Generates
 * @param {*} vehVendorAvails 
 * @returns 
 */


const generateCarList = vehVendorAvails => {
  let cars = [];
  vehVendorAvails.forEach(vendor => {
    let vendorCars = vendor.VehAvails.map(car => {
      return { ...car,
        Vendor: vendor.Vendor['@Name'],
        VendorCode: vendor.Vendor['@Code']
      };
    });
    cars = cars.concat(vendorCars);
  });
  return cars;
};

exports.generateCarList = generateCarList;
},{}],"javascript/utility/utility.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStringBlock = void 0;

const createStringBlock = string => {
  const block = document.createElement('div');
  const text = document.createTextNode(string);
  block.appendChild(text);
  return block;
};

exports.createStringBlock = createStringBlock;
},{}],"javascript/legend.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLegend = void 0;

var _utility = require("./utility/utility.js");

const createLegend = details => {
  const legend = document.getElementById('legend'); // const header = createHeader('Legend');
  // legend.appendChild(header);

  const content = createContent(details);
  legend.appendChild(content);
};

exports.createLegend = createLegend;

const createHeader = string => {
  const header = document.createElement('h4');
  const text = document.createTextNode(string);
  header.appendChild(text);
  return header;
};

const createContent = details => {
  const content = document.createElement('div');
  content.classList.add('legend-container');
  let text = ` Your Pickup from ${details.PickUpLocation['@Name'].toUpperCase()}
    on ${getLocaleTimeString(details['@PickUpDateTime'])}`;
  const pickupLocation = (0, _utility.createStringBlock)(text);
  text = `You Return to ${details.ReturnLocation['@Name'].toUpperCase()} 
    on ${getLocaleTimeString(details['@ReturnDateTime'])}`;
  const returnLocation = (0, _utility.createStringBlock)(text);
  content.appendChild(pickupLocation);
  content.appendChild(returnLocation);
  return content;
};

const getLocaleTimeString = time => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: 'true'
  };
  return new Date(time).toLocaleString('en-GB', options);
};
},{"./utility/utility.js":"javascript/utility/utility.js"}],"javascript/car-details.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showDetails = exports.toggleDetailsView = void 0;

var _main = require("./main.js");

var _utility = require("./utility/utility.js");

const toggleDetailsView = (showDetails = false) => {
  const detailsElement = document.getElementById('details');
  const cardElement = document.getElementById('content');
  detailsElement.style.display = showDetails ? 'block' : 'none';
  cardElement.style.display = showDetails ? 'none' : 'flex';

  if (showDetails) {
    detailsElement.innerHTML = "";
  }
};

exports.toggleDetailsView = toggleDetailsView;

const showDetails = car => {
  toggleDetailsView(true);
  const vehicleDetails = car.Vehicle;
  const detailsElement = document.getElementById('details');
  const button = createButton();
  detailsElement.appendChild(button);
  appendImage(detailsElement, car.Vehicle['PictureURL']);
  const details = [`Name: ${vehicleDetails.VehMakeModel['@Name']}`, `Vendor: ${car.Vendor}`, `Passengers: ${car.Vehicle['@PassengerQuantity']}`, `Baggage: ${car.Vehicle['@BaggageQuantity']}`, `A/C: ${car.Vehicle['@AirConditionInd']}`, `Transmission Type: ${car.Vehicle['@TransmissionType']}`, `Fuel Type: ${car.Vehicle['@FuelType']}`, `Estimated Total Amount: ${car.TotalCharge['@EstimatedTotalAmount']} ${car.TotalCharge['@CurrencyCode']}`];

  for (const detail of details) {
    appendtoParent(detailsElement, detail);
  }
};

exports.showDetails = showDetails;

const appendImage = (parent, source) => {
  const image = document.createElement('img');
  image.src = source;
  image.classList.add('card-img-top');
  parent.appendChild(image);
};

const appendtoParent = (parent, text) => {
  const block = (0, _utility.createStringBlock)(text);
  parent.appendChild(block);
};

const createButton = () => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-dark');
  const buttonText = document.createTextNode('Back to list');
  button.appendChild(buttonText);
  button.addEventListener('click', event => {
    toggleDetailsView(false);
  });
  return button;
};
},{"./main.js":"javascript/main.js","./utility/utility.js":"javascript/utility/utility.js"}],"javascript/car-card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showCars = void 0;

var _utility = require("./utility/utility.js");

var _carDetails = require("./car-details.js");

const showCars = cars => {
  const orderedCars = orderCars(cars);

  for (const car of orderedCars) {
    createCarCard(car);
  }
};

exports.showCars = showCars;

const orderCars = (cars, order = 'ASC') => {
  return cars.sort((a, b) => parseFloat(a.TotalCharge['@EstimatedTotalAmount']) - parseFloat(b.TotalCharge['@EstimatedTotalAmount']));
};

const createCarCard = car => {
  const vehicleDetails = car.Vehicle;
  const container = document.getElementById('content');
  const card = document.createElement('div');
  card.classList.add('card');
  appendImage(card, car.Vehicle['PictureURL']);
  const details = [`Name: ${vehicleDetails.VehMakeModel['@Name']}`, `Vendor: ${car.Vendor}`, `Passengers: ${car.Vehicle['@PassengerQuantity']}`, `Baggage: ${car.Vehicle['@BaggageQuantity']}`, `A/C: ${car.Vehicle['@AirConditionInd']}`, `Transmission Type: ${car.Vehicle['@TransmissionType']}`, `Fuel Type: ${car.Vehicle['@FuelType']}`, `Estimated Total Amount: ${car.TotalCharge['@EstimatedTotalAmount']} ${car.TotalCharge['@CurrencyCode']}`];

  for (const detail of details) {
    appendtoParent(card, detail);
  }

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-dark');
  const buttonText = document.createTextNode('Show more...');
  button.appendChild(buttonText);
  button.addEventListener('click', event => {
    (0, _carDetails.showDetails)(car);
  });
  card.appendChild(button);
  container.appendChild(card);
};

const appendImage = (parent, source) => {
  const image = document.createElement('img');
  image.src = source;
  image.classList.add('card-img-top');
  parent.appendChild(image);
};

const appendtoParent = (parent, text) => {
  const block = (0, _utility.createStringBlock)(text);
  parent.appendChild(block);
};
},{"./utility/utility.js":"javascript/utility/utility.js","./car-details.js":"javascript/car-details.js"}],"javascript/order-dropdown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelect = void 0;

const createSelect = () => {
  const dropdownValues = [{
    "text": "Price - Low to High",
    "value": "PASC"
  }, {
    "text": "Price - High to low",
    "value": "PDESC"
  }];
  const widget = document.createElement('select');

  for (const i of dropdownValues) {
    widget.appendChild(createOption(i));
  }

  widget.addEventListener('change', event => {});
  return widget;
};
/**
 * Creates an option in the select dropdown
 * @param {*} value 
 * @param {*} text 
 * @returns 
 */


exports.createSelect = createSelect;

const createOption = ({
  value,
  text
}) => {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  return option;
};
},{}],"javascript/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeApp = void 0;

var _dataHandler = require("./data-handler.js");

var _legend = require("./legend.js");

var _carCard = require("./car-card.js");

var _orderDropdown = require("./order-dropdown.js");

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    initializeApp();
  }
});

const initializeApp = () => {
  (0, _dataHandler.getCarData)().then(carsData => {
    const {
      VehRentalCore,
      VehVendorAvails
    } = carsData[0].VehAvailRSCore;
    const carList = (0, _dataHandler.generateCarList)(VehVendorAvails);
    (0, _legend.createLegend)(VehRentalCore);
    const dropdown = (0, _orderDropdown.createSelect)();
    const legend = document.getElementById('legend');
    legend.appendChild(dropdown);
    (0, _carCard.showCars)(carList);
  });
};

exports.initializeApp = initializeApp;
},{"./data-handler.js":"javascript/data-handler.js","./legend.js":"javascript/legend.js","./car-card.js":"javascript/car-card.js","./order-dropdown.js":"javascript/order-dropdown.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "9188" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","javascript/main.js"], null)
//# sourceMappingURL=/main.67ffc892.js.map