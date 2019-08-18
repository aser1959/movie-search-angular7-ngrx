import { IMovie } from '@models/movie';

export interface MovieState {
    movies: IMovie[];
    movies20: IMovie[];
    selectedMovie: IMovie;
    maxStoryViews: number;
    search: string;
    numberViewPage: number;
}

export const movieInitialState: MovieState = {
    movies: [],
    selectedMovie: null,
    movies20: [],
    maxStoryViews: 10,
    search: '',
    numberViewPage: -2

};
