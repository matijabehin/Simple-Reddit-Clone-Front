import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { User } from '../module/User';
import { PostDTO } from '../module/PostDTO';
import { Router } from '@angular/router';
import { GroupService } from '../services/group-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  // @ts-ignore
  user:User | undefined;
  // @ts-ignore
  posts:PostDTO[] | undefined;
  // @ts-ignore
  groups:Group[] | undefined;

  constructor(private authService:AuthService,
              private postService:PostService,
              private groupService:GroupService,
              private router:Router){}
  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user
      if(this.user){
        this.postService.getHomeFeed().subscribe((posts) => this.posts = posts)
        this.groupService.getFollowedGroups().subscribe((groups) => this.groups = groups)
      }
    });
  }

  showPost(post:PostDTO){
    this.router.navigate(['/g/' + post.group.name + '/post/' + post.id]);
  }
}
