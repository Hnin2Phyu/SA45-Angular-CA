import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NgForm} from '@angular/forms';
import {GiphyModel} from './giphyModel';

@Injectable()
export class GiphyService {

  constructor(private httpClient: HttpClient) {

  }

  searchGiphy(searchString: string, number: number): Promise<any> {
    const queryString = new HttpParams().set('q', searchString).set('limit', number.toString());

    return (this.httpClient.get('https://api.giphy.com/v1/gifs/search?api_key=wIV6Rs0ESDHdRFaxIEobE4i3pPTiCFZb',
      {params: queryString}).toPromise());
  }

  getFavoriteList(username: String): Promise<any> {
    return(this.httpClient.get('/sa45AngularCA/getFavoriteList/' + username)
      .take(1).toPromise());
  }

  addToFavorite (datas: GiphyModel): Promise<any> {

    const queryString = new HttpParams()
      .set('username', datas.username)
      .set('gifURL', datas.gifURL)
      .set('title', datas.title)
      .set('author', datas.author);

    return (this.httpClient.get('/sa45AngularCA/addToFavorite',
      {params: queryString}).toPromise());
  }
}
