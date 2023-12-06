import { Group } from "./Group";

export class User{
    private id_:number;
    private username_:string;
    private dateCreated_:Date;

    constructor(id:number, username:string, dateCreated:Date){
        this.id_ = id;
        this.username_ = username;
        this.dateCreated_ = dateCreated;
    }
    get id() : number {return this.id;}
    get username() : string {return this.username_;}
    get dateCreated(): Date {return this.dateCreated_;}
}