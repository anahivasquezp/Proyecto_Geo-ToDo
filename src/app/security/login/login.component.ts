import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error!: string | null;

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', 
        Validators.compose([
          Validators.required, 
          Validators.minLength(4), 
          Validators.email,
        ])],
      password: ['', Validators.required],
    });
  }

  submit() {
    console.log('submit.method');
    if(this.loginForm.valid) {
      this.authService
      .loginWithEmail(
        this.loginFormControls.username.value,
        this.loginFormControls.password.value,
      )
      .then((result) => {})
      .catch((error) => {
        console.log(error);
        this.error = 'Usuario/Clave incorrecta';
      }); 
    } else {
    console.log('Formulario inválido');
    }
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

}