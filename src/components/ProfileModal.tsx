/**
 * Astronaut User Profile Modal
 * Allows viewing account details (username, email, flight days),
 * tracking progress in the app (ARED workouts, sleep scores, radiation dose),
 * and managing notification or privacy settings.
 */

import React, { useState } from 'react';
import {
  User, Mail, Shield, Bell, Lock, Award, Heart,
  Flame, Moon, Droplets, CheckCircle2, X
} from 'lucide-react';
import { AstronautProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
  astronaut: AstronautProfile;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  language,
  astronaut,
}) => {
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'details' | 'progress' | 'settings'>('details');

  // Privacy and notification settings
  const [encryptTelemetry, setEncryptTelemetry] = useState(true);
  const [houstonAutoSync, setHoustonAutoSync] = useState(true);
  const [audioSirenAllowed, setAudioSirenAllowed] = useState(true);
  const [dailyCheckReminder, setDailyCheckReminder] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0E1524] border border-cyan-500/50 rounded-2xl p-6 md:p-8 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-800 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-2xl shadow-lg shadow-cyan-500/20">
            {astronaut.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ACTIVE CREW MEMBER
              </span>
              <span className="text-xs font-mono text-slate-400">{astronaut.id}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white mt-0.5">
              {astronaut.rank} {astronaut.name}
            </h3>
            <p className="text-xs text-slate-400">{astronaut.email}</p>
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="flex border-b border-slate-800 pb-3 mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 text-center pb-2 font-bold transition-colors border-b-2 ${
              activeTab === 'details' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'بيانات الحساب' : 'Account Details'}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 text-center pb-2 font-bold transition-colors border-b-2 ${
              activeTab === 'progress' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'سجل التقدم واللياقة' : 'Mission Progress'}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 text-center pb-2 font-bold transition-colors border-b-2 ${
              activeTab === 'settings' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'إعدادات الخصوصية والإشعارات' : 'Settings & Privacy'}
          </button>
        </div>

        {/* Tab 1: Account Details */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-0.5">MISSION ROLE</span>
              <span className="text-white font-bold text-sm">{astronaut.role}</span>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-0.5">RESTING HEART RATE</span>
              <span className="text-rose-400 font-bold text-sm">{astronaut.restingHeartRate} BPM</span>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-0.5">BLOOD PRESSURE BASELINE</span>
              <span className="text-cyan-300 font-bold text-sm">{astronaut.bloodPressureBaseline} mmHg</span>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-0.5">KNOWN MEDICAL ALLERGIES</span>
              <span className="text-amber-400 font-bold text-sm">{astronaut.allergies.join(', ') || 'None'}</span>
            </div>
          </div>
        )}

        {/* Tab 2: Mission Progress Tracking */}
        {activeTab === 'progress' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-white font-bold">{isAr ? 'التمارين المنجزة (ARED & T2):' : 'Workouts Logged:'}</span>
              </div>
              <span className="text-emerald-400 font-bold text-sm">42 / 42 Days (100% Adherence)</span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">{isAr ? 'متوسط جودة النوم:' : 'Average Sleep Score:'}</span>
              </div>
              <span className="text-cyan-300 font-bold text-sm">94.8% (Deep Sleep Restored)</span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-white font-bold">{isAr ? 'الجرعة الإشعاعية التراكمية:' : 'Cumulative Radiation Dose:'}</span>
              </div>
              <span className="text-white font-bold text-sm">{astronaut.radiationCumulativeMsv} mSv (Well below 600 mSv limit)</span>
            </div>
          </div>
        )}

        {/* Tab 3: Settings & Privacy */}
        {activeTab === 'settings' && (
          <div className="space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-white font-bold block">{isAr ? 'تشفير القياسات الحيوية المدارية' : 'Biometric Telemetry 256-bit Encryption'}</span>
                <span className="text-[11px] text-slate-400">{isAr ? 'حماية بيانات النبض والإشعاع تحت معايير HIPAA الفضائية' : 'End-to-end encrypted telemetry broadcast'}</span>
              </div>
              <input
                type="checkbox"
                checked={encryptTelemetry}
                onChange={(e) => setEncryptTelemetry(e.target.checked)}
                className="w-4 h-4 text-cyan-500 rounded bg-slate-900 border-slate-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-white font-bold block">{isAr ? 'مزامنة تلقائية مع مركز هيوستن' : 'Auto-Sync to Houston Ground Control'}</span>
                <span className="text-[11px] text-slate-400">{isAr ? 'إرسال ملخص تقارير العلامات الحيوية عند توفر الاتصال' : 'Transmit daily summary when DSN passes'}</span>
              </div>
              <input
                type="checkbox"
                checked={houstonAutoSync}
                onChange={(e) => setHoustonAutoSync(e.target.checked)}
                className="w-4 h-4 text-cyan-500 rounded bg-slate-900 border-slate-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-white font-bold block">{isAr ? 'صفارة الإنذار الصوتية للطوارئ' : 'Audible Two-Tone Emergency Siren'}</span>
                <span className="text-[11px] text-slate-400">{isAr ? 'تفعيل نغمة الإنذار عبر المتصفح في الأزمات القصوى' : 'Allow Web Audio synthesizer in critical alerts'}</span>
              </div>
              <input
                type="checkbox"
                checked={audioSirenAllowed}
                onChange={(e) => setAudioSirenAllowed(e.target.checked)}
                className="w-4 h-4 text-cyan-500 rounded bg-slate-900 border-slate-700 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
