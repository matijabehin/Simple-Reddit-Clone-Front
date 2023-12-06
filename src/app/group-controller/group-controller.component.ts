import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../services/group-service.service";
import {PostDTO} from "../module/PostDTO";
import { PostService } from '../services/post.service';
import { Group } from '../module/Group';
import { AuthService } from '../services/auth.service';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-controller',
  templateUrl: './group-controller.component.html',
  styleUrls: ['./group-controller.component.css']
})
export class GroupControllerComponent implements OnInit {
  BASE_URL : string = "http://localhost:8080";

  group : Group = new Group("","");
  groupPosts : PostDTO[] = [];
  isGroupAlreadyFollowed = false;
  
  // @ts-ignore
  user : User;
  constructor(private route : ActivatedRoute,
              private router : Router,
              private groupService : GroupService,
              private postService : PostService,
              private authService : AuthService
              ) {}
  ngOnInit(){
    let groupName = this.route.snapshot.paramMap.get('groupName');

    if(groupName != null){
      this.groupService.getGroupByName(groupName).subscribe((group) => this.group = group);
      this.groupService.getGroupPosts(groupName).subscribe((posts) => this.groupPosts = posts);
    }
    
    this.authService.getUser().subscribe((user) => this.user = user);

    this.groupService.getFollowedGroups().subscribe((groups) => {
      let followingGroups = groups

      if(followingGroups.length
        && followingGroups.some((group) => group.name === groupName)){
        this.isGroupAlreadyFollowed = true;
      }
    });

  }
  showPost(postId:number){
    this.postService.showPost(this.group.name, postId);
  }
  onPostDropDownChange(event:Event){
    const eventTarget = event.target as HTMLSelectElement;
    if(eventTarget.value != null){
      this.postService.showPostByDateAfter(this.group.name, eventTarget.value).subscribe((posts) => this.groupPosts = posts);
    }
  }
  followBtnClicked(){
    if(!this.isGroupAlreadyFollowed){
      this.groupService.followGroup(this.group);
      setTimeout(() => location.reload(), 1000);
    }else{
      this.groupService.unfollowGroup(this.group);
      setTimeout(() => location.reload(), 2000);
    }
  }

  deletePost(postId:number){
    this.postService.deletePost(this.group.name, postId);
    location.reload();
  }

  goToCreatePostPage(){
    const url = "/g/" + this.group.name + "/createPost";
    this.router.navigate([url]);
  }

  upvote(id:number){
    this.postService.upvote(id, this.user);
  }
}
