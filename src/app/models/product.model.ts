export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  artist?: string;
  genre?: string;
  rating?: number;
  reviewsCount?: number;
  isNew?: boolean;
  discount?: number; // Procent reducere
  inStock?: boolean;
}
