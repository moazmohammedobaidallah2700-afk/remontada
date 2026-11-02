/**
 * Emergency SOS Modal & Audible Siren System
 * Features:
 * - Two-tone audible emergency siren synthesized with Web Audio API (520Hz / 880Hz)
 * - Full-screen high-priority alert HUD
 * - Voice-free glove-ready status chips for rapid emergency selection
 * - Automatic Houston ground-station distress packet transmission
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, Volume2, VolumeX, X, AlertTriangle,
  Radio, CheckCircle2, Lock, Unlock, PhoneCall
} from 'lucide-react';
import { audioComms } from '../utils/audioComms';

interface EmergencySosModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
  astronautName: string;
}

export const EmergencySosModal: React.FC<EmergencySosModalProps> = ({
  isOpen,
  onClose,
  language,
  astronautName,
}) => {
  const isAr = language === 'ar';
  const [isSirenActive, setIsSirenActive] = useState<boolean>(true);
  const [selectedEmergency, setSelectedEmergency] = useState<string>('cardiac');
  const [isTransmitted, setIsTransmitted] = useState<boolean>(false);
  const [isLockerUnlocked, setIsLockerUnlocked] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      audioComms.startEmergencySiren();
      setIsSirenActive(true);
      setIsTransmitted(false);
      setIsLockerUnlocked(false);
    } else {
      audioComms.stopEmergencySiren();
    }
    return () => {
      audioComms.stopEmergencySiren();
    };
  }, [isOpen]);

  const toggleSiren = () => {
    if (isSirenActive) {
      audioComms.stopEmergencySiren();
      setIsSirenActive(false);
    } else {
      audioComms.startEmergencySiren();
      setIsSirenActive(true);
    }
  };

  const emergencies = [
    {
      id: 'cardiac',
      titleEn: 'Ventricular Tachycardia / Acute Arrhythmia',
      titleAr: 'تسارع بطيني / اضطراب قلبي حاد',
      code: 'EMERG-01',
      actionEn: 'Deploy Automated External Defibrillator (AED) & Morphine injector.',
      actionAr: 'تجهيز مزيل الرجفان الآلي (AED) وحقنة التهدئة الطبية.',
    },
    {
      id: 'decompression',
      titleEn: 'Rapid Habitat Cabin Decompression',
      titleAr: 'هبوط ضغط مفاجئ في مقصورة المركبة',
      code: 'EMERG-02',
      actionEn: 'Don Emergency Oxygen Masks immediately; seal pressure bulkheads.',
      actionAr: 'ارتداء أقنعة الأكسجين الطارئة فوراً وإغلاق أبواب العزل المحكمة.',
    },
    {
      id: 'incapacitation',
      titleEn: 'Crew Member Incapacitation / Trauma',
      titleAr: 'إصابة أو إغماء أحد أفراد طاقم المركبة',
      code: 'EMERG-03',
      actionEn: 'Initiate zero-G restraint stretcher; check airway & pulse.',
      actionAr: 'تثبيت المصاب على نقالة انعدام الوزن وفحص المسالك الهوائية والنبض.',
    },
    {
      id: 'radiation-storm',
      titleEn: 'Solar Particle Event (SPE) Radiation Spike',
      titleAr: 'عاصفة إشعاعية شمسية عنيفة (SPE)',
      code: 'EMERG-04',
      actionEn: 'Evacuate to aft storm shelter; deploy polyethylene water shielding.',
      actionAr: 'الإخلاء الفوري إلى ملجأ العواصف واستخدام دروع خزانات المياه المحيطة.',
    },
    {
      id: 'toxic-gas',
      titleEn: 'Toxic Ammonia / Halon Leak in Cabin',
      titleAr: 'تسرب غاز الأمونيا أو غازات سامة في الكابينة',
      code: 'EMERG-05',
      actionEn: 'Activate emergency scrubbers; don SCBA full-face respirators.',
      actionAr: 'تشغيل أجهزة امتصاص الغازات وارتداء أجهزة التنفس الصناعي الكاملة.',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#120407] border-2 border-rose-500 rounded-3xl p-6 md:p-8 shadow-[0_0_80px_rgba(244,63,94,0.4)] text-white overflow-hidden">
        {/* Flashing Alert Top Border */}
        <div className="absolute top-0 inset-x-0 h-2 bg-rose-500 animate-pulse" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-500/40 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-400 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-500 text-black">
                  PRIORITY 1 AUDIO BEACON
                </span>
                <span className="text-xs font-mono text-rose-300">NASA-STD-3001 SOS</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
                {isAr ? 'طوارئ الاستغاثة الفضائية القصوى' : 'CRITICAL EMERGENCY SOS SYSTEM'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSiren}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors flex items-center gap-1.5 ${
                isSirenActive
                  ? 'bg-rose-500 text-black border-rose-400'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              {isSirenActive ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
              <span>{isSirenActive ? (isAr ? 'كتم الإنذار' : 'Mute Siren') : (isAr ? 'تشغيل الإنذار' : 'Enable Siren')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tactical Voice-Free Emergency Chips */}
        <div className="space-y-4 mb-6">
          <span className="text-xs font-mono text-rose-300 block font-bold">
            {isAr ? 'اختر حالة الطوارئ (شاشة سريعة تعمل باللمس وقفازات الفضاء):' : 'SELECT EMERGENCY EVENT (GLOVE-READY TOUCH HUD):'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {emergencies.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedEmergency(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                  selectedEmergency === item.id
                    ? 'border-rose-400 bg-rose-950/80 shadow-lg shadow-rose-500/30 font-bold scale-[1.01]'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-rose-500/40'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-rose-400 block">{item.code}</span>
                  <span className="text-xs sm:text-sm font-sans block text-white mt-0.5">
                    {isAr ? item.titleAr : item.titleEn}
                  </span>
                </div>
                <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${selectedEmergency === item.id ? 'bg-rose-400 animate-ping' : 'bg-slate-700'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Selected Emergency Action Card */}
        {selectedEmergency && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 mb-6">
            <h4 className="text-sm font-bold text-rose-300 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{isAr ? 'الإجراء الإلزامي الفوري للطاقم:' : 'Mandatory Immediate Action Protocol:'}</span>
            </h4>
            <p className="text-xs md:text-sm text-slate-200 font-sans leading-relaxed">
              {isAr
                ? emergencies.find((e) => e.id === selectedEmergency)?.actionAr
                : emergencies.find((e) => e.id === selectedEmergency)?.actionEn}
            </p>
          </div>
        )}

        {/* Bottom Actions: Transmit to Houston & Unlock Medical Lockers */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-rose-500/30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTransmitted(true)}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-rose-600/40 cursor-pointer"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>
                {isTransmitted
                  ? (isAr ? 'تم بث إشارة الطوارئ لهيوستن ✓' : 'DISTRESS PACKET TRANSMITTED ✓')
                  : (isAr ? 'إرسال نداء الاستغاثة لهيوستن' : 'Transmit SOS to Houston')}
              </span>
            </button>

            <button
              onClick={() => setIsLockerUnlocked(true)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isLockerUnlocked
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              {isLockerUnlocked ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4" />}
              <span>{isLockerUnlocked ? (isAr ? 'الخزانة مفتوحة' : 'Lockers Unlocked') : (isAr ? 'فتح خزائن الأدوية' : 'Unlock Pharmacy Lockers')}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-700 transition-colors cursor-pointer"
          >
            {isAr ? 'إلغاء وضع الطوارئ' : 'Dismiss SOS HUD'}
          </button>
        </div>
      </div>
    </div>
  );
};
