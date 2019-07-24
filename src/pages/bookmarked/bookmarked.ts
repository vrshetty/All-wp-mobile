import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Post } from '../../providers/wp-provider';


@IonicPage()
@Component({
  selector: 'page-bookmarked',
  templateUrl: 'bookmarked.html',
})
export class BookmarkedPage {


  allBookmarkedPost = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkedPage');
    this.getAllBookmarkedPosts();
  }


  getAllBookmarkedPosts(){

    let bookmarkedPosts = [];

       if( this.storage.get("bookmarkedPosts") !== null ){


          this.storage.get('bookmarkedPosts').then((val) => {

               this.allBookmarkedPost =  JSON.parse(val);
                console.log(this.allBookmarkedPost);
          });


      }else{
        let bookmarkedPosts = [];
        this.storage.set("bookmarkedPosts", JSON.stringify(bookmarkedPosts) );
      }

  }


  openPost(post: Post) {
    this.navCtrl.push('PostPage', {post: post});
  }

}
