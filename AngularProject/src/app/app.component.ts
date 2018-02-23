import {Component, OnInit} from '@angular/core';
import {GiphyService} from './giphyService';
import {GiphyModel} from './giphyModel';
import {NgForm} from '@angular/forms';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private giphyService: GiphyService) { }

  modelList: GiphyModel[] = [];
  username: String;

  ngOnInit() {}

  retrieveFavorite(form: NgForm) {

    this.modelList = [];

    this.giphyService.getFavoriteList(form.value.username)
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          const model: GiphyModel = {
            gifURL: data[i]['gif'],
            title: data[i]['title'],
            author: data[i]['author'],
            favorite: true
          };
          this.modelList.push(model);
        }
      });
  }

  processSearch(form: NgForm) {

    this.username = form.value.username; // get username
    this.modelList = []; // empty list before a new search

    const n: number = (form.value.number === '') ? 5 : form.value.number; // set default as 5
    this.giphyService.searchGiphy(form.value.searchString, n)
      .then((data) => {
        for (let i = 0; i < data['data'].length; i++) {
          const model: GiphyModel = {
            gifURL: data['data'][i]['images']['downsized']['url'],
            title: data['data'][i]['title'],
            author: data['data'][i]['username']
          };
          this.modelList.push(model);
        }
      });
  }
}
