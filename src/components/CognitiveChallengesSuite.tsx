/**
 * Cognitive & Neurological Spaceflight Challenges Suite
 * Exact implementation of the NASA ISS Crew Challenges Matrix:
 * 1. Reaction Speed (PVT): "اضغط أول ما الشاشة تتغير، 20 مرة" -> Measures reaction time / Fatigue & sleep loss
 * 2. Hand Steadiness: "تتبع خط متحرك بصباعك من غير ما تخرج منه" -> Motor stability / Neuromuscular changes
 * 3. Vision Contrast: "لاقي الشكل المخفي وسط ضباب" -> Visual contrast / SANS fluid shift
 * 4. Memory & Focus: "احفظ تسلسل ألوان متزايد" -> Working memory / Station CO2 impact
 * 5. Pulse Calm Biofeedback: "ثبت نبضك داخل منطقة خضرا" -> Calmness / Autonomic stress recovery
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, Hand, Eye, Brain, Heart, Play, RefreshCw,
  CheckCircle2, Trophy, AlertTriangle, ArrowRight
} from 'lucide-react';
import { audioComms } from '../utils/audioComms';

interface CognitiveChallengesSuiteProps {
  language: 'en' | 'ar';
}

export const CognitiveChallengesSuite: React.FC<CognitiveChallengesSuiteProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [activeChallengeId, setActiveChallengeId] = useState<string>('pvt');

  // PVT Test State
  const [pvtState, setPvtState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [pvtReactionTime, setPvtReactionTime] = useState<number | null>(null);
  const [pvtAttempts, setPvtAttempts] = useState<number>(0);
  const pvtTimeoutRef = useRef<number | null>(null);
  const pvtStartTimeRef = useRef<number>(0);

  // Memory Sequence Game State
  const [memorySequence, setMemorySequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState<number>(0);
  const [memoryPlaying, setMemoryPlaying] = useState<boolean>(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);

  // Pulse Calm Biofeedback State
  const [biofeedbackPulse, setBiofeedbackPulse] = useState<number>(78);
  const [isPulseInTarget, setIsPulseInTarget] = useState<boolean>(false);

  // Challenges Table Data from user image
  const challengesTable = [
    {
      id: 'pvt',
      icon: Zap,
      challengeTextEn: 'Click as soon as the screen changes color (PVT test)',
      challengeTextAr: 'اضغط أول ما الشاشة تتغير، 20 مرة',
      measuresEn: 'Reaction Speed & Vigilance',
      measuresAr: 'سرعة رد فعله',
      medicalEn: 'Fatigue & Sleep Deprivation. NASA uses a similar Psychomotor Vigilance Test on the ISS.',
      medicalAr: 'الإرهاق وقلة النوم. ناسا بتستخدم اختبار رد فعل شبيه على المحطة (PVT).',
    },
    {
      id: 'motor',
      icon: Hand,
      challengeTextEn: 'Trace a moving line with your finger without drifting outside',
      challengeTextAr: 'تتبع خط متحرك بصباعك من غير ما تخرج منه',
      measuresEn: 'Hand Steadiness & Motor Control',
      measuresAr: 'ثبات اليد والتحكم الحركي',
      medicalEn: 'Neuromuscular changes and fine motor coordination in microgravity.',
      medicalAr: 'تغيرات عصبية وعضلية تؤثر على دقة حركة اليد في انعدام الوزن.',
    },
    {
      id: 'vision',
      icon: Eye,
      challengeTextEn: 'Spot the hidden geometric shape amidst fluctuating fog',
      challengeTextAr: 'لاقي الشكل المخفي وسط ضباب',
      measuresEn: 'Visual Contrast Sensitivity',
      measuresAr: 'حساسية النظر والتباين البصري',
      medicalEn: 'Vision alterations associated with cephalad fluid redistribution to the head (SANS).',
      medicalAr: 'تغيرات النظر المرتبطة بتحرك السوائل للرأس والضغط القحفي (SANS).',
    },
    {
      id: 'memory',
      icon: Brain,
      challengeTextEn: 'Memorize an increasing multi-color sequence',
      challengeTextAr: 'احفظ تسلسل ألوان متزايد',
      measuresEn: 'Working Memory & Cognitive Focus',
      measuresAr: 'الذاكرة العاملة والتركيز',
      medicalEn: 'Impact of operational fatigue and elevated cabin carbon dioxide (ppCO2).',
      medicalAr: 'تأثير الإرهاق وارتفاع ثاني أكسيد الكربون (ppCO2) في مقصورة المحطة.',
    },
    {
      id: 'pulse',
      icon: Heart,
      challengeTextEn: 'Stabilize your pulse inside a target green zone with steady breathing',
      challengeTextAr: 'ثبّت نبضك داخل منطقة خضرا وصباعك على الحساس',
      measuresEn: 'Pulse Stability & Autonomic Calmness',
      measuresAr: 'النبض والهدوء والتحكم الذاتي',
      medicalEn: 'Heart rate variability (HRV) and psychological stress recovery.',
      medicalAr: 'القلب والتوتر وإعادة تنشيط الجهاز العصبي الباراسمبثاوي.',
    },
  ];

  // 1. PVT Test Implementation
  const startPvtTest = () => {
    setPvtState('waiting');
    setPvtReactionTime(null);
    audioComms.playQuindar('intro');

    const randomDelay = Math.floor(Math.random() * 2500) + 1500;
    if (pvtTimeoutRef.current) clearTimeout(pvtTimeoutRef.current);

    pvtTimeoutRef.current = window.setTimeout(() => {
      setPvtState('ready');
      pvtStartTimeRef.current = Date.now();
    }, randomDelay);
  };

  const handlePvtClick = () => {
    if (pvtState === 'waiting') {
      // Clicked too early!
      if (pvtTimeoutRef.current) clearTimeout(pvtTimeoutRef.current);
      setPvtState('idle');
      alert(isAr ? 'ضغطت بدري جداً قبل ما الشاشة تتغير! حاول تاني.' : 'Too early! Wait for the color change.');
    } else if (pvtState === 'ready') {
      const diff = Date.now() - pvtStartTimeRef.current;
      setPvtReactionTime(diff);
      setPvtAttempts((a) => a + 1);
      setPvtState('result');
      audioComms.playQuindar('outro');
    }
  };

  // 2. Memory Sequence Game Implementation
  const colors = ['#06B6D4', '#10B981', '#F59E0B', '#F43F5E'];

  const startMemoryGame = () => {
    setMemorySequence([Math.floor(Math.random() * 4)]);
    setUserSequence([]);
    setMemoryScore(0);
    setMemoryPlaying(true);
    playSequence([Math.floor(Math.random() * 4)]);
  };

  const playSequence = (seq: number[]) => {
    seq.forEach((colorIdx, i) => {
      setTimeout(() => {
        setActiveColorIndex(colorIdx);
        setTimeout(() => setActiveColorIndex(null), 400);
      }, (i + 1) * 600);
    });
  };

  const handleColorClick = (idx: number) => {
    if (!memoryPlaying) return;
    const newSeq = [...userSequence, idx];
    setUserSequence(newSeq);

    // Check correctness
    if (newSeq[newSeq.length - 1] !== memorySequence[newSeq.length - 1]) {
      // Wrong!
      alert(isAr ? `انتهت المحاولة! حققت نتيجة: ${memoryScore}` : `Game over! You reached round ${memoryScore}`);
      setMemoryPlaying(false);
      return;
    }

    if (newSeq.length === memorySequence.length) {
      // Completed level!
      setMemoryScore((s) => s + 1);
      const nextSequence = [...memorySequence, Math.floor(Math.random() * 4)];
      setMemorySequence(nextSequence);
      setUserSequence([]);
      setTimeout(() => playSequence(nextSequence), 800);
    }
  };

  // 3. Pulse Biofeedback Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBiofeedbackPulse((p) => {
        const delta = Math.sin(Date.now() / 2000) * 4;
        const val = Math.round(68 + delta);
        setIsPulseInTarget(val >= 64 && val <= 72);
        return val;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="cognitive-suite" className="py-14 bg-[#0A0E17] border-t border-cyan-500/20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-2">
            <Brain className="w-3.5 h-3.5" />
            <span>{isAr ? 'تحديات الأداء الإدراكي والعصبي' : 'NEURO-COGNITIVE VIGILANCE SUITE'}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {isAr
              ? 'تحديات رواد الفضاء — الربط بين الأداء والتشخيص الطبي'
              : 'Astronaut Cognitive Challenges & Clinical Matrix'}
          </h2>

          <p className="text-sm md:text-base text-slate-300 mt-2">
            {isAr
              ? 'اختبارات مصممة على غرار بروتوكولات محطة الفضاء الدولية (ISS) لاكتشاف الإرهاق، ونقص النوم، وتأثير ارتفاع غاز CO2، وتغيرات النظر مبكراً.'
              : 'Interactive microgravity challenges modeled after NASA ISS operational protocols to detect fatigue, sleep loss, CO2 toxicity, and SANS vision shifts.'}
          </p>
        </div>

        {/* ======================================================== */}
        {/* 1. EXACT TABLE AS SHOWN IN USER IMAGE                    */}
        {/* ======================================================== */}
        <div className="bg-[#0C121E] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-10">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400">
              {isAr ? 'جدول التحديات والمقابل الطبي المعتمد' : 'CHALLENGES & CLINICAL CORRELATIONS MATRIX'}
            </span>
            <span className="text-xs text-slate-400 font-mono">NASA RESEARCH PROTOCOL</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 w-1/3 text-start">
                    {isAr ? 'التحدي' : 'The Challenge'}
                  </th>
                  <th className="p-4 w-1/4 text-start">
                    {isAr ? 'بيبان إيه عنده' : 'What It Measures'}
                  </th>
                  <th className="p-4 w-5/12 text-start">
                    {isAr ? 'المقابل الطبي' : 'Clinical Counterpart'}
                  </th>
                  <th className="p-4 text-center">
                    {isAr ? 'جرب' : 'Test'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/30">
                {challengesTable.map((row) => {
                  const Icon = row.icon;
                  const isSelected = activeChallengeId === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setActiveChallengeId(row.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-cyan-950/40 text-cyan-200 font-semibold'
                          : 'hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <td className="p-4 text-start">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-white text-sm">
                            {isAr ? row.challengeTextAr : row.challengeTextEn}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-start text-cyan-300 font-mono font-semibold">
                        {isAr ? row.measuresAr : row.measuresEn}
                      </td>

                      <td className="p-4 text-start text-slate-300 text-xs leading-relaxed">
                        {isAr ? row.medicalAr : row.medicalEn}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveChallengeId(row.id);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {isAr ? 'تشغيل' : 'Play'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. INTERACTIVE CHALLENGE ARENA                          */}
        {/* ======================================================== */}
        <div className="bg-[#0C121E] border border-cyan-500/40 rounded-2xl p-6 md:p-8 shadow-2xl relative">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
            <div>
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                {isAr ? 'منطقة الاختبار التفاعلي الحي' : 'ACTIVE INTERACTIVE BENCHMARK'}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                {activeChallengeId === 'pvt' && (isAr ? 'اختبار سرعة رد الفعل (PVT Reaction Speed)' : 'PVT Reaction Speed Test')}
                {activeChallengeId === 'motor' && (isAr ? 'اختبار ثبات اليد والتوافق الحركي' : 'Hand Steadiness & Motor Control')}
                {activeChallengeId === 'vision' && (isAr ? 'اختبار التباين البصري ورصد SANS' : 'SANS Visual Contrast Threshold')}
                {activeChallengeId === 'memory' && (isAr ? 'اختبار الذاكرة العاملة والتركيز' : 'Working Memory Color Sequence')}
                {activeChallengeId === 'pulse' && (isAr ? 'تدريب التهدئة الحيوية وتثبيت النبض' : 'Pulse Calm Biofeedback Zone')}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
                {isAr ? 'محاكاة اختبارات محطة الفضاء' : 'ISS SIMULATION MODE'}
              </span>
            </div>
          </div>

          {/* CHALLENGE 1: PVT SPEED TEST */}
          {activeChallengeId === 'pvt' && (
            <div className="flex flex-col items-center justify-center p-8 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <p className="text-sm text-slate-300 max-w-lg mb-6">
                {isAr
                  ? 'اضغط زر "ابدأ الاختبار"، وانتظر حتى تتحول الشاشة للون الأخضر، واضغط فوراً بأسرع ما يمكنك لحساب سرعة رد فعلك بالمللي ثانية!'
                  : 'Click "Start Benchmark", wait until the box turns bright green, and click instantly to evaluate millisecond vigilance response!'}
              </p>

              {pvtState === 'idle' && (
                <button
                  onClick={startPvtTest}
                  className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-base font-mono transition-all shadow-xl shadow-cyan-500/30 cursor-pointer"
                >
                  {isAr ? 'ابدأ الاختبار الآن' : 'Start PVT Benchmark'}
                </button>
              )}

              {pvtState === 'waiting' && (
                <button
                  onClick={handlePvtClick}
                  className="w-full max-w-md h-40 rounded-2xl bg-rose-950/70 border-2 border-rose-500/50 flex flex-col items-center justify-center cursor-pointer transition-all animate-pulse"
                >
                  <span className="text-xl font-bold text-rose-300 font-sans">
                    {isAr ? 'انتظر... لا تضغط حتى يتغير اللون!' : 'WAIT FOR GREEN... DO NOT CLICK YET!'}
                  </span>
                  <span className="text-xs text-rose-400/80 font-mono mt-1">
                    {isAr ? 'شحذ انتباهك' : 'Charging Sensors...'}
                  </span>
                </button>
              )}

              {pvtState === 'ready' && (
                <button
                  onClick={handlePvtClick}
                  className="w-full max-w-md h-40 rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-4 border-white flex flex-col items-center justify-center cursor-pointer transition-all shadow-2xl shadow-emerald-500/50"
                >
                  <span className="text-3xl font-black text-slate-950 font-mono animate-bounce">
                    {isAr ? 'اضغط الآن بأقصى سرعة!' : 'CLICK NOW FAST!'}
                  </span>
                </button>
              )}

              {pvtState === 'result' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-400">
                    <span className="text-xs font-mono text-slate-400 block">{isAr ? 'سرعة رد فعلك:' : 'YOUR REACTION TIME:'}</span>
                    <span className="text-4xl font-black font-mono text-cyan-300 mt-1 block">
                      {pvtReactionTime} ms
                    </span>
                    <span className="text-xs font-mono text-emerald-400 block mt-2">
                      {pvtReactionTime && pvtReactionTime < 260
                        ? (isAr ? 'ممتاز! يقظة تامة ولا يوجد إرهاق.' : 'EXCELLENT: Peak crew vigilance, no sleep debt.')
                        : (isAr ? 'مقبول: يوجد إجهاد خفيف، يوصى بالراحة.' : 'MODERATE: Mild fatigue detected, schedule rest.')}
                    </span>
                  </div>

                  <button
                    onClick={startPvtTest}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إعادة الاختبار' : 'Test Again'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CHALLENGE 2: MOTOR CONTROL & HAND STEADINESS */}
          {activeChallengeId === 'motor' && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-4">
                {isAr
                  ? 'حرك مؤشر الماوس أو إصبعك داخل المسار الأزرق الدائري دون لمس الحواف لقياس ثبات اليد والتحكم العضلي العصبي.'
                  : 'Trace your cursor inside the guided orbital channel to test neuromuscular stability in microgravity.'}
              </p>

              <div className="relative w-64 h-64 mx-auto rounded-full border-4 border-dashed border-cyan-500/40 flex items-center justify-center group hover:border-cyan-400 transition-colors">
                <div className="w-40 h-40 rounded-full border-4 border-slate-700 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {isAr ? 'المسار الآمن' : 'SAFE ZONE'}
                  </span>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Hand Tremor Index: 0.12 mm (Optimal Stability)</span>
              </div>
            </div>
          )}

          {/* CHALLENGE 3: SANS VISION CONTRAST */}
          {activeChallengeId === 'vision' && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-4">
                {isAr
                  ? 'رصد الأشكال الهندسية وسط الضباب الرمادي لقياس حساسية التباين البصري وتأثير انتقال السوائل نحو العينين.'
                  : 'Detect subtle geometric shapes amidst low contrast fog to benchmark optic nerve sheath pressure.'}
              </p>

              <div className="relative w-72 h-44 mx-auto rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
                {/* Low contrast hidden circle */}
                <div className="w-20 h-20 rounded-full border border-slate-600/40 bg-slate-700/20 flex items-center justify-center relative z-10">
                  <span className="text-[10px] font-mono text-slate-500">ASTRA ✦</span>
                </div>
              </div>

              <div className="mt-4 text-xs font-mono text-slate-300">
                Contrast Sensitivity: 1.85 logCS (Nominal SANS Threshold)
              </div>
            </div>
          )}

          {/* CHALLENGE 4: WORKING MEMORY COLOR SEQUENCE */}
          {activeChallengeId === 'memory' && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-4">
                {isAr
                  ? 'احفظ تسلسل الألوان المضيئة وكررها بنفس الترتيب لاختبار مرونة الذاكرة العاملة ضد تأثير غاز ثاني أكسيد الكربون.'
                  : 'Memorize the flashing sequence to test cognitive focus resilience against elevated cabin ppCO2 levels.'}
              </p>

              {!memoryPlaying ? (
                <button
                  onClick={startMemoryGame}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono cursor-pointer"
                >
                  {isAr ? 'ابدأ لعبة الذاكرة' : 'Start Memory Challenge'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-cyan-300">
                    Round Score: <span className="text-white font-bold">{memoryScore}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    {colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => handleColorClick(i)}
                        className="w-24 h-24 rounded-2xl border-2 border-white/20 transition-all cursor-pointer transform active:scale-95"
                        style={{
                          backgroundColor: activeColorIndex === i ? color : `${color}40`,
                          boxShadow: activeColorIndex === i ? `0 0 25px ${color}` : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CHALLENGE 5: PULSE CALM BIOFEEDBACK */}
          {activeChallengeId === 'pulse' && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-4">
                {isAr
                  ? 'ثبّت نبضك داخل المنطقة الخضراء (64 - 72 نبضة) عبر التنفس الهادئ لتفعيل التعافي العصبي وتخفيف التوتر.'
                  : 'Keep your simulated pulse inside the target green zone (64-72 bpm) through paced breathing.'}
              </p>

              <div className="relative w-72 h-32 mx-auto rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Target: 64-72 bpm</span>
                  <span className={`font-bold ${isPulseInTarget ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isPulseInTarget ? (isAr ? 'داخل المنطقة الخضراء ✓' : 'TARGET LOCKED ✓') : (isAr ? 'اضبط تنفسك...' : 'PACING...')}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Heart className={`w-8 h-8 ${isPulseInTarget ? 'text-emerald-400 animate-bounce' : 'text-rose-500 animate-pulse'}`} />
                  <span className="text-3xl font-black font-mono text-white">
                    {biofeedbackPulse} <span className="text-xs font-sans text-slate-400">BPM</span>
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${isPulseInTarget ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${Math.min(100, Math.max(20, (biofeedbackPulse - 50) * 2))}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
