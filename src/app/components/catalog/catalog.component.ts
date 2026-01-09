import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  searchTerm = '';
  
  // Datele din mockup-ul tau Figma
  products: Product[] = [
    { id: 1, title: 'Breach - Vinyl', artist: 'Twenty One Pilots', format: 'Vinyl', price: 29.99, imageUrl: 'assets/breach.jpg', category: 'Rock' },
    { id: 2, title: 'Chromakopia - White Vinyl', artist: 'Tyler, The Creator', format: 'White Vinyl', price: 19.99, imageUrl: 'assets/chromakopia.jpg', category: 'Hip-Hop' },
    { id: 3, title: 'Revolver - Vinyl', artist: 'The Beatles', format: 'Vinyl', price: 129.99, imageUrl: 'assets/revolver.jpg', category: 'Classic' },
    { id: 4, title: 'To Pimp A Butterfly - Vinyl', artist: 'Kendrick Lamar', format: 'Vinyl', price: 25.99, imageUrl: 'assets/tpab.jpg', category: 'Hip-Hop' },
    { id: 5, title: 'The College Dropout - CD', artist: 'Kanye West', format: 'CD', price: 18.99, imageUrl: 'assets/dropout.jpg', category: 'Hip-Hop' },
    { id: 6, title: 'Daddy Cool - Pink Vinyl', artist: 'Boney M', format: 'Pink Vinyl', price: 35.99, imageUrl: 'assets/daddy-cool.jpg', category: 'Disco' }
  ];

  get filteredProducts() {
    return this.products.filter(p => 
      p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.artist.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
