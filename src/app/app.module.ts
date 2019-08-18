import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from '@app/app-routing.module';

import { environment } from '../environments/environment';

import { MovieEffects } from '@store/effects/movie.effects';

import { AppComponent } from '@app/app.component';


import { movieReducer } from '@store/reducers/movie.reducers';
import { LayoutComponent } from '@layouts/layout.component';
import { MovieSarchComponent } from '@components/movie/movie-sarch/movie-sarch.component';
import { MovieDetailComponent } from '@components/movie/movie-detail/movie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MovieSarchComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 5000 }),
    StoreModule.forRoot({movieReducer}),
    EffectsModule.forRoot([ MovieEffects ]),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
