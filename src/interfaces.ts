//Episodes
export interface Episode {
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

export interface Character {
    name: string;
    status: CharacterStatus;
    species: string;
    type?: string;
    gender: CharacterGender;
    image: string;
}

//Locations
export interface Location {
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

export interface PaginatedResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Episode[];
}