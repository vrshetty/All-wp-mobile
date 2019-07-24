import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WpProvider } from '../../providers/wp-provider';
import { UtilsProvider } from '../../providers/utils/utils';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
    PipesModule,
  ],
  exports: [
    PostPage
  ],
  providers: [
    SocialSharing,
    WpProvider,
    UtilsProvider
  ]
})
export class PostPageModule {}
