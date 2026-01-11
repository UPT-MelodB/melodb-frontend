import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Product>();

  onClose() {
    this.close.emit();
  }

  onAddToCart() {
    if (this.product) {
      this.addToCart.emit(this.product);
    }
  }

  getDiscountedPrice(product: Product): number {
    if (product.discount) {
      return product.price - (product.price * product.discount / 100);
    }
    return product.price;
  }
}
