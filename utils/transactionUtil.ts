import { Transaction } from '@/types/transaction';
import { getDateRangeForPeriod } from './dateUtils';

export const calculateTotals = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );
};

export const calculateProfit = (transactions: Transaction[]) => {
  const { income, expenses } = calculateTotals(transactions);
  return income - expenses;
};

export const filterTransactionsByPeriod = (
  transactions: Transaction[],
  period: 'day' | 'week' | 'month' | 'year'
) => {
  const { start, end } = getDateRangeForPeriod(period);
  
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= start && transactionDate <= end;
  });
};

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const date = transaction.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);
  
  // Sort dates in descending order
  return Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((date) => ({
      date,
      transactions: grouped[date],
    }));
};

export const getRecentTransactions = (
  transactions: Transaction[],
  limit: number = 5
) => {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};