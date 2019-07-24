import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {

  public activeTheme: string = 'lightmode';

  constructor(
        public http: Http,
        private storage: Storage,
        public toastCtrl: ToastController
    ){}


    presentToast(message:string) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'bottom'
      });
    
      // toast.onDidDismiss(() => {
      //   console.log('Dismissed toast');
      // });
    
      toast.present();
    }


  bookmarkThisPost(newPost){

      return new Promise( (resolve, reject) =>{


              this.storage.get('bookmarkedPosts').then( val =>{
                        
                let localStore = JSON.parse(val);

                  if(localStore.length == 0){

                    localStore.push(newPost);
                    this.storage.set("bookmarkedPosts", JSON.stringify(localStore) );
                    resolve();

                  }else{


                      localStore.map( onePost =>{
                              if(onePost.id !== newPost.id){
                                    localStore.push(newPost);
                                    this.storage.set("bookmarkedPosts", JSON.stringify(localStore) );
                                    resolve();
                              } 
                        });



                   }; // end of else

          
              });



        });
  
  }



  
  unBookmarkThisPost(newPost){


          return new Promise( (resolve, reject) =>{

                // go over the bookmarks
                // if there are none reject it
                // if there is splice it and resolve 

                      this.storage.get('bookmarkedPosts').then( val =>{
                        

                                let localStore = JSON.parse(val);
                            
                                if(localStore.length == 0){
                                  resolve();
                                }else{

                                    localStore.map( (onePost, i) =>{

                                      if(onePost.id === newPost.id){
                                            localStore.splice(i,1);

                                            this.storage.set("bookmarkedPosts", JSON.stringify(localStore) );
                                            resolve();
                                        } 

                                    });
                                        

                                }

                                              
                          });

                
              });
          

  } 







}
