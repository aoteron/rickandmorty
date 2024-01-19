// import {Episode, Character, Location, PaginatedResponse} from "./interfaces"

// const urlRMAPI = 'https://rickandmortyapi.com/api/episode';

// const mainContainer = document.getElementById('mainContainer') as HTMLDivElement;
// const btnLoadEpisodes = document.getElementById('loadMoreEpisodes') as HTMLButtonElement;

// ////////////////////////////////////////////////

// // const getEpisodeData = function () {
// //     fetch(`https://rickandmortyapi.com/api/episode/`).then(function (
// //         response
// //         ) {
// //             console.log(response);
// //             return response.json();
// //         }).then(function (data) {
// //             console.log(data);
// //         });
// // };


// const getEpisodeData = function () {
//     fetch(`https://rickandmortyapi.com/api/episode/`)
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data);
//         const episodes:Episode[] = data.results;
//         episodes.forEach(episode => {
//             // console.log(episode);
//             const episodeName:string = episode.name;
//             renderEpisodes (episodeName);
//         })
//         // console.log(episodes);
//     })
//     .catch(err => {
//         console.error(`${err}`);
//     })
// };

// getEpisodeData();


// function renderEpisodes (episodeName:string) {
//     const renderMainContainerWithEpisodes = document.createElement("li");
//     renderMainContainerWithEpisodes.textContent = episodeName;
//     mainContainer.appendChild(renderMainContainerWithEpisodes);
// }

//    C  I  D  O  N  C  H  A
import { InfoAPI,Info,Episode,Character } from "./interfaces";
const urlEpisodes = 'https://rickandmortyapi.com/api/episode';

 
const episodesList = document.getElementById('episodeList') as HTMLUListElement;
const nextBtn = document.getElementById('loadMoreEpisodes') as HTMLButtonElement;

printTitle(urlEpisodes);

async function printTitle(url: string) {
  const data = await fetch(url);
  const JSONdata: InfoAPI = await data.json(); 
  const episodes: Episode[] = JSONdata.results;

  episodes.forEach((episode) => {
    episodesList.insertAdjacentHTML('beforeend', `<li id='${episode.episode}' elementURL='${episode.url}'> ${episode.name}</li>`);
    const clickEpisode = document.getElementById(`${episode.episode}`) as HTMLLIElement;
    clickEpisode.addEventListener('click', printInfoEpi);
  });


  if (JSONdata.info.next) {
    nextBtn.addEventListener(
      'click',
      () => {
        printTitle(JSONdata.info.next);
      },
      { once: true }
    );
  } else {
    nextBtn.remove();
  }
}

async function printInfoEpi(click:MouseEvent) {
    const target = click.target as HTMLElement; // Guardamos el elemento de la lista
    const urlEpisode = target.getAttribute("elementURL")!; // Atributo con la url del episodio
    const dataEpisode = await fetch(urlEpisode); //Llamamos a la api
    const episodeInfo: Episode = await dataEpisode.json(); //La hacemos legible
    const displayEpisodeInfo = `
        <p>${episodeInfo.name}</p>
        <p>${episodeInfo.air_date}</p>
        <p>${episodeInfo.episode}</p>
        `; //Cacho de HTML con lo que queremos imprimir

    const renderEpisodeInfo = document.getElementById("sectionContainer") as HTMLDivElement; //Aquí queremos meter la info
    renderEpisodeInfo.innerHTML = displayEpisodeInfo; //Ahora la metemos
    const characters = episodeInfo.characters //Recuperamos los personajes con sus url
    characters.forEach(async urlCharacter => { //Recorremos el array de las url
        const dataCharacter = await fetch(urlCharacter); 
        const characterInfo: Character = await dataCharacter.json(); //Volvemos a llamar a la api y convertimos en json
            const renderCharacterInfo = `
            <p>${characterInfo.name}</p>
            <p>${characterInfo.status}</p>
            <p>${characterInfo.species}</p>
            <p>${characterInfo.gender}</p>
            <img src="${characterInfo.image}">
            `; //Otro pegote
    renderEpisodeInfo.insertAdjacentHTML("beforeend", renderCharacterInfo); //Ahora la info del personaje al container

    });

}