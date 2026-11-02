/**
 * Interface and Key Capabilities Details Section
 * Incorporates all 7 requested capability pillars with high-contrast HUD cards.
 */

import React from 'react';
import {
  Clock, UserCheck, ShieldPlus, Sparkles, ShieldAlert,
  TrendingUp, Database, ChevronRight
} from 'lucide-react';

interface CapabilitiesSectionProps {
  language: 'en' | 'ar';
  onNavigateToSection?: (sectionId: string) => void;
  onOpenSosModal?: () => void;
  onOpenAuthModal?: () => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  language,
  onNavigateToSection,
  onOpenSosModal,
  onOpenAuthModal,
}) => {
  const isAr = language === 'ar';

  const capabilities = [
    {
      num: '01',
      icon: Clock,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
      titleEn: 'Top Header & Telemetry',
      titleAr: 'الشريط العلوي والقياسات الحيوية الفضائية',
      descEn: 'Displays system name (ASTRA HEALTH, v3.2), real-time Mission Elapsed Time (MET) counter, telemetry status, and Earth communication light-delay indicator (14m 24s).',
      descAr: 'يعرض اسم النظام (ASTRA HEALTH, v3.2)، عداد زمن المهمة المنقضي (MET) لحظياً، حالة البيانات، ومؤشر تأخير الاتصال بالأرض (14 دقيقة و 24 ثانية).',
      actionSection: 'telemetry',
    },
    {
      num: '02',
      icon: UserCheck,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
      titleEn: 'Personal Health Profile',
      titleAr: 'الملف الصحي لرائد الفضاء',
      descEn: 'Astronaut ID, resting vitals baselines, allergies, NASA-STD-3001 protocols, and quick presets for crew members (Cmdr. Alex Vance, Dr. Elena Rostova, Specialist Marcus Chen).',
      descAr: 'الرقم التعريفي للرائد، المؤشرات الحيوية الأساسية، الحساسيات، بروتوكولات NASA-STD-3001، وملفات سريعة للطاقم (القائد أليكس فانس، الدكتورة إيلينا روستوفا، الخبير ماركوس تشن).',
      actionSection: 'profile',
    },
    {
      num: '03',
      icon: ShieldPlus,
      color: 'text-sky-400 border-sky-500/30 bg-sky-950/20',
      titleEn: 'Medical Kit & Training',
      titleAr: 'الحقيبة الطبية والتدريب التفاعلي',
      descEn: 'Onboard pharmacy inventory tracking, expiration alerts, and interactive NASA-STD-3001 first-aid quizzes.',
      descAr: 'تتبع مخزون الصيدلية الذكية على متن المركبة، تنبيهات انتهاء الصلاحية، واختبارات الإسعافات الأولية المعتمدة من ناسا.',
      actionSection: 'interactive-preview',
    },
    {
      num: '04',
      icon: Sparkles,
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/20',
      titleEn: 'AI Medical Assistant (Check My Health)',
      titleAr: 'المساعد الطبي الذكي (افحص صحتي)',
      descEn: 'Guided 3-step symptom collection, biometric sensor telemetry imports, and AI-powered diagnostic guidance using Gemini.',
      descAr: 'جمع الأعراض في 3 خطوات إرشادية، استيراد بيانات الحساسات البيومترية، وتشخيص سريري دقيق مدعوم بذكاء Gemini.',
      actionSection: 'interactive-preview',
    },
    {
      num: '05',
      icon: ShieldAlert,
      color: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
      titleEn: 'Emergency SOS System',
      titleAr: 'نظام طوارئ الاستغاثة الفضائية SOS',
      descEn: 'Red EMERGENCY SOS button accessible from every screen with an audible two-tone browser siren, full-screen HUD, and voice-free status chips.',
      descAr: 'زر طوارئ أحمر فوري متاح من كل شاشات النظام، مع صفارة إنذار ثنائية النغمة وواجهة سريعة تعمل باللمس بدون الحاجة للكلام.',
      actionSection: 'sos',
    },
    {
      num: '06',
      icon: TrendingUp,
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
      titleEn: 'Health Trends & Reporting',
      titleAr: 'سجل الاتجاهات والتقارير الطبية',
      descEn: 'Visual longitudinal charts for vitals and one-click exportable clinical telemetry reports for Mission Control.',
      descAr: 'مخططات بيانية زمنية للعلامات الحيوية، مع إمكانية تصدير تقارير سريرية شاملة وإرسالها لمركز التحكم في هيوستن بضغطة واحدة.',
      actionSection: 'telemetry',
    },
    {
      num: '07',
      icon: Database,
      color: 'text-teal-400 border-teal-500/30 bg-teal-950/20',
      titleEn: 'Multimodal & Bioscience Hub',
      titleAr: 'بوابة العلوم الحيوية والأبحاث',
      descEn: 'Integration with openFDA, PubMed, NASA Research References, neuro-acoustics sleep induction audio, and AI medical imaging/video generation.',
      descAr: 'ربط مباشر بقواعد openFDA و PubMed ومراجع ناسا الطبية، وتوليد مقاطع صوتية مهدئة للنوم وعروض طبية بالذكاء الاصطناعي.',
      actionSection: 'nature-hub',
    },
  ];

  return (
    <section id="capabilities" className="py-16 bg-[#0A0E17] border-t border-cyan-500/20 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-2">
            <span>CORE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'تفاصيل الواجهة والبيانات الطبية' : 'Interface and Data Details'}
          </h2>

          <p className="mt-2 text-sm md:text-base text-slate-400">
            {isAr
              ? 'الركائز السبع الأساسية لنظام أسترا هيلث (ASTRA HEALTH v3.2) لضمان استقلالية الرعاية الطبية في الفضاء السحيق.'
              : 'The seven architectural pillars powering autonomous deep-space clinical care and crew resilience.'}
          </p>
        </div>

        {/* 7 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-[#0E1524] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-cyan-500/50 transition-colors">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed font-sans">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    NASA-STD-3001 COMPLIANT
                  </span>

                  <button
                    onClick={() => {
                      if (item.actionSection === 'sos' && onOpenSosModal) {
                        onOpenSosModal();
                      } else if (item.actionSection === 'profile' && onOpenAuthModal) {
                        onOpenAuthModal();
                      } else if (onNavigateToSection && item.actionSection) {
                        onNavigateToSection(item.actionSection);
                      }
                    }}
                    className="text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isAr ? 'عرض القسم' : 'Explore'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
