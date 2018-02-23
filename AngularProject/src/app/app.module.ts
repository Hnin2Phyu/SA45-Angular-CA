import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



// Angular Materials
import { MatListModule, MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DisplayGifsComponent } from './components/display-gifs/display-gifs.component';
import { GiphyService } from './giphyService';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    DisplayGifsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTabsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
