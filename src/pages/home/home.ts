import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider, Post } from '../../providers/wp-provider';
import { Observable } from 'rxjs/Observable';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader: Loading;
  posts: Observable<Post[]>;
  categories: Observable<any[]>;

 
  constructor(public navCtrl: NavController, public wpProvider: WpProvider, public loadingCtrl: LoadingController) {
  
    };

    ionViewDidLoad(){
        
        // this.presentLoading();

        // this.categories = this.wpProvider.getCategoryList();
        // this.categories.subscribe( data => console.log(data) );

        //     this.posts = this.wpProvider.getPosts();
        //     this.posts.subscribe( (data) => {
        //       console.log(data);
        //       this.loader.dismiss();
        //     });

    }
    // so we first pass user id, then we call the image
    // after we pass that subscribed data to the social plugin

  doLastOperations(){
    
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


}