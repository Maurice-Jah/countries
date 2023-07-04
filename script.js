'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// old method using XML
const renderCountry = function (data, className = '') {
  const html = `

    <article class="country ${className} ">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${+(
        data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeigbour = function (country) {
//   // Ajax first call
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     // Render country 1
//     renderCountry(data);

//     const neighbour = data.borders[1];

//     if (!neighbour) return;

//     // Second Ajax call
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(request2.responseText);

//       // Render country 2
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeigbour('Nigeria');

//****************  USING PROMISE *******************
// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

// getCountry('Portugal');

// =======================CHAINING PROMISE============================
// const getCountry = function (country) {
//   // country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //   Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };

// getCountry('Germany');

// =======================HANDLING PROMISE REJECTION (ERRORS)============================

// const renderError = function (msg) {
//   console.error('Something went wrong ****');

//   countriesContainer.insertAdjacentText('beforeend', msg);
//   //   countriesContainer.style.opacity = 1;
// };

// const getCountry = function (country) {
//   // country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //   Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       renderError(`Something went wrong ${err.message} Try Again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//       btn.style.opacity = 0;
//     });
// };

// btn.addEventListener('click', () => {
//   getCountry('Germany');
// });

// =================== THROWING ERROR======================
const renderError = function (msg) {
  console.error('Something went wrong ****');
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, Errormsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${Errormsg} (${response.status})`);

    return response.json();
  });
};

// const getCountry = function (country) {
//   // country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[10];

//       if (!neighbour) throw new Error('No Neighbour found!');

//       //   Country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       renderError(`Something went wrong ${err.message} Try Again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', () => {
//   getCountry('germany');
// });

// ///////////////////////////////////////////////////////////////////
// Coding Challenge #1

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${'190887375322677222895x50074'}`
//   )
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(` You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${response.status} `);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))

//     .catch(err => console.log(`${err.message}`));
// };

// // key
// // 190887375322677222895x50074

// // whereAmI(51.50354, -0.12768);
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// whereAmI(4.53944, 7.24715);

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // getPosition().then(res => console.log(res));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${'190887375322677222895x50074'}`
//       );
//     })

//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(` You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${response.status} `);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))

//     .catch(err => console.log(`${err.message}`));
// };

// btn.addEventListener('click', whereAmI);

// Coding Challenge ------ make image to appear and disappear after 2 seconds

// const wait = function (secs) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, secs * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 3 loaded');
//     return wait(2);
//   })
//   .then(() => (currentImg.style.display = 'none'))

//   .catch(err => console.error(err));

// To get location
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Promisifying the geolocation application
const whereAmIn = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${'190887375322677222895x50074'}`
    );

    if (!resGeo.ok) throw new Error('Problem locating the location');

    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    renderError(`Something went wrong ${err.message}`);
  }
};

whereAmIn();
whereAmIn();
whereAmIn();
