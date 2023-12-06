import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDTO } from '../module/PostDTO';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { User } from '../module/User';
import { GroupService } from '../services/group-service.service';
import { Group } from '../module/Group';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit{
  // @ts-ignore
  group:Group;
  // @ts-ignore
  user:User;
  isGroupAlreadyFollowed = false;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private postService:PostService,
              private groupService:GroupService,
              private authService:AuthService)
  { }

  ngOnInit(): void {
    // @ts-ignore
    let groupName = this.route.snapshot.paramMap.get('groupName');

    if(groupName){
      this.groupService.getGroupByName(groupName).subscribe((group) => this.group = group);
    }
    this.authService.getUser().subscribe((user) => this.user = user);
    this.groupService.getFollowedGroups().subscribe((groups) => {
      if(groups.some(g => g.name === this.group.name)){
        this.isGroupAlreadyFollowed = true;
      }
    });
  }

  createGroupPost(postData:PostDTO){
    postData.user = this.user;
    postData.upvotes = 0;
    this.postService.createGroupPost(this.group.name , postData);
    this.router.navigate(['/g/' + this.group.name]);
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
}
