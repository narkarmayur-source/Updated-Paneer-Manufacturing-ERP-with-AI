# Phaltan Paneer Manufacturing Plant: AI-Powered Industrial ERP System

An enterprise-grade, industrial-scale Enterprise Resource Planning (ERP) platform purpose-built for commercial small-scale paneer manufacturing operations in **Phaltan, Satara District, Maharashtra**.

---

## Key Differentiators & Industry-Leading AI Features

1. **AI Yield & Coagulation Optimizer:** 
   - Dynamically analyzes incoming raw milk Fat, SNF, and titratable acidity.
   - Adjusts coagulation temperature setpoints (71.5°C to 74.0°C) and citric acid concentration in real time.
   - Maximizes yield (targeting ≥ 18.0%) while enforcing FSSAI moisture rules (≤ 60.0% moisture, ≥ 50.0% FDM).

2. **Real-Time Cold Chain IoT Telemetry:**
   - Continuous 24x7 monitoring of Finished Goods Cold Room (2°C to 4°C), Raw Milk Chilling Tank (4°C), and Steam Boiler Pressure.
   - Automated SMS/WhatsApp escalation if cold room exceeds 5.5°C or door remains open.

3. **Two-Axis Dockside Milk Pricing Engine:**
   - Implements the standard Maharashtra cooperative & private dairy pricing formula based on Fat and SNF.
   - Automated dockside quality verification (temperature, acidity, adulteration screens).

4. **Predictive B2B Demand Forecasting:**
   - Analyzes historical sales, day-of-week trends, Mahabaleshwar/Wai weekend tourist surges, and local wedding calendars to predict exact daily production requirements 48 hours in advance.

5. **Strict B2B Credit & Logistics Control:**
   - Route clustering: Route Alpha (Baramati), Route Beta (Satara/Shirwal), Route Gamma (Wai/Mahabaleshwar).
   - Automated credit lock preventing dispatch to HORECA clients exceeding 7-day or 14-day credit limits.

---

## Technology Stack

- **Framework:** Next.js 14 (App Router, Server Actions)
- **Language:** TypeScript 5.6
- **Database & ORM:** PostgreSQL + Prisma ORM
- **Styling & UI:** Tailwind CSS + Lucide Icons + Radix UI Primitives
- **Data Analytics:** Recharts + Math.js
- **Architecture:** Industrial Modular Monolith with RESTful Micro-endpoints

---

## Project Directory Structure

```
paneer_erp_system/
├── prisma/
│   └── schema.prisma          # Database schema (Suppliers, Batches, Orders, Telemetry, Finance)
├── src/
│   ├── app/
│   │   ├── api/               # Microservice REST APIs
│   │   │   ├── procurement/   # Milk intake & 2-axis pricing
│   │   │   ├── production/    # Batch execution & BMR
│   │   │   ├── telemetry/     # Real-time IoT sensor ingestion
│   │   │   └── finance/       # Real-time unit cost/kg & P&L
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Tailwind styling
│   │   └── page.tsx           # Full Industrial Command Center Dashboard
│   ├── lib/
│   │   ├── ai/                # AI & ML Engines
│   │   │   ├── yield-optimizer.ts
│   │   │   ├── demand-forecaster.ts
│   │   │   └── vision-qc.ts
│   │   └── calculations/      # Dairy physics & mass-balance formulas
│   │       └── dairy-math.ts
├── scripts/
│   └── seed.js                # Database seeder (Phaltan suppliers, HORECA accounts)
├── docs/
│   ├── ARCHITECTURE_AND_SPECIFICATIONS.md
│   └── DEPLOYMENT_AND_SETUP_GUIDE.md
├── package.json
└── tailwind.config.js
```

---

## Quickstart Instructions

### 1. Installation
```bash
git clone <repo-url>
cd paneer_erp_system
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/paneer_erp?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
IOT_API_SECRET="your_secret_telemetry_token"
```

### 3. Database Initialization
```bash
npx prisma db push
node scripts/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
