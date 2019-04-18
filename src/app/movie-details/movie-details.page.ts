import { Component, OnInit } from '@angular/core';
import { NetflixService } from '../services/netflix.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  titleDetail = 'Series e filmes';

  constructor(public netflixService: NetflixService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.movie = JSON.parse(this.activatedRoute.snapshot.paramMap.get('movie'));
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MovieDetailsPage');
  }

}
