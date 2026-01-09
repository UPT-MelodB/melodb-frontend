import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    { title: 'Total Revenue', value: '$45,231', trend: '+20.1%', isUp: true, icon: 'dollar', color: 'orange' },
    { title: 'Active Users', value: '2,345', trend: '+15.2%', isUp: true, icon: 'users', color: 'violet' },
    { title: 'New Orders', value: '573', trend: '+12.5%', isUp: true, icon: 'cart', color: 'green' },
    { title: 'Bounce Rate', value: '42.3%', trend: '-2.4%', isUp: true, icon: 'chart', color: 'blue' } // Down is good for bounce rate, but visually green usually means good. Here I'll use standard logic.
  ];

  salesData = [
    { month: 'Jan', value: 35 },
    { month: 'Feb', value: 42 },
    { month: 'Mar', value: 28 },
    { month: 'Apr', value: 55 },
    { month: 'May', value: 48 },
    { month: 'Jun', value: 65 },
    { month: 'Jul', value: 59 },
    { month: 'Aug', value: 72 },
    { month: 'Sep', value: 68 },
    { month: 'Oct', value: 85 },
    { month: 'Nov', value: 92 },
    { month: 'Dec', value: 100 }
  ];

  recentActivity = [
    { user: 'Alex M.', action: 'Purchased Fender Strat', time: '2 mins ago', initial: 'A' },
    { user: 'Sarah J.', action: 'Reviewed Abbey Road', time: '15 mins ago', initial: 'S' },
    { user: 'Mike T.', action: 'Added to Wishlist', time: '1 hour ago', initial: 'M' },
    { user: 'Emma W.', action: 'New User Registration', time: '3 hours ago', initial: 'E' }
  ];

  topProducts = [
    { name: 'Fender Stratocaster', category: 'Instrument', sales: 124, revenue: '$186,000' },
    { name: 'Abbey Road Vinyl', category: 'Vinyl', sales: 850, revenue: '$29,750' },
    { name: 'Gibson Les Paul', category: 'Instrument', sales: 89, revenue: '$266,911' },
    { name: 'MelodB Hoodie', category: 'Merch', sales: 32, revenue: '$1,440' }
  ];
}
