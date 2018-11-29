import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { WpApiPosts, WpApiMedia, WpApiUsers, WpApiTaxonomies, WpApiTerms } from 'wp-api-angular';
import { Headers } from '@angular/http';

export class Post {
  public media_url: Observable<string>;
  constructor(public link: string, public authorId: number, public id: number, public title: string, public content: string, public excerpt: string, public date: string, public mediaId?: number) { }
}
 
export class User {
  constructor(public id: number, public name: string, public userImageUrl: string) { }
}

export class Category {
  constructor(public name: string ) { }
}

@Injectable()
export class WpProvider {
  users: User[];
  categories: Category[];
 
  constructor(
    public wpApiPosts: WpApiPosts, 
    public wpApiMedia: WpApiMedia, 
    public wpApiUsers: WpApiUsers, 
    public WpApiTaxonomies: WpApiTaxonomies,
    public WpApiTerms: WpApiTerms
    ) {

    this.wpApiUsers.getList()
      .map(res => res.json())
      .subscribe(data => {
        this.users = [];
        for (let user of data) {
          let oneUser = new User(user[ 'id' ], user[ 'name' ], user[ 'avatar_urls' ][ '96' ]);
          this.users.push(oneUser);
        }
      })

  }
 
  getPosts(): Observable<Post[]> {
    return this.wpApiPosts.getList()
      .map(res => res.json())
      .map(data => {
        var posts = [];
        console.log(data);

        for (let post of data) {
          let onePost = new Post( post[ 'link' ] ,post[ 'author' ], post[ 'id' ], post[ 'title' ][ 'rendered' ], post[ 'content' ][ 'rendered' ], post[ 'excerpt' ][ 'rendered' ], post[ 'date' ], post[ 'featured_media' ]);
          onePost.media_url = this.getMedia(onePost.mediaId);
          posts.push(onePost);
        }
        return posts;
      });
  }


  getCategoryList(): Observable<Category[]> {

    console.warn('calling categories');
    return this.WpApiTerms.getList('categories')
    .map(res => res.json())
    .map(data => {
      var categories = [];

      for (let singleCategory of data) {

        if( singleCategory['count'] !== 0){
            let onePost = new Category( singleCategory['name'] );
            categories.push(onePost);
        }
    
      }

      // console.clear();
      
      return categories;
    });


  }

  
 
  getMedia(id: number): Observable<string> {
    return this.wpApiMedia.get(id)
      .map(res => res.json())
      .map(data => {
        return data[ 'source_url' ];
      });
  }
 
  getUserImage(userId: number) {
    for (let usr of this.users) {
      if (usr.id === userId) {
        return usr.userImageUrl;
      }
    }
  }
 
  getUserName(userId: number) {
    for (let usr of this.users) {
      if (usr.id === userId) {
        return usr.name;
      }
    }
  }


}