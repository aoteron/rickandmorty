"use strict";
const urlRMAPI = 'https://rickandmortyapi.com/api/episode';
const mainContainer = document.getElementById('mainContainer');
const btnLoadEpisodes = document.getElementById('loadMoreEpisodes');
const getEpisodeData = function () {
    fetch(`https://rickandmortyapi.com/api/episode/`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => {
        console.error(`${err}`);
    });
};
getEpisodeData();
//# sourceMappingURL=scripts.js.map