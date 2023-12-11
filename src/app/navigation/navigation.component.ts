import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Group } from '../module/Group';
import { GroupService } from '../services/group-service.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  faSignOut = faSignOut;
  faUser = faUser;

  // @ts-ignore
  user : User | undefined;


  searchTerm : string = '';
  groups:Group[] = [];
  results:Group[] = [];
  constructor(private authService : AuthService,
              private groupService : GroupService,
              private router : Router){}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => this.user = user);

    this.groupService.getAll().subscribe((groups) => this.groups = groups);
  }

  goToCreateGroupPage(){
    this.router.navigate(['/groups/create']);
  }

  goToUserProfilePage(){
    let url = '/u/' + this.user.username;
    this.router.navigate([url]);
  }

  goToHomePage(){
    this.router.navigate(['']);
  }

  onSearch(){
    this.searchTerm = this.searchTerm.toLowerCase();
    this.results = this.groups.filter((group) => group.name.toLowerCase().includes(this.searchTerm)).slice(0,5);
  }
  navigateToGroupPage(groupName:string){
    this.router.navigate(['/g/' + groupName]);
  }
  logout(){
    this.router.navigate(['/login']);
  }
}
