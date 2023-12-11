import { Injectable } from '@angular/core';
import { UserCredentials } from '../module/UserCredentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../module/Token';
import { User } from '../module/User';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token : string = "";

  constructor(private http:HttpClient) { }

  login(userCredentials: UserCredentials){

    let url = Environment.BASE_URL + '/auth/login';

    this.http.post<Token>(url, userCredentials).subscribe(
      (response) => {
        this.token = response.token;
        localStorage.setItem('Token', this.token);
      }
    );
  }

  register(userCredentials:UserCredentials){
    
    let url = Environment.BASE_URL + '/auth/register';

    this.http.post<Token>(url, userCredentials).subscribe(
      (resp) => {
        //this.token = resp.token;
        //localStorage.setItem('Token', this.token);
      }
    );
  }

  getUser() {
    let url = Environment.BASE_URL + '/auth/user';
  
    return this.http.get<User>(url);
  }
  
}
