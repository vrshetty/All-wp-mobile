import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookmarkedPage } from './bookmarked';

@NgModule({
  declarations: [
    BookmarkedPage,
  ],
  imports: [
    IonicPageModule.forChild(BookmarkedPage),
  ],
})
export class BookmarkedPageModule {}
