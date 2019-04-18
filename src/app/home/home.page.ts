import { Component, OnInit } from '@angular/core';
import { NetflixService } from '../services/netflix.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  txtPopularTitle = ' Populares na Netflix';
  txtHighMoviesTitle = ' Em alta';
  titleMovie = 'Shazam';
  studio = 'DC Comics';
  populars: any;
  othersMovies: any;
  isLoading = false;

  constructor(public netflixService: NetflixService, public router: Router, public loadingController: LoadingController ) { }

  async ngOnInit() {
    this.isLoading = true;
      return await this.loadingController.create({
        message: 'Carregando...',
        duration: 1000,
      }).then(a => {
        a.present().then(() => {
          this.netflixService.getPopularMovies(1).subscribe(data => {
            this.populars = data.results;
            console.log('Popular', data.results);
          });
          this.netflixService.getInOthersMovies().subscribe(data => {
            this.othersMovies = data.results;
            console.log('Others Movies', data.results);
          });
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('close'));
          }
        });
      });
  }

  ionViewDidLoad() {
    console.log('HomePage');
  }

  viewDetail(movie) {
    this.router.navigate(['/movie-details', { movie: JSON.stringify(movie) }]);
  }
}
