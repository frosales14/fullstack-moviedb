export interface Rating {
    id: string;
    rating: number;
    review: string;
}

export interface ActorMovie {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

export interface Actor {
    id: string;
    name: string;
    isActive: boolean;
    movies: ActorMovie[];
}

export interface Movie {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    imgUrl: string;
    ratings: Rating[];
    actors: Actor[];
}

