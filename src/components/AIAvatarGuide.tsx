/**
 * Interactive AI Avatar Guide & Emotional Companion ("Dr. ASTRA")
 * - Dynamic facial expressions: Happy, Sad, Cry, Stressed, Excited, Calm, Thinking
 * - Teaches the astronaut how to use the app with step-by-step interactive tour
 * - Reacts to astronaut's emotional state when they press how they feel
 * - Speaks using Web Speech Synthesis API and Quindar tones
 */

import React, { useState, useEffect } from 'react';
import {
  Volume2, VolumeX, Sparkles, Heart, Compass, ShieldAlert,
  ChevronRight, ChevronLeft, RefreshCw, PhoneCall, Award
} from 'lucide-react';
import { audioComms } from '../utils/audioComms';

export type AvatarMood = 'happy' | 'sad' | 'cry' | 'thinking' | 'calm' | 'stressed' | 'excited';

interface AIAvatarGuideProps {
  language: 'en' | 'ar';
  astronautName: string;
  onNavigateToSection?: (sectionId: string) => void;
  onTriggerCall?: () => void;
}

export const AIAvatarGuide: React.FC<AIAvatarGuideProps> = ({
  language,
  astronautName,
  onNavigateToSection,
  onTriggerCall,
}) => {
  const [currentMood, setCurrentMood] = useState<AvatarMood>('calm');
  const [tourStep, setTourStep] = useState<number>(0);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [lastSpeech, setLastSpeech] = useState<string>('');

  const isAr = language === 'ar';

  // Tour steps definition
  const tourSteps = [
    {
      titleEn: 'Welcome to ASTRA HEALTH',
      titleAr: 'مرحباً بك في أسترا هيلث (ASTRA HEALTH)',
      descEn: `Greetings, ${astronautName}! I am Dr. ASTRA, your autonomous orbital flight surgeon. I am here to guide your physical and mental health across deep-space transit. Let me show you how to navigate your clinical console!`,
      descAr: `تحياتي يا ${astronautName}! أنا الدكتورة أسترا، الجراحة المدارية الذاتية لطاقمك. مهمتي هي حماية صحتك الجسدية والنفسية في الفضاء السحيق. دعني أرشدك خطوة بخطوة للتعرف على نظامك الطبي!`,
      targetId: 'hero',
      mood: 'excited' as AvatarMood,
    },
    {
      titleEn: '1. Real-Time Telemetry & ECG',
      titleAr: '1. القياسات الحيوية وتخطيط القلب الحي',
      descEn: 'Here you monitor your continuous Lead-II ECG waveform, real-time heart rate, blood pressure, SpO2, and cabin environmental telemetry (Oxygen & CO2).',
      descAr: 'هنا تراقب مخطط رسم القلب الحي اللحظي (ECG)، نبضات القلب، ضغط الدم، تشبع الأكسجين، ومؤشرات بيئة الكابينة وضغط الغازات.',
      targetId: 'telemetry',
      mood: 'thinking' as AvatarMood,
    },
    {
      titleEn: '2. The 15 Vital Biomarkers Matrix',
      titleAr: '2. مصفوفة الـ 15 مؤشراً فسيولوجياً',
      descEn: 'From cosmic space radiation and SANS vision shifts to cephalad fluid redistribution and bone mineral density — every spaceflight risk is tracked here.',
      descAr: 'من إشعاعات الفضاء الكونية وتغيرات النظر (SANS) إلى انتقال السوائل الرأسي وكثافة العظام — كل خطر فضائي نتابعه بدقة.',
      targetId: 'health-matrix',
      mood: 'calm' as AvatarMood,
    },
    {
      titleEn: '3. Earth & Nature Sensory Therapy',
      titleAr: '3. واحة الطبيعة الأرضية لتهدئة النفس',
      descEn: 'Feeling isolated or stressed? Immerse yourself in high-definition rivers, oceans, beaches, forests, animals, and cosmic nebulae with 4-7-8 biofeedback breathing!',
      descAr: 'هل تشعر بالعزلة أو التوتر؟ ادخل واحة الطبيعة للاستماع إلى هدير الأنهار وأمواج المحيط وأصوات الغابات والحيوانات مع تدريب التنفس المهدئ!',
      targetId: 'nature-hub',
      mood: 'happy' as AvatarMood,
    },
    {
      titleEn: '4. Voice Comms & Astronaut Calling',
      titleAr: '4. الاتصال الصوتي المباشر بالبدلة',
      descEn: 'You can initiate an active voice call with me anytime, or I will call your in-suit radio whenever an anomaly or dehydration is detected.',
      descAr: 'يمكنك فتح مكالمة صوتية مباشرة معي في أي وقت، وسأقوم بالاتصال بك في بدلتك فور رصد أي تسارع في النبض أو جفاف.',
      targetId: 'comms-call',
      mood: 'excited' as AvatarMood,
    },
    {
      titleEn: '5. Emergency SOS & Siren System',
      titleAr: '5. طوارئ الاستغاثة الفورية SOS',
      descEn: 'In critical crises (decompression, severe arrhythmia, toxic leaks), click the red EMERGENCY SOS button for a high-priority audible siren and glove-ready triage.',
      descAr: 'في الحالات القصوى (هبوط الضغط، اضطراب النبض، تسرب الغازات)، اضغط زر طوارئ SOS الأحمر لإطلاق صفارة الإنذار وعرض الإجراءات السريعة.',
      targetId: 'interactive-preview',
      mood: 'happy' as AvatarMood,
    },
  ];

  // React to astronaut's self-reported emotion
  const handleMoodSelect = (mood: AvatarMood) => {
    setCurrentMood(mood);

    let speechTextEn = '';
    let speechTextAr = '';

    switch (mood) {
      case 'happy':
        speechTextEn = `That is wonderful to hear, ${astronautName}! Your autonomic HRV stability and dopamine levels reflect optimal conditioning. Keep shining in orbit!`;
        speechTextAr = `هذا رائع ومبهج جداً يا ${astronautName}! تباين نبضات قلبك ومؤشراتك العصبية في أفضل حالاتها. استمر بهذه الروح المدارية العالية!`;
        break;
      case 'sad':
        speechTextEn = `I hear you, ${astronautName}. Being hundreds of thousands of kilometers from Earth is emotionally tough. You are not alone; I am right here with you. Let's take a short rest or visit our Nature Sanctuary.`;
        speechTextAr = `أشعر بك يا ${astronautName}. البعد آلاف الكيلومترات عن كوكب الأرض يسبب الحنين والشوق. لست وحدك، أنا معك خطوة بخطوة. دعنا نأخذ استراحة أو نزور واحة الطبيعة للاسترخاء.`;
        break;
      case 'cry':
        speechTextEn = `Please breathe deeply with me, ${astronautName}. Tears are a healthy release of zero-gravity cortisol. I am dialing down cabin lighting and queueing calming ocean waves for you right now.`;
        speechTextAr = `تنفس معي بعمق وهدوء يا ${astronautName}. البكاء تفريغ صحي طبيعي لتوتر الفضاء. أنا الآن أخفف إضاءة الكابينة وسأشغل لك أصوات أمواج البحر لتهدئتك فوراً.`;
        break;
      case 'stressed':
        speechTextEn = `Bio-sensors detect your elevated sympathetic tone. Let's execute 4-7-8 box breathing together and rehydrate with electrolyte mineral salts.`;
        speechTextAr = `الحساسات الحيوية ترصد توتراً في جهازك العصبي. دعنا نقوم بتمارين التنفس الصندوقي 4-7-8 الآن وتناول أملاح الترطيب المعدنية.`;
        break;
      case 'excited':
        speechTextEn = `Fantastic momentum, Commander! Mission telemetry is green across all systems. Let's accomplish our mission goals with peak focus!`;
        speechTextAr = `حماس وطاقة استثنائية يا قائد! كافة مؤشرات المهمة باللون الأخضر. دعنا ننجز أهداف المهمة بأعلى درجات التركيز!`;
        break;
      case 'calm':
      default:
        speechTextEn = `Autonomic balance is stabilized. Resting vitals are nominal. I remain on active clinical standby for your command.`;
        speechTextAr = `التوازن الفسيولوجي مستقر تماماً. المؤشرات الحيوية طبيعية، وأنا في وضع الجاهزية الطبية الدائمة لأي استدعاء.`;
        break;
    }

    const currentSpeech = isAr ? speechTextAr : speechTextEn;
    setLastSpeech(currentSpeech);

    // Speak automatically if voice active
    if (isVoiceActive) {
      audioComms.speakToAstronaut(currentSpeech, language);
    }
  };

  const startTour = () => {
    setIsTourActive(true);
    setTourStep(0);
    const step = tourSteps[0];
    setCurrentMood(step.mood);
    const text = isAr ? step.descAr : step.descEn;
    setLastSpeech(text);
    if (isVoiceActive) {
      audioComms.speakToAstronaut(text, language);
    }
  };

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      const next = tourStep + 1;
      setTourStep(next);
      const step = tourSteps[next];
      setCurrentMood(step.mood);
      const text = isAr ? step.descAr : step.descEn;
      setLastSpeech(text);
      if (onNavigateToSection && step.targetId) {
        onNavigateToSection(step.targetId);
      }
      if (isVoiceActive) {
        audioComms.speakToAstronaut(text, language);
      }
    } else {
      setIsTourActive(false);
      setCurrentMood('happy');
      const finishText = isAr
        ? `أحسنت يا ${astronautName}! لقد أكملت جولة النظام بنجاح. تذكر أنني دائماً معك في راديو البدلة لحمايتك.`
        : `Outstanding, ${astronautName}! You have mastered the ASTRA HEALTH console. Remember, I am always in your in-suit radio.`;
      setLastSpeech(finishText);
      if (isVoiceActive) {
        audioComms.speakToAstronaut(finishText, language);
      }
    }
  };

  const prevTourStep = () => {
    if (tourStep > 0) {
      const prev = tourStep - 1;
      setTourStep(prev);
      const step = tourSteps[prev];
      setCurrentMood(step.mood);
      const text = isAr ? step.descAr : step.descEn;
      setLastSpeech(text);
      if (onNavigateToSection && step.targetId) {
        onNavigateToSection(step.targetId);
      }
      if (isVoiceActive) {
        audioComms.speakToAstronaut(text, language);
      }
    }
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      audioComms.stopSpeaking();
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      if (lastSpeech) {
        audioComms.speakToAstronaut(lastSpeech, language);
      }
    }
  };

  // Render dynamic avatar facial expressions SVG
  const renderAvatarFace = () => {
    let eyeColor = '#06B6D4';
    let haloGlow = 'rgba(6, 182, 212, 0.35)';
    let moodBadge = isAr ? 'هادئ ومراقب' : 'CALM MONITOR';

    if (currentMood === 'happy') {
      eyeColor = '#10B981';
      haloGlow = 'rgba(16, 185, 129, 0.45)';
      moodBadge = isAr ? 'سعيد ومبتهج 😊' : 'JOYFUL & HAPPY 😊';
    } else if (currentMood === 'sad') {
      eyeColor = '#60A5FA';
      haloGlow = 'rgba(96, 165, 250, 0.4)';
      moodBadge = isAr ? 'مواسي ومتعاطف 😔' : 'EMPATHETIC & SAD 😔';
    } else if (currentMood === 'cry') {
      eyeColor = '#818CF8';
      haloGlow = 'rgba(129, 140, 248, 0.5)';
      moodBadge = isAr ? 'محتضن للدموع 😢' : 'TEARS & COMFORT 😢';
    } else if (currentMood === 'stressed') {
      eyeColor = '#F59E0B';
      haloGlow = 'rgba(245, 158, 11, 0.45)';
      moodBadge = isAr ? 'تركيز وتخفيف التوتر 😤' : 'STRESS MITIGATION 😤';
    } else if (currentMood === 'excited') {
      eyeColor = '#EC4899';
      haloGlow = 'rgba(236, 72, 153, 0.5)';
      moodBadge = isAr ? 'متحمس ومستعد ⚡' : 'MISSION READY ⚡';
    } else if (currentMood === 'thinking') {
      eyeColor = '#38BDF8';
      haloGlow = 'rgba(56, 189, 248, 0.4)';
      moodBadge = isAr ? 'تحليل سريري 🧠' : 'CLINICAL ANALYSIS 🧠';
    }

    return (
      <div className="relative flex flex-col items-center justify-center p-4">
        {/* Holographic Scanline & Orbital Rings */}
        <div
          className="absolute -inset-2 rounded-full border border-dashed animate-spin"
          style={{
            borderColor: eyeColor,
            animationDuration: '24s',
            opacity: 0.3,
          }}
        />
        <div
          className="absolute -inset-5 rounded-full border border-cyan-500/10 pointer-events-none"
          style={{ boxShadow: `0 0 35px ${haloGlow}` }}
        />

        {/* Avatar SVG Face Container */}
        <div
          className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-slate-950 border-2 flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden"
          style={{ borderColor: eyeColor }}
        >
          {/* Hologram Grid Mesh in background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:8px_8px] opacity-40" />

          {/* Hologram scanline */}
          <div className="absolute inset-x-0 h-1 bg-cyan-400/40 blur-xs animate-bounce" style={{ animationDuration: '3s' }} />

          <svg viewBox="0 0 100 100" className="w-24 h-24 relative z-10">
            {/* Hologram Head Silhouette */}
            <circle cx="50" cy="50" r="42" fill="none" stroke={eyeColor} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />

            {/* Forehead Medical Cross Emblem */}
            <path d="M48 20 H52 V28 H48 Z M45 23 H55 V25 H45 Z" fill={eyeColor} opacity="0.8" />

            {/* EYEBROWS */}
            {currentMood === 'happy' && (
              <>
                <path d="M26 36 Q34 31 42 35" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M58 35 Q66 31 74 36" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}
            {currentMood === 'sad' && (
              <>
                <path d="M26 33 Q34 38 42 37" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M58 37 Q66 38 74 33" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}
            {currentMood === 'cry' && (
              <>
                <path d="M25 34 Q34 40 42 38" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M58 38 Q66 40 75 34" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}
            {(currentMood === 'calm' || currentMood === 'thinking') && (
              <>
                <path d="M28 35 Q35 34 42 35" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M58 35 Q65 34 72 35" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            )}
            {currentMood === 'stressed' && (
              <>
                <path d="M26 38 Q35 34 42 37" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M58 37 Q65 34 74 38" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}
            {currentMood === 'excited' && (
              <>
                <path d="M26 32 Q35 28 42 33" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M58 33 Q65 28 74 32" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* EYES */}
            {currentMood === 'happy' && (
              <>
                {/* Crescent Happy Closed Eyes */}
                <path d="M27 45 Q35 38 43 45" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M57 45 Q65 38 73 45" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Cheeks Blush */}
                <circle cx="25" cy="52" r="4" fill="#F43F5E" opacity="0.6" />
                <circle cx="75" cy="52" r="4" fill="#F43F5E" opacity="0.6" />
              </>
            )}

            {currentMood === 'sad' && (
              <>
                <ellipse cx="35" cy="46" rx="6" ry="7" fill={eyeColor} opacity="0.9" />
                <ellipse cx="65" cy="46" rx="6" ry="7" fill={eyeColor} opacity="0.9" />
                {/* Drooping light reflections */}
                <circle cx="33" cy="44" r="2" fill="#fff" />
                <circle cx="63" cy="44" r="2" fill="#fff" />
              </>
            )}

            {currentMood === 'cry' && (
              <>
                <ellipse cx="35" cy="47" rx="6" ry="6" fill={eyeColor} opacity="0.85" />
                <ellipse cx="65" cy="47" rx="6" ry="6" fill={eyeColor} opacity="0.85" />
                <circle cx="33" cy="45" r="2" fill="#fff" />
                <circle cx="63" cy="45" r="2" fill="#fff" />

                {/* Animated Falling Holographic Tears */}
                <path d="M35 53 Q33 60 35 68 Q37 60 35 53" fill="#60A5FA" opacity="0.9">
                  <animate attributeName="d" values="M35 53 Q33 58 35 64 Q37 58 35 53; M35 53 Q32 64 35 72 Q38 64 35 53; M35 53 Q33 58 35 64 Q37 58 35 53" dur="1.8s" repeatCount="indefinite" />
                </path>
                <path d="M65 53 Q63 60 65 68 Q67 60 65 53" fill="#60A5FA" opacity="0.9">
                  <animate attributeName="d" values="M65 53 Q63 58 65 64 Q67 58 65 53; M65 53 Q62 64 65 72 Q68 64 65 53; M65 53 Q63 58 65 64 Q67 58 65 53" dur="2.1s" repeatCount="indefinite" />
                </path>
              </>
            )}

            {(currentMood === 'calm' || currentMood === 'thinking') && (
              <>
                <circle cx="35" cy="46" r="6" fill={eyeColor} />
                <circle cx="65" cy="46" r="6" fill={eyeColor} />
                <circle cx="33" cy="44" r="2" fill="#fff" />
                <circle cx="63" cy="44" r="2" fill="#fff" />
                <circle cx="35" cy="46" r="9" stroke={eyeColor} strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.5" />
                <circle cx="65" cy="46" r="9" stroke={eyeColor} strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.5" />
              </>
            )}

            {currentMood === 'excited' && (
              <>
                {/* Star Eyes */}
                <polygon points="35,40 37,45 42,46 38,49 39,54 35,51 31,54 32,49 28,46 33,45" fill={eyeColor} />
                <polygon points="65,40 67,45 72,46 68,49 69,54 65,51 61,54 62,49 58,46 63,45" fill={eyeColor} />
                <circle cx="25" cy="52" r="5" fill="#EC4899" opacity="0.5" />
                <circle cx="75" cy="52" r="5" fill="#EC4899" opacity="0.5" />
              </>
            )}

            {currentMood === 'stressed' && (
              <>
                <ellipse cx="35" cy="47" rx="5" ry="4" fill={eyeColor} />
                <ellipse cx="65" cy="47" rx="5" ry="4" fill={eyeColor} />
                <line x1="28" y1="52" x2="42" y2="52" stroke={eyeColor} strokeWidth="1" opacity="0.6" />
                <line x1="58" y1="52" x2="72" y2="52" stroke={eyeColor} strokeWidth="1" opacity="0.6" />
              </>
            )}

            {/* NOSE */}
            <circle cx="50" cy="55" r="1.5" fill={eyeColor} opacity="0.7" />

            {/* MOUTH SHAPES */}
            {currentMood === 'happy' && (
              <path d="M34 62 Q50 78 66 62 Q50 72 34 62" fill={eyeColor} stroke={eyeColor} strokeWidth="1.5" strokeLinejoin="round" />
            )}
            {currentMood === 'sad' && (
              <path d="M36 71 Q50 63 64 71" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" fill="none" />
            )}
            {currentMood === 'cry' && (
              <path d="M38 72 Q50 64 62 72" stroke={eyeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            )}
            {currentMood === 'calm' && (
              <path d="M38 67 Q50 70 62 67" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}
            {currentMood === 'thinking' && (
              <path d="M42 67 Q50 67 58 65" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}
            {currentMood === 'stressed' && (
              <path d="M38 68 L44 67 L50 69 L56 67 L62 68" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}
            {currentMood === 'excited' && (
              <path d="M32 62 Q50 82 68 62 Z" fill={eyeColor} opacity="0.95" />
            )}
          </svg>
        </div>

        {/* Dynamic Mood Status Tag */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900/90 border border-slate-700/80 shadow-md">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: eyeColor }} />
          <span style={{ color: eyeColor }}>{moodBadge}</span>
        </div>
      </div>
    );
  };

  return (
    <div id="ai-guide" className="w-full bg-[#0E1524]/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Decorative HUD header tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold tracking-wide text-white flex items-center gap-2">
              <span>{isAr ? 'الدكتورة أسترا — المرشدة الفضائية الذكية' : 'Dr. ASTRA — AI Crew Guide & Companion'}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ACTIVE AI MENTOR
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isAr
                ? 'مرشدة تفاعلية لتعليمك استخدام النظام ومواساة مشاعرك أثناء رحلتك الفضائية'
                : 'Interactive guide teaching console navigation & emotional biofeedback companion'}
            </p>
          </div>
        </div>

        {/* Comms voice & call controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoice}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all border ${
              isVoiceActive
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={isAr ? 'تشغيل الصوت التوليدي للمرشدة' : 'Toggle synthesized speech'}
          >
            {isVoiceActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{isAr ? (isVoiceActive ? 'الصوت نشط' : 'كتم الصوت') : (isVoiceActive ? 'Voice ON' : 'Voice Muted')}</span>
          </button>

          {onTriggerCall && (
            <button
              onClick={onTriggerCall}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>{isAr ? 'مكالمة هاتفية فورية' : 'Call Astronaut'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Avatar Face & Expression visualizer */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          {renderAvatarFace()}

          {/* Interactive Emotion Check-in Bar: "How are you feeling right now?" */}
          <div className="w-full mt-4 bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-center text-xs font-semibold text-slate-300 mb-2">
              {isAr ? 'كيف تشعر الآن في مقصورة الفضاء؟' : 'How are you feeling right now, Astronaut?'}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => handleMoodSelect('happy')}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all border ${
                  currentMood === 'happy'
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold scale-105'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                <span>😊</span>
                <span>{isAr ? 'سعيد' : 'Happy'}</span>
              </button>

              <button
                onClick={() => handleMoodSelect('sad')}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all border ${
                  currentMood === 'sad'
                    ? 'bg-blue-500/25 border-blue-400 text-blue-200 font-bold scale-105'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-blue-500/50'
                }`}
              >
                <span>😔</span>
                <span>{isAr ? 'حزين' : 'Sad'}</span>
              </button>

              <button
                onClick={() => handleMoodSelect('cry')}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all border ${
                  currentMood === 'cry'
                    ? 'bg-indigo-500/25 border-indigo-400 text-indigo-200 font-bold scale-105'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-indigo-500/50'
                }`}
              >
                <span>😢</span>
                <span>{isAr ? 'أبكي' : 'Crying'}</span>
              </button>

              <button
                onClick={() => handleMoodSelect('stressed')}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all border ${
                  currentMood === 'stressed'
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold scale-105'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-amber-500/50'
                }`}
              >
                <span>😤</span>
                <span>{isAr ? 'متوتر' : 'Stressed'}</span>
              </button>

              <button
                onClick={() => handleMoodSelect('calm')}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all border ${
                  currentMood === 'calm'
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 font-bold scale-105'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                <span>😌</span>
                <span>{isAr ? 'هادئ' : 'Calm'}</span>
              </button>

              <button
                onClick={() => handleMoodSelect('excited')}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all border ${
                  currentMood === 'excited'
                    ? 'bg-pink-500/25 border-pink-400 text-pink-200 font-bold scale-105'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-pink-500/50'
                }`}
              >
                <span>⚡</span>
                <span>{isAr ? 'متحمس' : 'Ready'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interactive Speech & Guide Tour Console */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
          {/* Dr. ASTRA Direct Dialogue Speech Bubble */}
          <div className="relative bg-slate-950/80 border border-cyan-500/40 rounded-xl p-5 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {isAr ? 'رسالة الدكتورة أسترا السريرية:' : 'TRANSMISSION FROM DR. ASTRA:'}
              </span>
              <span className="text-slate-400">
                {isTourActive
                  ? `${isAr ? 'الخطوة' : 'STEP'} ${tourStep + 1} / ${tourSteps.length}`
                  : (isAr ? 'وضع المرافقة النفسية' : 'BIO-COMPANION MODE')}
              </span>
            </div>

            <p className="text-slate-200 text-sm md:text-base leading-relaxed min-h-[72px] font-sans">
              {lastSpeech || (isAr ? tourSteps[0].descAr : tourSteps[0].descEn)}
            </p>

            {/* Quick Action Suggestion Based on Mood */}
            {currentMood === 'sad' && (
              <div className="mt-3 pt-3 border-t border-blue-500/20 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-blue-300 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-blue-400" />
                  {isAr ? 'توصية طبية: افتح واحة الطبيعة واستمع لهدير النهر والشاطئ' : 'Clinical suggestion: Visit Nature Sanctuary to restore emotional balance.'}
                </span>
                {onNavigateToSection && (
                  <button
                    onClick={() => onNavigateToSection('nature-hub')}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-600/30 text-blue-200 hover:bg-blue-600/50 transition-colors"
                  >
                    {isAr ? 'فتح واحة الطبيعة ←' : 'Open Nature Hub →'}
                  </button>
                )}
              </div>
            )}

            {currentMood === 'cry' && (
              <div className="mt-3 pt-3 border-t border-indigo-500/20 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-indigo-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  {isAr ? 'بروتوكول احتواء العزلة: تشغيل جلسة التنفس الصندوقي 4-7-8' : 'Active Countermeasure: Initiating 4-7-8 zero-g paced breathing.'}
                </span>
                {onNavigateToSection && (
                  <button
                    onClick={() => onNavigateToSection('nature-hub')}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50 transition-colors"
                  >
                    {isAr ? 'بدء تدريب التنفس ←' : 'Start Paced Breathing →'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Interactive "Teach Astronaut the App" Tour Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isTourActive
                    ? (isAr ? tourSteps[tourStep].titleAr : tourSteps[tourStep].titleEn)
                    : (isAr ? 'الجولة الإرشادية لتعليم النظام' : 'Interactive App Navigation Tour')}
                </h4>
                <p className="text-xs text-slate-400">
                  {isTourActive
                    ? (isAr ? 'اتبع إرشادات الدكتورة أسترا لاستكشاف كل قسم' : 'Follow Dr. ASTRA through each subsystem')
                    : (isAr ? 'دع الدكتورة أسترا تشرح لك كيفية استخدام لوحة التحكم' : 'Let Dr. ASTRA walk you through the entire clinical console')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isTourActive ? (
                <button
                  onClick={startTour}
                  className="px-4 py-2 rounded-lg text-xs font-bold font-mono bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{isAr ? 'ابدأ جولة التدريب' : 'Start Training Tour'}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={prevTourStep}
                    disabled={tourStep === 0}
                    className="p-2 rounded-lg text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    title={isAr ? 'الخطوة السابقة' : 'Previous step'}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={nextTourStep}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center gap-1"
                  >
                    <span>{tourStep === tourSteps.length - 1 ? (isAr ? 'إنهاء' : 'Finish') : (isAr ? 'التالي' : 'Next')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsTourActive(false)}
                    className="p-2 rounded-lg text-xs bg-slate-800 text-slate-400 hover:text-white"
                    title={isAr ? 'إغلاق الجولة' : 'Exit tour'}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
