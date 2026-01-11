import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
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

  searchTerm: string = '';
  selectedCategory: string = 'All';

  products: Product[] = [];
  selectedProduct: Product | null = null;

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            (product.artist && product.artist?.toLowerCase().includes(this.searchTerm.toLowerCase()));
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
