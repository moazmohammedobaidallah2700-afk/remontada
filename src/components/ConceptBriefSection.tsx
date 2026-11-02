/**
 * Concept in Brief Section
 * Exactly incorporates:
 * "The project is a User Interface (UI) for a comprehensive medical application
 * designed for astronauts. Its primary goal is to monitor their health and solve
 * medical issues during deep-space missions. The application is designed with a dark
 * technical theme (Dark Mode) suitable for the space environment."
 */

import React from 'react';
import { Eye, Shield, Moon, Cpu, Sparkles } from 'lucide-react';

interface ConceptBriefSectionProps {
  language: 'en' | 'ar';
}

export const ConceptBriefSection: React.FC<ConceptBriefSectionProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="concept" className="py-16 bg-[#070A11] border-t border-cyan-500/20 text-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#0E1524] border border-cyan-500/40 rounded-3xl p-8 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'الملخص التعريفي للمشروع' : 'PROJECT CONCEPT IN BRIEF'}</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            {isAr
              ? 'الواجهة الطبية الشاملة لرواد فضاء الرحلات السحيقة'
              : 'The Comprehensive Deep-Space Medical Interface'}
          </h2>

          {/* EXACT REQUIRED BRIEF STATEMENT */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border-l-4 border-cyan-400 border border-slate-800 shadow-xl mb-6">
            <p className="text-lg md:text-xl font-bold text-cyan-100 font-sans leading-relaxed">
              {isAr
                ? 'المشروع عبارة عن واجهة مستخدم (UI) لتطبيق طبي شامل مصمم لرواد الفضاء. هدفه الأساسي هو مراقبة صحتهم وحل المشكلات الطبية أثناء مهام الفضاء السحيق. تم تصميم التطبيق بمظهر تقني داكن (الوضع الداكن) مناسب لبيئة الفضاء.'
                : 'The project is a User Interface (UI) for a comprehensive medical application designed for astronauts. Its primary goal is to monitor their health and solve medical issues during deep-space missions. The application is designed with a dark technical theme (Dark Mode) suitable for the space environment.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {isAr ? 'حماية الرؤية الليلية (Dark HUD)' : 'Dark Technical Scotopic HUD'}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isAr
                    ? 'يمنع إجهاد العين أثناء مراقبة الشاشات في ظلام الكابينة ويحافظ على تكيف الرؤية مع ضوء النجوم.'
                    : 'Engineered for zero cabin glare, preserving rhodopsin dark adaptation during nighttime maneuvers.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {isAr ? 'حل المشكلات الطبية بدون تأخير الأرض' : 'Zero-Latency Clinical Autonomy'}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isAr
                    ? 'تشخيص فوري للأعراض ووصف جرعات الصيدلية الذكية حتى في حال انقطاع الاتصال بالأرض.'
                    : 'Provides autonomous diagnostic guidance and medication dosages when Earth communication is cut.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
