/**
 * Crew Daily Health & Mood Check Cards
 * Exact implementation matching user's design reference:
 * - Sleep Card ("النوم") with smiling battery avatar & "بطاريتك مشحونة."
 * - Bone & Muscle Card ("العظام والعضلات") with smiling bone avatar & "عظامك قوية النهارده."
 * - Mood Card ("المزاج") with expressive cloud avatar & "سماؤك فيها غيوم." + "الحل خطوة بخطوة"
 * - Full Arabic and English bilingual toggle with exact matching typography and badges!
 */

import React, { useState } from 'react';
import { Info, RefreshCw, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, PhoneCall, Users, BookOpen } from 'lucide-react';
import { audioComms } from '../utils/audioComms';

interface CrewHealthCheckCardsProps {
  language: 'en' | 'ar';
  onTriggerCall?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const CrewHealthCheckCards: React.FC<CrewHealthCheckCardsProps> = ({
  language,
  onTriggerCall,
  onNavigateToSection,
}) => {
  const isAr = language === 'ar';

  // State for interactive recheck & step visibility
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [exerciseMinutes, setExerciseMinutes] = useState<number>(100);
  const [moodState, setMoodState] = useState<'cloudy' | 'sunny' | 'rainy'>('cloudy');
  const [showMoodSteps, setShowMoodSteps] = useState<boolean>(true);
  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null);

  // Recheck handlers
  const handleRecheckSleep = () => {
    audioComms.playQuindar('intro');
    setSleepHours((prev) => (prev >= 8.5 ? 7 : prev + 0.5));
  };

  const handleRecheckExercise = () => {
    audioComms.playQuindar('intro');
    setExerciseMinutes((prev) => (prev >= 120 ? 80 : prev + 10));
  };

  const handleRecheckMood = () => {
    audioComms.playQuindar('intro');
    setMoodState((prev) => (prev === 'cloudy' ? 'sunny' : prev === 'sunny' ? 'rainy' : 'cloudy'));
  };

  return (
    <section id="health-checks" className="py-12 bg-[#0A0E17] text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            {isAr ? 'الفحص اليومي السريع للطاقم' : 'CREW DAILY CLINICAL CHECK-IN'}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
            {isAr ? 'حالتك الصحية والبدنية والنفسية الآن' : 'Your Physical, Sleep & Mood Status'}
          </h2>
        </div>

        {/* ======================================================== */}
        {/* 1. SLEEP CARD ("النوم")                                   */}
        {/* ======================================================== */}
        <div className="bg-[#0C121E] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all hover:border-slate-700">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                onClick={() => setActiveInfoModal('sleep')}
                className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[11px] text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer"
                title="Info"
              >
                i
              </button>
              <span>{isAr ? 'ساعات النوم الليلة اللي فاتت' : 'Sleep hours last night'}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white">
              {isAr ? 'النوم' : 'Sleep'}
            </h3>
          </div>

          {/* Card Body */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left Content (or Right in RTL) */}
            <div className="flex-1 space-y-3 text-center sm:text-start">
              {/* Status Badge */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{isAr ? 'أخضر' : 'Green / Nominal'}</span>
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  <span>{isAr ? 'كفاءة النوم:' : 'Sleep Score:'}</span>
                  <span className="text-white">96%</span>
                </div>
              </div>

              {/* Main Headline */}
              <h4 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <span>{isAr ? 'بطاريتك مشحونة.' : 'Your battery is charged.'}</span>
                <span className="text-sm font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  100% {isAr ? 'مشحونة' : 'Charged'}
                </span>
              </h4>

              {/* Subtext Result & Percentage Breakdown */}
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-slate-300">
                  {isAr
                    ? `النتيجة: ${sleepHours} ساعة. كمّل على نفس الروتين، وأعد الفحص بكرة.`
                    : `Result: ${sleepHours} hours. Continue with this routine, and recheck tomorrow.`}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-[11px] font-mono text-slate-400">
                  <span>REM: 26%</span>
                  <span>•</span>
                  <span>{isAr ? 'نوم عميق:' : 'Deep Sleep:'} 28%</span>
                  <span>•</span>
                  <span>{isAr ? 'الهدف المنجز:' : 'Goal Achieved:'} 96%</span>
                </div>
              </div>

              {/* Recheck Button */}
              <div className="pt-2">
                <button
                  onClick={handleRecheckSleep}
                  className="px-5 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-xs font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'أعد الفحص' : 'Recheck'}</span>
                </button>
              </div>
            </div>

            {/* Right: Smiling Battery Avatar Character matching image */}
            <div className="relative shrink-0">
              <div className="w-28 h-20 md:w-32 md:h-24 rounded-2xl bg-[#1E293B] border-2 border-slate-600 flex flex-col items-center justify-center relative shadow-lg">
                {/* Battery positive terminal on top */}
                <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-2.5 h-7 rounded-r-md bg-slate-500" />

                {/* Battery eyes & cute smile */}
                <div className="flex items-center justify-center gap-5 mt-2">
                  <div className="relative">
                    <span className="block w-2.5 h-2.5 rounded-full bg-cyan-300" />
                    <span className="absolute -bottom-2 -left-1 w-3 h-1 rounded-full bg-rose-400/60" />
                  </div>
                  <div className="relative">
                    <span className="block w-2.5 h-2.5 rounded-full bg-cyan-300" />
                    <span className="absolute -bottom-2 -left-1 w-3 h-1 rounded-full bg-rose-400/60" />
                  </div>
                </div>

                {/* Cute smile */}
                <div className="w-4 h-2 border-b-2 border-cyan-200 rounded-b-full mt-2" />

                {/* Green charge bar at bottom */}
                <div className="absolute bottom-2 inset-x-3 h-1.5 bg-emerald-500/30 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. BONES & MUSCLES CARD ("العظام والعضلات")              */}
        {/* ======================================================== */}
        <div className="bg-[#0C121E] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all hover:border-slate-700">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                onClick={() => setActiveInfoModal('muscles')}
                className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[11px] text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer"
                title="Info"
              >
                i
              </button>
              <span>{isAr ? 'دقائق التمرين النهاردة' : 'Workout minutes today'}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white">
              {isAr ? 'العظام والعضلات' : 'Bones & Muscles'}
            </h3>
          </div>

          {/* Card Body */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1 space-y-3 text-center sm:text-start">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{isAr ? 'أخضر' : 'Green / Nominal'}</span>
              </div>

              {/* Main Headline */}
              <h4 className="text-xl md:text-2xl font-bold text-white">
                {isAr ? 'عظامك قوية النهارده.' : 'Your bones are strong today.'}
              </h4>

              {/* Subtext Result */}
              <p className="text-xs md:text-sm text-slate-300">
                {isAr
                  ? `النتيجة: ${exerciseMinutes} دقيقة. كمّل على نفس الروتين، وأعد الفحص بكرة.`
                  : `Result: ${exerciseMinutes} minutes. Continue with this routine, and recheck tomorrow.`}
              </p>

              {/* Recheck Button */}
              <div className="pt-2">
                <button
                  onClick={handleRecheckExercise}
                  className="px-5 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-xs font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'أعد الفحص' : 'Recheck'}</span>
                </button>
              </div>
            </div>

            {/* Right: Smiling Bone Avatar Character matching image */}
            <div className="relative shrink-0">
              <svg viewBox="0 0 140 80" className="w-32 h-20 md:w-36 md:h-22 drop-shadow-lg">
                {/* Bone shape */}
                <path
                  d="M30 20 C20 10 5 25 20 40 C5 55 20 70 30 60 L110 60 C120 70 135 55 120 40 C135 25 120 10 110 20 Z"
                  fill="#F1F5F9"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
                {/* Cute Eyes */}
                <circle cx="60" cy="38" r="3.5" fill="#0F172A" />
                <circle cx="80" cy="38" r="3.5" fill="#0F172A" />
                {/* Blushing cheeks */}
                <circle cx="53" cy="45" r="4" fill="#FDA4AF" opacity="0.8" />
                <circle cx="87" cy="45" r="4" fill="#FDA4AF" opacity="0.8" />
                {/* Smiling mouth */}
                <path d="M64 45 Q70 52 76 45" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. MOOD CARD ("المزاج") + STEP-BY-STEP SOLUTION           */}
        {/* ======================================================== */}
        <div className="bg-[#0C121E] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all hover:border-slate-700">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                onClick={() => setActiveInfoModal('mood')}
                className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[11px] text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer"
                title="Info"
              >
                i
              </button>
              <span>{isAr ? 'حاسس بإيه دلوقتي؟' : 'How are you feeling right now?'}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white">
              {isAr ? 'المزاج' : 'Mood'}
            </h3>
          </div>

          {/* Card Body */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1 space-y-3 text-center sm:text-start">
              {/* Status Badge: Yellow Triangle (متوسط) */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/80 border border-amber-500/40 text-amber-300">
                <span className="text-[10px]">▲</span>
                <span>{isAr ? 'متوسط' : 'Moderate / Fair'}</span>
              </div>

              {/* Main Headline */}
              <h4 className="text-xl md:text-2xl font-bold text-white">
                {isAr ? 'سماؤك فيها غيوم.' : 'Your sky has clouds.'}
              </h4>

              {/* Consequence if left unaddressed */}
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-300">
                  {isAr ? 'لو ما عملتش الحل: ' : 'If unaddressed: '}
                </span>
                {isAr
                  ? 'لو الغيوم دي استمرت، العزلة بتزوّد التوتر وتضعف تعاونك مع الطاقم.'
                  : 'If these clouds persist, isolation amplifies stress and weakens crew collaboration.'}
              </p>

              {/* Action Buttons: Toggle Steps & Recheck */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <button
                  onClick={() => setShowMoodSteps(!showMoodSteps)}
                  className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>{showMoodSteps ? (isAr ? 'اقفل الخطوات' : 'Close Steps') : (isAr ? 'افتح الخطوات' : 'Open Steps')}</span>
                  {showMoodSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={handleRecheckMood}
                  className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/80 text-xs font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'أعد الفحص' : 'Recheck'}</span>
                </button>
              </div>
            </div>

            {/* Right: Expressive Cloud Character matching image */}
            <div className="relative shrink-0">
              <svg viewBox="0 0 140 100" className="w-32 h-24 md:w-36 md:h-26 drop-shadow-xl">
                {/* Soft Cloud Shape */}
                <path
                  d="M30 65 Q15 65 20 48 Q20 32 38 32 Q44 15 65 18 Q85 10 98 26 Q115 22 120 40 Q130 50 120 65 Z"
                  fill="#94A3B8"
                  stroke="#64748B"
                  strokeWidth="2"
                />
                {/* Expressive gentle eyes */}
                <circle cx="55" cy="45" r="3.5" fill="#0F172A" />
                <circle cx="85" cy="45" r="3.5" fill="#0F172A" />
                {/* Wobbly concerned little mouth */}
                <path d="M60 56 Q70 51 80 56" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STEP-BY-STEP SOLUTION CARD ("الحل خطوة بخطوة")           */}
          {/* ======================================================== */}
          {showMoodSteps && (
            <div className="mt-6 p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 animate-in fade-in duration-300">
              <h5 className="text-sm font-bold text-cyan-300 flex items-center gap-2 pb-2 border-b border-slate-800">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'الحل خطوة بخطوة' : 'Step-by-Step Action Plan'}</span>
              </h5>

              <ul className="space-y-2.5 text-xs md:text-sm text-slate-300">
                <li className="flex items-start justify-between gap-3 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-cyan-400">1.</span>
                    <span>
                      {isAr
                        ? 'اتصل بالأرض أو بحد تحبه حتى لو 5 دقايق.'
                        : 'Call Earth or someone you love, even for 5 minutes.'}
                    </span>
                  </div>
                  {onTriggerCall && (
                    <button
                      onClick={onTriggerCall}
                      className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs hover:bg-cyan-500/30 font-mono shrink-0 cursor-pointer"
                    >
                      {isAr ? 'اتصل الآن' : 'Call Now'}
                    </button>
                  )}
                </li>

                <li className="flex items-start justify-between gap-3 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-cyan-400">2.</span>
                    <span>
                      {isAr
                        ? 'اقعد مع زميل من الطاقم على وجبة مشتركة.'
                        : 'Share a meal with a fellow crewmate to foster camaraderie.'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 shrink-0">
                    {isAr ? 'الترابط النفسي' : 'Social Connection'}
                  </span>
                </li>

                <li className="flex items-start justify-between gap-3 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-cyan-400">3.</span>
                    <span>
                      {isAr
                        ? 'سجّل اللي مضايقك في دفتر المزاج أو استمع إلى واحة الطبيعة والأنهار.'
                        : 'Log your thoughts in the mood journal or visit the Earth Nature Sanctuary.'}
                    </span>
                  </div>
                  {onNavigateToSection && (
                    <button
                      onClick={() => onNavigateToSection('nature-hub')}
                      className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs hover:bg-emerald-500/30 font-mono shrink-0 cursor-pointer"
                    >
                      {isAr ? 'واحة الطبيعة' : 'Nature Hub'}
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
