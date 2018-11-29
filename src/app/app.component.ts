import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { YoutubePage } from '../pages/youtube/youtube';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';

import { ContactUsPage } from '../pages/contact-us/contact-us';
import { AboutUsPage } from '../pages/about-us/about-us';

import { WpProvider } from '../providers/wp-provider';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: any}>;
  categories: Observable<any[]>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public wpProvider: WpProvider) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage,   icon: 'home' },
      { title: 'About Us', component: AboutUsPage, icon: 'information-circle' },
      { title: 'Contact Us', component: ContactUsPage, icon: 'chatboxes' },
      { title: 'Login', component: LoginPage,    icon: 'log-in' },
      { title: 'Signup', component: SignupPage,   icon: 'log-out' },
    ];

  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      
      this.splashScreen.hide();
    });
  }

  openFooterPage(){
    this.nav.setRoot(SettingsPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  

}
