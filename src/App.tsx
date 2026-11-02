/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Remontada — ASTRA HEALTH (Autonomous Crew Health Guidance System)
 * An autonomous spaceflight clinical platform, AI Doctor Avatar,
 * cognitive challenges suite, Earth & Nature sensory restoration hub,
 * and NASA spaceflight medicine heritage archive.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CrewHealthCheckCards } from './components/CrewHealthCheckCards';
import { CognitiveChallengesSuite } from './components/CognitiveChallengesSuite';
import { NasaSpaceGamesSuite } from './components/NasaSpaceGamesSuite';
import { AIAvatarGuide } from './components/AIAvatarGuide';
import { AstronautAvatarCallSection } from './components/AstronautAvatarCallSection';
import { MissionObjectiveSection } from './components/MissionObjectiveSection';
import { AISolutionOverviewSection } from './components/AISolutionOverviewSection';
import { ConceptBriefSection } from './components/ConceptBriefSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { InteractiveBodyMap } from './components/InteractiveBodyMap';
import { NasaCountermeasuresHub } from './components/NasaCountermeasuresHub';
import { DailyTasksTimeline } from './components/DailyTasksTimeline';
import { TelemetryCockpit } from './components/TelemetryCockpit';
import { HealthMatrixSection } from './components/HealthMatrixSection';
import { NatureTherapyHub } from './components/NatureTherapyHub';
import { NasaHeritageSection } from './components/NasaHeritageSection';
import { InteractivePreviewShowcase } from './components/InteractivePreviewShowcase';
import { SisterProjectFooter } from './components/SisterProjectFooter';

// Modals
import { FeelStrangeModal } from './components/FeelStrangeModal';
import { EmergencySosModal } from './components/EmergencySosModal';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { HelpSupportModal } from './components/HelpSupportModal';

import { AstronautProfile, SpaceTheme } from './types';
import { audioComms } from './utils/audioComms';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');
  const [currentTheme, setCurrentTheme] = useState<SpaceTheme>('deep-cyan');

  // Crew Presets
  const astronautPresets: AstronautProfile[] = [
    {
      id: 'CDR-842',
      name: 'Cmdr. Alex Vance',
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
      email: 'alex.vance@remontada.space',
    },
    {
      id: 'CMO-310',
      name: 'Dr. Elena Rostova',
      nameAr: 'د. إيلينا روستوفا',
      rank: 'Dr.',
      rankAr: 'دكتورة',
      role: 'Crew Medical Officer',
      roleAr: 'طبيبة الطاقم والجراحة المدارية',
      avatarUrl: '',
      avatarType: 'doctor',
      allergies: ['Sulfa drugs'],
      restingHeartRate: 58,
      bloodPressureBaseline: '112/72',
      missionDurationDays: 42,
      radiationCumulativeMsv: 172.0,
      email: 'elena.rostova@remontada.space',
    },
    {
      id: 'MS-519',
      name: 'Specialist Marcus Chen',
      nameAr: 'الخبير ماركوس تشن',
      rank: 'Spec.',
      rankAr: 'الخبير',
      role: 'EVA & Robotics Specialist',
      roleAr: 'خبير السير في الفضاء والروبوتات',
      avatarUrl: '',
      avatarType: 'specialist',
      allergies: ['None'],
      restingHeartRate: 70,
      bloodPressureBaseline: '122/80',
      missionDurationDays: 42,
      radiationCumulativeMsv: 191.5,
      email: 'marcus.chen@remontada.space',
    },
  ];

  const [activeAstronaut, setActiveAstronaut] = useState<AstronautProfile>(astronautPresets[0]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Modals state
  const [isFeelStrangeModalOpen, setIsFeelStrangeModalOpen] = useState<boolean>(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  // Sync RTL / LTR document direction with language
  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Toggle Language
  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
    audioComms.playQuindar('intro');
  };

  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger voice call with Avatar
  const triggerVoiceCall = () => {
    navigateToSection('comms-call');
    audioComms.speakToAstronaut(
      language === 'ar'
        ? `حضرة ${activeAstronaut.rankAr} ${activeAstronaut.nameAr}، معك الدكتورة أسترا. رصدنا استقراراً في مؤشراتك الحيوية وأنا جاهزة للإجابة عن أي استفسار طبي.`
        : `Greetings ${activeAstronaut.rank} ${activeAstronaut.name}, Dr. ASTRA on bio-comms. Your vital signs are nominal and I am on active standby.`,
      language
    );
  };

  return (
    <div className={`min-h-screen bg-[#070A11] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 ${language === 'ar' ? 'font-arabic' : ''}`}>
      {/* 1. TOP NAVBAR */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        currentTheme={currentTheme}
        onChangeTheme={setCurrentTheme}
        astronaut={activeAstronaut}
        isLoggedIn={isLoggedIn}
        onOpenAuthModal={() => (isLoggedIn ? setIsProfileModalOpen(true) : setIsAuthModalOpen(true))}
        onLogout={() => setIsLoggedIn(false)}
        onOpenSosModal={() => setIsSosModalOpen(true)}
        onOpenFeelStrangeModal={() => setIsFeelStrangeModalOpen(true)}
        onNavigateToSection={navigateToSection}
      />

      <main className="flex-1">
        {/* 2. HERO SECTION & REMONTADA BANNER */}
        <HeroSection
          language={language}
          onNavigateToSection={navigateToSection}
          onOpenFeelStrangeModal={() => setIsFeelStrangeModalOpen(true)}
          onTriggerCall={triggerVoiceCall}
        />

        {/* 3. CREW HEALTH & MOOD CHECK CARDS (MATCHING USER SCREENSHOT: Sleep, Bones, Mood) */}
        <CrewHealthCheckCards
          language={language}
          onTriggerCall={triggerVoiceCall}
          onNavigateToSection={navigateToSection}
        />

        {/* 4. AI AVATAR GUIDE (DYNAMIC FACES: HAPPY, SAD, CRY & STEP-BY-STEP APP TOUR) */}
        <section className="py-10 bg-[#070A11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIAvatarGuide
              language={language}
              astronautName={language === 'ar' ? activeAstronaut.nameAr : activeAstronaut.name}
              onNavigateToSection={navigateToSection}
              onTriggerCall={triggerVoiceCall}
            />
          </div>
        </section>

        {/* 5. COGNITIVE & NEURO-VIGILANCE CHALLENGES SUITE (MATCHING USER TABLE IMAGE) */}
        <CognitiveChallengesSuite language={language} />

        {/* 6. NASA SPACE GAMES SUITE (REACTION, MEMORY MATCH & BREATHING SPHERE) */}
        <NasaSpaceGamesSuite language={language} />

        {/* 7. ASTRONAUT AVATAR COMMS & IN-SUIT CALLING SECTION */}
        <AstronautAvatarCallSection
          language={language}
          activeAstronaut={activeAstronaut}
          onNavigateToSection={navigateToSection}
          onOpenFeelStrangeModal={() => setIsFeelStrangeModalOpen(true)}
        />

        {/* 8. MISSION & PHYSICAL FITNESS IN MICROGRAVITY */}
        <MissionObjectiveSection language={language} />

        {/* 9. AI SOLUTION OVERVIEW (DUAL CARDS FROM BRIEF) */}
        <AISolutionOverviewSection language={language} />

        {/* 10. PROJECT CONCEPT BRIEF */}
        <ConceptBriefSection language={language} />

        {/* 11. INTERFACE & KEY CAPABILITIES (7 PILLARS) */}
        <CapabilitiesSection
          language={language}
          onNavigateToSection={navigateToSection}
          onOpenSosModal={() => setIsSosModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* 12. INTERACTIVE 3D/2D BODY MAP & HEALTH VISUALIZER */}
        <section className="py-12 bg-[#070A11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InteractiveBodyMap language={language} />
          </div>
        </section>

        {/* 13. NASA COUNTERMEASURES ENGINE & ARED STRENGTH ANALYTICS */}
        <section className="py-4 bg-[#070A11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NasaCountermeasuresHub language={language} />
          </div>
        </section>

        {/* 14. DAILY TASKS TIMELINE & FLIGHT SCHEDULE */}
        <section className="py-4 bg-[#070A11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DailyTasksTimeline language={language} />
          </div>
        </section>

        {/* 15. REAL-TIME TELEMETRY COCKPIT & LIVE ECG WAVEFORM */}
        <TelemetryCockpit
          language={language}
          activeAstronaut={activeAstronaut}
          onSelectAstronaut={setActiveAstronaut}
          astronautPresets={astronautPresets}
        />

        {/* 16. 15-PARAMETER HEALTH MONITORING MATRIX */}
        <HealthMatrixSection language={language} />

        {/* 17. EARTH & NATURE SENSORY SANCTUARY (RIVER, SEA, BEACH, FOREST, ANIMAL, SPACE) */}
        <NatureTherapyHub language={language} />

        {/* 18. NASA SPACEFLIGHT MEDICINE HERITAGE ARCHIVE & ADD PROJECT */}
        <NasaHeritageSection language={language} />

        {/* 19. INTERACTIVE DASHBOARD PREVIEW SHOWCASE */}
        <InteractivePreviewShowcase
          language={language}
          activeAstronaut={activeAstronaut}
          onOpenSosModal={() => setIsSosModalOpen(true)}
        />
      </main>

      {/* 20. SISTER PROJECT CALL-TO-ACTION & APPLICATION FOOTER */}
      <SisterProjectFooter
        language={language}
        onOpenHelpModal={() => setIsHelpModalOpen(true)}
        onNavigateToSection={navigateToSection}
      />

      {/* ======================================================== */}
      {/* SYSTEM MODALS                                            */}
      {/* ======================================================== */}
      {/* Feel Something Strange Autonomous Assistant */}
      <FeelStrangeModal
        isOpen={isFeelStrangeModalOpen}
        onClose={() => setIsFeelStrangeModalOpen(false)}
        language={language}
        astronautName={language === 'ar' ? activeAstronaut.nameAr : activeAstronaut.name}
        onNavigateToSection={navigateToSection}
      />

      {/* Emergency SOS & Audible Siren Modal */}
      <EmergencySosModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        language={language}
        astronautName={language === 'ar' ? activeAstronaut.nameAr : activeAstronaut.name}
      />

      {/* User Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
        onLoginSuccess={(user) => {
          setActiveAstronaut(user);
          setIsLoggedIn(true);
        }}
      />

      {/* Astronaut Profile & Progress Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        language={language}
        astronaut={activeAstronaut}
      />

      {/* Help and Support Modal */}
      <HelpSupportModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        language={language}
      />
    </div>
  );
}
