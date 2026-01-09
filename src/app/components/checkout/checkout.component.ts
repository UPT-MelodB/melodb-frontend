import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartService = inject(CartService);

  // Form Data
  shippingInfo = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'Romania'
  };

  paymentInfo = {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  get cartItems() {
    return this.cartService.items();
  }

  get subtotal() {
    return this.cartService.subtotal();
  }

  get shippingCost() {
    return this.subtotal > 500 ? 0 : 25;
  }

  get total() {
    return this.subtotal + this.shippingCost;
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Order placed successfully!');
    console.log('Order Data:', { shipping: this.shippingInfo, payment: this.paymentInfo, items: this.cartItems });
    this.cartService.clearCart();
  }
}
