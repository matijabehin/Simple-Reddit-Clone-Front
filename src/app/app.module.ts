import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { GroupControllerComponent } from './group-controller/group-controller.component';
import {CommonModule} from "@angular/common";
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule } from '@angular/forms';
import { GroupService } from './services/group-service.service';
import { PostService } from './services/post.service';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ShowGroupPostComponent } from './show-group-post/show-group-post.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthInterceptor } from './auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupControllerComponent,
    CreatePostComponent,
    CreateGroupComponent,
    ShowGroupPostComponent,
    AuthorizationComponent,
    NavigationComponent,
    UserProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    GroupService,
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
