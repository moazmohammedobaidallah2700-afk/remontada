/**
 * NASA Countermeasures & Advanced Wearable Biometrics Hub
 * Features:
 * - ARED & Flywheel Resistance Analytics (Force & Velocity Tracking)
 * - Sweat Analysis & Microfluidic Hydration/Electrolyte Loss
 * - Smart Injury-Prevention & Overuse Warning Logic
 * - HIIT Cardiovascular Customizer
 * - Gamified Mission Readiness Badges (Crew Morale Tracker)
 */

import React, { useState } from 'react';
import {
  Dumbbell, Droplets, Zap, ShieldAlert, Award, Clock,
  TrendingUp, Flame, Heart, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';

interface NasaCountermeasuresHubProps {
  language: 'en' | 'ar';
}

export const NasaCountermeasuresHub: React.FC<NasaCountermeasuresHubProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'ared' | 'sweat' | 'hiit' | 'gamification'>('ared');
  const [waterIntakeMl, setWaterIntakeMl] = useState<number>(2400);
  const [targetWaterMl] = useState<number>(3000);
  const [saltPacketsAdded, setSaltPacketsAdded] = useState<number>(2);

  // ARED Resistance Exercise Log
  const aredExercises = [
    {
      nameEn: 'Pneumatic Barbell Squat',
      nameAr: 'القرفصاء بأثقال الضغط الهوائي',
      loadKg: 135,
      sets: '4 sets × 10 reps',
      velocityMs: '0.62 m/s',
      trend: 'nominal',
      boneTarget: 'Femoral Neck & Lumbar Spine',
    },
    {
      nameEn: 'Deadlift (Axial Spinal Loading)',
      nameAr: 'الرفعة الميتة (التحميل المحوري للعمود الفقري)',
      loadKg: 150,
      sets: '3 sets × 8 reps',
      velocityMs: '0.55 m/s',
      trend: 'nominal',
      boneTarget: 'Trochanter & Calcaneus',
    },
    {
      nameEn: 'Bench Press & Pec Fly',
      nameAr: 'تمرين الصدر والمقاومة الهوائية',
      loadKg: 95,
      sets: '4 sets × 12 reps',
      velocityMs: '0.71 m/s',
      trend: 'nominal',
      boneTarget: 'Thoracic Ribcage & Clavicle',
    },
    {
      nameEn: 'Heel-Raise (Calf Atrophy Shield)',
      nameAr: 'رفع الكعب (مكافحة ضمور السمانة)',
      loadKg: 110,
      sets: '4 sets × 15 reps',
      velocityMs: '0.48 m/s',
      trend: 'warning',
      boneTarget: 'Soleus / Gastrocnemius Density',
    },
  ];

  // Gamified Badges
  const badges = [
    {
      id: 'ared-streak',
      titleEn: 'Zero-G Titan',
      titleAr: 'بطل المقاومة في انعدام الوزن',
      descEn: 'Completed 14 consecutive daily ARED 2.5h workouts',
      descAr: 'إكمال 14 يوماً متتالياً من تمارين ARED لمدة ساعتين ونصف',
      icon: '🏋️‍♂️',
      status: 'unlocked',
    },
    {
      id: 'hydration-master',
      titleEn: 'Hydration Precision',
      titleAr: 'سيد التوازن الأيضي والترطيب',
      descEn: 'Maintained 100% electrolyte & sweat osmolarity balance',
      descAr: 'الحفاظ على توازن أملاح العرق والترطيب بنسبة 100%',
      icon: '💧',
      status: 'unlocked',
    },
    {
      id: 'sans-protector',
      titleEn: 'Ocular Shield',
      titleAr: 'درع الرؤية والعصب البصري',
      descEn: 'Completed daily LBNP decompression protocol',
      descAr: 'إتمام جلسات الضغط السلبي السفلي لحماية النظر',
      icon: '👁️',
      status: 'unlocked',
    },
    {
      id: 'circadian-sync',
      titleEn: 'Circadian Master',
      titleAr: 'سيد الإيقاع المداري',
      descEn: 'Achieved 8.2h deep REM sleep during orbital sunset',
      descAr: 'تحقيق 8.2 ساعة نوم عميق خلال الغروب المداري',
      icon: '🌙',
      status: 'progress',
    },
  ];

  return (
    <div className="bg-[#0E1524] border border-cyan-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl my-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              NASA-STD-3001 VOL 2
            </span>
            <span className="text-xs text-slate-400 font-mono">COUNTERMEASURE & STRENGTH ENGINE</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mt-1">
            {isAr
              ? 'منظومة ناسا للمقاومة البدنية وتحليلات اللياقة والمؤشرات الحيوية'
              : 'NASA Countermeasures & Advanced Biometrics Engine'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr
              ? 'تحليلات جهاز ARED، تتبع التعرق والأملاح الدقيقة، التنبؤ بالإجهاد، والأوسمة التحفيزية للطاقم'
              : 'ARED force velocity logging, microfluidic sweat analysis, injury-prevention logic, and gamified crew readiness.'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab('ared')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'ared'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'تمارين ARED' : 'ARED Resistance'}
          </button>
          <button
            onClick={() => setActiveTab('sweat')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'sweat'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'حساسات التعرق' : 'Sweat Biosensors'}
          </button>
          <button
            onClick={() => setActiveTab('hiit')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'hiit'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'تمارين HIIT' : 'HIIT Cardio'}
          </button>
          <button
            onClick={() => setActiveTab('gamification')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'gamification'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'أوسمة الجاهزية' : 'Crew Badges'}
          </button>
        </div>
      </div>

      {/* TAB 1: ARED RESISTANCE & STRENGTH FORECASTING */}
      {activeTab === 'ared' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block">{isAr ? 'إجمالي الحمل المحاكي اليومي:' : 'DAILY SIMULATED LOAD:'}</span>
              <span className="text-2xl font-black font-mono text-cyan-400 mt-1 block">18,450 kg</span>
              <span className="text-[11px] text-emerald-400 font-mono mt-0.5 block">+4.2% vs Earth baseline</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block">{isAr ? 'متوسط سرعة الدفع:' : 'MEAN FORCE VELOCITY:'}</span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">0.68 m/s</span>
              <span className="text-[11px] text-cyan-400 font-mono mt-0.5 block">Explosive power preserved</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block">{isAr ? 'معدل حماية كثافة العظام:' : 'BONE DENSITY RETENTION:'}</span>
              <span className="text-2xl font-black font-mono text-emerald-400 mt-1 block">99.1%</span>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">NASA-STD-3001 compliant</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block">{isAr ? 'تنبؤ الإجهاد العضلي:' : 'PREDICTIVE FATIGUE RISK:'}</span>
              <span className="text-2xl font-black font-mono text-amber-400 mt-1 block">LOW (18%)</span>
              <span className="text-[11px] text-amber-300 font-mono mt-0.5 block">Recommend +25g Leucine post-workout</span>
            </div>
          </div>

          {/* Exercise Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">{isAr ? 'التمرين المداري' : 'ARED EXERCISE'}</th>
                  <th className="p-3">{isAr ? 'الحمل الهوائي' : 'VACUUM LOAD'}</th>
                  <th className="p-3">{isAr ? 'المجموعات والتكرارات' : 'SETS & REPS'}</th>
                  <th className="p-3">{isAr ? 'سرعة الدفع' : 'PEAK VELOCITY'}</th>
                  <th className="p-3">{isAr ? 'المستهدف العظمي' : 'ANATOMICAL TARGET'}</th>
                  <th className="p-3">{isAr ? 'الحالة' : 'STATUS'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {aredExercises.map((ex, i) => (
                  <tr key={i} className="hover:bg-slate-900/80 transition-colors">
                    <td className="p-3 font-bold text-white font-sans">{isAr ? ex.nameAr : ex.nameEn}</td>
                    <td className="p-3 text-cyan-300 font-bold">{ex.loadKg} kg (1G equiv)</td>
                    <td className="p-3 text-slate-300">{ex.sets}</td>
                    <td className="p-3 text-slate-300">{ex.velocityMs}</td>
                    <td className="p-3 text-slate-400">{ex.boneTarget}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ex.trend === 'nominal' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {ex.trend.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SWEAT SENSORS & MICROFLUIDIC HYDRATION */}
      {activeTab === 'sweat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>{isAr ? 'مستشعر رقعة الجلد الذكية:' : 'MICROFLUIDIC SWEAT PATCH:'}</span>
                  <span className="text-cyan-400">ACTIVE RFID</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {isAr ? 'توازن الكهارل والأملاح الدقيقة' : 'Electrolyte Osmolarity Balance'}
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sodium (Na+):</span>
                    <span className="text-cyan-300 font-bold">54 mmol/L (Nominal)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Potassium (K+):</span>
                    <span className="text-cyan-300 font-bold">6.2 mmol/L (Optimal)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lactate Clearance:</span>
                    <span className="text-emerald-400 font-bold">2.1 mmol/L (Cleared)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                {isAr
                  ? 'التوصية السريرية: أضف كيس أملاح معدنية واحد لمياه الشرب القادمة.'
                  : 'Clinical suggestion: Add 1 mineral electrolyte pack to next drinking bulb.'}
              </div>
            </div>

            {/* Interactive Hydration Tracker */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>{isAr ? 'استهلاك المياه اليومي:' : 'DAILY WATER INTAKE:'}</span>
                  <span className="text-emerald-400 font-bold">{Math.round((waterIntakeMl / targetWaterMl) * 100)}%</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {waterIntakeMl} / {targetWaterMl} mL
                </h4>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden my-3">
                  <div
                    className="bg-cyan-500 h-full transition-all duration-500"
                    style={{ width: `${(waterIntakeMl / targetWaterMl) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400">
                  {isAr
                    ? 'في انعدام الجاذبية، تقل إشارة العطش الطبيعية بنسبة 20%، مما يستدعي التذكير الآلي المنتظم.'
                    : 'Thirst perception diminishes by 20% in microgravity; automated logging maintains vascular fluid volume.'}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setWaterIntakeMl((v) => Math.min(4000, v + 250))}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono hover:bg-cyan-400 transition-colors"
                >
                  +250 mL Drink
                </button>
                <button
                  onClick={() => setSaltPacketsAdded((v) => v + 1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 font-bold text-xs font-mono hover:bg-slate-700 transition-colors"
                >
                  + Electrolyte ({saltPacketsAdded})
                </button>
              </div>
            </div>

            {/* Circadian Lighting Schedule */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>{isAr ? 'جدول الإيقاع اليومي المداري:' : 'CIRCADIAN LIGHT SCHEDULE:'}</span>
                  <span className="text-amber-400 font-bold">16 SUNSETS/DAY</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {isAr ? 'حماية إفراز الميلاتونين' : 'Melatonin Photoperiod Sync'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr
                    ? 'يتم تبديل إضاءة كابينة المحطة آلياً إلى الطيف العنبري والأحمر (630 نانومتر) قبل موعد النوم بساعتين لتحفيز النوم العميق وتجديد الأنسجة العضلية.'
                    : 'Habitat lighting automatically shifts to 630nm red-shift spectrum 2 hours before rest to preserve natural melatonin secretion.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Current Phase:</span>
                <span className="text-emerald-400 font-bold">Orbital Dusk (Sleep Prep)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HIIT CARDIOVASCULAR CUSTOMIZER */}
      {activeTab === 'hiit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 block mb-1">PROGRAM A: 20-MIN TABATA CEVIS</span>
              <h4 className="text-base font-bold text-white mb-2">{isAr ? 'دراجة CEVIS المكثفة (طاقة هوائية قصوى)' : 'High-Intensity Ergometer Protocol'}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {isAr
                  ? '8 دورات: 20 ثانية سرعة قصوى (280 واط) تليها 10 ثوان راحة خفيفة. تحمي سعة الرئتين وتمنع تراجع ضخ الدم البطيني.'
                  : '8 cycles of 20s max output (280W) followed by 10s active recovery. Prevents left ventricular stroke volume decline.'}
              </p>
              <div className="text-xs font-mono text-slate-400">Est. VO2 Max: 48 mL/kg/min • Target HR: 155 bpm</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono text-emerald-400 block mb-1">PROGRAM B: T2 VIBRATION ISOLATED TREADMILL</span>
              <h4 className="text-base font-bold text-white mb-2">{isAr ? 'سير الجري المقاوم للاهتزاز T2' : 'T2 Bungee-Harnessed Interval Run'}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {isAr
                  ? 'تطبيق حمل بوزن 70% من وزن الجسم عبر أحزمة السحب الهوائي مع فترات تسارع وتباطؤ لحماية المفاصل والعظام.'
                  : 'Bungee harness pulls astronaut downward with 70% body weight. Calibrated impact shocks stimulate osteoblast bone deposition.'}
              </p>
              <div className="text-xs font-mono text-slate-400">Ground Reaction Force: 1.4G Peak • Duration: 35 min</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono text-amber-400 block mb-1">PROGRAM C: POST-EVA ACTIVE MOBILITY</span>
              <h4 className="text-base font-bold text-white mb-2">{isAr ? 'إطالة وتفريغ الضغط بعد السير في الفضاء' : 'Post-EVA Spinal Decompression & Stretch'}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {isAr
                  ? 'تمارين تمدد الأوتار والفقرات القطنية لتفريغ ضغط بدلة الفضاء القاسية وتخفيف التوتر العضلي في الكتفين واليدين.'
                  : 'Gentle spinal unloading and wrist flexor releases to counter EVA pressurized glove fatigue and lumbar strain.'}
              </p>
              <div className="text-xs font-mono text-slate-400">Active Recovery • Zero-G Flexibility: +12%</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GAMIFIED MISSION READINESS BADGES */}
      {activeTab === 'gamification' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400 block">{isAr ? 'نقاط جاهزية الطاقم المدارية:' : 'OVERALL CREW MISSION READINESS:'}</span>
              <span className="text-2xl font-black font-mono text-emerald-400">96.4% READINESS</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">{isAr ? 'أوسمة الإنجاز المحققة:' : 'BADGES UNLOCKED:'}</span>
              <span className="text-xl font-bold font-mono text-cyan-300">3 / 4 UNLOCKED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-xl border transition-all ${
                  b.status === 'unlocked'
                    ? 'bg-slate-950/90 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/50 border-slate-800 opacity-70'
                }`}
              >
                <div className="text-3xl mb-2">{b.icon}</div>
                <h5 className="text-sm font-bold text-white mb-1 font-sans">
                  {isAr ? b.titleAr : b.titleEn}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {isAr ? b.descAr : b.descEn}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={b.status === 'unlocked' ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {b.status === 'unlocked' ? (isAr ? 'مكتمل ✓' : 'COMPLETED ✓') : (isAr ? 'قيد الإنجاز (80%)' : 'IN PROGRESS (80%)')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
