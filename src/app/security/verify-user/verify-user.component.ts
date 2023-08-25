import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  resendVerificationCode(){
    this.authService.sendVerificationEmail();
  }
}
