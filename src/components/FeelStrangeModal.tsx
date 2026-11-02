/**
 * "Feel Something Strange" Autonomous Clinical Assistant Modal
 * When the astronaut feels strange or experiences an unexpected anomaly:
 * 1. The Avatar asks the astronaut directly (with speech & visual triage)
 * 2. Astronaut selects or types what feels unusual
 * 3. The AI diagnoses the situation and AUTOMATICALLY opens/scrolls to the exact page/section that will help!
 */

import React, { useState } from 'react';
import {
  AlertTriangle, HeartPulse, Sparkles, Eye, Waves,
  ShieldAlert, Activity, ChevronRight, X, Volume2, Compass
} from 'lucide-react';
import { audioComms } from '../utils/audioComms';

interface FeelStrangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
  astronautName: string;
  onNavigateToSection: (sectionId: string) => void;
}

export const FeelStrangeModal: React.FC<FeelStrangeModalProps> = ({
  isOpen,
  onClose,
  language,
  astronautName,
  onNavigateToSection,
}) => {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');

  if (!isOpen) return null;

  const isAr = language === 'ar';

  const strangeSymptoms = [
    {
      id: 'heart-racing',
      icon: HeartPulse,
      color: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
      titleEn: 'Racing / Irregular Heartbeat (Palpitations)',
      titleAr: 'تسارع غير معتاد أو خفقان في نبضات القلب',
      descEn: 'Feeling flutter in chest, pounding pulse, or dizziness after microgravity exercise.',
      descAr: 'شعور برفرفة في الصدر، تسارع النبض، أو دوخة بعد التمارين في انعدام الوزن.',
      targetSection: 'telemetry',
      aiResponseEn: `Commander ${astronautName}, I am immediately opening your Real-Time Lead-II ECG Waveform and cardiovascular telemetry to evaluate rhythm stability.`,
      aiResponseAr: `يا حضرة القائد ${astronautName}، سأفتح لك فوراً شاشة تخطيط القلب الحي اللحظي (ECG) لمراقبة انتظام نبضاتك بدقة.`,
    },
    {
      id: 'homesick-stress',
      icon: Waves,
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40',
      titleEn: 'Severe Confinement Anxiety & Earth Homesickness',
      titleAr: 'توتر شديد، حنين للأرض، وشعور بضيق العزلة',
      descEn: 'Claustrophobia, melancholy, sleep disruption, or missing Earth nature sensations.',
      descAr: 'شعور بالعزلة الخانقة، الأرق، الشوق لروائح وأصوات الطبيعة على كوكب الأرض.',
      targetSection: 'nature-hub',
      aiResponseEn: `I understand completely, ${astronautName}. Space isolation is daunting. I am automatically opening the Earth & Nature Sensory Chamber with river, ocean, and forest soundscapes.`,
      aiResponseAr: `أشعر بك تماماً يا ${astronautName}. العزلة الفضائية قاسية. سأفتح لك فوراً واحة الطبيعة والاسترخاء الحسي لمشاهدة الأنهار والمحيطات والغابات.`,
    },
    {
      id: 'vision-headache',
      icon: Eye,
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      titleEn: 'Blurry Vision, Eye Pressure & Full Head (SANS)',
      titleAr: 'تشوش في النظر، ضغط خلف العينين، واحتقان الرأس',
      descEn: 'Cephalad fluid redistribution causing facial puffiness and optic nerve sheath swelling.',
      descAr: 'انتقال السوائل نحو الصدر والرأس في انعدام الجاذبية مع تورم خفيف في العصب البصري.',
      targetSection: 'health-matrix',
      aiResponseEn: `Cephalad fluid shift detected. Navigating you automatically to the 15-Parameter Health Matrix and Lower Body Negative Pressure (LBNP) protocol.`,
      aiResponseAr: `رصدنا انتقال السوائل الرأسي وانعدام الوزن. سأوجهك تلقائياً إلى مصفوفة المؤشرات الـ 15 لتطبيق جهاز الضغط السلبي السفلي LBNP.`,
    },
    {
      id: 'acute-crisis',
      icon: ShieldAlert,
      color: 'text-red-400 border-red-500/40 bg-red-950/40',
      titleEn: 'Acute Medical Crisis / Sudden Pain',
      titleAr: 'ألم حاد مفاجئ / حالة طارئة غير متوقعة',
      descEn: 'Severe chest pain, sudden disorientation, difficulty breathing, or suspected toxic leak.',
      descAr: 'ألم صدري شديد، ضيق في التنفس، فقدان الاتزان، أو اشتباه في تسرب غازي.',
      targetSection: 'interactive-preview',
      aiResponseEn: `CRITICAL ALERT: Opening the Emergency SOS HUD and Smart Medical Kit locker immediately!`,
      aiResponseAr: `إنذار حرج: جاري فتح شاشة طوارئ الاستغاثة الفضائية SOS وخزانة الأدوية فوراً!`,
    },
    {
      id: 'general-triage',
      icon: Activity,
      color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40',
      titleEn: 'General Unwell Feeling / Muscle Aches / Fatigue',
      titleAr: 'وعكة عامة، إرهاق عضلي غير مفهوم، أو خمول شديد',
      descEn: 'Unspecified symptoms requiring comprehensive 3-step AI clinical consultation.',
      descAr: 'أعراض غير محددة تحتاج إلى فحص سريري إرشادي عبر الذكاء الاصطناعي.',
      targetSection: 'interactive-preview',
      aiResponseEn: `Launching the 3-Step Guided Medical Triage (Check My Health) to formulate your diagnosis.`,
      aiResponseAr: `جاري تشغيل الفحص الطبي ثلاثي الخطوات (افحص صحتي) لتشخيص حالتك بدقة.`,
    },
  ];

  const handleSelectSymptom = (item: typeof strangeSymptoms[0]) => {
    setSelectedSymptom(item.id);
    setIsNavigating(true);

    const speech = isAr ? item.aiResponseAr : item.aiResponseEn;
    audioComms.speakToAstronaut(speech, language);

    // Auto-navigate after a brief acknowledgment moment
    setTimeout(() => {
      onNavigateToSection(item.targetSection);
      setIsNavigating(false);
      onClose();
    }, 1800);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    setIsNavigating(true);
    const speech = isAr
      ? `فهمت يا ${astronautName}: "${customText}". سأفتح لك وحدة الفحص السريري والاستشارة الذكية فوراً لمساعدتك.`
      : `Understood, ${astronautName}: "${customText}". I am automatically opening the AI clinical consultation console to assist you.`;

    audioComms.speakToAstronaut(speech, language);

    setTimeout(() => {
      onNavigateToSection('interactive-preview');
      setIsNavigating(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0E1524] border border-cyan-500/50 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden text-slate-100">
        {/* Glow ambient header */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-amber-400 to-rose-500 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Avatar Question Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {isAr ? 'تنبيه استشعار الطاقم' : 'CREW ANOMALY RADAR'}
              </span>
              <span className="text-xs text-slate-400 font-mono">DR. ASTRA ASSISTANT</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
              {isAr
                ? `يا ${astronautName}، هل تشعر بأمر غريب أو غير معتاد؟`
                : `${astronautName}, do you feel something unusual or strange?`}
            </h3>

            <p className="text-sm text-cyan-300/90 mt-1">
              {isAr
                ? 'اختر ما تشعر به وسيقوم النظام تلقائياً بفتح الصفحة والأدوات المناسبة لإنقاذك وعلاجك فوراً.'
                : 'Select what you are feeling, and the AI will automatically open the exact page to care for you.'}
            </p>
          </div>
        </div>

        {/* Navigation Indicator Overlay */}
        {isNavigating && (
          <div className="mb-6 p-4 rounded-xl bg-cyan-950/80 border border-cyan-500 text-center animate-pulse">
            <div className="inline-flex items-center gap-2 text-cyan-300 font-mono text-sm font-bold">
              <Compass className="w-5 h-5 animate-spin" />
              <span>
                {isAr
                  ? 'جاري توجيهك تلقائياً إلى الصفحة الطبية المساعدة...'
                  : 'AUTONOMOUSLY ROUTING YOU TO THE TARGET MEDICAL SUBSYSTEM...'}
              </span>
            </div>
          </div>
        )}

        {/* Symptoms Grid */}
        <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
          {strangeSymptoms.map((symptom) => {
            const Icon = symptom.icon;
            const isSelected = selectedSymptom === symptom.id;
            return (
              <button
                key={symptom.id}
                onClick={() => handleSelectSymptom(symptom)}
                disabled={isNavigating}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/20 scale-[1.01]'
                    : `${symptom.color} hover:border-slate-400/80 hover:bg-slate-900/90`
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-700/60 shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {isAr ? symptom.titleAr : symptom.titleEn}
                    </h4>
                    <p className="text-xs text-slate-300/80 mt-0.5">
                      {isAr ? symptom.descAr : symptom.descEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 shrink-0">
                  <span className="hidden sm:inline">
                    {isAr ? 'فتح تلقائي' : 'Auto-Open'}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Strange Symptom Write-In Form */}
        <form onSubmit={handleCustomSubmit} className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={
              isAr
                ? 'أو اكتب هنا ما تشعر به بالتحديد (مثال: ألم في الكتف، دوار بعد الاستيقاظ)...'
                : 'Or describe specifically what feels strange (e.g. sharp headache, numbness)...'
            }
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!customText.trim() || isNavigating}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs font-mono transition-all shrink-0 cursor-pointer"
          >
            {isAr ? 'افحص وافتح الصفحة ←' : 'Route Me →'}
          </button>
        </form>
      </div>
    </div>
  );
};
