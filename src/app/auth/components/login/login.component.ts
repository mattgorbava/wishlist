import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
    rememberMe: [false]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  
  onSubmit() {
    const {email, password} = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe((response) => {
      if (response.length > 0 && response[0].password === password) {
        if (this.loginForm.value.rememberMe) {
          localStorage.setItem('email', email as string);
        } else {
          sessionStorage.setItem('email', email as string);
          localStorage.clear();
        }
        this.router.navigate(['/home']);
      }
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}
