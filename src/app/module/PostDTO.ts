import { Comment } from './Comment';
import { Group } from './Group';
import { User } from './User';

export class PostDTO{
  private id_:number;
  private title_:string;
  private text_:string;
  private dateCreated_:Date;
  private user_:User;
  private group_:Group;
  private upvotes_:number;
  private comments_:Comment[];
  
  constructor(id:number, title:string, text:string, date:Date, user:User, group:Group, upvotes:number){
    this.id_ = id;
    this.title_ = title;
    this.text_ = text;
    this.dateCreated_ = date;
    this.user_ = user;
    this.group_ = group;
    this.upvotes_ = upvotes;
    this.comments_ = [];
  }
  get id(): number {return this.id_;}
  get title() : string {return this.title_;}
  get text() : string {return this.text_;}
  get dateCreated() : Date {return this.dateCreated_;}
  get upvotes() : number {return this.upvotes_;}
  get user() : User {return this.user_;}
  get group() : Group {return this.group_;}
  get comments() : Comment[] {return this.comments_;}

  set user(user:User){this.user_ = user;}
  set upvotes(num:number){this.upvotes_ = num;}
}
