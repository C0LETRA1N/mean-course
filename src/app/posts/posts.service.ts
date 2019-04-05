import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'}) // So angular can find it and provide only one instance for the entire app
// in place of adding service to providers in app module
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  // inject httpclient
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    // copy of the array in a new array and not reference
    // return [...this.posts];
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => { // this function is used to underscore id in place of not underscore id in the model
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe(transformedPosts => {
      this. posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    }); // unsubscription handled by angular because http is built in
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id: string; title: string; content: string}>("http://localhost:3000/api/posts/" + id); // cannot return posts?
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content} ;
    this.http.post<{message: string, postId: string;}>('http://localhost:3000/api/posts', post) // post to server
      .subscribe(responseData => { // listener
        console.log(responseData.message);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post); // optimistic local server updatee
        this.postsUpdated.next([...this.posts]); // adds new posts ot list
        this.router.navigate(['/']); // go back to the main page
      });
  }

  updatePost(id: string, title: string, content: string) { // can use object instead of individual fields
    const post: Post = { id: id, title: title, content: content };
    this.http.patch('http://localhost:3000/api/posts/' +id, post)
    .subscribe(response => {
      console.log(response);

      // update local posts?
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
