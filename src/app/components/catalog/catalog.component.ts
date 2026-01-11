import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { Genre } from '../../models/genre.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { GenreService } from '../../services/genre.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDialogComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private genreService = inject(GenreService);

  searchTerm: string = '';
  selectedCategory: string = 'All';
  sortBy: string = 'featured';

  genres: Genre[] = [];
  selectedGenres: Set<string> = new Set();

  // Price Filter
  minPrice: number = 0;
  maxPrice: number = 1000;
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 1000;

  products: Product[] = [];
  selectedProduct: Product | null = null;

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.calculatePriceRange();
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });

    this.genreService.getGenres().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (err) => {
        console.error('Error fetching genres', err);
      }
    });
  }

  calculatePriceRange() {
    if (this.products.length === 0) return;

    const prices = this.products.map(p => this.getDiscountedPrice(p));
    this.minPrice = Math.floor(Math.min(...prices));
    this.maxPrice = Math.ceil(Math.max(...prices));

    // Initialize selected range
    this.selectedMinPrice = this.minPrice;
    this.selectedMaxPrice = this.maxPrice;
  }

  toggleGenre(genreName: string) {
    if (this.selectedGenres.has(genreName)) {
      this.selectedGenres.delete(genreName);
    } else {
      this.selectedGenres.add(genreName);
    }
  }

  get filteredProducts(): Product[] {
    let filtered = this.products.filter(product => {
      const price = this.getDiscountedPrice(product);

      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            (product.artist && product.artist?.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;

      const matchesGenre = this.selectedGenres.size === 0 || (product.genre && this.selectedGenres.has(product.genre));

      const matchesPrice = price >= this.selectedMinPrice && price <= this.selectedMaxPrice;

      return matchesSearch && matchesCategory && matchesGenre && matchesPrice;
    });

    // Apply Sorting
    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return this.getDiscountedPrice(a) - this.getDiscountedPrice(b);
        case 'price-high':
          return this.getDiscountedPrice(b) - this.getDiscountedPrice(a);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default: // 'featured' or any other
          return 0; // Keep original order (usually by ID or added date if backend sorts it)
      }
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
    // Close dialog if open
    this.closeProductDialog();
  }

  openProductDialog(product: Product) {
    this.selectedProduct = product;
    // Prevent body scrolling when dialog is open
    document.body.style.overflow = 'hidden';
  }

  closeProductDialog() {
    this.selectedProduct = null;
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  }
}
