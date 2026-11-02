/**
 * Interactive Astronaut Body Map & Health Visualizer
 * Inspired by NASA Space Apps Challenge winner projects:
 * Tapping a body part displays real-time microgravity telemetry,
 * localized muscle fatigue, spinal elongation (+5cm), SANS optic edema,
 * and cardiovascular blood shift.
 */

import React, { useState } from 'react';
import {
  Activity, Eye, Heart, Shield, Sparkles, AlertCircle,
  TrendingDown, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';

interface BodyPartData {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  status: 'nominal' | 'warning' | 'alert';
  metric: string;
  detailEn: string;
  detailAr: string;
  countermeasureEn: string;
  countermeasureAr: string;
  coordinates: { x: number; y: number }; // Percentage on SVG body map
}

interface InteractiveBodyMapProps {
  language: 'en' | 'ar';
}

export const InteractiveBodyMap: React.FC<InteractiveBodyMapProps> = ({ language }) => {
  const isAr = language === 'ar';

  const bodyParts: BodyPartData[] = [
    {
      id: 'head-eyes',
      nameEn: 'Optic Nerve & Cranial Pressure (SANS)',
      nameAr: 'العصب البصري والضغط القحفي (متلازمة SANS)',
      category: 'Neuro-Ocular',
      status: 'warning',
      metric: 'ONSD: 5.4 mm | IOP: 17 mmHg',
      detailEn: 'Microgravity cephalad fluid shift increases intracranial and retrobulbar pressure, causing mild papilledema and hyperopic shifts.',
      detailAr: 'انتقال سوائل الجسم نحو الرأس في انعدام الوزن يرفع الضغط خلف العين مسبباً وذمة حليمة العصب البصري وتشوش النظر.',
      countermeasureEn: 'Apply Lower Body Negative Pressure (LBNP) for 45 min; perform retinal OCT scans.',
      countermeasureAr: 'استخدام حجرة الضغط السلبي السفلي (LBNP) لمدة 45 دقيقة مع فحص قاع العين المقطعي.',
      coordinates: { x: 50, y: 12 },
    },
    {
      id: 'cardiovascular',
      nameEn: 'Heart & Cardiovascular System',
      nameAr: 'القلب والدورة الدموية المركزية',
      category: 'Hemodynamic',
      status: 'nominal',
      metric: 'HR: 68 bpm | BP: 118/76 | Stroke Vol: 78 mL',
      detailEn: 'Absence of hydrostatic pressure gradient reduces cardiac workload, leading to 8-10% left ventricular mass remodeling over 6 months.',
      detailAr: 'غياب الجاذبية الأرضية يقلل الجهد المطلوب لضخ الدم للأطراف مما قد يؤدي لضمور بطيني بنسبة 8-10% إذا لم يتم تطبيق التمارين.',
      countermeasureEn: 'Daily 30-min high-intensity interval training (HIIT) on CEVIS cycle ergometer.',
      countermeasureAr: 'تمارين يومية مكثفة (HIIT) لمدة 30 دقيقة على دراجة CEVIS المزودة بنظام عزل الاهتزاز.',
      coordinates: { x: 50, y: 28 },
    },
    {
      id: 'spine-lumbar',
      nameEn: 'Spine & Lumbar Column (+5cm Elongation)',
      nameAr: 'العمود الفقري والفقرات القطنية (استطالة +5 سم)',
      category: 'Musculoskeletal',
      status: 'warning',
      metric: 'Elongation: +4.8 cm | Paraspinal Tone: -14%',
      detailEn: 'Intervertebral discs absorb fluid and decompress without gravity, lengthening the spine by up to 5-7 cm and inducing low back pain.',
      detailAr: 'تمتص الغضاريف الفقرية السوائل وتتوسع في غياب الجاذبية، مما يزيد طول رائد الفضاء بمقدار 5-7 سم ويسبب ألم أسفل الظهر.',
      countermeasureEn: 'ARED axial loading (deadlift 120kg equivalent); fetal position tucking during sleep.',
      countermeasureAr: 'تمارين رفع الأثقال المحورية ARED لمحاكاة الجاذبية؛ والنوم بوضعية الجنين لتقليل الشد.',
      coordinates: { x: 50, y: 44 },
    },
    {
      id: 'quads-thighs',
      nameEn: 'Quadriceps & Femoral Bone Mass',
      nameAr: 'عضلات الفخذ الأمامية وكثافة عظم الفخذ',
      category: 'Resistive Power',
      status: 'nominal',
      metric: 'Peak Torque: 210 N·m | Bone Loss: 0.2%/mo',
      detailEn: 'Type-I slow-twitch antigravity postural fibers atrophy first without constant standing resistance.',
      detailAr: 'ألياف العضلات البطيئة المقاومة للجاذبية هي أول ما يتعرض للضمور دون تمارين المقاومة المستمرة.',
      countermeasureEn: 'ARED barbell back squats (4 sets of 10 reps at 135kg simulated loading) 3x weekly.',
      countermeasureAr: 'تمارين القرفصاء الثقيلة على جهاز ARED (4 مجموعات × 10 تكرارات بوزن 135 كجم معادل).',
      coordinates: { x: 42, y: 65 },
    },
    {
      id: 'calves-achilles',
      nameEn: 'Soleus / Calves & "Bird Legs" Fluid Shift',
      nameAr: 'عضلات السمانة والكاحل وظاهرة "أرجل الطائر"',
      category: 'Fluid Balance',
      status: 'nominal',
      metric: 'Calf Volume: -11% | Achilles Tendon Stiffness: Nominal',
      detailEn: 'Blood and interstitial fluids migrate from the lower extremities to the upper thorax, thinning the legs significantly.',
      detailAr: 'انتقال الدماء وسوائل الأنسجة من الساقين نحو الصدر يؤدي إلى نحافة ملحوظة في الساقين وتورم خفيف بالوجه.',
      countermeasureEn: 'Calf-raise block on ARED; high-intensity jumping drills on T2 vibration treadmill.',
      countermeasureAr: 'تمارين رفع الكعب على ARED وتمارين الوثب المتكرر على سير الجري T2 المقاوم للاهتزاز.',
      coordinates: { x: 40, y: 84 },
    },
  ];

  const [selectedPart, setSelectedPart] = useState<BodyPartData>(bodyParts[0]);

  return (
    <div className="bg-[#0E1524] border border-cyan-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              NASA SPACE APPS TRACK
            </span>
            <span className="text-xs text-slate-400 font-mono">3D CREW ANATOMICAL RADAR</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mt-1">
            {isAr ? 'الخريطة الحيوية التفاعلية لجسد رائد الفضاء' : 'Interactive Astronaut Anatomical Health Visualizer'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr
              ? 'اضغط على أي جزء من الجسد (الرأس، القلب، العمود الفقري، الفخذين، الساقين) لعرض القياسات اللحظية والبروتوكول العلاجي'
              : 'Tap any body region to display localized microgravity biomechanics, atrophy risk, and NASA-STD-3001 countermeasures.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Anatomical Astronaut Silhouette Map */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800 relative">
          <div className="relative w-64 h-[420px] flex items-center justify-center">
            {/* Holographic grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

            {/* Futuristic Astronaut Silhouette SVG */}
            <svg viewBox="0 0 200 400" className="w-full h-full text-slate-700/60 drop-shadow">
              {/* Helmet & Head */}
              <circle cx="100" cy="48" r="32" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
              <path d="M78 45 Q100 32 122 45 Q126 62 100 68 Q74 62 78 45 Z" fill="#0C4A6E" opacity="0.7" stroke="#38BDF8" strokeWidth="1.5" />

              {/* Neck & Torso */}
              <path d="M88 78 L72 105 L66 180 L85 188 L100 190 L115 188 L134 180 L128 105 L112 78 Z" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
              {/* Chest Pack */}
              <rect x="82" y="105" width="36" height="50" rx="4" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" opacity="0.8" />

              {/* Spine Line */}
              <line x1="100" y1="80" x2="100" y2="185" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" opacity="0.7" />

              {/* Arms */}
              <path d="M70 108 L45 160 L38 210" fill="none" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
              <path d="M130 108 L155 160 L162 210" fill="none" stroke="#475569" strokeWidth="12" strokeLinecap="round" />

              {/* Pelvis & Legs */}
              <path d="M80 188 L72 270 L65 350 L58 375" fill="none" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
              <path d="M120 188 L128 270 L135 350 L142 375" fill="none" stroke="#334155" strokeWidth="16" strokeLinecap="round" />

              {/* Boots */}
              <rect x="46" y="365" width="26" height="14" rx="3" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
              <rect x="128" y="365" width="26" height="14" rx="3" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
            </svg>

            {/* Interactive Pulse Hotspots */}
            {bodyParts.map((part) => {
              const isSelected = selectedPart.id === part.id;
              let dotColor = 'bg-cyan-400';
              if (part.status === 'warning') dotColor = 'bg-amber-400';
              if (part.status === 'alert') dotColor = 'bg-rose-500';

              return (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-all group z-20 ${
                    isSelected ? 'scale-125' : 'hover:scale-115'
                  }`}
                  style={{ left: `${part.coordinates.x}%`, top: `${part.coordinates.y}%` }}
                  title={isAr ? part.nameAr : part.nameEn}
                >
                  <span className={`absolute inset-0 rounded-full ${dotColor} animate-ping opacity-60`} />
                  <span
                    className={`relative block w-4 h-4 rounded-full border-2 border-slate-950 ${dotColor} shadow-[0_0_12px_rgba(6,182,212,0.8)]`}
                  />
                  <span className="sr-only">{part.nameEn}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-slate-400 mt-2">
            {isAr ? 'اضغط على النقاط المضيئة لاستكشاف العضو' : 'CLICK PULSING HOTSPOTS TO INSPECT BIOMECHANICS'}
          </span>
        </div>

        {/* Right: Detailed Physiological Telemetry & Countermeasure Card */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 relative">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                  {selectedPart.category} SUBSYSTEM
                </span>
                <h4 className="text-xl font-black text-white mt-0.5">
                  {isAr ? selectedPart.nameAr : selectedPart.nameEn}
                </h4>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-700">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedPart.status === 'warning'
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-emerald-400'
                  }`}
                />
                <span className={selectedPart.status === 'warning' ? 'text-amber-300' : 'text-emerald-300'}>
                  {selectedPart.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Telemetry Metric Readout */}
            <div className="my-4 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                {isAr ? 'القياس اللحظي الفضائي:' : 'ACTIVE TELEMETRY VECTOR:'}
              </span>
              <span className="text-sm font-mono font-black text-cyan-300">
                {selectedPart.metric}
              </span>
            </div>

            {/* Physiological Microgravity Impact */}
            <div className="mb-4">
              <h5 className="text-xs font-mono font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isAr ? 'التأثير الفسيولوجي لانعدام الجاذبية:' : 'Microgravity Pathophysiology:'}</span>
              </h5>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isAr ? selectedPart.detailAr : selectedPart.detailEn}
              </p>
            </div>

            {/* Prescribed Countermeasure */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
              <h5 className="text-xs font-mono font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isAr ? 'البروتوكول العلاجي المعتمد (NASA-STD-3001):' : 'NASA-STD-3001 Countermeasure Protocol:'}</span>
              </h5>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {isAr ? selectedPart.countermeasureAr : selectedPart.countermeasureEn}
              </p>
            </div>
          </div>

          {/* Quick-Select Buttons for All 5 Regions */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {bodyParts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPart(p)}
                className={`px-3 py-2 rounded-xl text-center border text-xs font-mono transition-all ${
                  selectedPart.id === p.id
                    ? 'border-cyan-400 bg-cyan-950/70 text-cyan-200 font-bold'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {p.category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
