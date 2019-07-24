import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
// import { YoutubePage } from '../pages/youtube/youtube';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';

import { ContactUsPage } from '../pages/contact-us/contact-us';
import { AboutUsPage } from '../pages/about-us/about-us';

import { BookmarkedPage } from '../pages/bookmarked/bookmarked';
import { WpProvider } from '../providers/wp-provider';
import { Observable } from 'rxjs/Observable';

import { UtilsProvider } from '../providers/utils/utils';
// import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: any}>;
  categories: Observable<any[]>;


  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen, 
    public wpProvider: WpProvider,
    public utilsProvider: UtilsProvider,
    // private oneSignal: OneSignal,
    private storage: Storage
    ) {
       
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage,   icon: 'home' },
      { title: 'Bookmarked', component: BookmarkedPage,    icon: 'bookmark' },
      { title: 'About Us', component: AboutUsPage, icon: 'information-circle' },
      { title: 'Contact Us', component: ContactUsPage, icon: 'chatboxes' },
      { title: 'Login', component: LoginPage,    icon: 'log-in' },
      { title: 'Signup', component: SignupPage,   icon: 'log-out' },
    ];

  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();      
      this.splashScreen.hide();

        this.initializeBookmarkingStorage();
        // Enable to debug issues:
        this.initializeIonicApp();

    });
  }


  initializeBookmarkingStorage(){

        if( this.storage.get("bookmarkedPosts") !== null ){
          let bookmarkedPosts = [];
          this.storage.set("bookmarkedPosts", JSON.stringify(bookmarkedPosts) );

          console.log('initing the app');
          
        }else{
          let bookmarkedPosts = [];
          this.storage.set("bookmarkedPosts", JSON.stringify(bookmarkedPosts) );
        }

  }


  initializeIonicApp(){


    // if (this.platform.is('cordova')) {
    
    //   this.oneSignal.startInit('521072d3-92f5-46b2-836a-bb0d96aca778', '202028706982');

    //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    //   this.oneSignal.handleNotificationReceived().subscribe(() => {
    //   // do something when notification is received
    //   console.log('Recieved a notification');
    //   });

    //   this.oneSignal.handleNotificationOpened().subscribe(() => {
    //     // do something when a notification is opened
    //   });

    //   this.oneSignal.endInit();

    // } else {
    //   console.log('Using notifications in browser');
    // }

    

  }

  openFooterPage(){
    this.nav.setRoot(SettingsPage);
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }


  

}
