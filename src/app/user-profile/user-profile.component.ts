import { Component, OnInit } from '@angular/core';
import { User } from '../module/User';
import { Comment } from '../module/Comment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { PostDTO } from '../module/PostDTO';
import { AuthService } from '../services/auth.service';
import { forkJoin } from 'rxjs';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  faTrashCan = faTrashCan;

  // @ts-ignore
  user:User | undefined;
  // @ts-ignore
  userProfile:User | undefined;
  // @ts-ignore
  userPosts:PostDTO[] = [];
  //@ts-ignore
  userComments:Comment[] = [];

  isOwnUserProfile : boolean = false;
  arePostsShowing = true;

  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private postService:PostService,
              private commentService:CommentService,
              private authService:AuthService,
              private router:Router){}
  ngOnInit(): void {

    let username = this.route.snapshot.paramMap.get('userName');
    if (username) {
      const userProfile$ = this.userService.getUserByUsername(username);
      const user$ = this.authService.getUser();
  
      forkJoin({ userProfile: userProfile$, user: user$ }).subscribe(
        ({ userProfile, user }) => {
          this.userProfile = userProfile;
          this.user = user;
  
          if (this.user && this.userProfile && this.user.username === this.userProfile.username) {
            this.isOwnUserProfile = true;
          }
  
          if (this.userProfile) {
            forkJoin([
              this.postService.getUserPosts(this.userProfile.id),
              this.commentService.getComments(this.userProfile.id)
            ]).subscribe(([posts, comments]) => {
              this.userPosts = posts;
              this.userComments = comments;
            });
            
          }
        }
      );
      
    }
  }

  showPost(post:PostDTO){
    let url : string = '/g/' + post.group.name + '/post/' + post.id;

    this.router.navigate([url]);
  }
  btnClicked(){
    this.arePostsShowing = !this.arePostsShowing;
  }
  deletePost(groupName: string, id:number){
    this.postService.deletePost(groupName,id);
    location.reload();
  }

  deleteComment(id:number){
    this.commentService.deleteComment(id);
    location.reload();
  }
}
