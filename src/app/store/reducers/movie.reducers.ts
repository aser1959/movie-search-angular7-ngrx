import { MovieActions, MovieActionTypes } from '@store/actions/movie.actions';
import { movieInitialState,  } from '@store/state/movie.state';

export function movieReducer(state = movieInitialState, action: MovieActions) {

    switch (action.type) {

        case MovieActionTypes.AddSuccess: {
            return {
                ...state,
                movies: [action.payload, ...state.movies]
            };
        }

        case MovieActionTypes.Remove:
            return {
                ...state,
                movies: state.movies.slice(0, -action.payload)
            };

        case MovieActionTypes.RemoveById:
                return {
                    ...state,
                    movies: state.movies.filter(movie => movie.imdbID !== action.payload)
                };

        case MovieActionTypes.GetByIdSuccess:
            return {
                ...state,
                selectedMovie: action.payload
            };

        case MovieActionTypes.Add20: {
            return {
                ...state,
                movies20: [...action.payload]
            };
        }

        case MovieActionTypes.Remove20:
            return {
                ...state,
                movies20: []
            };

        case MovieActionTypes.SearchAdd:
            return {
                ...state,
                search: action.payload
            };

        case MovieActionTypes.SearchRemove:
            return {
                ...state,
                search: ''
            };

        case MovieActionTypes.NumberViewPageAdd:
            return {
                ...state,
                numberViewPage: action.payload
            };

        case MovieActionTypes.NumberViewPageRemove:
            return {
                ...state,
                numberViewPage: 0
            };

        case MovieActionTypes.MaxStoryViewsSetSuccess:
            return {
                ...state,
                maxStoryViews: action.payload
            };

        case MovieActionTypes.GetStorageSuccess:
                return {
                    ...state,
                    movies: [...action.payload.movies],
                    maxStoryViews: action.payload.maxStoryViews
                };

        default:
            return state;
    }
}
