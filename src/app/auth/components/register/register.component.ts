import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService, 
      private messageService: MessageService,
      private router: Router) { }

    onSubmit() {
      const postData = {...this.registerForm.value};
      delete postData.confirmPassword;
      this.authService.registerUser(postData as User).subscribe((response) => {
        console.log(response);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User registered successfully'});
        this.router.navigate(['/login']);
      } , (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'User registration failed'});
      });
    }
  
    get fullName() {
      return this.registerForm.controls['fullName'];
    }

    get email() {
      return this.registerForm.controls['email'];
    }
  
    get password() {
      return this.registerForm.controls['password'];
    }

    get confirmPassword() {
      return this.registerForm.controls['confirmPassword'];
    }

    mustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
  
        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
          return;
        }
  
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      };
    }
}
