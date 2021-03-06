import { Component, OnInit } from '@angular/core';
import { NetflixService } from '../services/netflix.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  results: any[] = [];
  movieParams: any;
  msgSearch = 'Encontre sua próxima história';
  msgAdvertisement = 'Busque séries para assistir no caminho para o trabalho, filmes para descontrair ou seus gêneros favoritos.';
  isLoading = false;

  // tslint:disable-next-line:max-line-length
  constructor(public netflixService: NetflixService, private activatedRoute: ActivatedRoute, private router: Router, public loadingController: LoadingController, public alertController: AlertController ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ngOnInit() {}

  async searchMovies(ev: any) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Carregando...',
      duration: 1000,
    }).then(a => {
      a.present().then(() => {
        if (  this.movieParams && this.movieParams.length > 1 ) {
          const val = ev.target.value;
          this.netflixService.searchMovies(val).subscribe(data => {
          console.log(data.results);
          this.results = data.results;
        });
        }
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async modalInfo(event) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Hello',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  clearSearch(event) {
    this.results = [];
  }

  viewDetail(movie) {
    this.router.navigate(['/movie-details', { movie: JSON.stringify(movie) }]);
  }

}
