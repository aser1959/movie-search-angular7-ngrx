import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { IMovie } from '@models/movie';
import { MovieState } from '@store/state/movie.state';
import { GetMovieById } from '@store/actions/movie.actions';
import { getSelectedMovie } from '@store/selectors/movie.selector';
import { YandexTranslateService } from '@services/yandex-translate.service';

@Component({
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

    russianText = false;
    movie = {
        Title: '',
        Director: '',
        Type: '',
        Actors: '',
        Genre: '',
        Plot: '',
        Poster: ''
    };
    private movieSubscriptions = new Subscription();

    constructor(
        private store: Store<MovieState>,
        private route: ActivatedRoute,
        private yandexTranslateService: YandexTranslateService,
        private location: Location,
        private toastr: ToastrService) {}

    ngOnInit(): void {
        this.store.dispatch(new GetMovieById(this.route.snapshot.params.id));
        this.movieSubscriptions = this.store.pipe(select(getSelectedMovie))
            .subscribe((response: IMovie) => {
                for (const key in response) {
                    if (this.movie[key] !== undefined) {
                        this.movie[key] = response[key];
                    }
                }
            });
    }

    goBack(): void {
        this.location.back();
    }

    yandexTranslate() {
        let text = '';
        const arrayKey: string[] = [];

        for ( const key in this.movie ) {
            if ( this.movie.hasOwnProperty(key)) {
                text += this.movie[key] !== 'N/A' && key !== 'Poster' ? `${this.movie[key].replace(/;/g, '%3B')}^^` : '^^';
                arrayKey.push(key);
            }
        }

        this.yandexTranslateService.getYandexTtranslate(text)
            .subscribe(
                response => {
                    const movieRu = response.toString().split('^^');
                    for (let i = 0; i < movieRu.length; i++) {
                        if (movieRu[i] !== '') {
                            this.movie[arrayKey[i]] = movieRu[i];
                        }
                    }
                    this.russianText = true;
                },
                ( error: string ) =>  this.toastr.error(error, 'Перевода не случилось !')
            );
    }

    ngOnDestroy() {
        this.movieSubscriptions.unsubscribe();
    }
}
