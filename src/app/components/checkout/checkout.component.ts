import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  artist?: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  // Mock Cart Data
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Fender Stratocaster American Pro',
      price: 1499,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      id: 2,
      name: 'Abbey Road - The Beatles',
      price: 35,
      quantity: 2,
      imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=150&h=150',
      artist: 'The Beatles'
    }
  ];

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

  get subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  get shippingCost(): number {
    return this.subtotal > 500 ? 0 : 25;
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  placeOrder() {
    alert('Order placed successfully! (Mock)');
    console.log('Order Data:', { shipping: this.shippingInfo, payment: this.paymentInfo, items: this.cartItems });
  }
}
