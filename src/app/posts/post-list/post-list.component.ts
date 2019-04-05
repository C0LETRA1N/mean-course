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
  isLoading = false;
  private postsSub: Subscription;

  // for dependency injection of service
  // public keyword for automatically assigning the value to the variable
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    //this.posts = this.postsService.getPosts();
    this.postsService.getPosts(); // method no longer returns anything
    // listener subscription
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  // garbage collection to prevent memory leaks
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
