//Episodes
interface Episode {
    name: string;
    air_date: string;
    episode: string;
}

//Characters
enum CharacterStatus {
    Alive = "Alive",
    Dead = "Dead",
    Unknow = "Unknown",
}

enum CharacterGender {
    Male = "Male",
    Female = "Female",
    Unknown = "Unknown",
}

interface Character {
    name: string;
    status: CharacterStatus;
    species: string;
    type?: string;
    gender: CharacterGender;
    image: string;
}

//Locations
interface Location {
    name: string;
    type: string;
    dimension: string;
}

//Pagination
enum PaginationAction {
    Next = "Next",
    Previous = "Previous",
    Loading = "Loading",
}

interface PaginatedResponse<T> {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: T[];
}

//Fetching the data from the API
async function fetchEpisodesData() {
    const apiUrl = 'https://rickandmortyapi.com/api/episodes';
    
    try {
        const response = await fetch(apiUrl);

        if(!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchEpisodesData();