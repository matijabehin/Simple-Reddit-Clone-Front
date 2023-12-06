import { User } from "./User";

export class Comment{
    private id_:number;
    private text_:string;
    private dateCreated_:Date;
    private user_:User;

    constructor(id:number,text:string, dateCreated:Date, user:User,){
        this.id_ = id;
        this.text_ = text;
        this.dateCreated_ = dateCreated;
        this.user_ = user;
    }

    get id() : number {return this.id_;}
    get text() : string {return this.text_;}
    get dateCreated() : Date{return this.dateCreated_;}
    get user() : User {return this.user_;}
}