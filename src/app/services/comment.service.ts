import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../module/User';
import { Comment } from '../module/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  BASE_URL : string = "http://localhost:8080";
  url : string = "";
  constructor(private http:HttpClient) { }

  getComments(id:number){
    this.url = this.BASE_URL + '/api/comment/getUserComments/' + id;
    return this.http.get<Comment[]>(this.url);
  }

  addComment(text:string, user:User, groupName:string, postId:number){
    this.url = this.BASE_URL + "/g/" + groupName + "/post/" + postId;

    const comment = {text: text, user: user};

    this.http.post(this.url, comment).subscribe((resp) => console.log(resp));
  }
  
  deleteComment(id:number){
    this.url = this.BASE_URL + "/api/deleteComment/" + id;

    this.http.delete(this.url).subscribe((resp) => console.log(resp));
  }
}
