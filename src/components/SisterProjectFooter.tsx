/**
 * Sister Project Call-To-Action & Application Footer
 * Features:
 * - Prominent Call-To-Action linking to complementary space project:
 *   https://ai.studio/apps/50f511a5-0571-423b-8b70-73100fc113e7
 * - Copy link button with toast feedback
 * - Explanation that this leads to a complementary or related spaceflight initiative
 * - NASA-STD-3001 and Apache 2.0 open-source footer notice
 */

import React, { useState } from 'react';
import {
  ExternalLink, Copy, Check, Rocket, Sparkles, Heart,
  Shield, Globe, HelpCircle, FileText
} from 'lucide-react';

interface SisterProjectFooterProps {
  language: 'en' | 'ar';
  onOpenHelpModal: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const SisterProjectFooter: React.FC<SisterProjectFooterProps> = ({
  language,
  onOpenHelpModal,
  onNavigateToSection,
}) => {
  const isAr = language === 'ar';
  const sisterProjectUrl = 'https://ai.studio/apps/50f511a5-0571-423b-8b70-73100fc113e7';
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sisterProjectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-cyan-500/20 bg-[#070A11] text-slate-400">
      {/* ======================================================== */}
      {/* SISTER PROJECT CALL-TO-ACTION SECTION                    */}
      {/* ======================================================== */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-[#0E1524] to-[#070A11] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'مبادرة مكملة وشراكة فضائية' : 'COMPLEMENTARY SPACEFLIGHT INITIATIVE'}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isAr
              ? 'المشروع الشقيق: استكشف المنظومة الطبية المكملة لرواد الفضاء'
              : 'Experience the Sister Project: Complementary Space Health Initiative'}
          </h2>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed mb-8">
            {isAr
              ? 'ندعوكم لزيارة المشروع الشقيق المكمل، المصمم لدعم مهام الفضاء السحيق عبر تقنيات الاستشعار الحيوي القابلة للارتداء والتحليلات الطبية المتقدمة لطاقم المحطة الفضائية.'
              : 'We invite you to launch our sister project—a complementary aerospace health initiative engineered for deep space crew telemetry, wearable biosensor synchronization, and Mission Control clinical analytics.'}
          </p>

          {/* URL Box & Action Buttons */}
          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left font-mono text-xs overflow-hidden w-full sm:w-auto">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">
                {isAr ? 'رابط المشروع المكمل:' : 'COMPLEMENTARY INITIATIVE URL:'}
              </span>
              <span className="text-cyan-300 truncate block font-semibold text-xs sm:text-sm">
                {sisterProjectUrl}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                title={isAr ? 'نسخ الرابط' : 'Copy link'}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
              </button>

              <a
                href={sisterProjectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30 cursor-pointer"
              >
                <span>{isAr ? 'زيارة المشروع الشقيق' : 'Launch Sister App'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FOOTER DIRECTORY & ATTRIBUTIONS                          */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Rocket className="w-5 h-5 text-cyan-400 -rotate-45" />
              <span className="font-sans font-black tracking-wider text-lg uppercase">
                REMONTADA — ASTRA HEALTH
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isAr
                ? 'مشروع ريمونتادا (ASTRA HEALTH) — نظام التوجيه الصحي والبدني الذاتي لرواد الفضاء، صُمم وفق المعايير الطبية الفضائية NASA-STD-3001 وأبحاث ناسا لعلوم الإنسان.'
                : 'Autonomous Crew Health Guidance System built under NASA-STD-3001 medical standards, empowering astronauts to monitor vitals, maintain physical fitness, and receive instant clinical AI triage.'}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              {isAr ? 'روابط المنظومة' : 'Subsystems'}
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigateToSection('telemetry')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isAr ? 'تخطيط القلب الحي' : 'Lead-II ECG Cockpit'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('health-matrix')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isAr ? 'الـ 15 مؤشراً فسيولوجياً' : '15 Vital Biomarkers'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('nature-hub')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isAr ? 'واحة الطبيعة والأرض' : 'Earth Nature Sanctuary'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('comms-call')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isAr ? 'الاتصال برائد الفضاء' : 'In-Suit Comms Radio'}
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Standards */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              {isAr ? 'الدعم والمعايير' : 'Compliance & Help'}
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={onOpenHelpModal}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isAr ? 'الأسئلة الشائعة والدعم' : 'Searchable FAQ & Help'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('nasa-heritage')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isAr ? 'أرشيف ناسا الطبي' : 'NASA Heritage Archive'}
                </button>
              </li>
              <li className="text-slate-500">
                NASA-STD-3001 Vol 1 & 2
              </li>
              <li className="text-slate-500">
                Open Source (Apache 2.0)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <span>
            © 2026 Remontada — ASTRA HEALTH. All mission telemetry simulated under spaceflight protocols.
          </span>
          <span className="text-cyan-400/80">
            MET +001:16:31:32 • DEEP SPACE ORBIT
          </span>
        </div>
      </div>
    </footer>
  );
};
