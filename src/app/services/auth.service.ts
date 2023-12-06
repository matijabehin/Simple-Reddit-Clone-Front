import { Injectable } from '@angular/core';
import { UserCredentials } from '../module/UserCredentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../module/Token';
import { User } from '../module/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL : string = "http://localhost:8080";
  url : string = "";
  token : string = "";

  constructor(private http:HttpClient) { }

  login(userCredentials: UserCredentials){

    this.url = this.BASE_URL + "/auth/login";

    this.http.post<Token>(this.url, userCredentials).subscribe(
      (response) => {
        this.token = response.token;
        localStorage.setItem('Token', this.token);
      }
    );
  }

  register(userCredentials:UserCredentials){
    this.url = this.BASE_URL + "/auth/register";

    this.http.post<Token>(this.url, userCredentials).subscribe(
      (resp) => {
        //this.token = resp.token;
        //localStorage.setItem('Token', this.token);
      }
    );
  }

  getUser() {
    this.url = this.BASE_URL + "/auth/user";
  
    return this.http.get<User>(this.url);
  }
  
}
