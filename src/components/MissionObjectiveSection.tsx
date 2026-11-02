/**
 * Mission & Objective Section
 * Exactly incorporates:
 * "Our project aims to establish a sports and physical fitness system to preserve
 * the physical health of astronauts and improve their physical fitness."
 * With accompanying image/graphic of astronaut floating in zero gravity.
 */

import React from 'react';
import { Dumbbell, HeartPulse, ShieldCheck, Activity, Award } from 'lucide-react';

interface MissionObjectiveSectionProps {
  language: 'en' | 'ar';
}

export const MissionObjectiveSection: React.FC<MissionObjectiveSectionProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="mission" className="py-16 border-t border-cyan-500/20 bg-[#0A0E17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Asset of Astronaut Floating in Zero Gravity */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-slate-950 group">
              <img
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80"
                alt="Astronaut floating in zero-gravity spaceflight"
                className="w-full h-[380px] md:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Status Overlay Tag */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>MICROGRAVITY EVA • ZERO-G ACTIVITY</span>
              </div>

              {/* Bottom Quote Banner */}
              <div className="absolute bottom-4 inset-x-4 z-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800">
                <p className="text-xs md:text-sm text-cyan-200 font-sans italic">
                  {isAr
                    ? '"الحفاظ على الكتلة العضلية وكثافة العظام في الفضاء يحتاج إلى تمارين مقاومة هوائية يومية لمحاكاة جاذبية الأرض."'
                    : '"Without 2.5 hours of daily resistive countermeasure loading, astronauts lose up to 1.5% of bone mineral density every month."'}
                </p>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">
                  NASA-STD-3001 VOL 1 & 2 AEROSPACE STANDARD
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Objective Text */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>{isAr ? 'الهدف الأساسي للمهمة' : 'CORE MISSION OBJECTIVE'}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {isAr
                  ? 'اللياقة البدنية والصحية لرواد الفضاء في انعدام الجاذبية'
                  : 'Physical Fitness & Musculoskeletal Health in Microgravity'}
              </h2>
            </div>

            {/* Exact Required Brief Statement Card */}
            <div className="p-5 rounded-2xl bg-[#121824] border-l-4 border-cyan-400 border border-cyan-500/20 shadow-xl">
              <p className="text-lg md:text-xl font-bold text-cyan-100 leading-relaxed font-sans">
                {isAr
                  ? 'يهدف مشروعنا إلى إنشاء نظام رياضي ولياقة بدنية للحفاظ على الصحة البدنية لرواد الفضاء وتحسين لياقتهم البدنية.'
                  : 'Our project aims to establish a sports and physical fitness system to preserve the physical health of astronauts and improve their physical fitness.'}
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              {isAr
                ? 'في بيئة انعدام الوزن، تتلاشى الجاذبية التي تقاومها العضلات على الأرض. يوفر نظام أسترا هيلث خوارزميات لمتابعة تمارين جهاز ARED المقاوم للجاذبية الهوائي ودراجات CEVIS مع مراقبة مؤشرات القلب والتنفس لمنع ضمور العضلات وهشاشة العظام.'
                : 'In microgravity, the absence of gravitational loading causes rapid muscular atrophy and skeletal calcium excretion. ASTRA HEALTH delivers closed-loop tracking for ARED pneumatic resistance devices and CEVIS cycle ergometers to keep crew members at peak readiness.'}
            </p>

            {/* Structured 3 Subsystem Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">ARED LOADING</span>
                <span className="text-sm font-bold text-white block">140kg Barbell Equiv</span>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {isAr ? 'محاكاة القرفصاء والرفع بأجهزة ضغط الهواء' : 'Pneumatic squats & deadlifts'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">CARDIO HIIT</span>
                <span className="text-sm font-bold text-white block">T2 & CEVIS Bike</span>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {isAr ? 'عزل الاهتزاز لحماية جسم المحطة الفضائية' : 'Vibration isolation system'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-mono text-amber-400 font-bold block mb-1">BONE SHIELD</span>
                <span className="text-sm font-bold text-white block">DEXA Density</span>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {isAr ? 'إيقاف فقدان كثافة عظام الحوض والعمود' : 'Arresting bone loss'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
