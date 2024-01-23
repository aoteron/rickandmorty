var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlEpisodes = 'https://rickandmortyapi.com/api/episode';
const episodesList = document.getElementById('episodeList');
const nextBtn = document.getElementById('loadMoreEpisodes');
printTitle(urlEpisodes);
function printTitle(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(url);
        const JSONdata = yield data.json();
        const episodes = JSONdata.results;
        episodes.forEach((episode) => {
            episodesList.insertAdjacentHTML('beforeend', `<li id='${episode.episode}' elementURL='${episode.url}'> Episode ${episode.id}</li>`);
            const clickEpisode = document.getElementById(`${episode.episode}`);
            clickEpisode.addEventListener('click', printInfoEpi);
        });
        if (JSONdata.info.next) {
            nextBtn.addEventListener('click', () => {
                printTitle(JSONdata.info.next);
            }, { once: true });
        }
        else {
            nextBtn.remove();
        }
    });
}
function printInfoEpi(click) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = click.target;
        const urlEpisode = target.getAttribute("elementURL");
        const dataEpisode = yield fetch(urlEpisode);
        const episodeInfo = yield dataEpisode.json();
        const displayEpisodeInfo = `
        <div class="episode-info">
          <h1>${episodeInfo.name}</h1>
          <p>${episodeInfo.air_date}</p>
          <p>${episodeInfo.episode}</p>
        </div>
        `;
        const renderEpisodeInfo = document.getElementById("episodesContainerInfo");
        renderEpisodeInfo.innerHTML = displayEpisodeInfo;
        const characters = episodeInfo.characters;
        const renderCharacterCard = document.getElementById("characterList");
        renderCharacterCard.innerHTML = " ";
        characters.forEach((urlCharacter) => __awaiter(this, void 0, void 0, function* () {
            const dataCharacter = yield fetch(urlCharacter);
            const characterInfo = yield dataCharacter.json();
            const renderCharacterInfo = `
            <div class="character-info">
              <img src=${characterInfo.image} alt=${characterInfo.name}/>
              <h3>${characterInfo.name}</h3>
              <span>${characterInfo.status}</span>
              <span>${characterInfo.species}</span>
              <p>${characterInfo.gender}</p>
            </div>
            `;
            const renderCharacterCard = document.getElementById("characterList");
            renderCharacterCard.insertAdjacentHTML("beforeend", renderCharacterInfo);
        }));
        const welcome = document.getElementById("welcome");
        welcome === null || welcome === void 0 ? void 0 : welcome.classList.add("hide");
    });
}
export {};
//# sourceMappingURL=scripts.js.map