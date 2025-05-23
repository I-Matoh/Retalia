# Components Documentation

## ErrorBoundary

A class component that catches JavaScript errors anywhere in its child component tree and displays a fallback UI.

### Usage

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
};
```

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | Yes | The components to be wrapped by the error boundary |

### Features

- Catches runtime errors in child components
- Displays user-friendly error message
- Provides a "Try Again" button to reset the error state
- Logs errors to console in development

### Error UI

The error UI includes:
- Error title
- Error message (if available)
- Reset button to try again

### Styling

The component uses a StyleSheet with the following styles:
- Centered container with padding
- Consistent typography with the app's theme
- Primary color button for reset action
- Responsive layout that works on both mobile and web

### Example

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Navigation />
      <StatusBar />
    </ErrorBoundary>
  );
};
```

### Error Handling

The component implements two key error handling methods:

1. `getDerivedStateFromError`
   - Static method
   - Updates state to display fallback UI

2. `componentDidCatch`
   - Logs error information
   - Called after an error has been thrown

### Best Practices

- Place ErrorBoundary at logical boundaries in your app
- Use multiple ErrorBoundary components to isolate errors
- Don't place error-prone code in the error boundary itself
- Consider using different fallback UIs for different errors 