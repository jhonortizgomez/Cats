const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?';
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('image-1');
    const img2 = document.getElementById('image-2');
    const btn1 = document.getElementById('buton-1');
    const btn2 = document.getElementById('buton-2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES,{
    method: 'GET',
    headers: {
      'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',
    }
  });
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        
        let card = document.getElementById('favoritesCards-card');
        let eliminar = card.innerHTML = ' ';
        data.forEach(michi => {
            eliminar= card.innerHTML +=
            `<div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <img src="${michi.image.url}" class="card-img-center" alt="gatos">
                    <div class="card-body">
                        <button id="buton-" class="btn btn-outline-danger" onclick="deleteFavouriteMichi(${michi.id})">Eliminar de favoritos</button>
                    </div>
                </div>
            </div>`
        });
    }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',

    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi guardado en favoritos')
    loadFavouriteMichis();
  }
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi eliminado de favoritos')
    loadFavouriteMichis();
  }
}

async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form);

  console.log(formData.get('file'))

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',
    },
    body: formData,
  })
  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    console.log({data})
  } else {
    console.log('Foto de michi subida :)')
    console.log({data})
    console.log(data.url)
    saveFavouriteMichi(data.id);
  }
}

loadRandomMichis();
loadFavouriteMichis();

