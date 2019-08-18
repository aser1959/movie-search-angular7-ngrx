import { createSelector } from '@ngrx/store';
import { MovieState } from '@store/state/movie.state';

const reducer = 'movieReducer';
export const selectMovies = (state: MovieState ) => state[reducer];

export const getMoviesList = createSelector (
  selectMovies,
  ( state: MovieState ) => state.movies
);

export const getMovies20List = createSelector (
  selectMovies,
  ( state: MovieState ) => state.movies20
);

export const getSelectedMovie = createSelector (
  selectMovies,
  ( state: MovieState ) => state.selectedMovie
);

export const getMaxStoryViews = createSelector (
  selectMovies,
  ( state: MovieState ) => state.maxStoryViews
);

export const getSearch = createSelector(
  selectMovies,
  ( state: MovieState ) => state.search
);
