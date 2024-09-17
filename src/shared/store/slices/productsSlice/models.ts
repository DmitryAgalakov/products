export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  published?: boolean;
  creationDate?: string;
  category?: string;
  image?: string;
  rating?: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}
