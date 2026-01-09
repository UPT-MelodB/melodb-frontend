import { Injectable, signal, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
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
      this.currentUser.set({ id: '1', name: 'Returning User', email: 'user@example.com', role: 'user' });
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.api.post<{ token: string, user: User }>('auth/login', credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setSession(response);
        }
      })
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.api.post<{ token: string, user: User }>('auth/register', data).pipe(
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
