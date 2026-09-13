'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Cpu, 
  Droplets, 
  Gauge, 
  Layers, 
  Plus,
  Printer, 
  Thermometer, 
  TrendingUp, 
  Truck, 
  X,
  Zap 
} from 'lucide-react';

interface MilkIntakeRecord {
  id: string;
  supplierName: string;
  village: string;
  milkType: string;
  liters: number;
  fatPercent: number;
  snfPercent: number;
  temperatureC: number;
  acidity: number;
  ratePerLiter: number;
  totalPayout: number;
  status: 'ACCEPTED' | 'REJECTED';
  timestamp: string;
}

interface BatchRecord {
  id: string;
  batchCode: string;
  milkVolumeLiters: number;
  fatPercent: number;
  snfPercent: number;
  coagTempC: number;
  citricKg: number;
  targetPaneerKg: number;
  actualPaneerKg: number;
  yieldPercent: number;
  status: 'HEATING' | 'COAGULATING' | 'PRESSING' | 'COLD_STORAGE';
  timestamp: string;
}

interface DispatchRecord {
  id: string;
  customerName: string;
  route: string;
  quantityKg: number;
  ratePerKg: number;
  totalAmount: number;
  creditDays: number;
  status: 'SCHEDULED' | 'TRANSIT' | 'DELIVERED';
  timestamp: string;
}

export default function PaneerERPCommandCenter() {
  const [showMilkModal, setShowMilkModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<MilkIntakeRecord | null>(null);

  const [supplierName, setSupplierName] = useState('Barad Dairy Farmer Producer Co.');
  const [village, setVillage] = useState('Barad');
  const [milkType, setMilkType] = useState('BUFFALO');
  const [intakeLiters, setIntakeLiters] = useState(450);
  const [intakeFat, setIntakeFat] = useState(6.5);
  const [intakeSNF, setIntakeSNF] = useState(9.0);
  const [intakeTemp, setIntakeTemp] = useState(4.2);
  const [intakeAcidity, setIntakeAcidity] = useState(0.136);

  const [batchMilkLiters, setBatchMilkLiters] = useState(750);
  const [batchFat, setBatchFat] = useState(5.2);
  const [batchSNF, setBatchSNF] = useState(8.85);

  const [custName, setCustName] = useState('Hotel Rajwada');
  const [dispatchRoute, setDispatchRoute] = useState('ROUTE_ALPHA_BARAMATI');
  const [dispatchKg, setDispatchKg] = useState(50);
  const [dispatchRate, setDispatchRate] = useState(335);

  const [intakeList, setIntakeList] = useState<MilkIntakeRecord[]>([
    {
      id: "MI-101",
      supplierName: "Barad Dairy Farmer Producer Co.",
      village: "Barad",
      milkType: "BUFFALO",
      liters: 450,
      fatPercent: 6.6,
      snfPercent: 9.1,
      temperatureC: 4.2,
      acidity: 0.134,
      ratePerLiter: 49.00,
      totalPayout: 22050,
      status: "ACCEPTED",
      timestamp: "07:15 AM"
    },
    {
      id: "MI-102",
      supplierName: "Taradgaon BMC Hub",
      village: "Taradgaon",
      milkType: "COW",
      liters: 350,
      fatPercent: 3.9,
      snfPercent: 8.6,
      temperatureC: 4.5,
      acidity: 0.138,
      ratePerLiter: 34.20,
      totalPayout: 11970,
      status: "ACCEPTED",
      timestamp: "07:45 AM"
    },
    {
      id: "MI-103",
      supplierName: "Lonand Milk Cooperative",
      village: "Lonand",
      milkType: "MIXED_STANDARDIZED",
      liters: 700,
      fatPercent: 5.2,
      snfPercent: 8.85,
      temperatureC: 4.0,
      acidity: 0.135,
      ratePerLiter: 41.80,
      totalPayout: 29260,
      status: "ACCEPTED",
      timestamp: "08:10 AM"
    }
  ]);

  const [batchList, setBatchList] = useState<BatchRecord[]>([
    {
      id: "BATCH-01",
      batchCode: "PB-01",
      milkVolumeLiters: 750,
      fatPercent: 5.2,
      snfPercent: 8.85,
      coagTempC: 73.0,
      citricKg: 1.56,
      targetPaneerKg: 138.0,
      actualPaneerKg: 139.5,
      yieldPercent: 18.08,
      status: "COLD_STORAGE",
      timestamp: "08:30 AM"
    },
    {
      id: "BATCH-02",
      batchCode: "PB-02",
      milkVolumeLiters: 750,
      fatPercent: 5.1,
      snfPercent: 8.80,
      coagTempC: 72.8,
      citricKg: 1.55,
      targetPaneerKg: 136.5,
      actualPaneerKg: 137.0,
      yieldPercent: 17.76,
      status: "PRESSING",
      timestamp: "10:15 AM"
    }
  ]);

  const [dispatchList, setDispatchList] = useState<DispatchRecord[]>([
    {
      id: "DSP-01",
      customerName: "Baramati Highway Dhaba Association",
      route: "Route Alpha (Baramati)",
      quantityKg: 125,
      ratePerKg: 335,
      totalAmount: 41875,
      creditDays: 7,
      status: "TRANSIT",
      timestamp: "08:45 AM"
    },
    {
      id: "DSP-02",
      customerName: "Hotel Rajwada & Banquet Hall (Satara)",
      route: "Route Beta (Satara)",
      quantityKg: 85,
      ratePerKg: 340,
      totalAmount: 28900,
      creditDays: 14,
      status: "SCHEDULED",
      timestamp: "09:30 AM"
    },
    {
      id: "DSP-03",
      customerName: "Mahabaleshwar Club & Resorts",
      route: "Route Gamma (Wai / Mahabaleshwar)",
      quantityKg: 61.5,
      ratePerKg: 365,
      totalAmount: 22447.5,
      creditDays: 7,
      status: "SCHEDULED",
      timestamp: "10:00 AM"
    }
  ]);

  const calculatedRate = Number(((intakeFat * 5.60) + (intakeSNF * 1.55) + (intakeTemp <= 4.5 ? 0.50 : 0.0)).toFixed(2));
  const calculatedPayout = Number((calculatedRate * intakeLiters).toFixed(2));
  const isQualityPass = intakeTemp <= 10.0 && intakeAcidity <= 0.150 && intakeFat >= 3.2;

  const handleAddMilkIntake = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: MilkIntakeRecord = {
      id: `MI-${100 + intakeList.length + 1}`,
      supplierName,
      village,
      milkType,
      liters: Number(intakeLiters),
      fatPercent: Number(intakeFat),
      snfPercent: Number(intakeSNF),
      temperatureC: Number(intakeTemp),
      acidity: Number(intakeAcidity),
      ratePerLiter: calculatedRate,
      totalPayout: calculatedPayout,
      status: isQualityPass ? 'ACCEPTED' : 'REJECTED',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setIntakeList([newRecord, ...intakeList]);
    setLastReceipt(newRecord);
    setShowMilkModal(false);
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const predYield = Number(((batchFat * 1.86) + (batchSNF * 0.94) - 0.42).toFixed(2));
    const targetKg = Number(((batchMilkLiters * 1.030 * predYield) / 100).toFixed(1));
    const coagTemp = batchFat > 5.5 ? 74.0 : 73.0;
    const citricDose = Number(((batchMilkLiters * 2.08) / 1000).toFixed(2));

    const newBatch: BatchRecord = {
      id: `BATCH-${String(batchList.length + 1).padStart(2, '0')}`,
      batchCode: `PB-${String(batchList.length + 1).padStart(2, '0')}`,
      milkVolumeLiters: Number(batchMilkLiters),
      fatPercent: Number(batchFat),
      snfPercent: Number(batchSNF),
      coagTempC: coagTemp,
      citricKg: citricDose,
      targetPaneerKg: targetKg,
      actualPaneerKg: targetKg,
      yieldPercent: predYield,
      status: 'HEATING',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setBatchList([newBatch, ...batchList]);
    setShowBatchModal(false);
  };

  const handleAddDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmt = Number((Number(dispatchKg) * Number(dispatchRate)).toFixed(2));
    const newDispatch: DispatchRecord = {
      id: `DSP-${String(dispatchList.length + 1).padStart(2, '0')}`,
      customerName: custName,
      route: dispatchRoute.replace(/_/g, ' '),
      quantityKg: Number(dispatchKg),
      ratePerKg: Number(dispatchRate),
      totalAmount: totalAmt,
      creditDays: 7,
      status: 'SCHEDULED',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDispatchList([newDispatch, ...dispatchList]);
    setShowDispatchModal(false);
  };

  const totalMilkToday = intakeList.filter(i => i.status === 'ACCEPTED').reduce((acc, curr) => acc + curr.liters, 0);
  const totalPaneerToday = batchList.reduce((acc, curr) => acc + curr.actualPaneerKg, 0);
  const totalRevenueToday = dispatchList.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const avgYield = totalMilkToday > 0 ? Number(((totalPaneerToday / (totalMilkToday * 1.030)) * 100).toFixed(2)) : 18.0;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              PHALTAN PANEER INDUSTRIAL ERP
            </h1>
            <p className="text-sm text-slate-400">
              Operating System & AI Command Center | Phaltan MIDC, Satara, Maharashtra
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={() => setShowMilkModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition"
          >
            <Plus className="w-4 h-4" /> Record Milk Intake
          </button>
          <button 
            onClick={() => setShowBatchModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition"
          >
            <Plus className="w-4 h-4" /> Start AI Batch
          </button>
          <button 
            onClick={() => setShowDispatchModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/20 transition"
          >
            <Plus className="w-4 h-4" /> New Dispatch
          </button>
        </div>
      </header>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>DAILY MILK INTAKE</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{totalMilkToday.toLocaleString()} L</div>
          <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Quality Pass Dockside
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>PANEER OUTPUT (YIELD)</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">{totalPaneerToday.toFixed(1)} kg</div>
          <div className="mt-1 text-xs text-emerald-400 font-semibold">
            {avgYield}% Verified Yield (Target ≥18%)
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>COLD STORAGE ROOM</span>
            <Thermometer className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-400">3.2°C</div>
          <div className="mt-1 text-xs text-slate-400">
            Target 2°C–4°C | 84% RH Nominal
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>UNIT COST / KG</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">₹288.54</div>
          <div className="mt-1 text-xs text-slate-400">
            Weighted Price: ₹345.50 / kg
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>SALES REVENUE (TODAY)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">₹{totalRevenueToday.toLocaleString()}</div>
          <div className="mt-1 text-xs text-slate-400">
            Estimated EBITDA: ₹{(totalRevenueToday * 0.168).toFixed(0)}
          </div>
        </div>
      </div>

      {/* Main Operational Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: Milk Intake Logs */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span>Dockside Milk Intake Logs</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">{intakeList.length} Batches Today</span>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {intakeList.map((item) => (
              <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.supplierName}</div>
                    <div className="text-xs text-slate-400">
                      {item.liters} L • {item.milkType} • {item.fatPercent}% Fat | {item.snfPercent}% SNF
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400">₹{item.ratePerLiter.toFixed(2)}/L</div>
                    <div className="text-xs font-mono text-slate-300">₹{item.totalPayout.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Dock Temp: {item.temperatureC}°C (Passed)
                  </span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Production BMR Batches */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Active Batch Manufacturing (BMR)</span>
            </div>
            <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              Floor Active
            </span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {batchList.map((b) => (
              <div key={b.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-white">{b.batchCode} ({b.milkVolumeLiters}L Milk)</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {b.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">Coagulation Temp:</span>
                    <span className="font-semibold text-white">{b.coagTempC}°C</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">Citric Dose:</span>
                    <span className="font-semibold text-white">{b.citricKg} kg</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">Actual Output:</span>
                    <span className="font-bold text-emerald-400">{b.actualPaneerKg} kg</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">Verified Yield:</span>
                    <span className="font-bold text-emerald-400">{b.yieldPercent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Real-Time IoT Telemetry */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>Plant & Van IoT Telemetry</span>
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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
                <div className="text-xs text-slate-400 font-medium">Agro-Briquette Boiler (100 kg/hr)</div>
                <div className="text-lg font-bold text-white">4.3 Bar <span className="text-xs font-normal text-slate-400">| Safe: 7.0 Bar</span></div>
                <div className="text-[11px] text-slate-400">Steam: 95 kg/hr | Flue: 180°C</div>
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
      </div>

      {/* Outbound Route Logistics */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Truck className="w-5 h-5 text-purple-400" />
            <span>Today's Outbound Sales Dispatches (Phaltan Logistics Hub)</span>
          </div>
          <span className="text-xs text-slate-400">Strict 7–14 Day Payment Credit Lock Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dispatchList.map((d) => (
            <div key={d.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-purple-400 uppercase">{d.route}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {d.status}
                </span>
              </div>
              <div className="text-base font-bold text-white">{d.customerName}</div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Quantity: <strong className="text-white">{d.quantityKg} kg</strong></span>
                <span>Rate: <strong className="text-white">₹{d.ratePerKg}/kg</strong></span>
              </div>
              <div className="flex justify-between text-xs pt-1 border-t border-slate-900">
                <span className="text-emerald-400 font-bold">Invoice: ₹{d.totalAmount.toLocaleString()}</span>
                <span className="text-slate-500">{d.creditDays}-day credit</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL 1: RECORD MILK INTAKE --- */}
      {showMilkModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-lg">
                <Droplets className="w-5 h-5 text-blue-400" />
                <span>Dockside Milk Intake Registration</span>
              </div>
              <button onClick={() => setShowMilkModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMilkIntake} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Supplier / Center Name</label>
                  <input 
                    type="text" 
                    value={supplierName} 
                    onChange={e => setSupplierName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Village / Hub</label>
                  <input 
                    type="text" 
                    value={village} 
                    onChange={e => setVillage(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Milk Type</label>
                  <select 
                    value={milkType} 
                    onChange={e => setMilkType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="BUFFALO">Buffalo Milk</option>
                    <option value="COW">Cow Milk</option>
                    <option value="MIXED_STANDARDIZED">Standardized Blend</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Volume (Liters)</label>
                  <input 
                    type="number" 
                    value={intakeLiters} 
                    onChange={e => setIntakeLiters(Number(e.target.value))} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Dock Temp (°C)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={intakeTemp} 
                    onChange={e => setIntakeTemp(Number(e.target.value))} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Fat Content: <strong className="text-white">{intakeFat}%</strong></label>
                  <input 
                    type="range" min="3.0" max="8.0" step="0.1" 
                    value={intakeFat} 
                    onChange={e => setIntakeFat(Number(e.target.value))} 
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">SNF Content: <strong className="text-white">{intakeSNF}%</strong></label>
                  <input 
                    type="range" min="7.5" max="10.0" step="0.05" 
                    value={intakeSNF} 
                    onChange={e => setIntakeSNF(Number(e.target.value))} 
                    className="w-full"
                  />
                </div>
              </div>

              {/* Live Price & Quality Calculation Box */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Maharashtra Two-Axis Rate:</span>
                  <span className="text-emerald-400 font-bold text-sm">₹{calculatedRate.toFixed(2)} / Liter</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Farmer Net Payout:</span>
                  <span className="text-white font-bold text-base font-mono">₹{calculatedPayout.toLocaleString()}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-900 flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Adulteration / Quality:</span>
                  <span className={isQualityPass ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {isQualityPass ? "PASSED (Dock Grade A)" : "REJECTED (Parameters out of spec)"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowMilkModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30"
                >
                  Confirm & Print Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: LAUNCH PRODUCTION BATCH --- */}
      {showBatchModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-lg">
                <Zap className="w-5 h-5 text-emerald-400" />
                <span>Launch AI Production Batch (BMR)</span>
              </div>
              <button onClick={() => setShowBatchModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBatch} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Batch Milk Volume (Liters)</label>
                <select 
                  value={batchMilkLiters} 
                  onChange={e => setBatchMilkLiters(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value="500">500 Liters (Single Vat Run)</option>
                  <option value="750">750 Liters (Standard Staggered Run)</option>
                  <option value="1000">1,000 Liters (Dual Vat Simultaneous)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Milk Blend Fat: <strong className="text-white">{batchFat}%</strong></label>
                  <input 
                    type="range" min="4.0" max="6.5" step="0.1" 
                    value={batchFat} 
                    onChange={e => setBatchFat(Number(e.target.value))} 
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Milk Blend SNF: <strong className="text-white">{batchSNF}%</strong></label>
                  <input 
                    type="range" min="8.2" max="9.2" step="0.05" 
                    value={batchSNF} 
                    onChange={e => setBatchSNF(Number(e.target.value))} 
                    className="w-full"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  AI Calculated Process Setpoints
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Optimal Coagulation: <strong className="text-white">{batchFat > 5.5 ? 74.0 : 73.0}°C</strong></div>
                  <div>Citric Acid Dosing: <strong className="text-white">{Number(((batchMilkLiters * 2.08) / 1000).toFixed(2))} kg</strong></div>
                  <div>Target Pressing: <strong className="text-white">2.85 Bar (20 min)</strong></div>
                  <div>Expected Output: <strong className="text-emerald-400">{Number(((batchMilkLiters * 1.030 * ((batchFat * 1.86) + (batchSNF * 0.94) - 0.42)) / 100).toFixed(1))} kg</strong></div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowBatchModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-600/30"
                >
                  Start Heating & Launch Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: NEW DISPATCH --- */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-lg">
                <Truck className="w-5 h-5 text-purple-400" />
                <span>Schedule New B2B Sales Dispatch</span>
              </div>
              <button onClick={() => setShowDispatchModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDispatch} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Customer / Hotel / Resort Name</label>
                <input 
                  type="text" 
                  value={custName} 
                  onChange={e => setCustName(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Route Cluster</label>
                  <select 
                    value={dispatchRoute} 
                    onChange={e => setDispatchRoute(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="ROUTE_ALPHA_BARAMATI">Route Alpha (Baramati)</option>
                    <option value="ROUTE_BETA_SATARA">Route Beta (Satara / Shirwal)</option>
                    <option value="ROUTE_GAMMA_WAI_MAHABALESHWAR">Route Gamma (Wai / Mahabaleshwar)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={dispatchKg} 
                    onChange={e => setDispatchKg(Number(e.target.value))} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Agreed Rate per kg (₹)</label>
                <input 
                  type="number" 
                  value={dispatchRate} 
                  onChange={e => setDispatchRate(Number(e.target.value))} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                <span className="text-slate-400">Total Invoice Amount:</span>
                <span className="text-emerald-400 font-bold text-base font-mono">₹{(dispatchKg * dispatchRate).toLocaleString()}</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowDispatchModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-600/30"
                >
                  Confirm & Allocate to Van
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- THERMAL RECEIPT SLIP POPUP --- */}
      {lastReceipt && (
        <div className="fixed bottom-4 right-4 bg-slate-900 border border-emerald-500/50 p-4 rounded-xl shadow-2xl z-50 max-w-sm space-y-2">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Intake Recorded: {lastReceipt.id}
            </span>
            <button onClick={() => setLastReceipt(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs space-y-1 text-slate-300">
            <div>Supplier: <strong>{lastReceipt.supplierName}</strong></div>
            <div>Volume: <strong>{lastReceipt.liters} L</strong> ({lastReceipt.fatPercent}% Fat | {lastReceipt.snfPercent}% SNF)</div>
            <div>Rate: <strong>₹{lastReceipt.ratePerLiter.toFixed(2)}/L</strong> | Payout: <strong className="text-emerald-400 font-mono">₹{lastReceipt.totalPayout.toLocaleString()}</strong></div>
          </div>
          <button 
            onClick={() => window.print()}
            className="w-full mt-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print Thermal Slip
          </button>
        </div>
      )}
