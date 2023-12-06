import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, map, of} from "rxjs";
import {PostDTO} from "../module/PostDTO";
import { Group } from '../module/Group';
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  BASE_URL : string = "http://localhost:8080";
  url : string = "";

  constructor(private http: HttpClient) { }

  public getAll(){
    this.url = this.BASE_URL + '/api/groups/getAll';

    return this.http.get<Group[]>(this.url);
  }


  public getGroupByName(name:String | null):Observable<Group>{

    if(name === null)
      return of(new Group("",""));

    this.url = this.BASE_URL + "/api/getGroupByName/" + name;

    return this.http.get<Group>(this.url);
  }

  public getGroupPosts(groupName:string):Observable<PostDTO[]>{
    this.url = this.BASE_URL + "/g/" + groupName;
    return this.http.get<PostDTO[]>(this.url);
  }
  public createGroup(group:Group){
    
    this.url= this.BASE_URL + "/api/createGroup";
    return this.http.post(this.url, group).subscribe((resp) => console.log(resp));
  }

  public getFollowedGroups(){
    this.url = this.BASE_URL + "/api/groups/getFollowedGroups";
    return this.http.get<Group[]>(this.url);
  }

  public followGroup(group:Group){
    this.url = this.BASE_URL + '/api/groups/followGroup';
    return this.http.post(this.url, group).subscribe((resp) => console.log(resp));
  }

  public unfollowGroup(group:Group){
    this.url = this.BASE_URL + '/api/groups/unfollowGroup';
    return this.http.post(this.url, group).subscribe((resp) => console.log(resp));
  }
}
