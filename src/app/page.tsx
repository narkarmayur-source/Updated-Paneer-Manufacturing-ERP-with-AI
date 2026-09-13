'use client';

import React, { useState } from 'react';
import {
  Activity, CheckCircle2, Cpu, Droplets, Gauge,
  Layers, Plus, Thermometer, TrendingUp, Truck, X
} from 'lucide-react';

export default function PaneerERPCommandCenter() {
  const [showMilk, setShowMilk] = useState(false);
  const [showBatch, setShowBatch] = useState(false);
  const [showDsp, setShowDsp] = useState(false);

  const [sup, setSup] = useState('Barad Dairy FPC');
  const [liters, setLiters] = useState(450);
  const [fat, setFat] = useState(6.5);
  const [snf, setSnf] = useState(9.0);

  const [bMilk, setBMilk] = useState(750);
  const [bFat, setBFat] = useState(5.2);
  const [bSnf, setBSnf] = useState(8.85);

  const [cust, setCust] = useState('Hotel Rajwada');
  const [route, setRoute] = useState('Baramati');
  const [dKg, setDKg] = useState(50);
  const [dRate, setDRate] = useState(335);

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

  const curRate = Number(((fat * 5.60) + (snf * 1.55)).toFixed(2));
  const curPay = Math.round(curRate * liters);

  const addIntake = (e: React.FormEvent) => {
    e.preventDefault();
    setIntakes([
      { id: `MI-${intakes.length + 101}`, name: sup, l: Number(liters), f: Number(fat), s: Number(snf), r: curRate, pay: curPay },
      ...intakes
    ]);
    setShowMilk(false);
  };

  const addBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const yld = Number(((bFat * 1.86) + (bSnf * 0.94) - 0.42).toFixed(2));
    const outKg = Number(((bMilk * 1.030 * yld) / 100).toFixed(1));
    setBatches([
      { id: `PB-${String(batches.length + 1).padStart(2, '0')}`, l: Number(bMilk), cTemp: bFat > 5.5 ? 74.0 : 73.0, citric: Number(((bMilk * 2.08) / 1000).toFixed(2)), out: outKg, yld, st: 'HEATING' },
      ...batches
    ]);
    setShowBatch(false);
  };

  const addDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatches([
      { id: `D-${String(dispatches.length + 1).padStart(2, '0')}`, c: cust, r: route, kg: Number(dKg), amt: Math.round(dKg * dRate), st: 'SCHEDULED' },
      ...dispatches
    ]);
    setShowDsp(false);
  };

  const totMilk = intakes.reduce((a, b) => a + b.l, 0);
  const totPaneer = batches.reduce((a, b) => a + b.out, 0);
  const totRev = dispatches.reduce((a, b) => a + b.amt, 0);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">PHALTAN PANEER INDUSTRIAL ERP</h1>
            <p className="text-xs text-slate-400">AI Command Center | Phaltan MIDC, Satara, MH</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowMilk(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold">
            <Plus className="w-3.5 h-3.5" /> Milk Intake
          </button>
          <button onClick={() => setShowBatch(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold">
            <Plus className="w-3.5 h-3.5" /> Start Batch
          </button>
          <button onClick={() => setShowDsp(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold">
            <Plus className="w-3.5 h-3.5" /> New Dispatch
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between text-slate-400 text-xs"><span>DAILY MILK INTAKE</span><Droplets className="w-3.5 h-3.5 text-blue-400" /></div>
          <div className="mt-1 text-xl font-bold text-white">{totMilk.toLocaleString()} L</div>
          <div className="text-[11px] text-emerald-400">Dock Quality Passed</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between text-slate-400 text-xs"><span>PANEER OUTPUT</span><Layers className="w-3.5 h-3.5 text-emerald-400" /></div>
          <div className="mt-1 text-xl font-bold text-emerald-400">{totPaneer.toFixed(1)} kg</div>
          <div className="text-[11px] text-emerald-400">18.05% Yield (Target ≥18%)</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between text-slate-400 text-xs"><span>COLD STORAGE</span><Thermometer className="w-3.5 h-3.5 text-cyan-400" /></div>
          <div className="mt-1 text-xl font-bold text-cyan-400">3.2°C</div>
          <div className="text-[11px] text-slate-400">Target 2°C–4°C</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between text-slate-400 text-xs"><span>UNIT COST / KG</span><Gauge className="w-3.5 h-3.5 text-amber-400" /></div>
          <div className="mt-1 text-xl font-bold text-white">₹288.54</div>
          <div className="text-[11px] text-slate-400">Price: ₹345.50</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between text-slate-400 text-xs"><span>TODAY'S REVENUE</span><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /></div>
          <div className="mt-1 text-xl font-bold text-emerald-400">₹{totRev.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">EBITDA: ~16.8%</div>
        </div>
      </div>

      {/* 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Panel 1 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold text-white border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-blue-400" /> Milk Intake Logs</span>
            <span className="text-xs text-slate-400">{intakes.length} Lots</span>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {intakes.map(item => (
              <div key={item.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                <div className="flex justify-between font-semibold text-white">
                  <span>{item.name}</span>
                  <span className="text-emerald-400">₹{item.r}/L</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>{item.l} L ({item.f}% F | {item.s}% SNF)</span>
                  <span className="text-white font-mono">₹{item.pay.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold text-white border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-emerald-400" /> Active BMR Batches</span>
            <span className="text-xs text-emerald-400">Active</span>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {batches.map(b => (
              <div key={b.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                <div className="flex justify-between font-semibold text-white">
                  <span>{b.id} ({b.l}L Milk)</span>
                  <span className="text-blue-400 text-[10px] px-1.5 py-0.5 bg-blue-500/10 rounded border border-blue-500/20">{b.st}</span>
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

        {/* Panel 3 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold text-white border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-cyan-400" /> IoT Telemetry</span>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div><span className="text-slate-400 block text-[11px]">Cold Room</span><span className="text-white font-bold">3.2°C</span></div>
              <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 font-bold">NORMAL</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div><span className="text-slate-400 block text-[11px]">Raw Milk Chilling Tank</span><span className="text-white font-bold">3.8°C</span></div>
              <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 font-bold">ACTIVE</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div><span className="text-slate-400 block text-[11px]">Steam Boiler</span><span className="text-white font-bold">4.3 Bar</span></div>
              <span className="text-[10px] text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 font-bold">OPTIMAL</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div><span className="text-slate-400 block text-[11px]">Reefer Van</span><span className="text-white font-bold">3.9°C (SH-147)</span></div>
              <span className="text-[10px] text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 font-bold">TRANSIT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatches */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5 text-white font-semibold text-sm"><Truck className="w-4 h-4 text-purple-400" /> Outbound Sales Dispatches</span>
          <span className="text-xs text-slate-400">7-Day Credit Strict Lock</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dispatches.map(d => (
            <div key={d.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
              <div className="flex justify-between"><span className="text-purple-400 font-bold">{d.r}</span><span className="text-slate-400">{d.st}</span></div>
              <div className="font-bold text-white">{d.c}</div>
              <div className="flex justify-between text-slate-400"><span>{d.kg} kg</span><span className="text-emerald-400 font-bold font-mono">₹{d.amt.toLocaleString()}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal 1: Milk Intake */}
      {showMilk && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xs w-full p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-white font-bold text-xs">
              <span>Record Milk Intake</span>
              <button onClick={() => setShowMilk(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={addIntake} className="space-y-2 text-xs">
              <div>
                <label className="text-slate-400 block text-[11px]">Supplier Name</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={sup} onChange={e => setSup(e.target.value)} required />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div>
                  <label className="text-slate-400 block text-[11px]">Liters</label>
                  <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={liters} onChange={e => setLiters(Number(e.target.value))} required />
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px]">Fat %</label>
                  <input type="number" step="0.1" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={fat} onChange={e => setFat(Number(e.target.value))} required />
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px]">SNF %</label>
                  <input type="number" step="0.05" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={snf} onChange={e => setSnf(Number(e.target.value))} required />
                </div>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-xs flex justify-between">
                <span>Rate: <strong className="text-emerald-400">₹{curRate}/L</strong></span>
                <span>Payout: <strong className="text-white">₹{curPay.toLocaleString()}</strong></span>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setShowMilk(false)} className="px-3 py-1 rounded bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Batch */}
      {showBatch && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xs w-full p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-white font-bold text-xs">
              <span>Start Production Batch</span>
              <button onClick={() => setShowBatch(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={addBatch} className="space-y-2 text-xs">
              <div>
                <label className="text-slate-400 block text-[11px]">Milk Volume (L)</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={bMilk} onChange={e => setBMilk(Number(e.target.value))}>
                  <option value="500">500 Liters</option>
                  <option value="750">750 Liters</option>
                  <option value="1000">1,000 Liters</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block text-[11px]">Blend Fat %</label>
                  <input type="number" step="0.1" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={bFat} onChange={e => setBFat(Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px]">Blend SNF %</label>
                  <input type="number" step="0.05" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={bSnf} onChange={e => setBSnf(Number(e.target.value))} />
                </div>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-[11px] space-y-0.5">
                <div className="text-emerald-400 font-bold">AI Recommended:</div>
                <div>Temp: <strong>{bFat > 5.5 ? '74°C' : '73°C'}</strong> | Citric: <strong>{Number(((bMilk * 2.08) / 1000).toFixed(2))} kg</strong></div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setShowBatch(false)} className="px-3 py-1 rounded bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-3 py-1 rounded bg-emerald-600 text-white font-semibold">Launch</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Dispatch */}
      {showDsp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xs w-full p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-white font-bold text-xs">
              <span>New Sales Dispatch</span>
              <button onClick={() => setShowDsp(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={addDispatch} className="space-y-2 text-xs">
              <div>
                <label className="text-slate-400 block text-[11px]">Customer</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={cust} onChange={e => setCust(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block text-[11px]">Route</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={route} onChange={e => setRoute(e.target.value)}>
                    <option value="Baramati">Baramati</option>
                    <option value="Satara">Satara</option>
                    <option value="Mahabaleshwar">Mahabaleshwar</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px]">Weight (kg)</label>
                  <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={dKg} onChange={e => setDKg(Number(e.target.value))} required />
                </div>
              </div>
              <div>
                <label className="text-slate-400 block text-[11px]">Rate / kg (₹)</label>
                <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white" value={dRate} onChange={e => setDRate(Number(e.target.value))} required />
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-xs flex justify-between">
                <span>Invoice:</span>
                <span className="text-emerald-400 font-bold">₹{(dKg * dRate).toLocaleString()}</span>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setShowDsp(false)} className="px-3 py-1 rounded bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-3 py-1 rounded bg-purple-600 text-white font-semibold">Dispatch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
