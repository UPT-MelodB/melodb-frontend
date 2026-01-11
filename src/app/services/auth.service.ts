import { Injectable, signal, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  // Signals for reactive state
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    // Check for stored token on init
    const token = localStorage.getItem('auth_token');
    if (token) {
      // In a real app, validate token or fetch user profile
      this.isAuthenticated.set(true);
      // We might want to fetch the user details here if the token is valid
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.api.post<{ token: string, user: User }>('Auth/Login', credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setSession(response);
        }
      })
    );
  }

  register(data: RegisterRequest) {
    const headers = new HttpHeaders({
      'X-Auth-Path-Prefix': '/'
    });

    return this.api.post<{ token: string, user: User }>('Auth/Register', data, { headers }).pipe(
      tap(response => {
        if (response.token) {
          this.setSession(response);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth']);
  }

  private setSession(authResult: { token: string, user: User }) {
    localStorage.setItem('auth_token', authResult.token);
    this.currentUser.set(authResult.user);
    this.isAuthenticated.set(true);
    this.router.navigate(['/dashboard']);
  }

  // Helper to get current token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
