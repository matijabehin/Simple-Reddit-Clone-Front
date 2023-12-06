import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../module/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL:string = "http://localhost:8080";
  url:string = "";

  constructor(private http:HttpClient,
              private router : Router) { }

  getUserByUsername(username:string){
    this.url = this.BASE_URL + "/api/user/getUserByName/" + username;
   return this.http.get<User>(this.url);
  }
}
