import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Genre, GenreResponse } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private http = inject(HttpClient);
  // Using the full URL as requested, though relative path /api/Genre/GetAll might be preferred if proxy is set up.
  // Given ProductService uses relative path, I will try to use relative path if possible,
  // but the user explicitly gave the curl command with localhost:5030.
  // I'll use the full URL to be consistent with the user's request, or maybe make it configurable.
  // Let's look at ProductService again. It uses '/api/Product/GetAll'.
  // I will use the full URL to ensure it hits the right backend as requested.
  private apiUrl = 'http://localhost:5030/api/Genre/GetAll';

  getGenres(): Observable<Genre[]> {
    return this.http.get<GenreResponse>(this.apiUrl).pipe(
      map(response => response.data || [])
    );
  }
}
