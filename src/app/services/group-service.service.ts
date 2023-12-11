import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map, of} from "rxjs";
import {PostDTO} from "../module/PostDTO";
import { Group } from '../module/Group';
import { Environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  public getAll(){
    
    let url = Environment.BASE_URL + '/api/groups/getAll';

    return this.http.get<Group[]>(url);
  }


  public getGroupByName(name:String | null):Observable<Group>{

    if(name === null)
      return of(new Group("",""));
    
    let url = Environment.BASE_URL + "/api/getGroupByName/" + name;

    return this.http.get<Group>(url);
  }

  public getGroupPosts(groupName:string):Observable<PostDTO[]>{

    let url = Environment.BASE_URL + '/g/' + groupName;

    return this.http.get<PostDTO[]>(url);
  }

  public createGroup(group:Group){

    let url = Environment.BASE_URL + '/api/createGroup';

    return this.http.post(url, group).subscribe((resp) => console.log(resp));
  }

  public getFollowedGroups(){

    let url = Environment.BASE_URL + '/api/groups/getFollowedGroups';

    return this.http.get<Group[]>(url);
  }

  public followGroup(group:Group){

    let url = Environment.BASE_URL + '/api/groups/followGroup';

    return this.http.post(url, group).subscribe((resp) => console.log(resp));
  }

  public unfollowGroup(group:Group){

    let url = Environment.BASE_URL + '/api/groups/unfollowGroup';

    return this.http.post(url, group).subscribe((resp) => console.log(resp));
  }
}
