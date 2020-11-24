import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DogBreedsShowcaseComponent } from './views/dog-breeds-showcase/dog-breeds-showcase.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ListFilterPipe } from './components/pipes/list-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DogBreedsService } from './services/dog-breeds/dog-breeds.service';
import { DogImagesService } from './services/dog-images/dog-images.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DogBreedsShowcaseComponent,
    ListFilterPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en_GB',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    DogBreedsService,
    DogImagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
