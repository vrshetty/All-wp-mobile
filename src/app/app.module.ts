import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WpProvider } from '../providers/wp-provider';
import { Http, HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';

import { 
  WpApiModule,
  WpApiLoader,
  WpApiStaticLoader
} from 'wp-api-angular'
 
export function WpApiLoaderFactory(http) {
  return new WpApiStaticLoader(http, 'https://www.codeafric.com//wp-json/');
}

import { HomePage } from '../pages/home/home';

import { SettingsPageModule } from '../pages/settings/settings.module';
import { YoutubePageModule } from '../pages/youtube/youtube.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ContactUsPageModule } from '../pages/contact-us/contact-us.module';
import { AboutUsPageModule } from '../pages/about-us/about-us.module';



@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
        WpApiModule.forRoot({
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp),
    SettingsPageModule,
    YoutubePageModule,
    LoginPageModule,
    SignupPageModule,
    ContactUsPageModule,
    AboutUsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WpProvider
  ]
})
export class AppModule {}


