import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider, Post } from '../../providers/wp-provider';
import { Observable } from 'rxjs/Observable';
import { SettingsPage } from '../settings/settings';
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader: Loading;
  posts: Observable<Post[]>;
  categories: Observable<any[]>;

  chosenCategory: string = 'Home';
 
  constructor(
    public navCtrl: NavController, 
    public wpProvider: WpProvider, 
    public loadingCtrl: LoadingController
  ){};

    ionViewDidLoad(){
        
        this.presentLoading();

        this.categories = this.wpProvider.getCategoryList();

        this.posts = this.wpProvider.getPosts();
        this.posts.subscribe( (data) => {
              this.loader.dismiss();
        });

    }


  getPostsCollection(){

        this.chosenCategory = 'Home';

        this.presentLoading();

        this.posts = this.wpProvider.getPosts();

        this.posts.subscribe( (data) => {
              this.loader.dismiss();
        });

    }

  getCategoryPosts(category){

    this.chosenCategory = category.name;

    this.presentLoading();

    this.posts = this.wpProvider.getPostsByCategories(category);
    this.posts.subscribe( (data) => {
          this.loader.dismiss();
        });

  }

  getUserImage(id: number) {
    return this.wpProvider.getUserImage(id);
  }
 
  getUserName(id: number) {
    return this.wpProvider.getUserName(id);
  }
 
  openPost(post: Post) {
    this.navCtrl.push('PostPage', {post: post});
  }
 
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }


  goToSettings(){
      this.navCtrl.push(SettingsPage);
  }

}