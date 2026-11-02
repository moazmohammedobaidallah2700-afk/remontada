/**
 * Astronaut Avatar Comms & Voice Calling Section
 * Features:
 * - Real-time incoming & outgoing voice calls with Dr. ASTRA (AI Flight Surgeon Avatar)
 * - In-suit radio speech synthesis with Apollo Quindar tones
 * - "I Feel Something Strange" autonomous triage trigger with automatic page routing
 * - Animated speaking holographic avatar with waveform visualization
 */

import React, { useState, useEffect } from 'react';
import {
  Phone, PhoneCall, PhoneOff, Mic, MicOff, Radio, Volume2,
  VolumeX, Sparkles, AlertTriangle, ShieldCheck, Heart, User,
  ChevronRight, Activity
} from 'lucide-react';
import { audioComms } from '../utils/audioComms';
import { AstronautProfile } from '../types';

interface AstronautAvatarCallSectionProps {
  language: 'en' | 'ar';
  activeAstronaut: AstronautProfile;
  onNavigateToSection: (sectionId: string) => void;
  onOpenFeelStrangeModal: () => void;
}

export const AstronautAvatarCallSection: React.FC<AstronautAvatarCallSectionProps> = ({
  language,
  activeAstronaut,
  onNavigateToSection,
  onOpenFeelStrangeModal,
}) => {
  const isAr = language === 'ar';

  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [activeCallText, setActiveCallText] = useState<string>('');
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState<boolean>(false);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);

  const callScenarios = [
    {
      id: 'eva-hydration',
      titleEn: 'Post-EVA Arrhythmia & Hydration Protocol',
      titleAr: 'تنبيه النبض بعد السير في الفضاء والترطيب',
      doctorSpeechEn: `${activeAstronaut.rank} ${activeAstronaut.name}, this is Dr. ASTRA. Your biosensors indicate heart rate peaked at 142 bpm following your EVA airlock ingress. Blood volume shifts are active. Drink 300ml electrolyte mineral solution and rest in zero-G for 20 minutes.`,
      doctorSpeechAr: `حضرة ${activeAstronaut.rankAr} ${activeAstronaut.nameAr}، معك الدكتورة أسترا. حساسات بدلتك رصدت ارتفاع نبضك إلى 142 نبضة بعد عودتك من السير في الفضاء. اشرب 300 مل من محلول الأملاح واسترح لمدة 20 دقيقة.`,
      targetSection: 'telemetry',
    },
    {
      id: 'circadian-melatonin',
      titleEn: 'Circadian Sleep Rhythm & Melatonin Advisory',
      titleAr: 'إرشاد ضبط دورات النوم الليلية وإفراز الميلاتونين',
      doctorSpeechEn: `${activeAstronaut.name}, flight day ${activeAstronaut.missionDurationDays} circadian cycle is shifting. We have entered the 14th orbital sunset of the cycle. I am dimming your habitat light spectrum to 630nm night-vision and queueing biophilic ocean wave acoustics.`,
      doctorSpeechAr: `يا ${activeAstronaut.nameAr}، دورة يومك الفضائي رقم ${activeAstronaut.missionDurationDays} تقترب من وقت الراحة. نحن الآن في الغروب المداري رقم 14. لقد قمت بتحويل إضاءة الكابينة إلى وضع الرؤية الليلية 630 نانومتر وجهزت لك أصوات أمواج المحيط المهدئة.`,
      targetSection: 'nature-hub',
    },
    {
      id: 'radiation-spe',
      titleEn: 'Deep-Space Radiation Advisory & Dosimetry',
      titleAr: 'تنبيه الإشعاع الكوني والجرعات التراكمية',
      doctorSpeechEn: `Attention ${activeAstronaut.rank} ${activeAstronaut.name}. Galactic cosmic ray flux is currently 21.4 micro-sieverts per hour. Cumulative exposure stands at ${activeAstronaut.radiationCumulativeMsv} mSv. Radiation shielding is nominal, continue regular shift duties.`,
      doctorSpeechAr: `تنبيه يا ${activeAstronaut.rankAr} ${activeAstronaut.nameAr}. تدفق الإشعاع الكوني يبلغ حالياً 21.4 ميكرو سيفرت في الساعة، والجرعة التراكمية ${activeAstronaut.radiationCumulativeMsv} ملي سيفرت. دروع الحماية تعمل بكفاءة.`,
      targetSection: 'health-matrix',
    },
  ];

  // Initiate call to astronaut
  const handleStartCall = () => {
    setCallState('calling');
    const stopRing = audioComms.playCommsRing();

    setTimeout(() => {
      stopRing();
      setCallState('connected');
      setIsAvatarSpeaking(true);

      const scenario = callScenarios[selectedScenarioIndex];
      const speech = isAr ? scenario.doctorSpeechAr : scenario.doctorSpeechEn;
      setActiveCallText(speech);

      audioComms.speakToAstronaut(speech, language, () => {
        setIsAvatarSpeaking(false);
      });
    }, 2400);
  };

  const handleEndCall = () => {
    audioComms.stopSpeaking();
    audioComms.playQuindar('outro');
    setCallState('idle');
    setIsAvatarSpeaking(false);
  };

  return (
    <section id="comms-call" className="py-16 border-t border-cyan-500/20 bg-radial from-slate-950 via-[#0A0E17] to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>{isAr ? 'قناة الاتصال الصوتي والآفاتار الطبي' : 'ASTRONAUT COMMS & AI DOCTOR AVATAR'}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            {isAr
              ? 'الاتصال المباشر برائد الفضاء واستدعاء الطبيبة الذكية'
              : 'Direct In-Suit Voice Calling & Holographic AI Doctor'}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'تتيح المنظومة مكالمة صوتية فضائية مباشرة بين الطبيبة الذكية ورائد الفضاء داخل بدلته مع رصد الأعراض وتوجيهه فوراً إلى الصفحة المناسبة لعلاجه.'
              : 'Experience direct voice calling between the holographic AI Flight Surgeon and the crew member, complete with real-time speech synthesis, Quindar beeps, and proactive health check-ins.'}
          </p>
        </div>

        {/* Main Comms Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0E1524]/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
          {/* Left Column: Holographic AI Doctor Avatar Box */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/90 rounded-2xl border border-cyan-500/40 relative overflow-hidden">
            {/* Holographic Radar Waves */}
            <div className={`absolute -inset-10 rounded-full border border-cyan-500/20 pointer-events-none ${isAvatarSpeaking ? 'animate-ping' : ''}`} style={{ animationDuration: '3s' }} />

            {/* Glowing Avatar Medallion */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_35px_rgba(6,182,212,0.35)] overflow-hidden">
              {/* Scanline */}
              <div className="absolute inset-x-0 h-1 bg-cyan-400/50 blur-xs animate-bounce" style={{ animationDuration: '2.5s' }} />

              {/* Holographic Doctor Visual */}
              <div className="flex flex-col items-center justify-center relative z-10 text-cyan-300">
                <Sparkles className={`w-12 h-12 md:w-16 md:h-16 ${isAvatarSpeaking ? 'scale-110 text-cyan-200 animate-pulse' : 'text-cyan-400'}`} />
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase mt-1">
                  DR. ASTRA AI
                </span>
                <span className="text-[9px] font-mono text-cyan-400/80">
                  {isAvatarSpeaking ? (isAr ? 'يتحدث الآن...' : 'TRANSMITTING...') : (isAr ? 'جاهز للاستدعاء' : 'STANDBY')}
                </span>
              </div>
            </div>

            {/* Live Audio Waveform Simulation */}
            <div className="w-full mt-6 bg-slate-900/80 rounded-xl p-3 border border-slate-800 flex items-center justify-center gap-1.5 h-12">
              {[4, 8, 14, 22, 34, 18, 28, 38, 20, 30, 16, 8, 4, 12, 24, 14, 6].map((height, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isAvatarSpeaking
                      ? 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]'
                      : 'bg-slate-700 h-2'
                  }`}
                  style={{
                    height: isAvatarSpeaking ? `${Math.max(4, (height * Math.random()) + 6)}px` : '4px',
                  }}
                />
              ))}
            </div>

            {/* Crew Target Information */}
            <div className="w-full mt-4 flex items-center justify-between text-xs font-mono text-slate-300 pt-3 border-t border-slate-800">
              <span className="text-slate-400">{isAr ? 'الهدف المداري:' : 'TARGET:'}</span>
              <span className="font-bold text-cyan-300">{activeAstronaut.rank} {activeAstronaut.name}</span>
            </div>
          </div>

          {/* Right Column: Interactive Comms Controls & Live Dialogue */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Status & Call Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400 block">
                  {isAr ? 'حالة القناة اللاسلكية:' : 'RADIO CHANNEL STATUS:'}
                </span>
                <span className={`text-sm font-mono font-bold flex items-center gap-2 mt-0.5 ${
                  callState === 'connected' ? 'text-emerald-400' : callState === 'calling' ? 'text-amber-400 animate-pulse' : 'text-cyan-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${callState === 'connected' ? 'bg-emerald-400' : callState === 'calling' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
                  {callState === 'connected'
                    ? (isAr ? 'مكالمة نشطة (متصل الآن)' : 'CALL CONNECTED (S-BAND LIVE)')
                    : callState === 'calling'
                    ? (isAr ? 'جاري الاتصال ببدلة الرائد...' : 'CONNECTING TO SUIT BIO-RADIO...')
                    : (isAr ? 'القناة جاهزة للاتصال' : 'STANDBY READY')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {callState === 'idle' ? (
                  <button
                    onClick={handleStartCall}
                    className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                    <span>{isAr ? 'اتصل برائد الفضاء الآن' : 'Call Astronaut (Voice)'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleEndCall}
                    className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>{isAr ? 'إنهاء المكالمة' : 'Disconnect Call'}</span>
                  </button>
                )}

                {callState === 'connected' && (
                  <button
                    onClick={() => setIsMicMuted(!isMicMuted)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isMicMuted
                        ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                    title={isAr ? 'كتم الميكروفون' : 'Toggle mic'}
                  >
                    {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {/* Live Comms Transmission Text */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 relative shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                <span>{isAr ? 'البث الصوتي المباشر:' : 'LIVE AUDIO TRANSCRIPTION:'}</span>
                <span className="text-slate-500">2525 Hz QUINDAR SYNC</span>
              </div>

              <p className="text-slate-200 text-sm md:text-base leading-relaxed min-h-[70px]">
                {activeCallText ||
                  (isAr
                    ? `اضغط زر "اتصل برائد الفضاء الآن" لتشغيل المكالمة الصوتية ونقل التعليمات الطبية مباشرة إلى بدلة ${activeAstronaut.nameAr}.`
                    : `Click "Call Astronaut (Voice)" to initiate a live spaceflight audio comms transmission to ${activeAstronaut.rank} ${activeAstronaut.name}.`)}
              </p>

              {/* Link from speech to relevant page */}
              {callState === 'connected' && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      const scenario = callScenarios[selectedScenarioIndex];
                      onNavigateToSection(scenario.targetSection);
                    }}
                    className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isAr ? 'فتح الصفحة الطبية المقترحة بالتسجيل ←' : 'Open Recommended Section →'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* "I Feel Something Strange" Quick Trigger Button */}
            <div className="bg-gradient-to-r from-amber-950/40 via-cyan-950/40 to-slate-900/80 border border-amber-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isAr ? 'هل تشعر بشيء غريب أو غير طبيعي؟' : 'Feeling Something Strange in Orbit?'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isAr
                      ? 'ستسألك الدكتورة أسترا فوراً وتفتح لك الصفحة الطبية المناسبة لإنقاذك'
                      : 'Dr. ASTRA will ask you directly and automatically open the helping page'}
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenFeelStrangeModal}
                className="px-4 py-2 rounded-lg font-mono text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/25 shrink-0 cursor-pointer"
              >
                <span>{isAr ? 'أشعر بشيء غريب!' : 'I Feel Strange!'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scenario selector tabs */}
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-2">
                {isAr ? 'اختر سيناريو فحص طبي للمكالمة:' : 'SELECT CLINICAL CHECK-IN SCENARIO:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {callScenarios.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenarioIndex(idx);
                      if (callState === 'connected') {
                        const speech = isAr ? sc.doctorSpeechAr : sc.doctorSpeechEn;
                        setActiveCallText(speech);
                        audioComms.speakToAstronaut(speech, language);
                      }
                    }}
                    className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                      selectedScenarioIndex === idx
                        ? 'border-cyan-400 bg-cyan-950/60 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {isAr ? sc.titleAr : sc.titleEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
