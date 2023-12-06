import { Component } from '@angular/core';
import { Group } from '../module/Group';
import { GroupService } from '../services/group-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  constructor(private groupService:GroupService,
              private router:Router){}
  createGroup(group:Group){
    this.groupService.createGroup(group);
    this.router.navigate(['']);
  }
}
