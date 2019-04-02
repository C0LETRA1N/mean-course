import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
/*   posts = [
    {
      title: 'First Post',
      content: 'First Post Content'
    },
    {
      title: 'Second Post',
      content: 'Second Post Content'
    },
    {
      title: 'Third Post',
      content: 'Third Post Content'
    }
  ] */
  posts: Post[] = [];
  private postsSub: Subscription;

  // for dependency injection of service
  // public keyword for automatically assigning the value to the variable
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    // listener subscription
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  // garbage collection to prevent memory leaks
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}