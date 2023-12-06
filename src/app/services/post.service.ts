import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDTO } from '../module/PostDTO';
import { Router } from '@angular/router';
import { User } from '../module/User';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  BASE_URL:string = "http://localhost:8080";
  url:string = "";

  constructor(private http:HttpClient,
              private router : Router) { }

  public getPostByIdAndGroupName(id:number, groupName:string){
    this.url = this.BASE_URL + "/g/" + groupName + "/post/" + id;
    return this.http.get<PostDTO>(this.url);
  }
  createGroupPost(groupName:string, postData:PostDTO){
    this.url = this.BASE_URL + "/g/" + groupName + "/createPost"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: headers,
      observe: 'body' as const,
      responseType: 'json' as const,
    };

    this.http.post<PostDTO>(this.url, postData, httpOptions).subscribe((response)=> {
      console.log(response);
    });
  }
  public showPost(groupName: string, postId: number){
    this.url = "/g/" + groupName + "/post/" + postId;
    this.router.navigate([this.url]);
  }
  public showPostByDateAfter(groupName:string, value:string){
    this.url = this.BASE_URL + "/g/" + groupName + "/top/?t=" + value;

    return this.http.get<PostDTO[]>(this.url);
  }

  public getUserPosts(id:number){
    this.url = this.BASE_URL + "/api/post/getUserPosts/" + id;

    return this.http.get<PostDTO[]>(this.url);
  }

  public getHomeFeed(){
    this.url = this.BASE_URL + "/api/post/getHomeFeed";
    return this.http.get<PostDTO[]>(this.url);
  }

  public deletePost(groupName:string, postId:number){
    this.url = this.BASE_URL + "/g/" + groupName + "/deletePost/" + postId;

    return this.http.delete(this.url).subscribe((resp) => console.log(resp));
  }

  public upvote(id:number, user:User){
    this.url = this.BASE_URL + '/api/post/upvote/' + id;

    return this.http.post<User>(this.url, user).subscribe((resp) => console.log(resp));
  }

  public getUserLikedPosts(){
    this.url = this.BASE_URL + '/api/post/likedPosts';

    return this.http.get<PostDTO[]>(this.url);
  }
}
