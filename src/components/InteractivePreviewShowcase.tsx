/**
 * Interactive Dashboard Preview Showcase
 * Features the requested 5 tabs:
 * 1. My Health Profile
 * 2. Medical Kit & Training
 * 3. Check My Health (Active by default)
 * 4. Emergency SOS (Red accent)
 * 5. Health History
 * With Step 1 of 3: Primary Symptoms ("How are you feeling right now?"),
 * Step 2: Biometric sensor telemetry import,
 * Step 3: Gemini AI diagnostic assessment.
 */

import React, { useState } from 'react';
import {
  User, ShieldPlus, Sparkles, ShieldAlert, Clock,
  ChevronRight, Activity, CheckCircle, RefreshCw, AlertTriangle
} from 'lucide-react';
import { AstronautProfile } from '../types';

interface InteractivePreviewShowcaseProps {
  language: 'en' | 'ar';
  activeAstronaut: AstronautProfile;
  onOpenSosModal: () => void;
}

export const InteractivePreviewShowcase: React.FC<InteractivePreviewShowcaseProps> = ({
  language,
  activeAstronaut,
  onOpenSosModal,
}) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'profile' | 'medkit' | 'check' | 'history'>('check');
  const [triageStep, setTriageStep] = useState<1 | 2 | 3>(1);
  const [selectedSymptom, setSelectedSymptom] = useState<string>('cephalad-headache');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const symptomPresets = [
    {
      id: 'cephalad-headache',
      titleEn: 'Headache & Facial Fullness (Fluid Shift)',
      titleAr: 'صداع واحتقان في الوجه (انتقال السوائل للرأس)',
    },
    {
      id: 'space-motion-sickness',
      titleEn: 'Space Motion Sickness (SMS) & Vestibular Nausea',
      titleAr: 'دوار الحركة الفضائية والغثيان الدهليزي',
    },
    {
      id: 'lumbar-pain',
      titleEn: 'Low Back Aches (Microgravity Spinal Elongation)',
      titleAr: 'ألم أسفل الظهر (استطالة العمود الفقري في انعدام الوزن)',
    },
    {
      id: 'sleep-disruption',
      titleEn: 'Insomnia & Circadian Desynchrony (Light Glare)',
      titleAr: 'أرق واضطراب النوم (تأثير الشروق المتكرر والتوهج)',
    },
  ];

  const handleRunDiagnosis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setTriageStep(3);
    }, 1200);
  };

  return (
    <section id="interactive-preview" className="py-16 bg-[#0E1524] border-t border-cyan-500/20 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            SIMULATED CREW TERMINAL
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
            {isAr ? 'لوحة تحكم رائد الفضاء — فحص الأعراض التفاعلي' : 'Interactive Dashboard Preview Showcase'}
          </h2>
        </div>

        {/* 5 Futuristic Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              activeTab === 'profile'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isAr ? 'ملفي الصحي' : 'My Health Profile'}</span>
          </button>

          <button
            onClick={() => setActiveTab('medkit')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              activeTab === 'medkit'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <ShieldPlus className="w-3.5 h-3.5" />
            <span>{isAr ? 'الحقيبة والتدريب' : 'Medical Kit & Training'}</span>
          </button>

          <button
            onClick={() => setActiveTab('check')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              activeTab === 'check'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>{isAr ? 'افحص صحتي (نشط)' : 'Check My Health (Active)'}</span>
          </button>

          <button
            onClick={onOpenSosModal}
            className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white border border-rose-500 shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span>{isAr ? 'طوارئ SOS' : 'Emergency SOS'}</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              activeTab === 'history'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isAr ? 'السجل الطبي' : 'Health History'}</span>
          </button>
        </div>

        {/* Tab 1: Profile View */}
        {activeTab === 'profile' && (
          <div className="bg-[#0C121E] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {isAr ? 'بيانات رائد الفضاء الأساسية' : 'Astronaut Physical Profile'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">CALL-SIGN / ID</span>
                <span className="text-white font-bold">{activeAstronaut.name} ({activeAstronaut.id})</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">MISSION DURATION</span>
                <span className="text-cyan-300 font-bold">{activeAstronaut.missionDurationDays} Flight Days</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">CUMULATIVE DOSIMETRY</span>
                <span className="text-amber-400 font-bold">{activeAstronaut.radiationCumulativeMsv} mSv</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Medical Kit View */}
        {activeTab === 'medkit' && (
          <div className="bg-[#0C121E] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {isAr ? 'صيدلية المركبة الذكية (RFID Locker)' : 'Onboard Smart Pharmacy Locker'}
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-3 rounded bg-slate-950 border border-slate-800">
                <span>Promethazine (Motion Sickness)</span>
                <span className="text-emerald-400">18/20 doses • 420 days left</span>
              </div>
              <div className="flex justify-between p-3 rounded bg-slate-950 border border-slate-800">
                <span>Electrolyte Rehydration Salts</span>
                <span className="text-emerald-400">45 packs in stock</span>
              </div>
              <div className="flex justify-between p-3 rounded bg-slate-950 border border-slate-800">
                <span>Morphine Sulfate 10mg Auto-Injector</span>
                <span className="text-cyan-300">Locked • Emergency Key Required</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Check My Health 3-Step Triage */}
        {activeTab === 'check' && (
          <div className="bg-[#0C121E] border border-cyan-500/40 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 text-xs font-mono">
              <span className={`font-bold ${triageStep === 1 ? 'text-cyan-400' : 'text-slate-500'}`}>
                1. {isAr ? 'الأعراض الأساسية' : 'PRIMARY SYMPTOMS'}
              </span>
              <span className="text-slate-700">──</span>
              <span className={`font-bold ${triageStep === 2 ? 'text-cyan-400' : 'text-slate-500'}`}>
                2. {isAr ? 'استيراد الحساسات' : 'SENSOR IMPORT'}
              </span>
              <span className="text-slate-700">──</span>
              <span className={`font-bold ${triageStep === 3 ? 'text-cyan-400' : 'text-slate-500'}`}>
                3. {isAr ? 'التشخيص والعلاج' : 'AI DIAGNOSIS'}
              </span>
            </div>

            {/* STEP 1: How are you feeling right now? */}
            {triageStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {isAr ? 'الخطوة 1 من 3: كيف تشعر الآن؟' : 'STEP 1 OF 3: PRIMARY SYMPTOMS — "How are you feeling right now?"'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isAr
                    ? 'اختر العرض الأكثر وضوحاً لتقوم الدكتورة أسترا بتحليله مع القياسات الحيوية.'
                    : 'Select your primary symptom for immediate cross-referencing with live telemetry.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {symptomPresets.map((sym) => (
                    <button
                      key={sym.id}
                      onClick={() => setSelectedSymptom(sym.id)}
                      className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                        selectedSymptom === sym.id
                          ? 'border-cyan-400 bg-cyan-950/60 text-white font-bold shadow-md shadow-cyan-500/20'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-sm font-sans block">{isAr ? sym.titleAr : sym.titleEn}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setTriageStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 cursor-pointer"
                  >
                    <span>{isAr ? 'المتابعة للخطوة 2 (الحساسات) ←' : 'Proceed to Step 2 (Sensors) →'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Biometric Sensor Telemetry Import */}
            {triageStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {isAr ? 'الخطوة 2 من 3: استيراد بيانات الحساسات البيومترية' : 'STEP 2 OF 3: BIOMETRIC SENSOR TELEMETRY IMPORT'}
                </h3>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Heart Rate Stream:</span>
                    <span className="text-rose-400 font-bold">68 BPM (Synchronized)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Thoracic Fluid Shift:</span>
                    <span className="text-amber-400 font-bold">+18.2% Interstitial Displacement</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Optic Nerve Sheath:</span>
                    <span className="text-cyan-300 font-bold">5.2 mm (Borderline Threshold)</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setTriageStep(1)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
                  >
                    ← Back
                  </button>

                  <button
                    onClick={handleRunDiagnosis}
                    disabled={isAnalyzing}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Analyzing Telemetry...</span>
                      </>
                    ) : (
                      <>
                        <span>{isAr ? 'توليد التشخيص السريري بذكاء Gemini' : 'Generate Gemini AI Diagnosis'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Gemini AI Diagnostic Guidance */}
            {triageStep === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-1">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>GEMINI SPACE-MED CLINICAL ASSESSMENT</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {isAr
                      ? 'التشخيص: احتقان رأسي ناتج عن انعدام الجاذبية (Cephalad Fluid Shift)'
                      : 'Diagnosis: Microgravity Cephalad Fluid Redistribution & Optic Sheath Congestion'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                    {isAr
                      ? 'تم تأكيد التكيف الفسيولوجي مع انعدام الوزن. انتقال الدماء والسوائل نحو الجزء العلوي من الجسم يسبب الضغط خلف العين والصداع الخفيف.'
                      : 'Telemetry confirms acute cephalad blood volume redistribution. Intracranial fluid balance is elevated, causing optic sheath engorgement and tension headache.'}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-emerald-300 space-y-1 font-mono">
                    <div className="font-bold">Recommended Countermeasures:</div>
                    <div>1. Execute 45-min Lower Body Negative Pressure (LBNP) cycle at -35 mmHg.</div>
                    <div>2. Administer 300 mL electrolyte mineral fluid to stabilize vascular volume.</div>
                    <div>3. Perform 15-min nature relaxation with ocean soundscapes to lower sympathetic tone.</div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setTriageStep(1)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono hover:text-white"
                  >
                    {isAr ? 'بدء فحص جديد' : 'New Triage Session'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Health History */}
        {activeTab === 'history' && (
          <div className="bg-[#0C121E] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2 text-xs font-mono">
            <h3 className="text-lg font-bold text-white mb-3">
              {isAr ? 'سجل الفحوصات الطبية السابقة' : 'Flight Triage Longitudinal Log'}
            </h3>
            <div className="flex justify-between p-3 rounded bg-slate-950 border border-slate-800">
              <span>Flight Day 41: Routine Post-EVA Arrhythmia Check</span>
              <span className="text-emerald-400">RESOLVED</span>
            </div>
            <div className="flex justify-between p-3 rounded bg-slate-950 border border-slate-800">
              <span>Flight Day 38: SANS Optic Ultrasound (5.1 mm)</span>
              <span className="text-emerald-400">NOMINAL</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
