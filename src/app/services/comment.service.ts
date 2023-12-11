import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../module/User';
import { Comment } from '../module/Comment';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  getComments(id:number){

    let url = Environment.BASE_URL + '/api/comment/getUserComments/' + id;

    return this.http.get<Comment[]>(url);
  }

  addComment(text:string, user:User, groupName:string, postId:number){

    let url = Environment.BASE_URL + "/g/" + groupName + "/post/" + postId;

    const comment = {text: text, user: user};

    this.http.post(url, comment).subscribe((resp) => console.log(resp));
  }
  
  deleteComment(id:number){
    let url = Environment.BASE_URL + "/api/deleteComment/" + id;

    this.http.delete(url).subscribe((resp) => console.log(resp));
  }
}
