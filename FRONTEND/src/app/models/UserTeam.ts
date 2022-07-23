import { TeamName } from "./TeamName";

export class UserTeam {
    email!:string;
    name!: string;
    password!:string;
    mobileNumber!:string;
    teamList!:TeamName[];
    constructor(){}
}