import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../module/UserCredentials';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit{
  isLoginPage : boolean = false;

  constructor(private authService:AuthService,
              private route:ActivatedRoute,
              private router:Router){}
  ngOnInit(): void {
    localStorage.clear();
    this.route.data.subscribe(
      data => {
        const action = data['action'];
        if(action === 'login'){
          this.isLoginPage = true;
        }
      }
    )
  }

  onLogin(userCredentials:UserCredentials){
    this.authService.login(userCredentials);
    setTimeout(() => {
      this.router.navigate(['']); 
    }, 2000);
    
  }

  onRegister(username:string, password:string, password_retype:string){
    if(password === password_retype){
      const userCredentials = {
        "username": username,
        "password": password
      };
      this.authService.register(userCredentials);
      this.router.navigate(['/login']);
    }
  }
  openRegisterPage(){
    this.router.navigate(['/register']);
  }
  openLoginPage(){
    this.router.navigate(['/login']);
  }
}
