'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Droplets, 
  Gauge, 
  Layers, 
  ShieldCheck, 
  Thermometer, 
  TrendingUp, 
  Truck, 
  Users, 
  Zap 
} from 'lucide-react';

export default function PaneerERPCommandCenter() {
  // Interactive state for AI Yield Optimizer
  const [fatInput, setFatInput] = useState(5.2);
  const [snfInput, setSnfInput] = useState(8.85);
  const [ambientTemp, setAmbientTemp] = useState(31.0);
  const [batchVolume, setBatchVolume] = useState(750);

  // Dynamic AI calculation
  const predictedYield = Math.min(20.5, Number(((fatInput * 1.86) + (snfInput * 0.94) - 0.42).toFixed(2)));
  const optimalCoagTemp = fatInput > 5.5 ? 74.0 : fatInput < 4.5 ? 71.8 : 73.0;
  const recommendedCitricKg = Number(((batchVolume * 2.08) / 1000).toFixed(2));
  const expectedPaneerKg = Number(((batchVolume * 1.030 * predictedYield) / 100).toFixed(1));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                PHALTAN PANEER INDUSTRIAL ERP
              </h1>
              <p className="text-sm text-slate-400">
                Small-Scale Manufacturing Operating System | Phaltan MIDC, Satara, MH
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ALL IOT SENSORS NOMINAL
          </span>
          <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            FSSAI COMPLIANT (LIC #1152...)
          </span>
          <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">
            AI YIELD ENGINE ACTIVE
          </span>
        </div>
      </header>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>DAILY MILK RECEPTION</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">1,500 L</div>
          <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 5.12% Fat | 8.85% SNF
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>PANEER OUTPUT (YIELD)</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">271.5 kg</div>
          <div className="mt-1 text-xs text-emerald-400 font-semibold">
            18.10% Verified Yield (Target ≥18%)
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>COLD ROOM TELEMETRY</span>
            <Thermometer className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-400">3.2°C</div>
          <div className="mt-1 text-xs text-slate-400">
            Target 2°C–4°C | 84% RH
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>UNIT COST / KG</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">₹288.54</div>
          <div className="mt-1 text-xs text-slate-400">
            Realization: ₹345.50 / kg
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>DAILY NET EBITDA</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">₹15,465</div>
          <div className="mt-1 text-xs text-slate-400">
            Margin: 16.8% (Full Capacity)
          </div>
        </div>
      </div>

      {/* Main Operational Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module 1: AI Yield & Thermal Coagulation Optimizer */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>AI Coagulation & Yield Optimizer</span>
            </div>
            <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/20">
              ML Model v2.4
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-400 flex justify-between">
                <span>Milk Fat Content (%)</span>
                <span className="text-white font-semibold">{fatInput}%</span>
              </label>
              <input 
                type="range" 
                min="3.5" 
                max="7.0" 
                step="0.1" 
                value={fatInput} 
                onChange={(e) => setFatInput(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 flex justify-between">
                <span>Milk SNF Content (%)</span>
                <span className="text-white font-semibold">{snfInput}%</span>
              </label>
              <input 
                type="range" 
                min="8.0" 
                max="9.5" 
                step="0.05" 
                value={snfInput} 
                onChange={(e) => setSnfInput(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 flex justify-between">
                <span>Ambient Plant Temperature (°C)</span>
                <span className="text-white font-semibold">{ambientTemp}°C</span>
              </label>
              <input 
                type="range" 
                min="20" 
                max="42" 
                step="0.5" 
                value={ambientTemp} 
                onChange={(e) => setAmbientTemp(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          {/* AI Recommended Parameter Cards */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2.5">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              AI Optimized Batch Setpoints (750L Batch)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Coagulation Temp:</span>
                <span className="font-bold text-white text-sm">{optimalCoagTemp.toFixed(1)}°C</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Citric Acid Dose:</span>
                <span className="font-bold text-white text-sm">{recommendedCitricKg} kg (1.5% sol)</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Press Pressure:</span>
                <span className="font-bold text-white text-sm">2.85 Bar (20 min)</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Predicted Output:</span>
                <span className="font-bold text-emerald-400 text-sm">{expectedPaneerKg} kg ({predictedYield}%)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              AI Recommendation: Coagulation set to {optimalCoagTemp}°C ensures optimum moisture retention (57.2%) without crumbly whey fat loss.
            </p>
          </div>
        </div>

        {/* Module 2: Industrial IoT Telemetry & Cold Chain */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>Real-Time Plant IoT Telemetry</span>
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400 font-medium">Finished Goods Cold Room</div>
                <div className="text-lg font-bold text-white">3.2°C <span className="text-xs font-normal text-slate-400">| Set: 3.0°C</span></div>
                <div className="text-[11px] text-emerald-400">Compressor: Nominal (60mm PUF)</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                SECURE
              </span>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400 font-medium">Raw Milk Chilling Tank (1,000L)</div>
                <div className="text-lg font-bold text-white">3.8°C <span className="text-xs font-normal text-slate-400">| Set: 4.0°C</span></div>
                <div className="text-[11px] text-emerald-400">Agitator: 30 RPM Continuous</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400 font-medium">Non-IBR Agro-Briquette Boiler</div>
                <div className="text-lg font-bold text-white">4.3 Bar <span className="text-xs font-normal text-slate-400">| Limit: 7.0 Bar</span></div>
                <div className="text-[11px] text-slate-400">Steam Output: 95 kg/hr | Flue: 180°C</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                OPTIMAL
              </span>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400 font-medium">Reefer Delivery Van (Bolero)</div>
                <div className="text-lg font-bold text-white">3.9°C <span className="text-xs font-normal text-slate-400">| SH-147 Route</span></div>
                <div className="text-[11px] text-slate-400">Baramati Cluster Drop #3 in 12 mins</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                TRANSIT
              </span>
            </div>
          </div>
        </div>

        {/* Module 3: Raw Milk Procurement & Dock Intake */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span>Today's Milk Procurement</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">1,500 L Target</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold text-white">Barad Dairy Farmer FPC</div>
                  <div className="text-xs text-slate-400">450 L Buffalo Milk | 6.6% Fat | 9.1% SNF</div>
                </div>
                <span className="text-xs font-bold text-emerald-400">₹49.00 / L</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Adulteration Negative | Acidity 0.134%
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold text-white">Taradgaon BMC Center</div>
                  <div className="text-xs text-slate-400">350 L Cow Milk | 3.9% Fat | 8.6% SNF</div>
                </div>
                <span className="text-xs font-bold text-emerald-400">₹34.20 / L</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Chilled Reception (4.2°C)
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold text-white">Lonand Milk Cooperative</div>
                  <div className="text-xs text-slate-400">700 L Standardized Blend | 5.2% Fat | 8.8% SNF</div>
                </div>
                <span className="text-xs font-bold text-emerald-400">₹41.80 / L</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Passed Alcohol & Resazurin Microbial Tests
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logistics & Route Execution Matrix */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Truck className="w-5 h-5 text-purple-400" />
            <span>Outbound Sales Routes & Cold Chain Dispatches (Phaltan Hub)</span>
          </div>
          <span className="text-xs text-slate-400">Strict 7-14 Day Credit Lock Enabled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-purple-400 uppercase">Route Alpha: Baramati</span>
              <span className="text-xs text-slate-400 font-mono">75 km RT</span>
            </div>
            <div className="text-lg font-bold text-white">125 kg Dispatched</div>
            <div className="text-xs text-slate-400">HORECA & Sweet Marts (Baramati Bypass)</div>
            <div className="text-xs text-emerald-400">Delivery Status: On Route (Temp 3.8°C)</div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-blue-400 uppercase">Route Beta: Satara / Shirwal</span>
              <span className="text-xs text-slate-400 font-mono">145 km RT</span>
            </div>
            <div className="text-lg font-bold text-white">85 kg Dispatched</div>
            <div className="text-xs text-slate-400">Hotels & Industrial Canteens</div>
            <div className="text-xs text-emerald-400">Delivery Status: Invoiced & Packed</div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase">Route Gamma: Wai / Mahabaleshwar</span>
              <span className="text-xs text-slate-400 font-mono">190 km RT</span>
            </div>
            <div className="text-lg font-bold text-white">61.5 kg Dispatched</div>
            <div className="text-xs text-slate-400">Tourist Resorts & Premium Dining (₹365/kg)</div>
            <div className="text-xs text-emerald-400">Delivery Status: Scheduled Early Dispatch</div>
          </div>
        </div>
      </div>

      {/* 10-Person Software Engineering Team Architecture */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>AI ERP Engineering Team & Functional Responsibility Matrix</span>
          </div>
          <span className="text-xs text-indigo-400 font-mono">10 Specialized Roles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">1. Principal Architect</div>
            <div className="text-slate-400 mt-1">Next.js 14, Node.js, Prisma, High-Availability DB design</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">2. Full-Stack Engineer</div>
            <div className="text-slate-400 mt-1">TypeScript, React, Tailwind, ERP Modular APIs</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">3. Backend & DB Engineer</div>
            <div className="text-slate-400 mt-1">PostgreSQL, Redis caching, Ledger transaction isolation</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">4. Lead AI & ML Engineer</div>
            <div className="text-slate-400 mt-1">Yield prediction, Demand forecasting algorithms</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">5. Industrial IoT Engineer</div>
            <div className="text-slate-400 mt-1">Cold storage sensors, Boiler telemetry, MQTT/REST</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">6. Dairy Domain PM</div>
            <div className="text-slate-400 mt-1">Dairy mass balance, Fat/SNF pricing formulas, BMR SOPs</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">7. UI/UX Designer</div>
            <div className="text-slate-400 mt-1">Industrial plant floor UX, Mobile responsive screens</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">8. DevOps Engineer</div>
            <div className="text-slate-400 mt-1">Docker, Vercel CI/CD, Automated daily DB backups</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">9. QA Automation Eng.</div>
            <div className="text-slate-400 mt-1">E2E Playwright tests, Math balance regression audits</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="font-bold text-white">10. Security & Compliance</div>
            <div className="text-slate-400 mt-1">FSSAI digital audit trails, RBAC, Data encryption</div>
          </div>
        </div>
      </div>
    </div>
  );
}
