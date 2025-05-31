# RETALIA

A web application for personal finance management.
works but still on progress.
## Development

1. Install dependencies:
```bash
npm install
```
 
2. Start the development server:
```bash
npm start 
```

## Deployment

### Prerequisites
1. Create a GitHub repository
2. Create a Vercel account and connect it to your GitHub repository
3. Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy to Vercel

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel: 
```bash
npm run deploy
```

Alternatively, you can enable automatic deployments:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy when you push to the main branch

## Scripts

- `npm start` - Start the development server
- `npm run build` - Build the web application
- `npm run deploy` - Deploy to Vercel
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Technology Stack

- React
- TypeScript
- Expo Web
- Zustand (State Management)
- ESLint & Prettier (Code Quality)
- Jest (Testing)

## Features

- Transaction management with income and expense tracking
- Category-based transaction organization
- Image attachments for receipts and documentation
- Form validation and error handling
- Responsive UI with native components
- Offline data persistence

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Project Structure

```
retalia/
├── app/                 # Expo Router app directory
├── components/          # Reusable UI components
├── constants/          # App-wide constants and configurations
├── hooks/              # Custom React hooks
├── store/             # State management (Zustand)
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
