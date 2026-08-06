# Lib Directory

This folder is designated for third-party library configurations, client initializations, and wrapper instances (e.g., PrismaClient, Firebase initialization, Axios clients, Supabase clients).

## Example: Axios Client Setup

```typescript
// src/lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```
