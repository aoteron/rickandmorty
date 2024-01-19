import {Episode, Character, Location, PaginatedResponse} from "./interfaces"

const urlRMAPI = 'https://rickandmortyapi.com/api/episode';

const mainContainer = document.getElementById('mainContainer') as HTMLDivElement;
const btnLoadEpisodes = document.getElementById('loadMoreEpisodes') as HTMLButtonElement;

////////////////////////////////////////////////

// const getEpisodeData = function () {
//     fetch(`https://rickandmortyapi.com/api/episode/`).then(function (
//         response
//         ) {
//             console.log(response);
//             return response.json();
//         }).then(function (data) {
//             console.log(data);
//         });
// };


const getEpisodeData = function () {
    fetch(`https://rickandmortyapi.com/api/episode/`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        const episodes:Episode[] = data.results;
        episodes.forEach(episode => {
            // console.log(episode);
            const episodeName:string = episode.name;
            renderEpisodes (episodeName);
        })
        // console.log(episodes);
    })
    .catch(err => {
        console.error(`${err}`);
    })
};

getEpisodeData();


function renderEpisodes (episodeName:string) {
    const renderMainContainerWithEpisodes = document.createElement("li");
    renderMainContainerWithEpisodes.textContent = episodeName;
    mainContainer.appendChild(renderMainContainerWithEpisodes);
}

