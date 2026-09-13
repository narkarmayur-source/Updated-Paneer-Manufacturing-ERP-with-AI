# Deployment and Setup Guide

This guide provides instructions for deploying the Phaltan Paneer ERP to staging or production environments.

---

## 1. Prerequisites
- Node.js 18.x or 20.x LTS
- PostgreSQL 14+ database instance (e.g. Supabase, Neon, AWS RDS, or local Docker container)
- npm or pnpm package manager

---

## 2. Local Setup Steps

```bash
# 1. Install dependencies
npm install

# 2. Setup Prisma Database
npx prisma generate
npx prisma db push

# 3. Seed demo data
node scripts/seed.js

# 4. Start development server
npm run dev
```

---

## 3. Production Cloud Deployment (Vercel + Supabase)

1. **Database Setup:**
   - Create a project on [Supabase](https://supabase.com).
   - Copy the Connection String URI.

2. **Deploy to Vercel:**
   - Push your code repository to GitHub/GitLab.
   - Connect the repository in the Vercel dashboard.
   - Set environment variable: `DATABASE_URL = <your_supabase_postgresql_url>`.
   - Set build command: `npx prisma generate && next build`.
   - Click **Deploy**.

---

## 4. Hardware IoT Sensor Configuration

### Cold Room Sensor (ESP32 / DS18B20):
- Wire a digital waterproof temperature sensor (DS18B20) to an ESP32 microcontroller.
- Program the ESP32 to POST readings every 60 seconds to:
  `POST https://<your-domain>/api/telemetry`
  ```json
  {
    "zone": "coldRoom",
    "temperatureC": 3.25
  }
  ```
- If temperature exceeds 5.5°C, the ERP backend automatically flags an alarm state and alerts plant supervisors.
