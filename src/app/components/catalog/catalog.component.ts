import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  private cartService = inject(CartService);

  searchTerm: string = '';
  selectedCategory: string = 'All';

  products: Product[] = [
    {
      id: 1,
      name: 'Fender Stratocaster American Pro',
      category: 'Instrument',
      price: 1499,
      description: 'The standard for electric guitars. Features V-Mod II pickups and a deep "C" neck profile.',
      imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&q=80&w=600&h=600',
      rating: 4.8,
      reviewsCount: 124,
      isNew: true,
      inStock: true
    },
    {
      id: 2,
      name: 'Abbey Road - The Beatles',
      category: 'Vinyl',
      price: 35,
      description: '180g Heavyweight Vinyl. Remastered from the original analogue tapes.',
      imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600&h=600',
      artist: 'The Beatles',
      genre: 'Rock',
      rating: 5.0,
      reviewsCount: 850,
      inStock: true
    },
    {
      id: 3,
      name: 'Marshall JCM800 Tube Amp',
      category: 'Instrument',
      price: 2800,
      description: 'The sound of rock. 100W all-valve head with master volume.',
      imageUrl: 'https://images.unsplash.com/photo-1560264357-8d9202250f21?auto=format&fit=crop&q=80&w=600&h=600',
      rating: 4.9,
      reviewsCount: 45,
      discount: 10,
      inStock: true
    },
    {
      id: 4,
      name: 'Dark Side of the Moon - Pink Floyd',
      category: 'Vinyl',
      price: 40,
      description: 'Gatefold sleeve including posters and stickers. A masterpiece of progressive rock.',
      imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600&h=600',
      artist: 'Pink Floyd',
      genre: 'Progressive Rock',
      rating: 4.9,
      reviewsCount: 1200,
      isNew: false,
      inStock: false
    },
    {
      id: 5,
      name: 'Gibson Les Paul Standard',
      category: 'Instrument',
      price: 2999,
      description: 'The benchmark for humbucking tones. AAA figured maple top.',
      imageUrl: 'https://images.unsplash.com/photo-1550985543-f47f38aee65d?auto=format&fit=crop&q=80&w=600&h=600',
      rating: 4.7,
      reviewsCount: 89,
      inStock: true
    },
    {
      id: 6,
      name: 'MelodB Official Hoodie',
      category: 'Merch',
      price: 45,
      description: 'Premium cotton blend hoodie with embroidered logo.',
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600&h=600',
      rating: 4.5,
      reviewsCount: 32,
      isNew: true,
      inStock: true
    }
  ];

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            (product.artist && product.artist.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  getDiscountedPrice(product: Product): number {
    if (product.discount) {
      return product.price - (product.price * product.discount / 100);
    }
    return product.price;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    // Optional: Add a toast notification here
    console.log('Added to cart:', product.name);
  }
}
