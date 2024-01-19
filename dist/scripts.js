const urlRMAPI = 'https://rickandmortyapi.com/api/episode';
const mainContainer = document.getElementById('mainContainer');
const btnLoadEpisodes = document.getElementById('loadMoreEpisodes');
const getEpisodeData = function () {
    fetch(`https://rickandmortyapi.com/api/episode/`)
        .then(response => response.json())
        .then(data => {
        const episodes = data.results;
        episodes.forEach(episode => {
            const episodeName = episode.name;
            renderEpisodes(episodeName);
        });
    })
        .catch(err => {
        console.error(`${err}`);
    });
};
getEpisodeData();
function renderEpisodes(episodeName) {
    const renderMainContainerWithEpisodes = document.createElement("li");
    renderMainContainerWithEpisodes.textContent = episodeName;
    mainContainer.appendChild(renderMainContainerWithEpisodes);
}
export {};
//# sourceMappingURL=scripts.js.map