import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  authService = inject(AuthService)
  router = inject(Router)


  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  onSubmit(): void {
    console.log(this.form.value)
    if(this.form.valid){
      //@ts-ignore
      this.authService.login(this.form.value)
      .subscribe(res => {
        this.router.navigate([''])
        console.log(res)
      });
    }
  }
}
