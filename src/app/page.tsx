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
  Thermometer,
  TrendingUp,
  Truck,
  X
} from 'lucide-react';

export default function PaneerERPCommandCenter() {
  const [showMilkModal, setShowMilkModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);

  // Milk form state
  const [supName, setSupName] = useState('Barad Dairy FPC');
  const [liters, setLiters] = useState(450);
  const [fat, setFat] = useState(6.5);
  const [snf, setSnf] = useState(9.0);

  // Batch form state
  const [bMilk, setBMilk] = useState(750);
  const [bFat, setBFat] = useState(5.2);
  const [bSnf, setBSnf] = useState(8.85);

  // Dispatch form state
  const [cust, setCust] = useState('Hotel Rajwada');
  const [route, setRoute] = useState('Baramati');
  const [dKg, setDKg] = useState(50);
  const [dRate, setDRate] = useState(335);

  // Live in-memory records
  const [intakes, setIntakes] = useState([
    { id: 'MI-101', name: 'Barad Dairy FPC', l: 450, f: 6.6, s: 9.1, r: 49.0, pay: 22050 },
    { id: 'MI-102', name: 'Taradgaon BMC', l: 350, f: 3.9, s: 8.6, r: 34.2, pay: 11970 },
    { id: 'MI-103', name: 'Lonand Coop Hub', l: 700, f: 5.2, s: 8.8, r: 41.8, pay: 29260 }
  ]);

  const [batches, setBatches] = useState([
    { id: 'PB-01', l: 750, cTemp: 73.0, citric: 1.56, out: 139.5, yld: 18.08, st: 'COLD ROOM' },
    { id: 'PB-02', l: 750, cTemp: 72.8, citric: 1.55, out: 137.0, yld: 17.76, st: 'PRESSING' }
  ]);

  const [dispatches, setDispatches] = useState([
    { id: 'D-01', c: 'Baramati Dhabas', r: 'Baramati', kg: 125, amt: 41875, st: 'IN TRANSIT' },
    { id: 'D-02', c: 'Hotel Rajwada Satara', r: 'Satara', kg: 85, amt: 28900, st: 'SCHEDULED' },
    { id: 'D-03', c: 'Mahabaleshwar Club', r: 'Mahabaleshwar', kg: 61.5, amt: 22447, st: 'SCHEDULED' }
  ]);

  // Two-axis rate calculation
  const curRate = Number(((fat * 5.60) + (snf * 1.55)).toFixed(2));
  const curPay = Math.round(curRate * liters);

  const addIntake = (e: React.FormEvent) => {
    e.preventDefault();
    setIntakes([
      {
        id: `MI-${intakes.length + 101}`,
        name: supName,
        l: Number(liters),
        f: Number(fat),
        s: Number(snf),
        r: curRate,
        pay: curPay
      },
      ...intakes
    ]);
    setShowMilkModal(false);
  };

  const addBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const yld = Number(((bFat * 1.86) + (bSnf * 0.94) - 0.42).toFixed(2));
    const outKg = Number(((bMilk * 1.030 * yld) / 100).toFixed(1));
    setBatches([
      {
        id: `PB-${String(batches.length + 1).padStart(2, '0')}`,
        l: Number(bMilk),
        cTemp: bFat > 5.5 ? 74.0 : 73.0,
        citric: Number(((bMilk * 2.08) / 1000).toFixed(2)),
        out: outKg,
        yld,
        st: 'HEATING'
      },
      ...batches
    ]);
    setShowBatchModal(false);
  };

  const addDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatches([
      {
        id: `D-${String(dispatches.length + 1).padStart(2, '0')}`,
        c: cust,
        r: route,
        kg: Number(dKg),
        amt: Math.round(dKg * dRate),
        st: 'SCHEDULED'
      },
      ...dispatches
    ]);
    setShowDispatchModal(false);
  };

  const totMilk = intakes.reduce((a, b) => a + b.l, 0);
  const totPaneer = batches.reduce((a, b) => a + b.out, 0);
  const totRev = dispatches.reduce((a, b) => a + b.amt, 0);

  return (
    <>
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              PHALTAN PANEER INDUSTRIAL ERP
            </h1>
            <p className="text-sm text-slate-400">
              AI Command Center | Phaltan MIDC, Satara, Maharashtra
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowMilkModal(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
          >
            <Plus className="w-4 h-4" /> Milk Intake
          </button>
          <button
            onClick={() => setShowBatchModal(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow"
          >
            <Plus className="w-4 h-4" /> Start AI Batch
          </button>
          <button
            onClick={() => setShowDispatchModal(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow"
          >
            <Plus className="w-4 h-4" /> New Dispatch
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>DAILY MILK INTAKE</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{totMilk.toLocaleString()} L</div>
          <div className="mt-1 text-xs text-emerald-400 font-semibold">Quality Verified (Dock Gate)</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>PANEER OUTPUT</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">{totPaneer.toFixed(1)} kg</div>
          <div className="mt-1 text-xs text-emerald-400 font-semibold">18.05% Yield (Target ≥18%)</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>COLD STORAGE</span>
            <Thermometer className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-400">3.2°C</div>
          <div className="mt-1 text-xs text-slate-400">Target 2°C–4°C (Normal)</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>UNIT COST / KG</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">₹288.54</div>
          <div className="mt-1 text-xs text-slate-400">Selling Price: ₹345.50</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>SALES TODAY</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">₹{totRev.toLocaleString()}</div>
          <div className="mt-1 text-xs text-slate-400">EBITDA: ~16.8%</div>
        </div>
      </div>

      {/* Main 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: Milk Intake */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Droplets className="w-4 h-4 text-blue-400" /> Milk Intake Logs
            </div>
            <span className="text-xs text-slate-400">{intakes.length} Lots</span>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {intakes.map(item => (
              <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white">{item.name}</span>
                  <span className="font-bold text-emerald-400">₹{item.r}/L</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>{item.l} L ({item.f}% F | {item.s}% SNF)</span>
                  <span className="text-white font-mono font-bold">₹{item.pay.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Production BMR */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Layers className="w-4 h-4 text-emerald-400" /> Active BMR Batches
            </div>
            <span className="text-xs text-emerald-400">Floor Active</span>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {batches.map(b => (
              <div key={b.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">{b.id} ({b.l}L Milk)</span>
                  <span className="text-blue-400 text-[10px] font-bold px-1.5 py-0.5 bg-blue-500/10 rounded border border-blue-500/20">{b.st}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
                  <div>Coag: <strong className="text-white">{b.cTemp}°C</strong></div>
                  <div>Citric: <strong className="text-white">{b.citric} kg</strong></div>
                  <div>Output: <strong className="text-emerald-400">{b.out} kg</strong></div>
                  <div>Yield: <strong className="text-emerald-400">{b.yld}%</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: IoT Telemetry */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Activity className="w-4 h-4 text-cyan-400" /> Real-Time Telemetry
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live
            </span>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Finished Cold Room</span>
                <span className="text-white font-bold text-sm">3.2°C</span>
              </div>
              <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">NORMAL</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Raw Milk Chilling Tank</span>
                <span className="text-white font-bold text-sm">3.8°C</span>
              </div>
              <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">ACTIVE</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Agro-Briquette Boiler</span>
                <span className="text-white font-bold text-sm">4.3 Bar</span>
              </div>
              <span className="text-[10px] text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 font-bold">OPTIMAL</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Reefer Van (Bolero)</span>
                <span className="text-white font-bold text-sm">3.9°C (SH-147)</span>
              </div>
              <span className="text-[10px] text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 font-bold">TRANSIT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatches */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Truck className="w-4 h-4 text-purple-400" /> Outbound Sales Routes
          </div>
          <span className="text-xs text-slate-400">7-Day Credit Strict Lock</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dispatches.map(d => (
            <div key={d.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-400 font-bold">{d.r}</span>
                <span className="text-slate-400">{d.st}</span>
              </div>
              <div className="font-bold text-white text-sm">{d.c}</div>
              <div className="flex justify-between text-slate-400">
                <span>{d.kg} kg</span>
                <span className="text-emerald-400 font-bold font-mono">₹{d.amt.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal 1: Milk Intake */}
      {showMilkModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-white font-bold text-sm">
              <span>Record Milk Intake</span>
              <button onClick={() => setShowMilkModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={addIntake} className="space-y-2 text-xs">
              <div>
                <label className="text-slate-400 block">Supplier Name</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={supName} onChange={e => setSupName(e.target.value)} required />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 block">Liters</label>
                  <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={liters} onChange={e => setLiters(Number(e.target.value))} required />
                </div>
                <div>
                  <label className="text-slate-400 block">Fat %</label>
                  <input type="number" step="0.1" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={fat} onChange={e => setFat(Number(e.target.value))} required />
                </div>
                <div>
                  <label className="text-slate-400 block">SNF %</label>
                  <input type="number" step="0.05" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={snf} onChange={e => setSnf(Number(e.target.value))} required />
                </div>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-xs flex justify-between">
                <span>Rate: <strong className="text-emerald-400">₹{curRate}/L</strong></span>
                <span>Payout: <strong className="text-white">₹{curPay.toLocaleString()}</strong></span>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowMilkModal(false)} className="px-3 py-1.5 rounded bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded bg-blue-600 text-white font-semibold">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Start Batch */}
      {showBatchModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-white font-bold text-sm">
              <span>Start Production Batch (BMR)</span>
              <button onClick={() => setShowBatchModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={addBatch} className="space-y-2 text-xs">
              <div>
                <label className="text-slate-400 block">Milk Volume (L)</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={bMilk} onChange={e => setBMilk(Number(e.target.value))}>
