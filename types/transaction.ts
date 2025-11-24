export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: string; // ISO string
  type: TransactionType;
  imageUri?: string;
  notes?: string; 
  createdAt: string; // ISO string
}

export interface TransactionValidation {
  amount: {
    min: number;
    max: number;
  };
  description: {
    minLength: number;
    maxLength: number;
  };
}

export const transactionValidation: TransactionValidation = {
  amount: {
    min: 0.01,
    max: 999999999.99,
  },
  description: {
    minLength: 3,
    maxLength: 200,
  },
};
