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
    episodesList.insertAdjacentHTML('beforeend', `<li id='${episode.episode}' elementURL='${episode.url}'> Episode ${episode.id}</li>`);
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
    const target = click.target as HTMLLIElement; // Guardamos el elemento de la lista
    const urlEpisode = target.getAttribute("elementURL")!; // Atributo con la url del episodio

    const dataEpisode = await fetch(urlEpisode); //Llamamos a la api
    const episodeInfo: Episode = await dataEpisode.json(); //La hacemos legible

    const displayEpisodeInfo = `
        <div class="episode-info">
          <h1>${episodeInfo.name}</h1>
          <p>${episodeInfo.air_date}</p>
          <p>${episodeInfo.episode}</p>
        </div>
        `; //Cacho de HTML con lo que queremos imprimir

    const renderEpisodeInfo = document.getElementById("episodesContainerInfo") as HTMLDivElement; //Aquí queremos meter la info

    renderEpisodeInfo.innerHTML = displayEpisodeInfo; //Ahora la metemos

    const characters = episodeInfo.characters //Recuperamos los personajes con sus url

    characters.forEach(async urlCharacter => { //Recorremos el array de las url

        const dataCharacter = await fetch(urlCharacter); 
        const characterInfo: Character = await dataCharacter.json(); //Volvemos a llamar a la api y convertimos en json
        
            const renderCharacterInfo = `
            <div class="character-info">
              <img src=${characterInfo.image}>
              <h3>${characterInfo.name}</h3>
              <span>${characterInfo.status}</span>
              <span>${characterInfo.species}</span>
              <p>${characterInfo.gender}</p>
            </div>
            `; //Otro pegote

    const renderEpisodeInfo = document.getElementById("characterList") as HTMLDivElement;
    renderEpisodeInfo.insertAdjacentHTML("beforeend", renderCharacterInfo); //Ahora la info del personaje al container

    });

}