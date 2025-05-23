# Custom Hooks Documentation

## useTransactionValidation

A custom hook for validating transaction data according to predefined rules.

### Usage

```typescript
import { useTransactionValidation } from '@/hooks/useTransactionValidation';

const MyComponent = () => {
  const { errors, validateTransaction } = useTransactionValidation();

  const handleSubmit = (transaction: Partial<Transaction>) => {
    if (validateTransaction(transaction)) {
      // Proceed with valid transaction
    }
  };
};
```

### Returns

| Name | Type | Description |
|------|------|-------------|
| errors | `ValidationErrors` | Object containing validation error messages |
| validateTransaction | `(transaction: Partial<Transaction>) => boolean` | Function to validate a transaction |

### Validation Rules

- **Amount**
  - Minimum: 0.01
  - Maximum: 999,999,999.99

- **Description**
  - Minimum length: 3 characters
  - Maximum length: 200 characters

### Error Messages

The `errors` object may contain the following properties:

```typescript
{
  amount?: string;    // Error message for invalid amount
  description?: string; // Error message for invalid description
}
```

### Example

```typescript
const { errors, validateTransaction } = useTransactionValidation();

const transaction = {
  amount: 0,
  description: "A"
};

const isValid = validateTransaction(transaction);
console.log(isValid); // false
console.log(errors); // { amount: "Amount must be at least 0.01", description: "Description must be at least 3 characters" }
``` 