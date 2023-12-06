import { Component, OnInit } from '@angular/core';
import { Group } from '../module/Group';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../services/group-service.service';
import { PostService } from '../services/post.service';
import { PostDTO } from '../module/PostDTO';
import { CommentService } from '../services/comment.service';
import { User } from '../module/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-show-group-post',
  templateUrl: './show-group-post.component.html',
  styleUrls: ['./show-group-post.component.css']
})
export class ShowGroupPostComponent implements OnInit {
  group:Group = new Group("", "");
  // @ts-ignore
  post:PostDTO;
  // @ts-ignore
  user:User;

  constructor(private route:ActivatedRoute,
              private groupService:GroupService,
              private postService:PostService,
              private commentService:CommentService,
              private authService:AuthService){}

  ngOnInit(): void {
    let groupName = this.route.snapshot.paramMap.get('groupName');
    this.groupService.getGroupByName(groupName).subscribe((group) => this.group = group);
    
    let _postId_ = this.route.snapshot.paramMap.get('postId');
    let postId = _postId_ ? parseInt(_postId_, 10) : null;

    if(groupName != null && postId != null)
      this.postService.getPostByIdAndGroupName(postId, groupName).subscribe((post) => {
        this.post = post
      });

    this.authService.getUser().subscribe((user) => 
    {
      this.user = user;
    });
  }
  addComment(text:string, groupName : string, postId : number){
    this.commentService.addComment(text, this.user, groupName, postId);
    location.reload();
  }

  deleteComment(id:number){
    this.commentService.deleteComment(id);
    location.reload();
  }
}
