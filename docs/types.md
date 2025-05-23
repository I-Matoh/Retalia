# TypeScript Types Documentation

## Transaction Types

### TransactionType

```typescript
type TransactionType = 'income' | 'expense';
```

A union type representing the possible types of transactions in the application.

### Transaction

```typescript
interface Transaction {
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
```

The main transaction interface representing a financial transaction in the application.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string | Yes | Unique identifier for the transaction |
| amount | number | Yes | The monetary value of the transaction |
| description | string | Yes | A description of the transaction |
| categoryId | string | Yes | Reference to the transaction category |
| date | string | Yes | The date of the transaction (ISO format) |
| type | TransactionType | Yes | Whether the transaction is income or expense |
| imageUri | string | No | Optional URI for an attached image/receipt |
| notes | string | No | Optional additional notes |
| createdAt | string | Yes | Timestamp of when the transaction was created |

### TransactionValidation

```typescript
interface TransactionValidation {
  amount: {
    min: number;
    max: number;
  };
  description: {
    minLength: number;
    maxLength: number;
  };
}
```

Configuration interface for transaction validation rules.

### Validation Constants

```typescript
const transactionValidation: TransactionValidation = {
  amount: {
    min: 0.01,
    max: 999999999.99,
  },
  description: {
    minLength: 3,
    maxLength: 200,
  },
};
```

Default validation rules for transactions.

## Best Practices

1. Always use these types when working with transactions
2. Don't modify the validation constants without updating related documentation
3. Use TypeScript's strict mode to ensure type safety
4. Consider extending these types rather than modifying them directly
5. Use optional properties sparingly and document their purpose 