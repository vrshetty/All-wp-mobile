import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { WpApiPosts, WpApiMedia, WpApiUsers, WpApiTaxonomies, WpApiTerms, WpApiCustom, WpApiComments  } from 'wp-api-angular';
import { URLSearchParams } from '@angular/http';

// export class RequestOptionsArgs {
//   url : string,
//   method : string|RequestMethod,
//   search : string|URLSearchParams,
//   headers : Headers,
//   body : any,
//   withCredentials : boolean
// }

export class Post {
  public media_url: Observable<string>;

  public author_url: Observable<string>;

  constructor(
    public categories: number[],
    public link: string, 
    public authorId: number, 
    public id: number, 
    public title: string, 
    public content: string, 
    public excerpt: string, 
    public date: string, 
    public mediaId?: number,
    ){}

}
 
export class User {
  constructor(
    public id: number, 
    public name: string, 
    public userImageUrl: string
    ){}
}

export class Category {
  constructor(
    public name: string, 
    public id: number 
    ){}
}

export class Comment{
  constructor(
    public author_name: string, 
    public parent: number,
    public date: string,
    public content: string,
    public status: string,
    public author_avatar_urls: object,
    ){}
}


@Injectable()
export class WpProvider {
  users: User[];
  categories: Category[];
  postsData = [];
 
  public activeTheme: string = 'darkmode'; 

  constructor(
        public wpApiPosts: WpApiPosts, 
        public wpApiMedia: WpApiMedia, 
        public wpApiUsers: WpApiUsers, 
        public WpApiTaxonomies: WpApiTaxonomies,
        public WpApiTerms: WpApiTerms,
        public wpApiCustom: WpApiCustom,
        public wpApiComments: WpApiComments 
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

        for (let post of data) {
          let onePost = new Post( post['categories'], post[ 'link' ] ,post[ 'author' ], post[ 'id' ], post[ 'title' ][ 'rendered' ], post[ 'content' ][ 'rendered' ], post[ 'excerpt' ][ 'rendered' ], post[ 'date' ], post[ 'featured_media' ] );

          onePost.media_url = this.getMedia(onePost.mediaId);
          onePost.author_url = this.getMedia(onePost.authorId);

          posts.push(onePost);
          this.postsData.push(onePost);
        }
        return posts;
      });
  }


  getCategoryList(): Observable<Category[]> {

    return this.WpApiTerms.getList('categories')
    .map(res => res.json())
    .map(data => {
      var categories = [];

      for (let singleCategory of data) {

        if( singleCategory['count'] !== 0 ){
            let onePost = new Category( singleCategory['name'], singleCategory['id'] );
            categories.push(onePost);
        }
    
      }      
      return categories;
    });


  }

  

  getPostsByCategories(category){

    console.clear();

    let params = new URLSearchParams();
    params.append("categories", category.id );

    return this.wpApiCustom.httpGet('/posts', {params})
    .map(res => res.json())
    .map(data => {
      var posts = [];

      for (let post of data) {
        let onePost = new Post( post['categories'], post[ 'link' ] ,post[ 'author' ], post[ 'id' ], post[ 'title' ][ 'rendered' ], post[ 'content' ][ 'rendered' ], post[ 'excerpt' ][ 'rendered' ], post[ 'date' ], post[ 'featured_media' ] );
        
        onePost.media_url = this.getMedia(onePost.mediaId);
        posts.push(onePost);
      }

      return posts;
    });


  }


  addNewComment(comment){

       let commentData = {
        "author_name": comment.author_name,
        "author_email": comment.author_email,
        "comment": comment.comment, 
        "post": comment.post,
        "parent": comment.parent
      };

        return this.wpApiComments.create('/comments', commentData)
        .map(res => res.json())
        .map(data => {  
          console.log(data);    
          return data;
        });

  }


  getCommentsById(post){

        let params = new URLSearchParams();
        params.append("post", post.id);
    
        return this.wpApiCustom.httpGet('/comments', {params})
        .map(res => res.json())
        .map(data => {
          var comments = [];
        
          for (let comment of data) {
            let onePost = new Comment( comment['author_name'], comment['parent'], comment['date'], comment['content']['rendered'], comment['status'], comment['author_avatar_urls'] );
            comments.push(onePost);
          }
          
          return comments;
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