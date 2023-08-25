import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  error!: string | null;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(4), 
        Validators.email
      ])],
      password: ['', Validators.required],
    });
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  submit() {
    if (this.registerForm.valid) {
      this.authService
      .registerUser(
        this.registerFormControls.username.value, 
        this.registerFormControls.password.value
      )
      .then((result) => {})
      .catch((error) => (this.error = 'Error durante el registro'));
  }
  }

}