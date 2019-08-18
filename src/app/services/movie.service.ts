import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IMovie } from '@models/movie';
import { GlobalService } from '@services/global.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MovieService {

    constructor( private http: HttpClient, private globalService: GlobalService ) { }

    getMovieById(id: string): Observable<IMovie> {
        return this.http.get<IMovie>( `${this.globalService.apiUrl}&i=${id}` ).pipe(
            map(( result: any ) => result),
            catchError(( error: any ) => throwError( error ))
        );
    }

    searchMovies( term: string, page: number = 0, movies20: boolean = false ): Observable<IMovie[]> {
        const pageStr = page ? `&page=${page}` : '';

        return this.http.get<IMovie[]>(`${this.globalService.apiUrl}${pageStr}&s=${term}`).pipe(
            map((result: any) => {
                if (result.Search) {
                    return result.Search;
                } else {
                    if (movies20) {
                        return null;
                    } else {
                        throw new Error(this.handleError(result.Error));
                    }
                }
            }),
            catchError((error: any) => throwError(error))
        );
    }

    private handleError(errorStr: string): string {
        switch (errorStr) {
            case 'Movie not found!':
                return 'По данному запросу фильмы не найдены !!!';
            case 'Too many results.':
                return 'Слишком много результатов. Добавьте еще буквы в строку запроса !';
            default:
                return 'Что то пошло не так !!!';
        }
    }
}
