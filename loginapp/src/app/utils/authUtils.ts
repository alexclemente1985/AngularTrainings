import { AbstractControl, ValidationErrors } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

export default class AuthUtils{
  
    static validatePassword(control: AbstractControl): ValidationErrors | null {
      console.log('caindo na validação')
      if(control){
        console.log('tem control')
        const password1 = control.get('password1')?.value;
        const password2 = control.get('password2')?.value;

        
        if(password1 && password2 && password1 == password2){
          console.log('caiu na validação interna')
          return null;
        }
      }
      console.log('vai retornar o matching false')
      return {matching: false}
    }

    
  }