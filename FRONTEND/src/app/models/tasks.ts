import { Assignee } from "./assignee";

export class Tasks {
    taskId!: number;
    taskName!:string;
    taskDescription!:string;
    priority!:string;
    deadline!:string;
    category!:string;
    assignee!:Assignee;

    constructor(){}
}