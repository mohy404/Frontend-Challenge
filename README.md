# Frontend Challenge - E-commerce Application

## Overview

This is a modern e-commerce application built with Next.js 15, featuring a robust authentication system, product management, and a responsive user interface.

## Features

### Authentication

- Secure login system using NextAuth.js
- Protected routes and API endpoints
- Test credentials:
  - Email: john@mail.com
  - Password: changeme

### Product Management

- Product listing with pagination
- Product details view
- Shopping cart management

### State Management

- Zustand for global state management
- React Query for server state management and caching

### UI Components

- Modern UI built with Shadcn components
- Responsive design for all screen sizes
- Dark/Light mode support
- Loading states and error handling

## Project Structure

```
├── app/
│   ├── api/         # API routes
│   ├── auth/        # Authentication pages
│   ├── products/    # Product-related pages
│   └── layout.tsx   # Root layout
├── components/
│   ├── ui/         # Reusable UI components
│   ├── auth/       # Authentication components
│   └── products/   # Product-related components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── store/          # Zustand store configurations
└── types/          # TypeScript type definitions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- Next.js 15
- TypeScript
- NextAuth.js
- React Query
- Zustand
- Zod 
- Shadcn UI
- Tailwind CSS



## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
