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

    return `You are in  ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    renderError(`Something went wrong ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

// console.log('1: Will get location');

// // whereAmIn();

// // whereAmIn()
// //   .then(city => console.log(city))
// //   .catch(err => console.log(`Vol2 error ${err.message}`))
// //   .finally(() => console.log('3: Finished getting location'));

// // Using IIFE to get to get the returned value in async
// (async function () {
//   try {
//     const answer = await whereAmIn();
//     console.log(answer);
//   } catch (err) {
//     console.log(`Vol2 error ${err.message}`);
//   }
//   console.log('3: Finished getting location');
// })();

// .......  RUNNING PROMISE IN PARALLEL

// const get3Countries = async function (cl1, cl2, cl3) {
//   try {
//     // const [data] = await getJSON(`https://restcountries.com/v2/name/${cl1}`);
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${cl2}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${cl3}`);
//     // console.log([data.capital, data1.capital, data2.capital]);

//     //Promise.all ====== Any error leads to rejection of the whole promise
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${cl1}`),
//       getJSON(`https://restcountries.com/v2/name/${cl2}`),
//       getJSON(`https://restcountries.com/v2/name/${cl3}`),
//     ]);

//     const capital = data.map(d => d[0].capital);
//     console.log(capital);
//   } catch (err) {
//     console.log(err);
//   }
// };

// get3Countries('Nigeria', 'usa', 'Tanzania');

// Other combinators

// ====== Promise.race=== the first settled(fuilled or rejected) promise wins the race

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/Niger`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//     getJSON(`https://restcountries.com/v2/name/mexico`),
//   ]);

//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(() => reject(new Error('Request took too long')), sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v2/name/Niger`),
//   timeout(0.01),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// ====== PROMISE.ALLSETTLED ==== Returns all whether sucess or rejected
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// // ====== PROMISE.any ==== Returns only sucess
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// // CODING CHALLENGE PART 1
// const wait = function (secs) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve();
//     }, secs * 1000);
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

// CODING CHALLENGE 3

let currentImage;
createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => (currentImage.style.display = 'none'))
  .catch(res => console.log(res));

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};

loadNPause();

const loadAll = async function (imgArr) {
  const image = imgArr.map(async img => {
    return await createImage(img);
  });

  const imgEl = await Promise.all(image);
  console.log(imgEl);
  //
  imgEl.forEach(img => img.classList.add('parallel'));
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
