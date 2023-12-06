import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupControllerComponent} from "./group-controller/group-controller.component";
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ShowGroupPostComponent } from './show-group-post/show-group-post.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: AuthorizationComponent, data: {action:'login'} },
  {path: 'register', component: AuthorizationComponent, data: {action:'register'} },
  {path: 'groups/create', component: CreateGroupComponent},
  {path: 'u/:userName', component: UserProfileComponent},
  {path: 'g/:groupName/createPost', component: CreatePostComponent},
  {path: 'g/:groupName/post/:postId', component: ShowGroupPostComponent},
  {path: 'g/:groupName', component: GroupControllerComponent},
  {path: 'g/:groupName/top', component: GroupControllerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
