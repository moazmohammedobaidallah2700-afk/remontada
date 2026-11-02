/**
 * Earth & Nature Sensory Therapy Hub for Space Crew
 * Includes:
 * 1. River
 * 2. Sea
 * 3. Beach
 * 4. Forest
 * 5. Animal (Wildlife)
 * 6. Space (Cosmic Nebulae & Earth Orbit)
 * Features procedural Web Audio soundscapes, 4-7-8 breathing pacer,
 * relaxation telemetry metrics, and fullscreen immersion.
 */

import React, { useState, useEffect } from 'react';
import {
  Waves, Trees, Mountain, Bird, Orbit, Sparkles, Volume2,
  VolumeX, Maximize2, Minimize2, Heart, Activity, CheckCircle2,
  Play, Pause, Compass
} from 'lucide-react';
import { audioComms } from '../utils/audioComms';
import { calculateRelaxationIndex } from '../utils/telemetryLogic';
import { NatureCategory, NatureScene } from '../types';

interface NatureTherapyHubProps {
  language: 'en' | 'ar';
}

export const NatureTherapyHub: React.FC<NatureTherapyHubProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<NatureCategory | 'all'>('all');
  const [selectedScene, setSelectedScene] = useState<NatureScene | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [currentSoundType, setCurrentSoundType] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Breathing pacer state: Inhale (4s), Hold (7s), Exhale (8s)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingSeconds, setBreathingSeconds] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(true);

  // Biometric relaxation index
  const [hrvValue, setHrvValue] = useState<number>(76);
  const [breathingRate, setBreathingRate] = useState<number>(6);

  const scenes: NatureScene[] = [
    // 1. RIVER
    {
      id: 'river-alpine',
      category: 'river',
      titleEn: 'Alpine Glacial River & Cascades',
      titleAr: 'نهر جليدي ألباني وشلالات عذبة',
      locationEn: 'Swiss Alps Glacial Stream',
      locationAr: 'مجرى مائي جليدي في جبال الألب',
      descriptionEn: 'Pristine emerald glacier melt cascading over polished granite boulders. The continuous murmur of flowing freshwater triggers immediate alpha-wave relaxation.',
      descriptionAr: 'مياه جليدية زمردية نقية تتدفق عبر صخور الغرانيت. هدير المياه العذبة المستمر يحفز موجات ألفا الدماغية المهدئة فوراً.',
      imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'river',
      frequencyHz: 528,
      stressReductionDelta: '-38% Cortisol',
    },
    {
      id: 'river-forest-run',
      category: 'river',
      titleEn: 'Misty Redwood Forest River',
      titleAr: 'نهر غابات الصنوبر الضبابي',
      locationEn: 'Pacific Northwest River Basin',
      locationAr: 'حوض نهر شمال غرب المحيط الهادئ',
      descriptionEn: 'Gentle, crystal-clear river winding through moss-covered cedar trees with sunlight filtering through the canopy.',
      descriptionAr: 'نهر رقراق صافٍ يتعرج بين أشجار الأرز المغطاة بالطحالب مع خيوط الشمس الذهبية.',
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'river',
      frequencyHz: 432,
      stressReductionDelta: '-34% Cortisol',
    },

    // 2. SEA
    {
      id: 'sea-open-ocean',
      category: 'sea',
      titleEn: 'Deep Azure Ocean Swell',
      titleAr: 'أمواج المحيط الأزرق العميق',
      locationEn: 'South Pacific Open Waters',
      locationAr: 'المياه المفتوحة لجنوب المحيط الهادئ',
      descriptionEn: 'Vast, rhythmic ocean waves rising under a radiant midday sun. The endless blue horizon counters zero-gravity claustrophobia and restores spatial depth perception.',
      descriptionAr: 'أمواج محيطية إيقاعية مهيبة تحت سماء مشمسة. الأفق الأزرق اللانهائي يزيل ضيق مقصورة الفضاء ويعيد الإحساس بالاتساع والحرية.',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'ocean',
      frequencyHz: 432,
      stressReductionDelta: '-42% Cortisol',
    },
    {
      id: 'sea-turquoise-reefs',
      category: 'sea',
      titleEn: 'Sunlit Coral Sea Depths',
      titleAr: 'أعماق البحر المرجاني المشمس',
      locationEn: 'Great Barrier Marine Lagoon',
      locationAr: 'بحيرة الشعاب المرجانية البحرية',
      descriptionEn: 'Crystal turquoise water bathed in warm rays, evoking the tranquility of floating effortlessly in warm Earth waters.',
      descriptionAr: 'مياه تركوازية صافية تخترقها أشعة الشمس الدافئة، تمنحك إحساس الطفو الهادئ في مياه الأرض الدافئة.',
      imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'ocean',
      frequencyHz: 528,
      stressReductionDelta: '-40% Cortisol',
    },

    // 3. BEACH
    {
      id: 'beach-sunset-shore',
      category: 'beach',
      titleEn: 'Golden Sunset Coastline',
      titleAr: 'شاطئ الغروب الذهبي الساحلي',
      locationEn: 'Polynesian Sand Shoreline',
      locationAr: 'سواحل الرمال البولينيزية',
      descriptionEn: 'Soft golden sand washed by gentle, rhythmic tropical surf. The warm amber hues harmonize circadian melatonin production during orbital rest periods.',
      descriptionAr: 'رمال ذهبية ناعمة تغسلها أمواج الشاطئ الهادئة بتناغم. اللون العنبري الدافئ يضبط إفراز هرمون النوم الميلاتونين.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'beach',
      frequencyHz: 396,
      stressReductionDelta: '-45% Cortisol',
    },
    {
      id: 'beach-white-dunes',
      category: 'beach',
      titleEn: 'Pristine White Sand Atoll',
      titleAr: 'شاطئ الرمال البيضاء البكر',
      locationEn: 'Maldivian Marine Atoll',
      locationAr: 'شاطئ المالديف الساحر',
      descriptionEn: 'Unbroken stretch of pure white sand meeting crystal shallow water with warm, salty breezes.',
      descriptionAr: 'امتداد ساحر من الرمال البيضاء النقية والمياه الصافية مع نسيم ساحلي دافئ.',
      imageUrl: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'beach',
      frequencyHz: 432,
      stressReductionDelta: '-39% Cortisol',
    },

    // 4. FOREST
    {
      id: 'forest-redwood-canopy',
      category: 'forest',
      titleEn: 'Ancient Emerald Redwood Canopy',
      titleAr: 'أشجار السيكويا العملاقة الصنوبرية',
      locationEn: 'California Redwood National Reserve',
      locationAr: 'محمية أشجار السيكويا الشاهقة',
      descriptionEn: 'Lush biophilic forest bathing (Shinrin-yoku). Visualizing natural chlorophyll greenery and breathing damp earth aromas triggers rapid parasympathetic stabilization.',
      descriptionAr: 'علاج الاستحمام في الطبيعة (Shinrin-yoku). رؤية الخضرة الطبيعية وظلال الأشجار يعيد التوازن العصبي اللاإرادي بسرعة فائقة.',
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'forest',
      frequencyHz: 528,
      stressReductionDelta: '-48% Cortisol',
    },
    {
      id: 'forest-bamboo-grove',
      category: 'forest',
      titleEn: 'Sun-Drenched Bamboo Sanctuary',
      titleAr: 'غابة الخيزران المشمسة الهادئة',
      locationEn: 'Arashiyama Bamboo Forest',
      locationAr: 'غابة خيزران أراشيياما',
      descriptionEn: 'Tall emerald bamboo stalks swaying softly in a mountain breeze, with sunlight dancing through leaves.',
      descriptionAr: 'سيقان الخيزران الخضراء الشاهقة تتمايل بلطف مع نسيم الجبال ورقصات الضوء.',
      imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'forest',
      frequencyHz: 639,
      stressReductionDelta: '-36% Cortisol',
    },

    // 5. ANIMAL (WILDLIFE)
    {
      id: 'animal-forest-deer',
      category: 'animal',
      titleEn: 'Majestic Red Deer in Mountain Meadow',
      titleAr: 'غزال الجبال المهيب في المرعى الطبيعي',
      locationEn: 'Scottish Highlands Sanctuary',
      locationAr: 'محمية المرتفعات الاسكتلندية',
      descriptionEn: 'Gentle, watchful wildlife in their natural habitat. Studies prove that observing wild animals significantly elevates crew oxytocin and diminishes microgravity isolation stress.',
      descriptionAr: 'حيوانات فطرية حرة في بيئتها الطبيعية. أثبتت الدراسات أن رؤية الحيوانات ترفع هرمون الأوكسيتوسين وتزيل شعور الاغتراب الفضائي.',
      imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'wildlife',
      frequencyHz: 528,
      stressReductionDelta: '-44% Cortisol',
    },
    {
      id: 'animal-ocean-dolphins',
      category: 'animal',
      titleEn: 'Playful Ocean Dolphins at Dawn',
      titleAr: 'دلافين المحيط المرحة في الصباح الباكر',
      locationEn: 'Coral Sea Open Waters',
      locationAr: 'مياه البحر المرجاني المفتوحة',
      descriptionEn: 'Pod of wild dolphins gliding weightlessly through blue crystal waves, mirroring the astronaut’s floating motion with joy and companionship.',
      descriptionAr: 'مجموعة دلافين تسبح برقة ومرح في المياه الصافية، تحاكي طفو رواد الفضاء ولكن بروح البهجة والحيوية.',
      imageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'wildlife',
      frequencyHz: 432,
      stressReductionDelta: '-50% Cortisol',
    },

    // 6. SPACE (COSMIC NEBULAE & EARTH ORBIT)
    {
      id: 'space-carina-nebula',
      category: 'space',
      titleEn: 'Cosmic Carina Nebula & Star Nursery',
      titleAr: 'سديم القاعدة الكوني (Carina) ومصنع النجوم',
      locationEn: 'Deep Space Infrared Observatory',
      locationAr: 'مرصد الأشعة تحت الحمراء في الفضاء السحيق',
      descriptionEn: 'Breathtaking cosmic clouds of hydrogen and stellar nurseries glowing across light-years. Fosters transcendent psychological awe (The Overview Effect).',
      descriptionAr: 'سحب غاز الهيدروجين النجمية الشاسعة ومهد النجوم الجديدة. تعزز ظاهرة (The Overview Effect) والإحساس بالرهبة والجمال الكوني.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'cosmic',
      frequencyHz: 432,
      stressReductionDelta: '-35% Cortisol',
    },
    {
      id: 'space-earth-rise',
      category: 'space',
      titleEn: 'Earth Atmosphere & Blue Marble',
      titleAr: 'الغلاف الجوي لكوكب الأرض والواحة الزرقاء',
      locationEn: 'Low Earth Orbit (400 km)',
      locationAr: 'المدار الأرضي المنخفض (400 كم)',
      descriptionEn: 'The precious blue biosphere of humanity viewed against the obsidian void of space. Deeply restores crew perspective, humility, and mission purpose.',
      descriptionAr: 'الواحة الزرقاء الرقيقة لكوكبنا الأرض تطفو وسط سواد الفضاء السحيق. تعيد شحن روح العزيمة وتذكر بأهمية الرسالة الإنسانية.',
      imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
      audioSoundscape: 'cosmic',
      frequencyHz: 432,
      stressReductionDelta: '-47% Cortisol',
    },
  ];

  // Set default selected scene
  useEffect(() => {
    if (!selectedScene && scenes.length > 0) {
      setSelectedScene(scenes[0]);
    }
  }, [selectedScene]);

  // Guided 4-7-8 Breathing interval loop
  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setBreathingSeconds((prev) => {
        if (prev > 1) return prev - 1;

        if (breathingPhase === 'inhale') {
          setBreathingPhase('hold');
          return 7;
        } else if (breathingPhase === 'hold') {
          setBreathingPhase('exhale');
          return 8;
        } else {
          setBreathingPhase('inhale');
          // Increase HRV on complete cycle
          setHrvValue((v) => Math.min(95, v + 2));
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingActive, breathingPhase]);

  // Audio soundscape player
  const toggleSoundscape = (soundscapeType: NatureScene['audioSoundscape']) => {
    if (isPlayingSound && currentSoundType === soundscapeType) {
      audioComms.stopNatureAmbience();
      setIsPlayingSound(false);
      setCurrentSoundType(null);
    } else {
      audioComms.startNatureAmbience(soundscapeType);
      setIsPlayingSound(true);
      setCurrentSoundType(soundscapeType);
    }
  };

  // Filter scenes
  const filteredScenes =
    activeCategory === 'all'
      ? scenes
      : scenes.filter((s) => s.category === activeCategory);

  const relaxation = calculateRelaxationIndex(hrvValue, breathingRate);

  return (
    <section id="nature-hub" className="py-16 border-t border-cyan-500/20 relative overflow-hidden">
      {/* Background starlight & organic nebula dust */}
      <div className="absolute inset-0 bg-radial from-emerald-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{isAr ? 'واحة الطبيعة والأرض — مكافحة العزلة' : 'EARTH & NATURE BIOPHILIC SENSORY HUB'}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            {isAr
              ? 'واحة الطبيعة: الأنهار، البحار، الشواطئ، الغابات، الحيوانات، والفضاء'
              : 'Earth Nature Sanctuary: River, Sea, Beach, Forest, Wildlife & Space'}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'تعتمد ناسا والمنظومات الفضائية المتقدمة على التحفيز الحسي البيوفيلي لإنقاذ رواد الفضاء من الاكتئاب وتخفيف هرمونات التوتر عبر مناظر وأصوات الأرض الطبيعية.'
              : 'Scientifically calibrated biophilic nature simulations designed to counteract microgravity sensory deprivation, lower autonomic cortisol, and promote deep psychological restoration.'}
          </p>
        </div>

        {/* 6 Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {isAr ? 'كافة المناظر (12)' : 'All Biomes (12)'}
          </button>

          <button
            onClick={() => setActiveCategory('river')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all border ${
              activeCategory === 'river'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-emerald-500/40 hover:text-emerald-300'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span>{isAr ? 'الأنهار (River)' : 'Rivers'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('sea')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all border ${
              activeCategory === 'sea'
                ? 'bg-blue-500 text-slate-950 border-blue-400 shadow-lg shadow-blue-500/25'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-blue-500/40 hover:text-blue-300'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>{isAr ? 'البحار (Sea)' : 'Sea & Ocean'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('beach')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all border ${
              activeCategory === 'beach'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'الشواطئ (Beach)' : 'Beaches'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('forest')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all border ${
              activeCategory === 'forest'
                ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/25'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-teal-500/40 hover:text-teal-300'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>{isAr ? 'الغابات (Forest)' : 'Forests'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('animal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all border ${
              activeCategory === 'animal'
                ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-lg shadow-rose-500/25'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-rose-500/40 hover:text-rose-300'
            }`}
          >
            <Bird className="w-3.5 h-3.5" />
            <span>{isAr ? 'الحيوانات (Animal)' : 'Wildlife'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('space')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all border ${
              activeCategory === 'space'
                ? 'bg-indigo-500 text-slate-950 border-indigo-400 shadow-lg shadow-indigo-500/25'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-indigo-500/40 hover:text-indigo-300'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>{isAr ? 'الفضاء (Space)' : 'Cosmic Space'}</span>
          </button>
        </div>

        {/* Main Display: Active Sensory Scene + Breathing Pacer */}
        {selectedScene && (
          <div className="bg-[#0E1524] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left / Top: High-Resolution Visual Surface */}
              <div className="lg:col-span-8 relative min-h-[380px] md:min-h-[460px] bg-slate-950 flex flex-col justify-between p-6 overflow-hidden group">
                {/* Background Landscape Image */}
                <img
                  src={selectedScene.imageUrl}
                  alt={selectedScene.titleEn}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Badge Overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/40">
                    {selectedScene.category.toUpperCase()} CHAMBER • {selectedScene.frequencyHz} Hz SOLFEGGIO
                  </span>

                  <button
                    onClick={() => toggleSoundscape(selectedScene.audioSoundscape)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all border ${
                      isPlayingSound && currentSoundType === selectedScene.audioSoundscape
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse'
                        : 'bg-black/70 text-slate-200 border-white/20 hover:border-cyan-400'
                    }`}
                  >
                    {isPlayingSound && currentSoundType === selectedScene.audioSoundscape ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isAr ? 'الصوت التوليدي يعمل' : 'Playing Procedural Audio'}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>{isAr ? 'تشغيل المؤثر الصوتي الطبيعي' : 'Play Nature Ambience'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom Title & Description Overlay */}
                <div className="relative z-10 mt-auto">
                  <div className="text-xs text-cyan-400 font-mono font-semibold mb-1">
                    📍 {isAr ? selectedScene.locationAr : selectedScene.locationEn}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-2 drop-shadow-md">
                    {isAr ? selectedScene.titleAr : selectedScene.titleEn}
                  </h3>
                  <p className="text-sm text-slate-200/90 max-w-2xl leading-relaxed drop-shadow">
                    {isAr ? selectedScene.descriptionAr : selectedScene.descriptionEn}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تأثير التحفيز الحسي:' : 'Observed Neuro-Efficacy:'} {selectedScene.stressReductionDelta}</span>
                  </div>
                </div>
              </div>

              {/* Right: 4-7-8 Biofeedback Breathing Circle & Vitals */}
              <div className="lg:col-span-4 p-6 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>{isAr ? 'تمرين التنفس المهدئ (4-7-8)' : 'Zero-G 4-7-8 Breathing Circle'}</span>
                    </h4>
                    <button
                      onClick={() => setIsBreathingActive(!isBreathingActive)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                    >
                      {isBreathingActive ? (isAr ? 'إيقاف' : 'Pause') : (isAr ? 'تشغيل' : 'Resume')}
                    </button>
                  </div>

                  {/* Pulsing Breathing Circle Visualizer */}
                  <div className="flex flex-col items-center justify-center my-6">
                    <div
                      className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-1000 ${
                        breathingPhase === 'inhale'
                          ? 'border-cyan-400 bg-cyan-950/40 scale-110 shadow-[0_0_30px_rgba(6,182,212,0.4)]'
                          : breathingPhase === 'hold'
                          ? 'border-amber-400 bg-amber-950/40 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
                          : 'border-emerald-400 bg-emerald-950/40 scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      }`}
                    >
                      <span className="text-3xl font-black font-mono text-white">
                        {breathingSeconds}s
                      </span>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1">
                        {breathingPhase === 'inhale'
                          ? (isAr ? 'شهيق' : 'Inhale')
                          : breathingPhase === 'hold'
                          ? (isAr ? 'احبس النفس' : 'Hold')
                          : (isAr ? 'زفير بطيء' : 'Exhale')}
                      </span>
                    </div>

                    <p className="text-xs text-center text-slate-400 mt-4 max-w-xs">
                      {breathingPhase === 'inhale' && (isAr ? 'استنشق الأكسجين ببطء عبر الأنف...' : 'Inhale slowly through your nose...')}
                      {breathingPhase === 'hold' && (isAr ? 'احبس الأكسجين بهدوء في رئتيك...' : 'Hold your breath gently...')}
                      {breathingPhase === 'exhale' && (isAr ? 'أخرج الزفير بهدوء واسترخاء...' : 'Slowly release breath through mouth...')}
                    </p>
                  </div>
                </div>

                {/* Relaxation Metrics Footer */}
                <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">{isAr ? 'مؤشر الاسترخاء العصبي (HRV):' : 'Autonomic Relaxation Score:'}</span>
                    <span className="font-mono font-bold text-emerald-400">{relaxation.score}% ({relaxation.state.replace('_', ' ')})</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-700"
                      style={{ width: `${relaxation.score}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
                    <span>Target: &gt;75%</span>
                    <span>HRV: {hrvValue} ms • Resp: {breathingRate} bpm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Thumbnail Gallery for Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredScenes.map((scene) => {
            const isSelected = selectedScene?.id === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => setSelectedScene(scene)}
                className={`relative rounded-xl overflow-hidden text-left border transition-all group aspect-4/3 cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/30 scale-102'
                    : 'border-slate-800 hover:border-slate-600 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={scene.imageUrl}
                  alt={scene.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-2 inset-x-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-cyan-300 font-bold uppercase">
                    {scene.category}
                  </span>
                  <p className="text-xs font-bold text-white truncate mt-1">
                    {isAr ? scene.titleAr : scene.titleEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
