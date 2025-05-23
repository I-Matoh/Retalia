export type Transaction = {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: string; // ISO string
  type: 'income' | 'expense';
  imageUri?: string;
  notes?: string;
  createdAt: string; // ISO string
};