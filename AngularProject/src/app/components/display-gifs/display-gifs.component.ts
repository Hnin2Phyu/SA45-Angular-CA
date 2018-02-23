import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GiphyModel} from '../../giphyModel';
import {NgForm} from '@angular/forms';
import {GiphyService} from '../../giphyService';


@Component({
  selector: 'app-display-gifs',
  templateUrl: './display-gifs.component.html',
  styleUrls: ['./display-gifs.component.css']
})
export class DisplayGifsComponent implements OnInit {

  @Input()
  model: GiphyModel;

  @Input()
  username: string;

  constructor(private giphyService: GiphyService) { }

  ngOnInit() {}

  addToFavorite(form: NgForm) {

    const datas: GiphyModel = {
      username: this.username,
      gifURL: this.model.gifURL,
      title: this.model.title,
      author: this.model.author
    };

    this.giphyService.addToFavorite(datas).then(data => console.log(data));
  }

}
