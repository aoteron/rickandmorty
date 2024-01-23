import { InfoAPI,Info,Episode,Character } from "./interfaces";

const urlEpisodes = 'https://rickandmortyapi.com/api/episode';

// SIDEBAR VARIABLES
const episodesList = document.getElementById('episodeList') as HTMLUListElement;
const nextBtn = document.getElementById('loadMoreEpisodes') as HTMLButtonElement;

// CALLING API
printTitle(urlEpisodes);

async function printTitle(url: string) {
  const data = await fetch(url);
  const JSONdata: InfoAPI = await data.json(); 
  const episodes: Episode[] = JSONdata.results;

// RENDERING EPISODES LIST  
  episodes.forEach((episode) => {
    episodesList.insertAdjacentHTML('beforeend', `<li id='${episode.episode}' elementURL='${episode.url}'> Episode ${episode.id}</li>`);
    const clickEpisode = document.getElementById(`${episode.episode}`) as HTMLLIElement;
    clickEpisode.addEventListener('click', printInfoEpi);
  });

// SHOW MORE EPISODES BUTTON
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

// RENDERING EPISODES & CHARACTERS INFO
async function printInfoEpi(click:MouseEvent) {
    const target = click.target as HTMLLIElement;
    const urlEpisode = target.getAttribute("elementURL")!; 

    const dataEpisode = await fetch(urlEpisode);
    const episodeInfo: Episode = await dataEpisode.json(); 

    const displayEpisodeInfo = `
        <div class="episode-info">
          <h1>${episodeInfo.name}</h1>
          <p>${episodeInfo.air_date}</p>
          <p>${episodeInfo.episode}</p>
        </div>
        `;

    const renderEpisodeInfo = document.getElementById("episodesContainerInfo") as HTMLDivElement;

    renderEpisodeInfo.innerHTML = displayEpisodeInfo;

    const characters = episodeInfo.characters

    const renderCharacterCard = document.getElementById("characterList") as HTMLDivElement;
    renderCharacterCard.innerHTML = " ";

    characters.forEach(async urlCharacter => {

      const dataCharacter = await fetch(urlCharacter); 
      const characterInfo: Character = await dataCharacter.json();
      
        const renderCharacterInfo = `
          <div class="character-info">
            <img src=${characterInfo.image} alt=${characterInfo.name}/>
            <h3>${characterInfo.name}</h3>
            <span>${characterInfo.status}</span>
            <span>${characterInfo.species}</span>
            <p>${characterInfo.gender}</p>
            </div>
            `;


        const renderCharacterCard = document.getElementById("characterList") as HTMLDivElement;
        renderCharacterCard.insertAdjacentHTML("beforeend", renderCharacterInfo);
    });

    const welcome = document.getElementById("welcome");
    welcome?.classList.add("hide");

}