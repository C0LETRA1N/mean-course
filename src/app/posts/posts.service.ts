import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'}) // So angular can find it and provide only one instance for the entire app
// in place of adding service to providers in app module
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // copy of the array in a new array and not reference
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]); // adds new posts ot list
  }
}
