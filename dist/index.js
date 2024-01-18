"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var CharacterStatus;
(function (CharacterStatus) {
    CharacterStatus["Alive"] = "Alive";
    CharacterStatus["Dead"] = "Dead";
    CharacterStatus["Unknow"] = "Unknown";
})(CharacterStatus || (CharacterStatus = {}));
var CharacterGender;
(function (CharacterGender) {
    CharacterGender["Male"] = "Male";
    CharacterGender["Female"] = "Female";
    CharacterGender["Unknown"] = "Unknown";
})(CharacterGender || (CharacterGender = {}));
var PaginationAction;
(function (PaginationAction) {
    PaginationAction["Next"] = "Next";
    PaginationAction["Previous"] = "Previous";
    PaginationAction["Loading"] = "Loading";
})(PaginationAction || (PaginationAction = {}));
function fetchEpisodesData() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'https://rickandmortyapi.com/api/episode';
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            const mainContainer = document.getElementById('mainContainer');
            if (!mainContainer) {
                throw new Error('mainContainer element not found');
            }
            mainContainer.innerHTML = '';
            if (Array.isArray(data)) {
                data.forEach((item) => {
                    const element = document.createElement('div');
                    element.textContent = item.name;
                    mainContainer.appendChild(element);
                });
            }
            else {
                const errorElement = document.createElement('div');
                errorElement.textContent = 'No episodes found in the Array';
                mainContainer.appendChild(errorElement);
                console.error('API response does not contain an array of episodes');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
fetchEpisodesData();
//# sourceMappingURL=index.js.map