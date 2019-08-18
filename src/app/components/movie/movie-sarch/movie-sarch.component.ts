import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { forkJoin, Subscription, Subject } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged, filter, tap, retryWhen } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { IMovie, MovieA } from '@models/movie';
import {
    MovieAdd,
    MovieAdd20,
    MovieRemove20,
    SetNumberViewPage,
    SetMaxStoryViews,
    SetSearch,
    MovieRemoveById
} from '@store/actions/movie.actions';
import { MovieState } from '@store/state/movie.state';
import { getMoviesList, getMovies20List } from '@store/selectors/movie.selector';
import { MovieService } from '@services/movie.service';

@Component({
    selector: 'app-movie-sarch',
    templateUrl: './movie-sarch.component.html',
    styleUrls: ['./movie-sarch.component.scss']
})

export class MovieSarchComponent implements OnInit, OnDestroy {

    @ViewChild('searchField') searchField: ElementRef;
    @ViewChild('searchResult') searchResult: ElementRef;

    numberViewPage = -2;
    beginViewPage = false;
    moviesSearch: IMovie[];
    maxStoryViews = 10;
    visibleMovies20 = false;
    viewsEnd = false;
    maxStoryViewsOptions = [{ value: 10, label: 10 }, { value: 20, label: 20 }, { value: 30, label: 30 }];
    keyUp = new Subject<KeyboardEvent>();

    private subscription: Subscription;

    movies$ = this.store.pipe(select(getMoviesList));
    movies20$ = this.store.pipe(select(getMovies20List));


    constructor(
        private store: Store<MovieState>,
//        private renderer: Renderer2,
        private router: Router,
        private movieService: MovieService,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.store.pipe(select('movieReducer'))
            .subscribe(
                (store: MovieState) => {
                    this.searchField.nativeElement.value = store.search;
                    this.numberViewPage = store.numberViewPage;
                    this.maxStoryViews = store.maxStoryViews;
                    this.visibleMovies20 = this.numberViewPage > 0;
                    this.beginViewPage = this.numberViewPage === 0 && this.searchField.nativeElement.value;
                },
                error => console.error(error)
            );

        this.subscription = this.keyUp.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            map((event) => (event.target as HTMLInputElement).value),
            filter((query: string) => query.length > 4),
            switchMap(search => this.movieService.searchMovies(search)),
            retryWhen(errors =>
                errors.pipe(
                    tap((error) => {
                        if (error.error) {
                            this.toastr.error(error.message, 'Запрос не прошел !');
                        } else {
                            this.toastr.warning(error.message, 'Поиск не удался !');
                        }
                        this.store.dispatch(new SetSearch(this.searchField.nativeElement.value));
                        this.clearSearch(false);
                        this.numberViewPage = this.setNumberViewPage(this.numberViewPage, true);
                    })
                )
            ))
            .subscribe(
                response => {
                    this.beginViewPage = true;
                    this.moviesSearch = response;
                    this.store.dispatch(new SetSearch(this.searchField.nativeElement.value));
                    this.clearSearch(false, false);
                    this.numberViewPage = this.setNumberViewPage(this.numberViewPage);
                    setTimeout(() => this.searchResult.nativeElement.focus(), 200);
                }
            );
    }

    setNumberViewPage(value: number, last: boolean = false): number {
        if (value === -2 && last) {
            return value;
        }
        const result = last ? value - 2 : value + 2;
        this.store.dispatch(new SetNumberViewPage(result));
        this.beginViewPage = result === 0 && this.searchField.nativeElement.value;
        return result;
    }

    clearSearch(searchFieldClear: boolean = true, moviesSearchClear: boolean = true): void {
        if (searchFieldClear) {
            this.searchField.nativeElement.value = '';
            this.store.dispatch(new SetSearch(this.searchField.nativeElement.value));
        }
        if (moviesSearchClear) {
            this.moviesSearch = undefined;
            this.beginViewPage = false;
        }
        this.store.dispatch(new MovieRemove20());
        this.store.dispatch(new SetNumberViewPage(-2));
        this.visibleMovies20 = false;
        this.numberViewPage = -2;
        this.visibleMovies20 = false;
        this.viewsEnd = false;
    }

    search20Movies(last: boolean = false) {
        const search = this.searchField.nativeElement.value;
        this.viewsEnd = false;
        this.visibleMovies20 = true;
        this.moviesSearch = undefined;
        this.numberViewPage = this.setNumberViewPage(this.numberViewPage, last);
        const numberP = this.numberViewPage;
        forkJoin(
            this.movieService.searchMovies(search, numberP - 1, true),
            this.movieService.searchMovies(search, numberP, true))
            .pipe(
                map(([pages1, pages2]) => {
                    if (pages2 == null) {
                        this.viewsEnd = true;
                        if (pages1 == null) {
                            this.numberViewPage = this.setNumberViewPage(numberP, last);
                            return false;
                        } else {
                            return pages1;

                        }
                    } else {
                        return pages1.concat(pages2);
                    }
                })
            )
            .subscribe((movies: any) => {
                if (movies === false) {
                    return;
                }
                const movieArray = [];
                this.beginViewPage = false;
                this.store.dispatch(new MovieRemove20());
                for (const film of movies) {
                    const movie = new MovieA();
                    for (const key in film) {
                        if (movie[key] !== undefined) {
                            movie[key] = film[key];
                        }
                    }
                    movieArray.push(movie);
                }
                this.store.dispatch(new MovieAdd20(movieArray));
            });
    }

    navigateToMovie(id: string, add: boolean = false) {
        this.moviesSearch = undefined;
        if (add) {
            this.movieService.getMovieById(id)
                .subscribe(
                    response => {
                        const movieA = new MovieA();
                        for (const key in response) {
                            if (movieA[key] !== undefined) {
                                movieA[key] = response[key];
                            }
                        }
                        this.store.dispatch(new MovieAdd(movieA));
                        this.router.navigate(['detail', id]);
                    },
                    error => console.log(error)
                );
        }
        this.router.navigate(['detail', id]);
    }

    setMaxStoryViews(): void {
        this.store.dispatch(new SetMaxStoryViews(this.maxStoryViews));
    }

    deleteMovieHistory(id: string, name: string, e: Event): void {
        e.stopPropagation();

        Swal.fire({
            title: `Вы хотите удалить фильм «${name}» ?`,
            text: 'После удаления вы не сможете отменить это !',
            type: 'question',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#CD0200',
            cancelButtonColor: '#D47500',
            confirmButtonText: '<i class="fa fa-close"></i> Удалить!',
            cancelButtonText: '<i class="fa fa-undo"></i> Отмена',
        }).then((result) => {
            if (result.value) {
                this.store.dispatch(new MovieRemoveById(id));
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
