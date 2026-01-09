import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('magicCard') magicCard!: ElementRef<HTMLElement>;

  isLoginMode = true;

  formData = {
    email: '',
    password: '',
    name: ''
  };

  ngAfterViewInit() {
    // Initial check or setup if needed
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.magicCard) {
      const card = this.magicCard.nativeElement;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  }

  toggleMode(mode: 'login' | 'register') {
    this.isLoginMode = mode === 'login';
  }

  onSubmit() {
    if (this.isLoginMode) {
      console.log('Logging in...', this.formData);
      alert('Login successful! (Mock)');
    } else {
      console.log('Registering...', this.formData);
      alert('Registration successful! (Mock)');
    }
  }
}
