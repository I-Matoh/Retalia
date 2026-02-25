import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '@/types/transaction';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  clearAllTransactions: () => void;   
}
   
export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          {
            ...transaction,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date().toISOString(),
          },
          ...state.transactions,
        ],
      })),
      
      updateTransaction: (id, updatedTransaction) => set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, ...updatedTransaction }
            : transaction
        ),
      })),
      
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== id
        ),
      })),
       
      clearAllTransactions: () => set({ transactions: [] }),
    }),
    {
      name: 'transactions-storage', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
