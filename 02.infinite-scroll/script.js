const count = 10;
const apiKey = 'mO_3krchfL-gTxVcORoxGenytpNH6ESsfcBZkOG4YGI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// On Load
getPhotos();
