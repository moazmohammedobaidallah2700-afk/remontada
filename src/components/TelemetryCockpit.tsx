/**
 * Real-Time Telemetry Cockpit & Canvas Lead-II ECG Waveform
 * Renders an active, glowing Lead-II cardiac vector tracing on HTML5 canvas,
 * tabular vital telemetry values, and quick crew switch presets.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Activity, Heart, Droplet, Wind, Thermometer,
  ShieldAlert, RefreshCw, UserCheck, Zap
} from 'lucide-react';
import { AstronautProfile } from '../types';

interface TelemetryCockpitProps {
  language: 'en' | 'ar';
  activeAstronaut: AstronautProfile;
  onSelectAstronaut: (astronaut: AstronautProfile) => void;
  astronautPresets: AstronautProfile[];
}

export const TelemetryCockpit: React.FC<TelemetryCockpitProps> = ({
  language,
  activeAstronaut,
  onSelectAstronaut,
  astronautPresets,
}) => {
  const isAr = language === 'ar';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live fluctuating vitals state
  const [heartRate, setHeartRate] = useState<number>(activeAstronaut.restingHeartRate);
  const [spo2, setSpo2] = useState<number>(99.4);
  const [respiration, setRespiration] = useState<number>(14);
  const [coreTemp, setCoreTemp] = useState<number>(36.8);
  const [hrv, setHrv] = useState<number>(68);

  // Fluctuations simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setHeartRate((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(55, Math.min(105, prev + delta));
      });
      setSpo2((prev) => {
        const delta = (Math.random() * 0.2 - 0.1);
        return parseFloat(Math.max(97.5, Math.min(99.9, prev + delta)).toFixed(1));
      });
      setHrv((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(50, Math.min(88, prev + delta));
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Canvas Lead-II ECG Waveform Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    const points: number[] = [];
    const maxPoints = 300;

    // Fill initial baseline
    for (let i = 0; i < maxPoints; i++) {
      points.push(0);
    }

    const render = () => {
      step++;
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Generate ECG P-Q-R-S-T spike pattern
      const cyclePos = step % 50;
      let y = 0;
      if (cyclePos === 10) y = -8; // P wave
      else if (cyclePos === 15) y = 4; // Q wave
      else if (cyclePos === 17) y = -45; // R wave spike
      else if (cyclePos === 19) y = 14; // S wave dip
      else if (cyclePos === 26) y = -14; // T wave
      else y = (Math.random() * 2 - 1) * 0.8; // Baseline noise

      points.shift();
      points.push(y);

      // Clear with dark cyan tint
      ctx.fillStyle = '#070A11';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // Draw Glowing Lead-II Trace
      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06B6D4';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const dx = width / (maxPoints - 1);
      for (let i = 0; i < points.length; i++) {
        const px = i * dx;
        const py = midY + points[i];
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Reset shadow for performance
      ctx.shadowBlur = 0;

      // Draw pulsing leading sweep dot
      const lastX = (points.length - 1) * dx;
      const lastY = midY + points[points.length - 1];
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="telemetry" className="py-16 bg-[#0A0E17] border-t border-cyan-500/20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ACTIVE TELEMETRY UPLINK
              </span>
              <span className="text-xs text-slate-400 font-mono">LEAD-II BIOSENSOR</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              {isAr ? 'لوحة القياسات الحيوية اللحظية ومخطط القلب' : 'Real-Time Telemetry Cockpit & Live ECG'}
            </h2>
          </div>

          {/* Quick switch between crew presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {isAr ? 'تبديل رائد الفضاء:' : 'CREW PRESET:'}
            </span>
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
              {astronautPresets.map((astro) => (
                <button
                  key={astro.id}
                  onClick={() => onSelectAstronaut(astro)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeAstronaut.id === astro.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {astro.rank}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live ECG Waveform Display */}
        <div className="bg-[#0E1524] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl mb-8 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
              <span className="text-sm font-bold text-white">
                {isAr ? 'مخطط كهربية القلب اللحظي (LEAD-II ECG)' : 'CONTINUOUS LEAD-II CARDIAC TRACE'}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                250 Hz VECTOR
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">PAPER SPEED: 25 mm/s</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                RHYTHM: REGULAR SINUS
              </span>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <canvas
              ref={canvasRef}
              width={1000}
              height={176}
              className="w-full h-full block"
            />
          </div>
        </div>

        {/* Vitals Telemetry Readouts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Heart Rate */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">{isAr ? 'نبضات القلب' : 'HEART RATE'}</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black font-mono text-rose-400">{heartRate}</span>
              <span className="text-[10px] font-mono text-slate-500">BPM</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Resting baseline</span>
          </div>

          {/* Blood Pressure */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">{isAr ? 'ضغط الدم' : 'BLOOD PRESSURE'}</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black font-mono text-cyan-300">118/76</span>
              <span className="text-[10px] font-mono text-slate-500">mmHg</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">MAP: 90 mmHg</span>
          </div>

          {/* SpO2 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">{isAr ? 'تشبع الأكسجين' : 'OXYGEN SAT (SpO2)'}</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black font-mono text-emerald-400">{spo2}%</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Multi-wavelength</span>
          </div>

          {/* Respiration */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">{isAr ? 'معدل التنفس' : 'RESPIRATION'}</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black font-mono text-white">{respiration}</span>
              <span className="text-[10px] font-mono text-slate-500">BrPM</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Tidal vol: 520 mL</span>
          </div>

          {/* Skin / Core Temp */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">{isAr ? 'حرارة الجسم' : 'CORE TEMP'}</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black font-mono text-white">{coreTemp}°C</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Skin: 34.2°C</span>
          </div>

          {/* HRV */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">{isAr ? 'تباين النبض (HRV)' : 'AUTONOMIC HRV'}</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black font-mono text-cyan-400">{hrv}</span>
              <span className="text-[10px] font-mono text-slate-500">ms</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">High vagal tone</span>
          </div>
        </div>
      </div>
    </section>
  );
};
