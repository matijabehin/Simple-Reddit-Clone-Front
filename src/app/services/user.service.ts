import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../module/User';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,
              private router : Router) { }

  getUserByUsername(username:string){
    let url = Environment.BASE_URL + "/api/user/getUserByName/" + username;
   return this.http.get<User>(url);
  }
}
