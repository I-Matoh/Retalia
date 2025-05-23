export type TransactionCategory = {
  id: string;
  name: string;
  icon: string;
  type: 'income' | 'expense';
};

export const categories: TransactionCategory[] = [
  { id: 'sales', name: 'Sales', icon: 'shopping-bag', type: 'income' },
  { id: 'services', name: 'Services', icon: 'tool', type: 'income' },
  { id: 'other_income', name: 'Other Income', icon: 'plus-circle', type: 'income' },
  
  { id: 'inventory', name: 'Inventory', icon: 'package', type: 'expense' },
  { id: 'supplies', name: 'Supplies', icon: 'shopping-cart', type: 'expense' },
  { id: 'rent', name: 'Rent', icon: 'home', type: 'expense' },
  { id: 'utilities', name: 'Utilities', icon: 'zap', type: 'expense' },
  { id: 'transport', name: 'Transport', icon: 'truck', type: 'expense' },
  { id: 'salary', name: 'Salary', icon: 'users', type: 'expense' },
  { id: 'other_expense', name: 'Other Expense', icon: 'minus-circle', type: 'expense' },
];

export const getCategory = (id: string): TransactionCategory => {
  return categories.find(cat => cat.id === id) || 
    { id: 'unknown', name: 'Unknown', icon: 'help-circle', type: 'expense' };
};

export const getCategoriesByType = (type: 'income' | 'expense'): TransactionCategory[] => {
  return categories.filter(cat => cat.type === type);
};