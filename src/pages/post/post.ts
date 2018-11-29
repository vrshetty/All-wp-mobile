import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WpProvider, Post } from '../../providers/wp-provider';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: Post;
 
  constructor(public navCtrl: NavController, public wpProvider: WpProvider, public navParams: NavParams, private socialSharing: SocialSharing) {
    this.post = navParams.get('post');

    console.log( this.post );
  }



  shareViaPlatform(message, subject, file, url){
    this.socialSharing.share(message, subject, file, url)
  }

  shareViaTwitter(message, image, url){
    this.socialSharing.shareViaTwitter(message, image, url);
  }

  shareViaFacebook(message, image, url){
    this.socialSharing.shareViaFacebook(message, image, url);
  }

  shareViaWhatsapp(message, image: any, url){

    image.media_url().subscribe(
      data => console.log(data)
    );

    // console.log(message, image, url);
    // this.socialSharing.shareViaWhatsApp(message, image, url);
  }

  shareViaInstagram(message, image, url){
    this.socialSharing.shareViaInstagram(message, image);
  }



  getUserImage(id: number) {
    return this.wpProvider.getUserImage(id);
  }
 
  getUserName(id: number) {
    return this.wpProvider.getUserName(id);
  }

  


}