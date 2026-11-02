/**
 * NASA Spaceflight Medicine Heritage Archive & Add Project Modal
 * Features:
 * - Authentic Apollo Quindar Beep audio player (2525Hz / 2475Hz)
 * - Deep Space Network (DSN) tracking strip
 * - Historic NASA missions (Mercury, Gemini, Apollo 11/13, Skylab 4, Shuttle, Mir, Neurolab, NEEMO, CHAPEA, Artemis)
 * - Interactive "+ Add NASA Project" custom mission registration with localStorage
 */

import React, { useState, useEffect } from 'react';
import {
  Radio, Volume2, Plus, Sparkles, Orbit, Award,
  CheckCircle2, Clock, Trash2, X, ChevronRight
} from 'lucide-react';
import { audioComms } from '../utils/audioComms';
import { NasaProjectItem } from '../types';

interface NasaHeritageSectionProps {
  language: 'en' | 'ar';
}

export const NasaHeritageSection: React.FC<NasaHeritageSectionProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedEra, setSelectedEra] = useState<'all' | 'early' | 'shuttle' | 'deepspace'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Initial NASA projects
  const initialProjects: NasaProjectItem[] = [
    {
      id: 'apollo11',
      name: 'Apollo 11 & Lunar Pack',
      era: 'early',
      years: '1969',
      keyMission: 'First Crewed Lunar Landing (Armstrong & Aldrin)',
      breakthroughEn: 'Apollo Medical Kit (No. SEB-12100018-202): 12 morphine ampoules, motion sickness cyclizine, and 100% Earth-dependent S-band voice.',
      breakthroughAr: 'حقيبة أبولو الطبية القماشية (12 أمبولة مورفين، أدوية دوار الحركة، والاعتماد بنسبة 100% على راديو الأرض).',
      flightSurgeonNoteEn: 'Ground flight surgeons manually calculated cardiac telemetry via electrocardiograph leads taped to chest.',
      flightSurgeonNoteAr: 'أطباء هيوستن كانوا يحللون تخطيط القلب يدوياً عبر لاصقات الصدر القماشية المنقولة لاسلكياً.',
      hardwareEn: 'Canvas Roll-Up Pack & Bio-Belt',
      hardwareAr: 'الحقيبة القماشية الملفوفة وحزام القياس الحيوي',
      astraEvolutionEn: 'ASTRA replaces static kits with autonomous RFID locker tracking and edge AI diagnostic formulation.',
      astraEvolutionAr: 'أسترا هيلث تستبدل الحقيبة القماشية بخزانة ذكية تتعقب الصلاحية ذاتياً وتقدم التشخيص دون انتظار الأرض.',
    },
    {
      id: 'skylab4',
      name: 'Skylab 4 Orbital Workshop',
      era: 'early',
      years: '1973–1974',
      keyMission: '84-Day Record Human Spaceflight',
      breakthroughEn: 'Pioneered zero-gravity athletic physiology: invented the first space cycle ergometer and Lower Body Negative Pressure (LBNP) chamber.',
      breakthroughAr: 'ولادة علوم الرياضة الفضائية: ابتكار أول دراجة هوائية فضائية وحجرة الضغط السلبي السفلي LBNP.',
      flightSurgeonNoteEn: 'Proved that 1.5 hours of daily vigorous pedaling prevented catastrophic cardiovascular deconditioning.',
      flightSurgeonNoteAr: 'إثبات أن ساعة ونصف من التمارين اليومية تحمي رواد الفضاء من الانهيار الدوراني بعد العودة.',
      hardwareEn: 'Skylab Ergometer & LBNP Cylinder',
      hardwareAr: 'دراجة سكايلاب واسطوانة الضغط السلبي',
      astraEvolutionEn: 'ASTRA digitizes LBNP sessions and predicts fluid volume redistribution directly to suit sensors.',
      astraEvolutionAr: 'يقوم نظام أسترا بجدولة جلسات الضغط السلبي آلياً وحساب حجم السوائل المنتقلة للصدر بدقة.',
    },
    {
      id: 'sts-neurolab',
      name: 'STS-90 Neurolab Spacelab',
      era: 'shuttle',
      years: '1998',
      keyMission: 'Columbia Dedicated Neuro-Science Mission',
      breakthroughEn: 'Proved mammalian neuroplasticity in zero gravity: vestibulo-ocular pathways dynamically adapt to microgravity within 48 hours.',
      breakthroughAr: 'إثبات المرونة العصبية في انعدام الوزن: قدرة الدماغ على إعادة ضبط التوازن البصري الحركي خلال 48 ساعة.',
      flightSurgeonNoteEn: 'Demonstrated neuro-vestibular sensory conflict as the root cause of Space Motion Sickness (SMS).',
      flightSurgeonNoteAr: 'تأكيد أن التعارض بين إشارات العين والأذن الداخلية هو المسبب الرئيسي لدوار الحركة الفضائي.',
      hardwareEn: 'Spacelab Rotating Chair & Eye Trackers',
      hardwareAr: 'كرسي الدوران المعزول ومستشعرات حركة العين',
      astraEvolutionEn: 'ASTRA provides non-pharmacological neuro-acoustics and biophilic nature audio to restore vestibulo-ocular calmness.',
      astraEvolutionAr: 'أسترا توفر تقنيات التهدئة العصبية السمعية وواحة الطبيعة لإعادة التوازن العصبي دون أدوية منومة.',
    },
    {
      id: 'neemo',
      name: 'NASA NEEMO Undersea Analog',
      era: 'shuttle',
      years: '2001–Present',
      keyMission: 'Aquarius Reef Base (Key Largo, 20m Depth)',
      breakthroughEn: 'Tested surgical telementoring under 20-minute signal delay, proving non-physician astronauts can execute complex clinical emergency procedures with step-by-step AI guidance.',
      breakthroughAr: 'اختبار الجراحة المدارية تحت تأخير 20 دقيقة، وإثبات قدرة رواد الفضاء غير الأطباء على تطبيق الطوارئ بتوجيه الذكاء الاصطناعي.',
      flightSurgeonNoteEn: 'Highlighted the critical necessity of voice-free HUD checklists during acute stress.',
      flightSurgeonNoteAr: 'التأكيد على ضرورة شاشات الطوارئ التي تعمل باللمس السريع دون الحاجة للكلام تحت ضغط الأزمات.',
      hardwareEn: 'Aquarius Habitat & Tele-Robotics',
      hardwareAr: 'قاعدة أكواريوس المغمورة وروبوتات الجراحة',
      astraEvolutionEn: 'ASTRA’s Check My Health provides 3-step symptom guidance engineered for non-physician crew.',
      astraEvolutionAr: 'يوفر نظام أسترا فحصاً ثلاثي الخطوات مصمماً خصيصاً لرواد الفضاء غير المتخصصين في الطب.',
    },
    {
      id: 'chapea',
      name: 'CHAPEA Mars Exploration Analog',
      era: 'deepspace',
      years: '2023–Present',
      keyMission: 'Mars Dune Alpha 378-Day Sealed Simulation',
      breakthroughEn: 'Simulated 378 days of continuous Mars surface operations with 22-minute light-speed communication delays and strict resource rationing.',
      breakthroughAr: 'محاكاة 378 يوماً متواصلاً لبيئة المريخ تحت تأخير اتصال ضوئي 22 دقيقة وتقنين دقيق للموارد.',
      flightSurgeonNoteEn: 'Discovered that isolation distress correlates inversely with structured physical exercise and nature exposure.',
      flightSurgeonNoteAr: 'اكتشاف أن توتر العزلة ينخفض طردياً مع الالتزام بالرياضة اليومية والتعرض لمشاهد الطبيعة.',
      hardwareEn: '3D-Printed Mars Habitat & VR Rigs',
      hardwareAr: 'مستعمرة المريخ المطبوعة ثلاثياً ونظم الواقع الافتراضي',
      astraEvolutionEn: 'ASTRA embeds Earth biophilic sensory simulations and automated psychological check-in cards.',
      astraEvolutionAr: 'أسترا تدمج واحة الطبيعة الأرضية وبطاقات الفحص النفسي الذكية لدعم رواد المريخ.',
    },
    {
      id: 'artemis-gateway',
      name: 'Artemis & Lunar Gateway',
      era: 'deepspace',
      years: '2025+',
      keyMission: 'Deep Space Human Lunar & Mars Outpost',
      breakthroughEn: 'Autonomous Clinical Medical System (CMS) featuring zero-cloud AI diagnostic algorithms and radiation storm shelters.',
      breakthroughAr: 'النظام الطبي السريري الذاتي (CMS) الذي يعتمد على الذكاء الاصطناعي المحلي وملاجئ العواصف الإشعاعية.',
      flightSurgeonNoteEn: 'Deep-space cruise demands 100% crew autonomy; ground mission control serves purely as retrospective auditors.',
      flightSurgeonNoteAr: 'رحلات الفضاء السحيق تتطلب استقلالية طبية تامة بنسبة 100% ويكون دور الأرض استشارياً لاحقاً.',
      hardwareEn: 'Orion Medical Kit & Bio-Rad Sensors',
      hardwareAr: 'حقيبة أوريون الطبية وحساسات الإشعاع الحيوي',
      astraEvolutionEn: 'ASTRA is built from the ground up as the open-source software stack for Artemis deep-space missions.',
      astraEvolutionAr: 'تم تصميم نظام أسترا هيلث ليكون النواة البرمجية المفتوحة لرعاية رواد فضاء برنامج أرتميس.',
    },
  ];

  const [projects, setProjects] = useState<NasaProjectItem[]>(() => {
    const saved = localStorage.getItem('astra_custom_nasa_projects');
    if (saved) {
      try {
        return [...initialProjects, ...JSON.parse(saved)];
      } catch {
        return initialProjects;
      }
    }
    return initialProjects;
  });

  // Form state for + Add Project
  const [formName, setFormName] = useState('');
  const [formYears, setFormYears] = useState('');
  const [formMission, setFormMission] = useState('');
  const [formBreakthrough, setFormBreakthrough] = useState('');
  const [formEvolution, setFormEvolution] = useState('');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newProject: NasaProjectItem = {
      id: `custom_${Date.now()}`,
      name: formName,
      era: 'deepspace',
      years: formYears || '2026',
      keyMission: formMission || 'Autonomous Flight Case Study',
      breakthroughEn: formBreakthrough || 'Biomedical sensor innovation.',
      breakthroughAr: formBreakthrough || 'ابتكار في استشعار المؤشرات الحيوية الفضائية.',
      flightSurgeonNoteEn: 'Recorded by Crew Flight Surgeon.',
      flightSurgeonNoteAr: 'تم التوثيق بواسطة طبيب الطاقم المداري.',
      hardwareEn: 'Onboard Custom Biometrics',
      hardwareAr: 'أجهزة قياس مدارية مخصصة',
      astraEvolutionEn: formEvolution || 'Integrated directly into ASTRA HEALTH telemetry.',
      astraEvolutionAr: formEvolution || 'تم دمجها في قياسات أسترا هيلث.',
      isCustom: true,
    };

    const updated = [...projects, newProject];
    setProjects(updated);

    // Save custom projects to localStorage
    const customOnly = updated.filter((p) => p.isCustom);
    localStorage.setItem('astra_custom_nasa_projects', JSON.stringify(customOnly));

    setIsAddModalOpen(false);
    setFormName('');
    setFormYears('');
    setFormMission('');
    setFormBreakthrough('');
    setFormEvolution('');
  };

  const deleteCustomProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    const customOnly = updated.filter((p) => p.isCustom);
    localStorage.setItem('astra_custom_nasa_projects', JSON.stringify(customOnly));
  };

  const filteredProjects =
    selectedEra === 'all'
      ? projects
      : projects.filter((p) => p.era === selectedEra || p.isCustom);

  return (
    <section id="nasa-heritage" className="py-16 bg-[#070A11] border-t border-cyan-500/20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              <Orbit className="w-3.5 h-3.5" />
              <span>NASA SPACE MEDICINE CHRONOLOGY (1958–PRESENT)</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
              {isAr ? 'أرشيف ناسا لتاريخ طب الفضاء والمهمات التاريخية' : 'NASA Spaceflight Medicine Heritage Archive'}
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              {isAr
                ? 'تطور الرعاية الطبية من أحزمة أبولو 11 إلى الذكاء الاصطناعي الذاتي في أسترا هيلث'
                : 'Tracing space clinical engineering from Apollo canvas bio-packs to ASTRA autonomous edge AI.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Play Quindar Beep Button */}
            <button
              onClick={() => audioComms.playQuindar('intro')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-slate-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{isAr ? 'نغمة كويندار أبولو (2525 Hz)' : 'Play Quindar Tone'}</span>
            </button>

            {/* + Add NASA Project Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? '+ إضافة مشروع ناسا' : '+ Add NASA Project'}</span>
            </button>
          </div>
        </div>

        {/* Deep Space Network (DSN) Real-Time Status Strip */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px]">GOLDSTONE (DSS-14)</span>
              <span className="text-white font-bold">70m S-Band Lock</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px]">MADRID (DSS-63)</span>
              <span className="text-white font-bold">Ka-Band Telemetry</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px]">CANBERRA (DSS-43)</span>
              <span className="text-white font-bold">Deep Space Uplink</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* Era Filter Toolbar */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedEra('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedEra === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'كافة الحقب' : 'All Eras'}
          </button>
          <button
            onClick={() => setSelectedEra('early')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedEra === 'early'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'الحقبة المبكرة (1958-1975)' : 'Early Era (1958-1975)'}
          </button>
          <button
            onClick={() => setSelectedEra('shuttle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedEra === 'shuttle'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'المكوك والمحطات (1981-2019)' : 'Shuttle & Stations (1981-2019)'}
          </button>
          <button
            onClick={() => setSelectedEra('deepspace')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedEra === 'deepspace'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'الفضاء السحيق والتناظري (2020+)' : 'Deep Space & Analogs (2020+)'}
          </button>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-[#0E1524] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {p.years}
                  </span>
                  {p.isCustom && (
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        ★ Custom
                      </span>
                      <button
                        onClick={() => deleteCustomProject(p.id)}
                        className="text-slate-500 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {p.name}
                </h3>

                <span className="text-xs font-mono text-slate-400 block mt-1">
                  {p.keyMission}
                </span>

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-300 block">
                      {isAr ? 'الإنجاز الطبي:' : 'Biomedical Breakthrough:'}
                    </span>
                    <p className="text-slate-300/80 leading-relaxed">
                      {isAr ? p.breakthroughAr : p.breakthroughEn}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 mt-3">
                    <span className="font-bold text-cyan-300 block mb-1">
                      {isAr ? 'تطور أسترا هيلث:' : 'ASTRA Evolution:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {isAr ? p.astraEvolutionAr : p.astraEvolutionEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add NASA Project */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg bg-[#0E1524] border border-cyan-500/50 rounded-2xl p-6 md:p-8 shadow-2xl">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-white mb-1">
                {isAr ? 'إضافة مشروع فضائي أو دراسة حالة لناسا' : 'Register NASA Project / Flight Mission'}
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                {isAr
                  ? 'سيتم حفظ المشروع في قاعدة بيانات أسترا هيلث وربطه بالمنظومة الطبية'
                  : 'Mission will be saved in ASTRA local telemetry database.'}
              </p>

              <form onSubmit={handleAddProject} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">{isAr ? 'اسم المشروع / المهمة' : 'Project / Mission Name:'}</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Project Gemini 7 / HERA Analog"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">{isAr ? 'السنوات / الحقبة' : 'Years / Era:'}</label>
                    <input
                      type="text"
                      value={formYears}
                      onChange={(e) => setFormYears(e.target.value)}
                      placeholder="e.g. 1965 / 2024"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">{isAr ? 'المهمة الأساسية' : 'Key Mission:'}</label>
                    <input
                      type="text"
                      value={formMission}
                      onChange={(e) => setFormMission(e.target.value)}
                      placeholder="e.g. 14-day zero-G endurance"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{isAr ? 'الإنجاز الطبي الفضائي' : 'Biomedical Breakthrough:'}</label>
                  <textarea
                    rows={2}
                    value={formBreakthrough}
                    onChange={(e) => setFormBreakthrough(e.target.value)}
                    placeholder="e.g. First bungee-cord in-flight exerciser deployed..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{isAr ? 'كيف طوّرته أسترا هيلث؟' : 'ASTRA Evolution:'}</label>
                  <textarea
                    rows={2}
                    value={formEvolution}
                    onChange={(e) => setFormEvolution(e.target.value)}
                    placeholder="e.g. Real-time predictive cardiovascular deconditioning algorithms..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                  >
                    Save Mission
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
