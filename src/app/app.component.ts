import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MovieState } from './store/state/movie.state';
import { GetLocalStorage } from './store/actions/movie.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Поиск фильмов почасти названия';
  constructor(private store: Store<MovieState>) {}

  ngOnInit() {
    this.store.dispatch(new GetLocalStorage());
  }
}
