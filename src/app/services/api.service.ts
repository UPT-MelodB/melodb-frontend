import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Base URL for the API (would be environment.apiUrl in a real app)
  private baseUrl = 'https://api.melodb.com/v1';

  constructor() { }

  // Generic GET method
  get<T>(endpoint: string): Observable<T> {
    console.log(`[API] GET ${this.baseUrl}/${endpoint}`);
    // In a real app: return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
    return this.mockResponse(endpoint, 'GET');
  }

  // Generic POST method
  post<T>(endpoint: string, data: any): Observable<T> {
    console.log(`[API] POST ${this.baseUrl}/${endpoint}`, data);
    // In a real app: return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
    return this.mockResponse(endpoint, 'POST', data);
  }

  // Generic PUT method
  put<T>(endpoint: string, data: any): Observable<T> {
    console.log(`[API] PUT ${this.baseUrl}/${endpoint}`, data);
    // In a real app: return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data);
    return this.mockResponse(endpoint, 'PUT', data);
  }

  // Generic DELETE method
  delete<T>(endpoint: string): Observable<T> {
    console.log(`[API] DELETE ${this.baseUrl}/${endpoint}`);
    // In a real app: return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
    return this.mockResponse(endpoint, 'DELETE');
  }

  // Helper to simulate API responses
  private mockResponse(endpoint: string, method: string, data?: any): Observable<any> {
    // Simulate network delay
    const responseDelay = 500;

    // Mock Data Routing
    if (endpoint.startsWith('products')) {
      if (method === 'GET') return of(this.mockProducts).pipe(delay(responseDelay));
    }

    if (endpoint.startsWith('auth/login')) {
      if (data.email === 'test@test.com' && data.password === 'password') {
        return of({ token: 'fake-jwt-token', user: { name: 'Test User', email: data.email } }).pipe(delay(responseDelay));
      } else {
        return throwError(() => new Error('Invalid credentials')).pipe(delay(responseDelay));
      }
    }

    // Default success response
    return of({ success: true, message: `${method} request to ${endpoint} successful` }).pipe(delay(responseDelay));
  }

  // Mock Data
  private mockProducts = [
    { id: 1, name: 'Fender Stratocaster', price: 1499 },
    { id: 2, name: 'Abbey Road Vinyl', price: 35 }
  ];
}
