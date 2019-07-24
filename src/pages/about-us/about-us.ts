import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  public aboutUsContent ='Codeafric looks to teach each and everyone the skils of coding and tech as a whole, a collective effort of passionate individuals, around the country ghana. A collective effort of highly skilled software engineers and web developers, creative genuises and an energy to conquer the traditional norms of society.';


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }



}
