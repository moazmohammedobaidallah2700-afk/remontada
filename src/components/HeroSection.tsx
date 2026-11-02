/**
 * Hero Section & Remontada Space Emblem Banner
 * Features the centered "remontada" banner with rocket, moon, stars,
 * real-time MET counter, Earth light-delay indicator (14m 24s),
 * and primary mission action buttons.
 */

import React, { useState, useEffect } from 'react';
import {
  Rocket, Clock, Radio, ShieldAlert, Sparkles, PhoneCall,
  Waves, AlertTriangle, ArrowRight, Activity, Compass
} from 'lucide-react';
import { formatMET } from '../utils/telemetryLogic';

interface HeroSectionProps {
  language: 'en' | 'ar';
  onNavigateToSection: (sectionId: string) => void;
  onOpenFeelStrangeModal: () => void;
  onTriggerCall: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onNavigateToSection,
  onOpenFeelStrangeModal,
  onTriggerCall,
}) => {
  const isAr = language === 'ar';
  const [seconds, setSeconds] = useState(145892); // ~1 day, 16 hours into mission

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const met = formatMET(seconds);

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden bg-radial from-slate-900 via-[#070A11] to-[#070A11]">
      {/* Background Starfield & Deep-Space Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      {/* Nebula Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Top Centered Remontada Mission Emblem Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)] flex flex-col items-center max-w-md w-full">
          {/* Retro-Futuristic Rocket, Moon & Stars Insignia */}
          <div className="relative w-24 h-24 mb-2 flex items-center justify-center">
            {/* Orbit Circle */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '30s' }} />

            {/* Moon Crescent */}
            <div className="absolute top-2 right-2 text-amber-300 text-lg">🌙</div>

            {/* Distant Stars */}
            <span className="absolute bottom-3 left-3 text-cyan-300 text-xs">✨</span>
            <span className="absolute top-4 left-4 text-white text-[10px]">✦</span>

            {/* Central Rocket */}
            <div className="relative z-10 w-14 h-14 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Rocket className="w-8 h-8 text-cyan-300 -rotate-45" />
            </div>
          </div>

          {/* Wordmark */}
          <h1 className="text-3xl md:text-4xl font-sans font-black italic tracking-widest text-white uppercase drop-shadow">
            REMONTADA
          </h1>
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase mt-0.5">
            DEEP SPACE MISSION CREW HEALTH
          </span>
        </div>

        {/* Real-time Telemetry Status Bar (MET & Earth Delay 14m 24s) */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-8 py-2.5 px-6 rounded-full bg-slate-950/90 border border-slate-800 shadow-lg text-xs font-mono">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-slate-400 font-medium">
              {isAr ? 'زمن المهمة:' : 'MET:'}
            </span>
            <span className="text-cyan-300 font-bold tracking-wider">
              {met.formatted}
            </span>
          </div>

          <span className="text-slate-700 hidden sm:inline">•</span>

          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-slate-400 font-medium">
              {isAr ? 'تأخير الأرض الضوئي:' : 'EARTH LIGHT DELAY:'}
            </span>
            <span className="text-amber-300 font-bold">14m 24s (MARS)</span>
          </div>

          <span className="text-slate-700 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-bold">
              {isAr ? 'الذكاء الحافي: نشط' : 'EDGE AI: AUTONOMOUS'}
            </span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="inline-block px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            {isAr ? 'المنظومة الطبية المستقلة لطواقم الفضاء' : 'AUTONOMOUS CREW HEALTH GUIDANCE SYSTEM'}
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {isAr ? 'اسم المشروع: ' : 'Project Name: '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-400">
              ASTRA HEALTH
            </span>
          </h2>

          <h3 className="text-xl md:text-2xl font-bold text-slate-300 italic mt-2">
            {isAr
              ? '(نظام التوجيه الصحي الذاتي لرواد الفضاء)'
              : '(Autonomous Crew Health Guidance System)'}
          </h3>

          <p className="mt-4 text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'توفير الرعاية الطبية الفورية، اللياقة البدنية في انعدام الجاذبية، الاتصال الصوتي بالبدلة، وتحفيز الصحة النفسية عبر الذكاء الاصطناعي لرحلات الفضاء السحيق.'
              : 'Preserving astronaut physical, cardiovascular, and psychological health under zero gravity through real-time telemetry, AI clinical guidance, voice comms, and biophilic nature restoration.'}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          {/* Launch ASTRA HEALTH */}
          <button
            onClick={() => onNavigateToSection('telemetry')}
            className="px-6 py-3.5 rounded-xl font-mono text-xs md:text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Activity className="w-4 h-4" />
            <span>{isAr ? 'تشغيل أسترا هيلث (القياسات الحية)' : 'Launch ASTRA HEALTH (Telemetry)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Voice Call with Avatar */}
          <button
            onClick={onTriggerCall}
            className="px-5 py-3.5 rounded-xl font-mono text-xs md:text-sm font-bold bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>{isAr ? 'الاتصال برائد الفضاء (صوتي)' : 'Call Astronaut (Voice Comms)'}</span>
          </button>

          {/* Nature Sensory Chamber */}
          <button
            onClick={() => onNavigateToSection('nature-hub')}
            className="px-5 py-3.5 rounded-xl font-mono text-xs md:text-sm font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'واحة الطبيعة والأرض' : 'Earth Nature Sanctuary'}</span>
          </button>

          {/* Feel Something Strange Button */}
          <button
            onClick={onOpenFeelStrangeModal}
            className="px-5 py-3.5 rounded-xl font-mono text-xs md:text-sm font-bold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 flex items-center gap-2 shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{isAr ? 'أشعر بأمر غريب!' : 'Feel Something Strange?'}</span>
          </button>
        </div>

        {/* Environmental Telemetry Strip */}
        <div className="w-full max-w-4xl p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">{isAr ? 'ضغط الكابينة' : 'CABIN PRESSURE'}</span>
            <span className="font-bold text-white">101.3 kPa (Nominal)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">{isAr ? 'ضغط الأكسجين' : 'OXYGEN ppO2'}</span>
            <span className="font-bold text-cyan-300">21.2 kPa (Normal)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">{isAr ? 'ثاني أكسيد الكربون' : 'CARBON DIOXIDE ppCO2'}</span>
            <span className="font-bold text-emerald-300">0.38 kPa (Safe)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">{isAr ? 'الإشعاع المداري' : 'COSMIC DOSIMETRY'}</span>
            <span className="font-bold text-amber-300">21.4 μSv/h</span>
          </div>
        </div>
      </div>
    </section>
  );
};
