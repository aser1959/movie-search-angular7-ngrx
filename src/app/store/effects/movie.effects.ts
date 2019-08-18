import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom, combineLatest, tap } from 'rxjs/operators';

import { IMovie } from '@models/movie';
import {
    MovieAdd,
    MovieAddSuccess,
    MovieRemove,
    MovieActionTypes,
    GetMovieById,
    GetMovieByIdSuccess,
    GetLocalStorage,
    GetLocalStorageSuccess,
    SetMaxStoryViews,
    SetMaxStoryViewsSuccess
} from '@store/actions/movie.actions';
import { MovieState } from '@store/state/movie.state';
import { getMoviesList, getMaxStoryViews } from '@store/selectors/movie.selector';
import { LocalStorageService, IStore } from '@services/local-storage.service';

@Injectable()
export class MovieEffects {

   @Effect()
    setMovies$ = this.actions$.pipe(
        ofType<GetLocalStorage>( MovieActionTypes.GetStorage ),
        map(() => this.localStorageService.getMovies()),
        switchMap(( movies: IStore ) => {
            return of( new GetLocalStorageSuccess( movies ));
        })
    );

    @Effect()
    addMovie$ = this.actions$.pipe(
        ofType<MovieAdd>( MovieActionTypes.Add ),
        map( action => action.payload ),
        withLatestFrom(this.store.pipe(select( getMaxStoryViews ))),
        withLatestFrom(this.store.pipe(select( getMoviesList ))),
        switchMap(( [[  action,  max], movies ]  ) => {
            const qtu = movies.length;
            const maxStoryViews = max;
            const id = action.imdbID;
            const existsMovie: IMovie = movies.filter( m => m.imdbID === id )[0];
            if ( existsMovie === undefined ) {
                this.store.dispatch( new MovieAddSuccess( action ));
                if ( qtu === maxStoryViews ) {
                    this.store.dispatch( new MovieRemove());
                }
            }
            return of(new GetMovieByIdSuccess( action ));
        }),
        tap(() => this.store.pipe(select( getMoviesList ))
            .subscribe( movies => this.localStorageService.setMovies( movies ))
        )
    );

    @Effect()
    getMovie$ = this.actions$.pipe(
        ofType<GetMovieById>( MovieActionTypes.GetById ),
        map( action => action.payload ),
        withLatestFrom( this.store.pipe(select( getMoviesList ))),
        switchMap(([ id, movies ]) => {
            const existMovie: IMovie = movies.filter(m => m.imdbID === id)[0];
            return of( new GetMovieByIdSuccess( existMovie ));
        })
    );

    @Effect()
    SetMaxStory$ = this.actions$.pipe(
        ofType<SetMaxStoryViews>( MovieActionTypes.MaxStoryViewsSet ),
        map(action => action.payload),
        withLatestFrom(this.store.pipe(select( getMoviesList ))),
        switchMap(( [ max, movies ]  ) => {
            const qtu: number = movies.length;
            this.localStorageService.setMaxStoryViews( max );
            if ( qtu > max ) {
                   this.store.dispatch( new MovieRemove( qtu - max ));
            }
            return of( new SetMaxStoryViewsSuccess( max ));
       })
    );

    constructor(
        private actions$: Actions,
        private store: Store<MovieState>,
        private localStorageService: LocalStorageService ) { }
}
