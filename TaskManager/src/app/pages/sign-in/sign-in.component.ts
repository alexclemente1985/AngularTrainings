import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "sign-in",
  templateUrl: "./sign-in.component.html",
  moduleId: module.id
})
export class SignInComponent{
  constructor(
    private router: Router
  ){}

  signInUser(){
    this.router.navigate(["/tasks"])
  }
  createAccount(){
    alert("Criar Conta!")
  }
}
