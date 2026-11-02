/**
 * Top Navigation Bar for Remontada — ASTRA HEALTH
 * Includes brand wordmark, single-line links, astronaut avatar status,
 * language switcher ([ EN | العربية ]), lighting mode toggle, and SOS trigger.
 */

import React, { useState } from 'react';
import {
  Globe, Moon, Sun, AlertTriangle, User, LogOut,
  Sparkles, Radio, PhoneCall, ShieldAlert, Rocket
} from 'lucide-react';
import { SpaceTheme, AstronautProfile } from '../types';

interface NavbarProps {
  language: 'en' | 'ar';
  onToggleLanguage: () => void;
  currentTheme: SpaceTheme;
  onChangeTheme: (theme: SpaceTheme) => void;
  astronaut: AstronautProfile;
  isLoggedIn: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenSosModal: () => void;
  onOpenFeelStrangeModal: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  currentTheme,
  onChangeTheme,
  astronaut,
  isLoggedIn,
  onOpenAuthModal,
  onLogout,
  onOpenSosModal,
  onOpenFeelStrangeModal,
  onNavigateToSection,
}) => {
  const isAr = language === 'ar';
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070A11]/90 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Mission Insignia */}
        <div
          onClick={() => onNavigateToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-lg shadow-cyan-500/10">
            <Rocket className="w-5 h-5 -rotate-45 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-black tracking-wider text-white text-lg uppercase group-hover:text-cyan-300 transition-colors">
                REMONTADA
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                ASTRA
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono block -mt-0.5">
              CREW HEALTH GUIDANCE v3.2
            </span>
          </div>
        </div>

        {/* Primary Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-mono">
          <button
            onClick={() => onNavigateToSection('mission')}
            className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isAr ? 'أهداف المهمة' : 'Mission'}
          </button>

          <button
            onClick={() => onNavigateToSection('ai-guide')}
            className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'المرشدة الذكية' : 'AI Guide'}</span>
          </button>

          <button
            onClick={() => onNavigateToSection('telemetry')}
            className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isAr ? 'القياسات الحية' : 'Telemetry'}
          </button>

          <button
            onClick={() => onNavigateToSection('health-matrix')}
            className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isAr ? 'الـ 15 مؤشراً' : '15 Biomarkers'}
          </button>

          <button
            onClick={() => onNavigateToSection('nature-hub')}
            className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isAr ? 'علاج الطبيعة' : 'Nature Hub'}
          </button>

          <button
            onClick={() => onNavigateToSection('comms-call')}
            className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isAr ? 'مكالمة الرائد' : 'Voice Comms'}
          </button>

          <button
            onClick={() => onNavigateToSection('nasa-heritage')}
            className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isAr ? 'أرشيف ناسا' : 'NASA Heritage'}
          </button>
        </nav>

        {/* Right Actions: Feel Strange, Language Switcher, Lighting, SOS, Auth */}
        <div className="flex items-center gap-2.5">
          {/* "Feel Strange?" Direct Button */}
          <button
            onClick={onOpenFeelStrangeModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer"
            title={isAr ? 'هل تشعر بأمر غريب؟' : 'Feeling something strange?'}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{isAr ? 'أشعر بأمر غريب!' : 'Feel Strange?'}</span>
          </button>

          {/* Language Switcher ([ EN | العربية ]) */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-700/80 p-0.5 text-xs font-mono">
            <button
              onClick={() => { if (language !== 'en') onToggleLanguage(); }}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'en'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => { if (language !== 'ar') onToggleLanguage(); }}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'ar'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              العربية
            </button>
          </div>

          {/* Emergency SOS Red Button */}
          <button
            onClick={onOpenSosModal}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-rose-600/90 hover:bg-rose-500 text-white border border-rose-500 flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>

          {/* User Profile / Login */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 pl-1">
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 p-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 transition-colors"
                title={astronaut.name}
              >
                <div className="w-7 h-7 rounded-md bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-bold text-xs">
                  {astronaut.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="hidden md:inline text-xs font-mono font-semibold text-slate-200 pr-1">
                  {astronaut.rank}
                </span>
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                title={isAr ? 'تسجيل الخروج' : 'Sign out'}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-white transition-colors"
            >
              {isAr ? 'تسجيل دخول' : 'Sign In'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
