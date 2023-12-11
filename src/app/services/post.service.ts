import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDTO } from '../module/PostDTO';
import { Router } from '@angular/router';
import { User } from '../module/User';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http:HttpClient,
              private router : Router) { }

  public getPostByIdAndGroupName(id:number, groupName:string){
    let url = Environment.BASE_URL + "/g/" + groupName + "/post/" + id;
    return this.http.get<PostDTO>(url);
  }
  createGroupPost(groupName:string, postData:PostDTO){
    let url = Environment.BASE_URL + "/g/" + groupName + "/createPost"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: headers,
      observe: 'body' as const,
      responseType: 'json' as const,
    };

    this.http.post<PostDTO>(url, postData, httpOptions).subscribe((response)=> {
      console.log(response);
    });
  }
  public showPost(groupName: string, postId: number){
    let url = "/g/" + groupName + "/post/" + postId;
    this.router.navigate([url]);
  }
  public showPostByDateAfter(groupName:string, value:string){
    let url = Environment.BASE_URL + "/g/" + groupName + "/top/?t=" + value;

    return this.http.get<PostDTO[]>(url);
  }

  public getUserPosts(id:number){
    let url = Environment.BASE_URL + "/api/post/getUserPosts/" + id;

    return this.http.get<PostDTO[]>(url);
  }

  public getHomeFeed(){
    let url = Environment.BASE_URL + "/api/post/getHomeFeed";
    return this.http.get<PostDTO[]>(url);
  }

  public deletePost(groupName:string, postId:number){
    let url = Environment.BASE_URL + "/g/" + groupName + "/deletePost/" + postId;

    return this.http.delete(url).subscribe((resp) => console.log(resp));
  }

  public upvote(id:number, user:User){
    let url = Environment.BASE_URL + '/api/post/upvote/' + id;

    return this.http.post<User>(url, user).subscribe((resp) => console.log(resp));
  }

  public getUserLikedPosts(){
    let url = Environment.BASE_URL + '/api/post/likedPosts';

    return this.http.get<PostDTO[]>(url);
  }
}
