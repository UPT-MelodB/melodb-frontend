export interface Order {
  id: number;
  userId: number;
  date: Date;
  total: number;
  status: string;
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}
