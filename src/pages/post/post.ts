import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WpProvider, Post, Comment } from '../../providers/wp-provider';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../../providers/utils/utils';


@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: Post;
  comments: Comment[];
  postIsBookmarked: boolean = false;

  public newComment = {
    'author_name': '',
    'comment': '',
    'author_email': '',
    'date': new Date(),
    'parent': '0',
    'author_url': '',
    'post': 0
  }
 
  constructor(
    public navCtrl: NavController, 
    public wpProvider: WpProvider, 
    public navParams: NavParams, 
    public sanitizerContent: DomSanitizer,
    private socialSharing: SocialSharing,
    public http: Http,
    public toastCtrl: ToastController,
    private storage: Storage,
    public utils: UtilsProvider,
  ){
      this.post = navParams.get('post');


      this.newComment = {
        'author_name': '',
        'comment': '',
        'author_email': '',
        'date': new Date(),
        'parent': '0',
        'author_url': '',
        'post': this.post.id
      }
    
      this.checkIfUserBookmarked();
      this.getAllComments();
  }



      presentToast(customMessage) {
        const toast = this.toastCtrl.create({
          message: customMessage,
          duration: 3000
        });
        toast.present();
      }



      checkIfUserBookmarked(){
          // check if this post is part of any bookmarks
          this.storage.get('bookmarkedPosts').then( val =>{
              
                  let localStore = JSON.parse(val);

                  if(localStore.length === 0){

                        this.postIsBookmarked = false;

                  }else{

                    // go over it an use find to find first


                      let findPost = localStore.find( onePost =>{
                              if(onePost.id === this.post.id){
                                  return true;
                              }else{
                                return false;
                              }
                      });


                      if(findPost){
                        this.postIsBookmarked = true;
                      }else{
                        this.postIsBookmarked = false;
                      }


                  };


          });

      }


      bookmarkAndUnbookmark(){


              // if user has bookmarked the post
              if( this.postIsBookmarked == true ){

                    console.log('unbookmarking');

                    this.utils.unBookmarkThisPost(this.post).then( res =>{

                        this.checkIfUserBookmarked();

                        this.presentToast('Bookmark deleted successfully');

                    }).catch( err =>{

                            console.log(err);

                    });

              // if user hasn't bookmarked the post
              }else{

                    console.log('bookmarking');

                    this.utils.bookmarkThisPost(this.post).then( res =>{

                        this.checkIfUserBookmarked();

                        this.presentToast('Bookmark added successfully');

                    }).catch( err =>{

                            console.log(err);

                    });
                    
              }


      }


      getAllComments(){

        if(this.post){

            this.wpProvider.getCommentsById(this.post).subscribe(
              data =>{
                  let commentData =  data.reverse();

                  this.comments = commentData;
              }
            );

        }

      }

      postANewComment(){
      

            if( this.newComment['author_name'] !== '' &&  this.newComment['author_email'] !== '' && this.newComment['comment'] !== '' ){


                  if( this.post.hasOwnProperty('id') ){
                    this.newComment['post'] = this.post.id;
                  }


                  this.wpProvider.addNewComment(this.newComment).subscribe(
                    data=>{
                        this.getAllComments();
                    }
                  );
              
                  let customMessage = 'Submitted Succesffully';
                  this.presentToast(customMessage);

            }else{

              let customMessage = 'Please fill in name , email and comment.';
              this.presentToast(customMessage);

            }
        
      

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