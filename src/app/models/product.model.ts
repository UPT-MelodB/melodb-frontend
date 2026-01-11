export interface Product {
  id: string;
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
  stockQuantity?: number;
  type?: string;
  image?: string;
}
