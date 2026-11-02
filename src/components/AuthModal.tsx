/**
 * Full User Authentication System Modal
 * Features:
 * - User Login (Email / Call-Sign and Password)
 * - User Registration (Name, Call-Sign, Email, Role, Password)
 * - Password Recovery (6-Digit Security Recovery Code)
 * - Instant Demo Account (Cmdr. Alex Vance)
 * - Full bilingual support (English & Arabic)
 */

import React, { useState } from 'react';
import {
  User, KeyRound, Mail, ShieldCheck, X, CheckCircle2,
  AlertCircle, Sparkles, UserPlus, LogIn, Lock
} from 'lucide-react';
import { validateAstronautAuth } from '../utils/telemetryLogic';
import { AstronautProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
  onLoginSuccess: (user: AstronautProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onLoginSuccess,
}) => {
  const isAr = language === 'ar';
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'recovery'>('login');

  // Login form state
  const [emailOrId, setEmailOrId] = useState('alex.vance@remontada.space');
  const [password, setPassword] = useState('astronaut123');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'commander' | 'doctor' | 'specialist' | 'pilot'>('commander');

  // Recovery form state
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryStep, setRecoveryStep] = useState<1 | 2>(1);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const validation = validateAstronautAuth(emailOrId, password);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid credentials');
      return;
    }

    const astronautUser: AstronautProfile = {
      id: 'CDR-842',
      name: emailOrId.includes('@') ? emailOrId.split('@')[0].replace('.', ' ') : emailOrId,
      nameAr: 'القائد أليكس فانس',
      rank: 'Cmdr.',
      rankAr: 'القائد',
      role: 'Mission Commander',
      roleAr: 'قائد المهمة الفضائية',
      avatarUrl: '',
      avatarType: 'commander',
      allergies: ['Penicillin'],
      restingHeartRate: 64,
      bloodPressureBaseline: '118/76',
      missionDurationDays: 42,
      radiationCumulativeMsv: 184.2,
      email: emailOrId,
    };

    setSuccessMessage(isAr ? 'تم توثيق جلسة الطاقم بنجاح!' : 'Astronaut access verified successfully!');
    setTimeout(() => {
      onLoginSuccess(astronautUser);
      onClose();
    }, 700);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim() || !regEmail.trim() || regPassword.length < 6) {
      setErrorMessage(isAr ? 'يرجى ملء كافة الحقول وتحديد كلمة مرور من 6 خانات على الأقل.' : 'Please fill all fields with at least 6-character password.');
      return;
    }

    const newAstro: AstronautProfile = {
      id: `ASTRO-${Math.floor(Math.random() * 900) + 100}`,
      name: regName,
      nameAr: regName,
      rank: regRole === 'commander' ? 'Cmdr.' : regRole === 'doctor' ? 'Dr.' : 'Spec.',
      rankAr: regRole === 'commander' ? 'القائد' : regRole === 'doctor' ? 'د.' : 'الخبير',
      role: regRole.toUpperCase(),
      roleAr: regRole.toUpperCase(),
      avatarUrl: '',
      avatarType: regRole,
      allergies: ['None'],
      restingHeartRate: 66,
      bloodPressureBaseline: '120/80',
      missionDurationDays: 1,
      radiationCumulativeMsv: 12.4,
      email: regEmail,
    };

    setSuccessMessage(isAr ? 'تم إنشاء هوية رائد الفضاء واعتمادها بنجاح!' : 'New astronaut profile registered successfully!');
    setTimeout(() => {
      onLoginSuccess(newAstro);
      onClose();
    }, 800);
  };

  const handleSendRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) return;
    setRecoveryStep(2);
    setSuccessMessage(isAr ? 'تم إرسال رمز الأمان السداسي (849-210) إلى قناتك اللاسلكية.' : '6-digit rescue security code (849-210) transmitted to your comms.');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryCode !== '849-210' && recoveryCode.length < 4) {
      setErrorMessage(isAr ? 'رمز الأمان غير صالح. جرب الرمز التجريبي: 849-210' : 'Invalid security code. Try demo code: 849-210');
      return;
    }
    setSuccessMessage(isAr ? 'تم تحديث كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.' : 'Password reset successful! You may now sign in.');
    setTimeout(() => {
      setAuthMode('login');
      setRecoveryStep(1);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#0E1524] border border-cyan-500/50 rounded-2xl p-6 md:p-8 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mode switcher tabs */}
        <div className="flex border-b border-slate-800 pb-3 mb-6">
          <button
            onClick={() => { setAuthMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 text-center pb-2 text-xs font-mono font-bold transition-colors border-b-2 ${
              authMode === 'login' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'تسجيل الدخول' : 'Sign In'}
          </button>

          <button
            onClick={() => { setAuthMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 text-center pb-2 text-xs font-mono font-bold transition-colors border-b-2 ${
              authMode === 'register' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'إنشاء حساب جديد' : 'Register'}
          </button>

          <button
            onClick={() => { setAuthMode('recovery'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 text-center pb-2 text-xs font-mono font-bold transition-colors border-b-2 ${
              authMode === 'recovery' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'استعادة الرمز' : 'Recovery'}
          </button>
        </div>

        {/* Messages */}
        {errorMessage && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* LOGIN FORM                                              */}
        {/* ======================================================== */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                {isAr ? 'البريد أو رمز النداء الفضائي:' : 'Astronaut Email or Call-Sign:'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  placeholder="alex.vance@remontada.space"
                />
                <User className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                {isAr ? 'رمز الحماية السري (كلمة المرور):' : 'Security Passcode:'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {isAr ? 'توثيق الدخول للمنظومة' : 'Authorize Crew Access'}
            </button>

            <button
              type="button"
              onClick={() => {
                setEmailOrId('alex.vance@remontada.space');
                setPassword('astronaut123');
              }}
              className="w-full py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 text-xs font-mono transition-colors"
            >
              {isAr ? 'دخول تجريبي سريع (القائد فانس)' : 'Instant Demo Login (Cmdr. Alex Vance)'}
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* REGISTER FORM                                           */}
        {/* ======================================================== */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 font-sans">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                {isAr ? 'اسم رائد الفضاء كاملاً:' : 'Full Astronaut Name:'}
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Dr. Elena Rostova"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                {isAr ? 'البريد المداري:' : 'Orbital Email:'}
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="elena.rostova@remontada.space"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                {isAr ? 'الموقع والتخصص في المهمة:' : 'Mission Specialization:'}
              </label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none font-mono"
              >
                <option value="commander">{isAr ? 'قائد المهمة (CDR)' : 'Mission Commander (CDR)'}</option>
                <option value="doctor">{isAr ? 'طبيب الطاقم والجراح (CMO)' : 'Flight Surgeon / CMO'}</option>
                <option value="specialist">{isAr ? 'خبير السير في الفضاء والروبوتات (MS)' : 'EVA Robotics Specialist (MS)'}</option>
                <option value="pilot">{isAr ? 'طيار الملاحة المدارية (PLT)' : 'Flight Navigation Pilot (PLT)'}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                {isAr ? 'رمز الحماية السري (6 خانات على الأقل):' : 'Passcode (Min 6 chars):'}
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {isAr ? 'إنشاء بيانات اعتماد رائد الفضاء' : 'Enlist Astronaut Credentials'}
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* RECOVERY FORM                                           */}
        {/* ======================================================== */}
        {authMode === 'recovery' && (
          <div className="space-y-4">
            {recoveryStep === 1 ? (
              <form onSubmit={handleSendRecovery} className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr
                    ? 'أدخل بريدك الإلكتروني المسجل لإرسال رمز الإنقاذ الفضائي المكون من 6 أرقام.'
                    : 'Enter your registered email to receive a 6-digit orbital rescue code.'}
                </p>

                <div>
                  <input
                    type="email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="alex.vance@remontada.space"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer"
                >
                  {isAr ? 'إرسال رمز الإنقاذ السداسي' : 'Transmit Rescue Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    {isAr ? 'رمز الأمان السداسي (Demo: 849-210):' : 'Enter 6-Digit Code (Demo: 849-210):'}
                  </label>
                  <input
                    type="text"
                    required
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    placeholder="849-210"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono text-center tracking-widest font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    {isAr ? 'كلمة المرور الجديدة:' : 'New Security Passcode:'}
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer"
                >
                  {isAr ? 'إعادة ضبط وحفظ كلمة المرور' : 'Save New Passcode'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
