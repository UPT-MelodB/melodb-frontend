import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // The main state signal
  private cartItems = signal<CartItem[]>([]);

  // Computed signals for easy access in templates
  items = computed(() => this.cartItems());

  count = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.cartItems().reduce((acc, item) => {
      const price = item.discount
        ? item.price - (item.price * item.discount / 100)
        : item.price;
      return acc + (price * item.quantity);
    }, 0)
  );

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.id === product.id);

      if (existingItem) {
        // If item exists, create a new array with updated quantity
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add to array with quantity 1
        return [...items, { ...product, quantity: 1 }];
      }
    });
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
