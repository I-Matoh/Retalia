import { useState, useCallback } from 'react';
import { Transaction, transactionValidation } from '@/types/transaction';

interface ValidationErrors {
  amount?: string;
  description?: string;
}

export const useTransactionValidation = () => { 
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateTransaction = useCallback((transaction: Partial<Transaction>): boolean => {
    const newErrors: ValidationErrors = {};
 
    // Validate amount
    if (transaction.amount !== undefined) {
      if (transaction.amount < transactionValidation.amount.min) {
        newErrors.amount = `Amount must be at least ${transactionValidation.amount.min}`;
      } else if (transaction.amount > transactionValidation.amount.max) {
        newErrors.amount = `Amount cannot exceed ${transactionValidation.amount.max}`;
      }
    }

    // Validate description
    if (transaction.description !== undefined) {
      if (transaction.description.length < transactionValidation.description.minLength) {
        newErrors.description = `Description must be at least ${transactionValidation.description.minLength} characters`;
      } else if (transaction.description.length > transactionValidation.description.maxLength) {
        newErrors.description = `Description cannot exceed ${transactionValidation.description.maxLength} characters`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  return {
    errors,
    validateTransaction,
  };
}; 
