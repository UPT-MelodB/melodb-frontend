import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  product = {
    name: '',
    category: 'Instrument',
    price: null,
    description: '',
    imageUrl: '',
    inStock: true,
    isNew: false
  };

  categories = ['Instrument', 'Vinyl', 'Merch', 'Accessory'];

  onSubmit() {
    console.log('Product Submitted:', this.product);
    alert('Product added successfully! (Mock)');
    // Reset form
    this.product = {
      name: '',
      category: 'Instrument',
      price: null,
      description: '',
      imageUrl: '',
      inStock: true,
      isNew: false
    };
  }
}
