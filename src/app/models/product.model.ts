export interface Product {
  id: number;
  name: string;
  artist: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
}
