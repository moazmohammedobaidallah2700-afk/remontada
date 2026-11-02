/**
 * 15 Spaceflight Health Parameters Monitoring Matrix
 * Covers all 15 parameters requested:
 * 1. Space radiation
 * 2. Heart rate & ECG
 * 3. Blood pressure
 * 4. Respiratory health & Rate
 * 5. Blood oxygen
 * 6. Immune system
 * 7. Skin temperature
 * 8. Body fluid changes
 * 9. Bone & muscle health
 * 10. Muscle Strength & Activity
 * 11. Sleep & Behavioural health
 * 12. Mood, stress & Cognitive Performance
 * 13. Physical activity
 * 14. Vision Changes (SANS)
 * 15. Nutrition & Hydration (Hydrogen)
 */

import React, { useState } from 'react';
import {
  ShieldAlert, Heart, Activity, Wind, Droplets, Shield,
  Thermometer, Waves, Dumbbell, Zap, Moon, Brain,
  Flame, Eye, Utensils, CheckCircle2, ChevronRight, X
} from 'lucide-react';
import { HealthMetric } from '../types';

interface HealthMatrixSectionProps {
  language: 'en' | 'ar';
}

export const HealthMatrixSection: React.FC<HealthMatrixSectionProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedMetric, setSelectedMetric] = useState<HealthMetric | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const metrics: HealthMetric[] = [
    {
      id: 'radiation',
      key: 'space-radiation',
      nameEn: 'Space Radiation (Galactic & SPE)',
      nameAr: 'إشعاع الفضاء (الأشعة الكونية والانفجارات الشمسية)',
      value: '21.4',
      unit: 'μSv/h',
      status: 'nominal',
      category: 'environmental',
      descriptionEn: 'Continuous cosmic ionizing radiation dosimetry tracking daily and cumulative career exposure limits under NASA HRP guidelines.',
      descriptionAr: 'رصد مستمر للجرعات الإشعاعية الكونية المسببة للتأين ومقارنتها بالحدود المهنية التراكمية لوكالة ناسا.',
      detailProtocolEn: 'Cumulative dose: 184.2 mSv. If solar particle event exceeds 100 μSv/h, crew retreats to storm shelter surrounded by water tanks.',
      detailProtocolAr: 'الجرعة التراكمية: 184.2 ملي سيفرت. في حال تجاوز الإشعاع 100 ميكرو سيفرت، يلجأ الطاقم لمقصورة العواصف المحاطة بخزانات المياه.',
      trend: 'stable',
    },
    {
      id: 'heart-rate-ecg',
      key: 'heart-rate-ecg',
      nameEn: 'Heart Rate & Vector ECG',
      nameAr: 'معدل ضربات القلب وتخطيط كهربية القلب (ECG)',
      value: '68',
      unit: 'BPM',
      status: 'optimal',
      category: 'cardiovascular',
      descriptionEn: 'Continuous Lead-II vectorcardiography with automated real-time arrhythmia, ectopic beat, and QT dispersion detection.',
      descriptionAr: 'تخطيط كهربائي مستمر عبر متجهات Lead-II مع كشف آلي لحظي لاضطرابات النبض وتشتت موجات QT.',
      detailProtocolEn: 'Sinus rhythm confirmed. Autonomic vagal tone stable with RMSSD of 68 ms.',
      detailProtocolAr: 'النبض الجيبي منتظم تماماً. التوازن العصبي المبهمي مستقر بمعدل تباين 68 مللي ثانية.',
      trend: 'stable',
    },
    {
      id: 'blood-pressure',
      key: 'blood-pressure',
      nameEn: 'Blood Pressure & Orthostatic Resetting',
      nameAr: 'ضغط الدم الشرياني والتكيف الانتصابي',
      value: '118/76',
      unit: 'mmHg',
      status: 'optimal',
      category: 'cardiovascular',
      descriptionEn: 'Mean arterial pressure (MAP) tracking with baroreceptor reflex resetting algorithms to prevent post-landing orthostatic intolerance.',
      descriptionAr: 'متابعة ضغط الدم الشرياني المتوسط وخوارزميات إعادة ضبط المستقبلات الضغطية لمنع هبوط الضغط الانتصابي.',
      detailProtocolEn: 'Mean arterial pressure 90 mmHg. Continue daily water and electrolyte loading prior to deceleration burns.',
      detailProtocolAr: 'متوسط الضغط الشرياني 90 مم زئبق. الالتزام بشرب محاليل الأملاح قبل مناورات الدخول في الجاذبية.',
      trend: 'stable',
    },
    {
      id: 'respiratory-rate',
      key: 'respiratory-rate',
      nameEn: 'Respiratory Health & Breathing Rate',
      nameAr: 'صحة ومعدل التنفس وسعة الرئة',
      value: '14',
      unit: 'BrPM',
      status: 'nominal',
      category: 'cardiovascular',
      descriptionEn: 'Acoustic pulmonary sound telemetry and tidal volume estimation assessing alveolar diffusion and airway resistance.',
      descriptionAr: 'استشعار صوتي للرئتين وتقدير الحجم المدي لقياس انتشار الأكسجين ومقاومة المسالك الهوائية في الكابينة.',
      detailProtocolEn: 'Estimated VO2 Max: 46 mL/kg/min. Clean air filtration scrubbing maintains nominal airway resistance.',
      detailProtocolAr: 'السعة القصوى للأكسجين 46 مل/كجم/دقيقة. فلاتر الهواء تعمل بكفاءة للحفاظ على خلو المقصورة من الجسيمات.',
      trend: 'stable',
    },
    {
      id: 'blood-oxygen',
      key: 'blood-oxygen',
      nameEn: 'Blood Oxygen Saturation (SpO2)',
      nameAr: 'تشبع الدم بالأكسجين (SpO2)',
      value: '99.4',
      unit: '%',
      status: 'optimal',
      category: 'cardiovascular',
      descriptionEn: 'Multi-wavelength reflective pulse oximetry monitoring microvascular oxygenation during resistive exercise and sleep.',
      descriptionAr: 'قياس التأكسج النبضي متعدد الأطوال الموجية لمراقبة الأوعية الدموية الدقيقة أثناء التمرين والنوم.',
      detailProtocolEn: 'Arterial oxygenation nominal. Habitat ppO2 maintained at 21.2 kPa.',
      detailProtocolAr: 'تأكسج الدم الشرياني مثالي. الضغط الجزئي للأكسجين في الكابينة مستقر عند 21.2 كيلو باسكال.',
      trend: 'stable',
    },
    {
      id: 'immune-system',
      key: 'immune-system',
      nameEn: 'Immune System & Cytokine Reactivity',
      nameAr: 'الجهاز المناعي واستجابة السيتوكينات',
      value: '7.8',
      unit: '×10⁹/L',
      status: 'nominal',
      category: 'metabolic',
      descriptionEn: 'Salivary cytokine biomarkers (IL-6, TNF-alpha) monitoring subclinical latent viral reactivation (EBV, VZV) induced by spaceflight stress.',
      descriptionAr: 'فحص مؤشرات السيتوكين في اللعاب لرصد إعادة تنشيط الفيروسات الكامنة الناتجة عن إجهاد السفر الفضائي.',
      detailProtocolEn: 'WBC count nominal. Prophylactic Vitamin D3 supplementation and probiotic rations active.',
      detailProtocolAr: 'تعداد كريات الدم البيضاء طبيعي. حصص فيتامين D3 والبروبيوتيك الوقائية مفعلة بانتظام.',
      trend: 'stable',
    },
    {
      id: 'skin-temperature',
      key: 'skin-temperature',
      nameEn: 'Skin Temperature & Thermal Regulation',
      nameAr: 'حرارة الجلد والتنظيم الحراري الداخلي',
      value: '34.2',
      unit: '°C',
      status: 'nominal',
      category: 'environmental',
      descriptionEn: 'Dual-channel heat-flux thermometry monitoring peripheral vasoconstriction inside EVA space suits and cabin sleeping quarters.',
      descriptionAr: 'استشعار تدفق الحرارة ثنائي القناة لمراقبة انقباض الأوعية الطرفية داخل بدلة الفضاء وأثناء النوم.',
      detailProtocolEn: 'Liquid Cooling and Ventilation Garment (LCVG) loop set to comfortable 18.5°C.',
      detailProtocolAr: 'مضخة بدلة التبريد السائل والتهوية LCVG تعمل عند درجة حرارة مريحة 18.5 مئوية.',
      trend: 'stable',
    },
    {
      id: 'body-fluid-changes',
      key: 'body-fluid-changes',
      nameEn: 'Body Fluid Changes (Cephalad Redistribution)',
      nameAr: 'تغيرات سوائل الجسم (انتقال السوائل للصدر والرأس)',
      value: '+18.2',
      unit: '% Thorax',
      status: 'warning',
      category: 'cardiovascular',
      descriptionEn: 'Bioelectrical impedance spectroscopy tracking cephalad interstitial fluid shift causing facial edema and leg volume reduction.',
      descriptionAr: 'التحليل الطيفي للمقاومة الكهربائية لرصد انتقال السوائل الرأسي نحو الصدر والوجه ونقص حجم الساقين.',
      detailProtocolEn: 'Recommend 45-min Lower Body Negative Pressure (LBNP) session at -35 mmHg to draw fluids back to lower extremities.',
      detailProtocolAr: 'يوصى بجلسة ضغط سلبي سفلي (LBNP) لمدة 45 دقيقة بضغط -35 مم زئبق لإعادة سحب السوائل للأطراف السفلية.',
      trend: 'rising',
    },
    {
      id: 'bone-muscle-health',
      key: 'bone-muscle-health',
      nameEn: 'Bone & Muscle Health (Mineral Density)',
      nameAr: 'صحة العظام والعضلات (الكثافة المعدنية)',
      value: '0.18',
      unit: '% Loss/mo',
      status: 'nominal',
      category: 'musculoskeletal',
      descriptionEn: 'Serum CTx and P1NP bone turnover biomarkers tracking osteoclast bone reabsorption rates in the hip, femur, and vertebrae.',
      descriptionAr: 'مؤشرات أيض العظام في الدم لتتبع نشاط خلايا هدم العظام في الحوض وعنق الفخذ والعمود الفقري.',
      detailProtocolEn: 'ARED axial loading has arrested loss rate from standard 1.2% down to nominal 0.18%/month.',
      detailProtocolAr: 'تمارين ARED الثقيلة نجحت في خفض معدل فقدان العظام من 1.2% شهرياً إلى 0.18% فقط.',
      trend: 'stable',
    },
    {
      id: 'muscle-strength',
      key: 'muscle-strength',
      nameEn: 'Muscle Strength & Neuromuscular Activity',
      nameAr: 'قوة ونشاط العضلات والانقباض الحركي',
      value: '228',
      unit: 'N·m Peak',
      status: 'optimal',
      category: 'musculoskeletal',
      descriptionEn: 'Electromyographic (EMG) load sensors in athletic garments recording isometric peak torque and motor recruitment during squats.',
      descriptionAr: 'حساسات التخطيط العضلي الكهربائي (EMG) في ملابس التمرين لقياس قوة العزم وتجنيد الألياف العضلية.',
      detailProtocolEn: 'Quadriceps force retention: 97.4% vs Earth baseline. Zero signs of myofibrillar atrophy.',
      detailProtocolAr: 'الاحتفاظ بقوة الفخذ: 97.4% مقارنة بالأرض. انعدام أي مؤشرات لضمور الألياف العضلية.',
      trend: 'stable',
    },
    {
      id: 'sleep-behavioural',
      key: 'sleep-behavioural',
      nameEn: 'Sleep & Behavioural Health (Circadian Waves)',
      nameAr: 'النوم والصحة السلوكية ودورات النوم العميق',
      value: '8.1',
      unit: 'Hours/cycle',
      status: 'optimal',
      category: 'neuropsych',
      descriptionEn: 'Polysomnographic sleep architecture analytics tracking REM sleep, slow-wave delta cycles, and microgravity sleep fragmentation.',
      descriptionAr: 'تحليل بنية النوم وتتبع مراحل نوم حركة العين السريعة (REM) وموجات دلتا البطيئة ومكافحة تقطع النوم.',
      detailProtocolEn: 'Deep sleep proportion: 24.5%. Cabin white-noise sound masking and 630nm red-shift lighting active.',
      detailProtocolAr: 'نسبة النوم العميق 24.5%. مؤثرات الضوضاء البيضاء وإضاءة التحول للأحمر 630 نانومتر تعمل بكفاءة.',
      trend: 'stable',
    },
    {
      id: 'mood-stress',
      key: 'mood-stress',
      nameEn: 'Mood, Stress & Cognitive Performance',
      nameAr: 'المزاج، التوتر النفسي والأداء الإدراكي',
      value: '94',
      unit: '/100 Index',
      status: 'optimal',
      category: 'neuropsych',
      descriptionEn: 'Psychomotor Vigilance Testing (PVT), speech acoustic sentiment analysis, and autonomic stress recovery score.',
      descriptionAr: 'اختبارات اليقظة الحركية النفسية (PVT)، وتحليل نبرة الصوت والمؤشرات النفسية المعرفية.',
      detailProtocolEn: 'Vigilance reaction speed: 232 ms (Nominal). No cognitive degradation or confinement depression detected.',
      detailProtocolAr: 'سرعة رد الفعل: 232 مللي ثانية. انعدام أي تراجع إدراكي أو اكتئاب مرتبط بالعزلة الفضائية.',
      trend: 'stable',
    },
    {
      id: 'physical-activity',
      key: 'physical-activity',
      nameEn: 'Physical Activity (Daily Exercise Quota)',
      nameAr: 'النشاط البدني والتمارين الرياضية اليومية',
      value: '135',
      unit: '/150 min',
      status: 'optimal',
      category: 'musculoskeletal',
      descriptionEn: 'High-frequency telemetry logging daily scheduled 2.5-hour countermeasure workout adherence across ARED and T2 treadmill.',
      descriptionAr: 'متابعة الالتزام بحصة التمارين الإلزامية المقررة يومياً (ساعتان ونصف) على أجهزة ARED ودراجة T2.',
      detailProtocolEn: 'Daily target 90% completed. Remaining: 15-min core abdominal zero-G stabilization workout.',
      detailProtocolAr: 'تم إنجاز 90% من الهدف اليومي. المتبقي: 15 دقيقة تمارين التوازن الجذعي في انعدام الوزن.',
      trend: 'rising',
    },
    {
      id: 'vision-changes',
      key: 'vision-changes',
      nameEn: 'Vision Changes (SANS Ocular Monitoring)',
      nameAr: 'تغيرات الرؤية العصبية البصرية (متلازمة SANS)',
      value: '5.2',
      unit: 'mm ONSD',
      status: 'nominal',
      category: 'neuropsych',
      descriptionEn: 'Optic nerve sheath diameter (ONSD) ultrasonography and optical coherence tomography (OCT) preventing retinal cotton-wool spots.',
      descriptionAr: 'فحص قطر غمد العصب البصري بالموجات فوق الصوتية وتصوير الشبكية المقطعي (OCT) لمنع بقع القطن الشبكية.',
      detailProtocolEn: 'ONSD within safe threshold (<5.8 mm). Visual acuity tested at 20/20 in both eyes.',
      detailProtocolAr: 'قطر العصب البصري ضمن الحدود الآمنة (<5.8 مم). حدة الإبصار 20/20 في كلتا العينين.',
      trend: 'stable',
    },
    {
      id: 'nutrition-hydrogen',
      key: 'nutrition-hydrogen',
      nameEn: 'Nutrition & Hydrogen (Electrolyte Balance)',
      nameAr: 'التغذية المتوازنة وشرب السوائل والترطيب',
      value: '2,850',
      unit: 'kCal/day',
      status: 'optimal',
      category: 'metabolic',
      descriptionEn: 'Metabolic intake logs tracking micro-nutrient absorption, sodium restriction (<2,000 mg/d), and hydrogen-rich antioxidant hydration.',
      descriptionAr: 'تتبع السعرات اليومية وامتصاص المغذيات الدقيقة وتقليل الصوديوم وشرب المياه الغنية بالمعادن ومضادات الأكسدة.',
      detailProtocolEn: 'Water balance: 2.8 L consumed. Urine specific gravity nominal at 1.015.',
      detailProtocolAr: 'توازن السوائل: 2.8 لتر مستهلك اليوم. الكثافة النوعية للترطيب مثالية عند 1.015.',
      trend: 'stable',
    },
  ];

  const filteredMetrics =
    filterCategory === 'all'
      ? metrics
      : metrics.filter((m) => m.category === filterCategory);

  return (
    <section id="health-matrix" className="py-16 bg-[#0E1524] border-t border-cyan-500/20 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              <span>NASA HUMAN RESEARCH ROADMAP</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
              {isAr ? 'مصفوفة الرصد الطبي الشامل (15 مؤشراً فسيولوجياً)' : 'Comprehensive 15-Parameter Health Monitoring Matrix'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr
                ? 'مراقبة كافة المتجهات الحيوية المطلوبة لرواد الفضاء مع بروتوكولات التدخل العلاجي الفوري'
                : 'Every critical aerospace physiological vector monitored with actionable clinical countermeasure triggers.'}
            </p>
          </div>

          {/* Filter category buttons */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {['all', 'cardiovascular', 'musculoskeletal', 'neuropsych', 'metabolic', 'environmental'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                  filterCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 15 Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMetrics.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMetric(item)}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/60 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
                    {item.category}
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      item.status === 'optimal'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : item.status === 'nominal'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {isAr ? item.nameAr : item.nameEn}
                </h3>

                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-2xl font-black font-mono text-white">
                    {item.value}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {item.unit}
                  </span>
                </div>

                <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed">
                  {isAr ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="text-[11px] text-slate-500">CLICK FOR PROTOCOL</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Metric Detail Modal */}
        {selectedMetric && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-xl bg-[#0E1524] border border-cyan-500/50 rounded-2xl p-6 md:p-8 shadow-2xl">
              <button
                onClick={() => setSelectedMetric(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                {selectedMetric.category} SUBSYSTEM
              </span>

              <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                {isAr ? selectedMetric.nameAr : selectedMetric.nameEn}
              </h3>

              <div className="flex items-baseline gap-2 my-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-3xl font-black font-mono text-cyan-300">
                  {selectedMetric.value}
                </span>
                <span className="text-sm font-mono text-slate-400">
                  {selectedMetric.unit}
                </span>
                <span className="text-xs font-mono text-emerald-400 ml-auto">
                  STATUS: {selectedMetric.status.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {isAr ? selectedMetric.descriptionAr : selectedMetric.descriptionEn}
              </p>

              <div className="p-4 rounded-xl bg-cyan-950/50 border border-cyan-500/40">
                <h4 className="text-xs font-mono font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? 'البروتوكول السريري المعتمد:' : 'Actionable Countermeasure Protocol:'}</span>
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {isAr ? selectedMetric.detailProtocolAr : selectedMetric.detailProtocolEn}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
