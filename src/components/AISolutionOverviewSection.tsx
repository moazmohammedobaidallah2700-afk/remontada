/**
 * AI Solution Overview Section
 * Exactly incorporates:
 * 1. "The project features heartbeat tracking and monitoring the astronaut's health, both psychological and physical."
 * 2. "Our project relies on using a website-specific artificial intelligence, and this AI takes astronaut health data such as heart rate, begins analyzing it, and starts guiding the astronaut on how to solve this health problem."
 */

import React from 'react';
import { HeartPulse, Cpu, Sparkles, Activity, ShieldCheck } from 'lucide-react';

interface AISolutionOverviewSectionProps {
  language: 'en' | 'ar';
}

export const AISolutionOverviewSection: React.FC<AISolutionOverviewSectionProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="ai-solution" className="py-16 border-t border-cyan-500/20 bg-radial from-slate-900 via-[#0A0E17] to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>{isAr ? 'ذكاء أسترا الطبي المستقل' : 'EDGE AI CLINICAL REASONING'}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'نظام الذكاء الاصطناعي وتتبع نبضات القلب' : 'AI Autonomous Health Diagnostic System'}
          </h2>

          <p className="mt-3 text-base text-slate-300">
            {isAr
              ? 'تحليل فوري للمؤشرات الفسيولوجية على حافة المركبة لتجاوز تأخير الاتصال بمركز قيادة هيوستن على الأرض.'
              : 'Zero-delay edge clinical intelligence analyzing astronaut vitals and formulating immediate medical countermeasures.'}
          </p>
        </div>

        {/* Dual Cards as specified in the Brief */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Heartbeat Tracking & Psychological/Physical Health */}
          <div className="bg-[#121824] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group">
            {/* Visual Header: Deep-space floating astronaut */}
            <div className="relative h-64 overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1000&q=80"
                alt="Astronaut floating in deep space against nebula"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/40 to-transparent" />

              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>CONTINUOUS ECG & AUTONOMIC HRV</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-400" />
                  <span>{isAr ? 'تتبع نبضات القلب والصحة النفسية والجسدية' : 'Heartbeat & Psychological Telemetry'}</span>
                </h3>

                {/* EXACT REQUIRED BRIEF STATEMENT */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-4">
                  <p className="text-base font-bold text-cyan-200 font-sans leading-relaxed">
                    {isAr
                      ? 'يتميز المشروع بتتبع نبضات القلب ومراقبة صحة رائد الفضاء، سواء النفسية أو الجسدية.'
                      : 'The project features heartbeat tracking and monitoring the astronaut\'s health, both psychological and physical.'}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {isAr
                    ? 'رصد متواصل لتخطيط كهربائية القلب (Lead-II ECG)، وتباين النبض (HRV) للكشف المبكر عن التوتر العصبي والإرهاق قبل تطورهما إلى اضطراب سريري.'
                    : 'Continuous vectorcardiography and RMSSD heart rate variability tracking provide real-time biomarkers for sympathetic distress, fatigue, and cardiac deconditioning.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>ECG Rhythm: Lead-II Synced</span>
                <span>NASA-STD-3001 Verified</span>
              </div>
            </div>
          </div>

          {/* Card 2: AI Diagnostic Analysis & Guidance */}
          <div className="bg-[#121824] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group">
            {/* Visual Header: Astronaut looking through spaceship observation window */}
            <div className="relative h-64 overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80"
                alt="Astronaut looking through spaceship cupola window"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/40 to-transparent" />

              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>EDGE AI CLINICAL GUIDANCE</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>{isAr ? 'الذكاء الاصطناعي والتوجيه الطبي الذاتي' : 'Autonomous AI Clinical Guidance'}</span>
                </h3>

                {/* EXACT REQUIRED BRIEF STATEMENT */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-4">
                  <p className="text-base font-bold text-cyan-200 font-sans leading-relaxed">
                    {isAr
                      ? 'يعتمد مشروعنا على استخدام ذكاء اصطناعي خاص بالموقع، حيث يأخذ هذا الذكاء بيانات صحة رائد الفضاء مثل معدل نبضات القلب، ويبدأ في تحليلها، ويرشد رائد الفضاء لكيفية حل هذه المشكلة الصحية.'
                      : 'Our project relies on using a website-specific artificial intelligence, and this AI takes astronaut health data such as heart rate, begins analyzing it, and starts guiding the astronaut on how to solve this health problem.'}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {isAr
                    ? 'في مهام المريخ والفضاء السحيق التي يستغرق فيها وصول الإشارة إلى الأرض أكثر من 14 دقيقة، يقوم النظام بتشخيص الحالة فورياً ووصف جرعة الدواء أو تمرين الضغط السلبي بدون تأخير.'
                    : 'Overcoming the 14-minute interplanetary communication light-lag, ASTRA\'s edge AI formulates differential diagnoses, specifies locker medication dosages, and adjusts countermeasure protocols instantaneously.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>Latency: 0 ms (Local Edge)</span>
                <span>Active Safety Protocols</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
