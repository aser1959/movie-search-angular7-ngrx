import { Injectable } from '@angular/core';
import { IMovie } from '@models/movie';

export  interface IStore {
  movies: IMovie[];
  maxStoryViews: number;
}

@Injectable({ providedIn: 'root' })

export class LocalStorageService {

  constructor() {}

  setMovies( movies: IMovie[] ): void {
    localStorage.setItem( 'MoviesStorage', JSON.stringify(movies) );
  }

  getMovies(): IStore {
    const movies = localStorage.getItem( 'MoviesStorage' ) ? JSON.parse(localStorage.getItem( 'MoviesStorage' )) : [];
    const maxStoryViews = localStorage.getItem( 'MaxStoryViews' ) ? +localStorage.getItem( 'MaxStoryViews' ) : 10;

    return ({ movies, maxStoryViews } as IStore );
  }

  setMaxStoryViews( value: number ): void {
    localStorage.setItem( 'MaxStoryViews', value.toString() );
  }
}
