import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Order {
  id: string;
  date: Date;
  customer: string;
  status: 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
  items: number;
  total: number;
}

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  searchTerm: string = '';
  selectedStatus: string = 'All';

  orders: Order[] = [
    { id: 'ORD-7829', date: new Date('2024-03-10'), customer: 'Alex M.', status: 'Completed', items: 3, total: 1534.00 },
    { id: 'ORD-7830', date: new Date('2024-03-11'), customer: 'Sarah J.', status: 'Processing', items: 1, total: 35.00 },
    { id: 'ORD-7831', date: new Date('2024-03-12'), customer: 'Mike T.', status: 'Pending', items: 2, total: 2800.00 },
    { id: 'ORD-7832', date: new Date('2024-03-12'), customer: 'Emma W.', status: 'Cancelled', items: 1, total: 45.00 },
    { id: 'ORD-7833', date: new Date('2024-03-13'), customer: 'John D.', status: 'Completed', items: 5, total: 120.00 },
    { id: 'ORD-7834', date: new Date('2024-03-14'), customer: 'Lisa K.', status: 'Processing', items: 2, total: 2999.00 }
  ];

  get filteredOrders(): Order[] {
    return this.orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            order.customer.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'All' || order.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
