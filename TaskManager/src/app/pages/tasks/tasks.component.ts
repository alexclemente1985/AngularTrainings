import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "tasks",
  templateUrl: "./tasks.component.html",
  moduleId: module.id
})
export class TasksComponent{
  public tasks: Array<string> = [
    "Comprar Café",
    "Assistir aula",
    "Ligar para cliente",
    "Trabalhar",
    "Buscar crianças no colégio",
    "Comprar Café",
    "Assistir aula",
    "Ligar para cliente",
    "Trabalhar",
    "Buscar crianças no colégio",
    "Comprar Café",
    "Assistir aula",
    "Ligar para cliente",
    "Trabalhar",
    "Buscar crianças no colégio"
  ]
  constructor(
    private router: Router
  ){}

  createTask(e){console.log(e)}
  deleteTask(e){console.log(e)}


}
