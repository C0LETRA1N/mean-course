import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: PostListComponent }, // empty path is the index?, them component and type
  { path: 'create', component: PostCreateComponent }, // don't add the slash
  { path: 'edit/:postId', component: PostCreateComponent }, // edit by id
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
