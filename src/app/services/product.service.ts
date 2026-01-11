import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  // Use relative path to leverage proxy for API calls
  private apiUrl = '/api/Product/GetAll';

  // Backend URL for images (using 127.0.0.1 to avoid 0.0.0.0 blocking issues)
  private backendUrl = 'http://127.0.0.1:5030';

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Check if response has data property as per the JSON structure provided
        const items = response.data || [];

        return items.map((item: any) => ({
          id: item.id,
          name: item.name,
          category: item.type || 'Music', // Map 'type' to 'category', default to 'Music' if missing
          price: item.price,
          description: item.description,
          // Construct full image URL pointing to 127.0.0.1
          imageUrl: item.image ? (item.image.startsWith('http') ? item.image : `${this.backendUrl}${item.image}`) : '',
          artist: item.artist,
          genre: item.genre,
          isNew: item.isNew,
          stockQuantity: item.stockQuantity,
          inStock: (item.stockQuantity !== undefined && item.stockQuantity > 0),
          // Default values for fields not in API
          rating: 0,
          reviewsCount: 0,
          type: item.type,
          image: item.image
        } as Product));
      })
    );
  }
}
