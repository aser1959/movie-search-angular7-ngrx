import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieSarchComponent } from '@components/movie/movie-sarch/movie-sarch.component';
import { MovieDetailComponent } from '@components/movie/movie-detail/movie-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'search',
    component: MovieSarchComponent,
  },
  {
    path: 'detail/:id',
    component: MovieDetailComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
