# Bedders69 Care Directory & Ecosystem

> **Find. Connect. Care. All in One Place.**
> The centralised ecosystem for the UK care industry — connecting care companies, carers, agencies, and families with everything they need.

Bedders69 is a premium, modern care directory web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It is fully optimized and configured to run using **pnpm**.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Runtime**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📂 Folder Structure

The project follows a modular and feature-driven directory structure designed for scalability:

```text
src/
├── app/                  # Next.js App Router (Routing and Pages)
│   ├── (website)/        # Public website pages (Home, Services, Marketplace)
│   │   ├── layout.tsx    # Public navbar and footer wrapper
│   │   └── page.tsx      # Main landing page (maps to /)
│   ├── (carer)/          # Carer dashboard portal (authenticated)
│   │   ├── layout.tsx    # Carer portal layout & sidebar
│   │   └── carers/       # Carer homepage route (maps to /carers)
│   ├── globals.css       # Tailwind configuration & global styles
│   └── layout.tsx        # Root HTML shell
├── components/           # Reusable UI components (Button, Inputs, etc.)
├── features/             # Feature modules (grouping logic & UI by business domain)
│   ├── website/          # Features related to public website pages
│   │   └── Home/         # Home page banner & service lists
│   ├── carers/           # Features related to carer workspace and portal
│   │   └── components/   # Carer dashboard components
│   └── Auth/             # Authentication components & hooks
├── hooks/                # Global React custom hooks (e.g. useLocalStorage)
├── lib/                  # Third-party configurations (Axios, Firebase client, etc.)
└── utils/                # Utility helper functions (e.g. class merger cn.ts)
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### 1. Prerequisites

Ensure you have **Node.js** (v20+ recommended) and **pnpm** installed on your system.

If you don't have `pnpm` installed, you can run it via `npx` or install it using npm:
```bash
npm install -g pnpm
```

### 2. Installation

Clone or open the project folder in your terminal and install all dependencies:
```bash
pnpm install
```

### 3. Running the Development Server

Start the local server with hot-reload enabled:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production

To create an optimized production build:
```bash
pnpm build
```

This will run the TypeScript compiler and compile the pages using Next.js Turbopack.

### 5. Start Production Server

After a successful build, start the production server:
```bash
pnpm start
```

---

## 📈 Key Features

1. **Care Directory & Marketplace**: Seamlessly connect families and care companies.
2. **Carers Portal**: A dedicated workspace for carer agents, including schedules, completed job counters, earnings tracker, and rating scoreboards.
3. **Responsive UI**: Glassmorphic, highly modern, responsive layout compatible with dark-mode defaults.
