import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service'; // Add this import
import { HttpErrorResponse } from '@angular/common/http'; // Add this import

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService // Add this injection
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const loginRequest: LoginRequest = {
        email: this.loginForm.get('identifier')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.toastService.showSuccess('Login successful! Welcome back.');
          this.router.navigate(['/']); // Redirect on login
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login error:', error);
          
          // Extract the error message from the HttpErrorResponse
          let errorMessage = 'Invalid credentials. Please check your email and password.';
          
          if (error.error && error.error.detail) {
            // Handle the specific error format you showed
            errorMessage = error.error.detail;
          } else if (error.status === 401) {
            errorMessage = 'Invalid credentials. Please check your email and password.';
          } else if (error.status === 0) {
            errorMessage = 'Cannot connect to server. Please check your connection.';
          }
          
          this.toastService.showError(errorMessage);
          this.errorMessage = errorMessage;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      this.toastService.showWarning('Please fill in all required fields correctly.');
    }
  }

  get identifier() {
    return this.loginForm.get('identifier');
  }

  get password() {
    return this.loginForm.get('password');
  }
}