import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WpProvider, Post } from '../../providers/wp-provider';

@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
  ],
  exports: [
    PostPage
  ],
  providers: [
    SocialSharing,
    WpProvider
  ]
})
export class PostPageModule {}
