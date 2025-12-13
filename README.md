# Somdev Solutions Web Application

This is the official source code for the **Somdev Solutions** web application. It is a premium, high-performance website built with **Next.js 15+** and **Tailwind CSS**.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository or extract the source package.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture & Technology

- **Framework**: Next.js (App Router) for server-side rendering and static generation.
- **Styling**: Tailwind CSS with a custom design system and animations.
- **Components**: Built with React, leveraging strict typing (TypeScript) and modularity.
- **Security**: Hardened with strict HTTP headers (HSTS, X-Frame-Options, CSP-ready policies) via `next.config.mjs`.

## 🔌 Database & API Integration Guide

**Attention Database & Backend Team:**

The application is structured to easily plug in your backend services. We have removed all hardcoded dependencies on external templates to ensure a clean integration path.

### 1. Database Connection

- **Location**: `lib/db.ts`
- **Purpose**: This file is the designated singleton for your database client (e.g., Prisma, Mongoose, Sequelize).
- **Action Required**: Replace the mock object in this file with your actual connection logic.

```typescript
// lib/db.ts
// Example:
import { PrismaClient } from '@prisma/client';
export const db = new PrismaClient();
```

### 2. API Configuration

- **Location**: `lib/api.ts`
- **Purpose**: Centralized configuration for external API endpoints.
- **Action Required**:
  1.  Set your `NEXT_PUBLIC_API_URL` in a `.env.local` file.
  2.  The `fetcher` utility in this file handles standard headers and error parsing automatically.

### 3. AI Chatbot Integration

- **Location**: `components/ai-chatbot.tsx`
- **Current State**: Uses local logic to simulate responses for demo purposes.
- **Integration Point**: Look for the `TODO: INTEGRATION POINT` comment in the `handleSend` function.
- **Action Required**: Replace the local `getResponse` call with an async call to your backend AI endpoint.

## 🔒 Security & Performance Features

- **Security Headers**: Configured in `next.config.mjs` to prevent XSS, clickjacking, and mime-sniffing.
- **Asset Optimization**: High-resolution images in `public/` have been compressed for optimal loading speed.
- **Metadata**: SEO and authorship metadata is fully configured in `app/layout.tsx`.

## 📦 Deployment

To build the application for production:

```bash
npm run build
```

This will create an optimized `.next` build folder. The application is ready to be deployed on Vercel, Netlify, or any Node.js hosting environment.


