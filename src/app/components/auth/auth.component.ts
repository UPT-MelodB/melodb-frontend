import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('magicCard') magicCard!: ElementRef<HTMLElement>;
  private authService = inject(AuthService);

  isLoginMode = true;

  formData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  };

  ngAfterViewInit() {
    // Initial check or setup if needed
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.magicCard) {
      const card = this.magicCard.nativeElement;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  }

  toggleMode(mode: 'login' | 'register') {
    this.isLoginMode = mode === 'login';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login({ email: this.formData.email, password: this.formData.password })
        .subscribe({
          next: () => {
            console.log('Login successful');
          },
          error: (err) => {
            console.error('Login failed', err);
            alert('Login failed: ' + (err.error?.message || 'Unknown error'));
          }
        });
    } else {
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      this.authService.register({
        email: this.formData.email,
        password: this.formData.password,
        confirmPassword: this.formData.confirmPassword,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName
      }).subscribe({
          next: () => {
            console.log('Registration successful');
          },
          error: (err) => {
            console.error('Registration failed', err);
            alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
          }
        });
    }
  }
}
