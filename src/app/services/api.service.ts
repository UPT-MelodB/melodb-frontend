import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  // Base URL for the API
  private baseUrl = 'http://0.0.0.0:5030/api';

  constructor() { }

  // Generic GET method
  get<T>(endpoint: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, options);
  }

  // Generic POST method
  post<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, options);
  }

  // Generic PUT method
  put<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, options);
  }

  // Generic DELETE method
  delete<T>(endpoint: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, options);
  }
}
