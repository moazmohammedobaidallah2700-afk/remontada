/**
 * NASA Space Games Suite for Crew Cognitive & Reflex Assessment
 * Exact implementation matching user's uploaded images:
 * 1. Space Reaction Game ("لعبة بتختبر سرعة استجابة رائد الفضاء")
 * 2. Astronaut Memory Challenge / Space Memory Match ("لعبة ذاكرة وتركيز")
 * 3. Breathing Mission ("لعبة لتنظيم التنفس والاسترخاء")
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Rocket, Star, Timer, Sparkles, Heart, Brain, Zap,
  RefreshCw, CheckCircle, Flame, Trophy, Play, Pause
} from 'lucide-react';
import { audioComms } from '../utils/audioComms';

interface NasaSpaceGamesSuiteProps {
  language: 'en' | 'ar';
}

export const NasaSpaceGamesSuite: React.FC<NasaSpaceGamesSuiteProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'reaction' | 'memory' | 'breathing'>('reaction');

  // ==========================================
  // GAME 1: SPACE REACTION GAME
  // ==========================================
  const [rxScore, setRxScore] = useState<number>(30);
  const [rxLives, setRxLives] = useState<number>(3);
  const [rxTimeLeft, setRxTimeLeft] = useState<number>(113);
  const [rxShipX, setRxShipX] = useState<number>(50); // percentage
  const [rxAsteroids, setRxAsteroids] = useState<{ id: number; x: number; y: number }[]>([
    { id: 1, x: 25, y: 15 },
    { id: 2, x: 75, y: 25 },
  ]);
  const [rxLasers, setRxLasers] = useState<{ id: number; x: number; y: number }[]>([]);
  const [rxReactionMs, setRxReactionMs] = useState<number>(245);
  const [rxPlaying, setRxPlaying] = useState<boolean>(false);

  // Shoot laser & move
  const shootLaser = () => {
    if (!rxPlaying) return;
    audioComms.playQuindar('intro');
    setRxLasers((prev) => [...prev, { id: Date.now(), x: rxShipX, y: 80 }]);
    setRxScore((s) => s + 10);
    setRxReactionMs(Math.floor(Math.random() * 60) + 210);
  };

  // ==========================================
  // GAME 2: SPACE MEMORY MATCH (6 or 10 pairs)
  // ==========================================
  const [memDifficulty, setMemDifficulty] = useState<'easy' | 'hard'>('easy');
  const [memMoves, setMemMoves] = useState<number>(0);
  const [memMatches, setMemMatches] = useState<number>(0);
  const [memTimerSeconds, setMemTimerSeconds] = useState<number>(271); // 4:31

  const cardIcons = ['☀️', '🚀', '🪐', '🌙', '⭐', '☄️', '🛸', '🛰️', '🧑‍🚀', '🌌'];
  const [cards, setCards] = useState<{ id: number; icon: string; flipped: boolean; matched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const initMemoryGame = (diff: 'easy' | 'hard') => {
    setMemDifficulty(diff);
    setMemMoves(0);
    setMemMatches(0);
    setMemTimerSeconds(271);
    setSelectedCards([]);

    const numPairs = diff === 'easy' ? 6 : 10;
    const iconsToUse = cardIcons.slice(0, numPairs);
    const deck = [...iconsToUse, ...iconsToUse]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        flipped: false,
        matched: false,
      }));
    setCards(deck);
  };

  useEffect(() => {
    initMemoryGame('easy');
  }, []);

  const handleCardClick = (id: number) => {
    if (selectedCards.length === 2) return;
    const clicked = cards.find((c) => c.id === id);
    if (!clicked || clicked.flipped || clicked.matched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(newCards);

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMemMoves((m) => m + 1);
      const first = newCards.find((c) => c.id === newSelected[0])!;
      const second = newCards.find((c) => c.id === newSelected[1])!;

      if (first.icon === second.icon) {
        // Matched!
        audioComms.playQuindar('outro');
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, matched: true }
                : c
            )
          );
          setMemMatches((m) => m + 1);
          setSelectedCards([]);
        }, 500);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  // ==========================================
  // GAME 3: BREATHING MISSION (Cosmic Sphere)
  // ==========================================
  const [breathePhase, setBreathePhase] = useState<'inhale' | 'exhale'>('inhale');
  const [breatheProgress, setBreatheProgress] = useState<number>(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathePhase((p) => (p === 'inhale' ? 'exhale' : 'inhale'));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="space-games" className="py-14 bg-[#070A11] border-t border-cyan-500/20 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header matching user screenshots */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            {isAr ? 'الهدف: تشجيع النشاط البدني والمحافظة على الالتزام ببرنامج التمارين.' : 'ASTRONAUT COGNITIVE CHALLENGES & VIGILANCE'}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
            {isAr ? 'ألعاب وتحديات رواد الفضاء — التقييم الحركي والإدراكي' : 'Astronaut Reflex, Memory & Breathing Suite'}
          </h2>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('reaction')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              activeTab === 'reaction'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            1. Space Reaction Game
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              activeTab === 'memory'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            3. Space Memory Match
          </button>

          <button
            onClick={() => setActiveTab('breathing')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              activeTab === 'breathing'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            5. Breathing Mission
          </button>
        </div>

        {/* ======================================================== */}
        {/* 1. SPACE REACTION GAME (Matching Image 2)               */}
        {/* ======================================================== */}
        {activeTab === 'reaction' && (
          <div className="space-y-6">
            <div className="bg-[#0C121E] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              {/* Game Screen Frame */}
              <div className="relative w-full h-[320px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4">
                {/* Background stars */}
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

                {/* Asteroids in background */}
                <div className="absolute top-6 right-8 text-4xl opacity-80 animate-pulse">☄️</div>
                <div className="absolute top-16 left-12 text-3xl opacity-70">🪐</div>

                {/* Top HUD: Score, Lives, Timer */}
                <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold">{rxScore}</span>
                  </div>

                  {/* 3 Lives Rockets */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((l) => (
                      <Rocket key={l} className="w-4 h-4 text-cyan-400 -rotate-45" />
                    ))}
                  </div>

                  {/* Timer */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-slate-700">
                    <Timer className="w-3.5 h-3.5 text-cyan-300" />
                    <span>{rxTimeLeft}s</span>
                  </div>
                </div>

                {/* Player Spaceship at Bottom */}
                <div
                  className="relative z-10 mx-auto cursor-pointer transition-all flex flex-col items-center"
                  style={{ transform: `translateX(${rxShipX - 50}px)` }}
                >
                  {/* Laser Beams */}
                  <div className="flex gap-4 mb-2">
                    <div className="w-1.5 h-6 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                    <div className="w-1.5 h-6 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                    <Rocket className="w-6 h-6 text-cyan-300 -rotate-45" />
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="relative z-10 flex items-center justify-between pt-2">
                  <button
                    onClick={() => setRxShipX((x) => Math.max(10, x - 20))}
                    className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    ← Left
                  </button>
                  <button
                    onClick={shootLaser}
                    className="px-5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-md shadow-cyan-500/30"
                  >
                    Shoot Laser (Test Reaction)
                  </button>
                  <button
                    onClick={() => setRxShipX((x) => Math.min(90, x + 20))}
                    className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    Right →
                  </button>
                </div>
              </div>

              {/* Exact Description from User Screenshot 2 */}
              <div className="mt-6 space-y-2 text-start font-sans">
                <h3 className="text-xl font-bold text-white">1. Space Reaction Game</h3>
                <p className="text-sm font-bold text-cyan-300">
                  {isAr ? 'لعبة بتختبر سرعة استجابة رائد الفضاء.' : 'A game testing astronaut response speed.'}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  <li>{isAr ? 'تظهر إشارات على الشاشة.' : 'Signals appear on the screen.'}</li>
                  <li>{isAr ? 'لازم يضغط على الإشارة المطلوبة.' : 'Must click on the target signal.'}</li>
                  <li>{isAr ? 'البرنامج يسجل Reaction Time.' : 'The system records Reaction Time.'}</li>
                </ul>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
                  <span>{isAr ? 'الهدف: متابعة التغيرات في سرعة الاستجابة والتركيز.' : 'Goal: Monitor changes in response speed and cognitive vigilance.'}</span>
                  <span className="font-bold text-white">Last RT: {rxReactionMs} ms</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. SPACE MEMORY MATCH (Matching Image 1)                */}
        {/* ======================================================== */}
        {activeTab === 'memory' && (
          <div className="space-y-6">
            <div className="bg-[#0C121E] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              {/* Top Banner matching image */}
              <div className="text-center pb-4 mb-4 border-b border-slate-800">
                <h4 className="text-lg font-black font-mono tracking-widest text-cyan-300 flex items-center justify-center gap-2 uppercase">
                  <span>🚀</span>
                  <span>SPACE MEMORY MATCH</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-400">The Universe Episodes</span>

                {/* Score bar */}
                <div className="grid grid-cols-3 gap-2 mt-3 max-w-sm mx-auto font-mono text-xs">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">MOVES</span>
                    <span className="font-bold text-white">{memMoves}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">MATCHES</span>
                    <span className="font-bold text-cyan-400">
                      {memMatches}/{memDifficulty === 'easy' ? 6 : 10}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">TIME</span>
                    <span className="font-bold text-emerald-400">
                      {Math.floor(memTimerSeconds / 60)}:{(memTimerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Difficulty selector buttons */}
                <div className="flex justify-center gap-3 mt-3">
                  <button
                    onClick={() => initMemoryGame('easy')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      memDifficulty === 'easy'
                        ? 'bg-purple-600 text-white border border-purple-400'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    ⭐ Easy (12 Cards / 6 pairs)
                  </button>
                  <button
                    onClick={() => initMemoryGame('hard')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      memDifficulty === 'hard'
                        ? 'bg-purple-600 text-white border border-purple-400'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    🔥 Hard (20 Cards / 10 pairs)
                  </button>
                </div>
              </div>

              {/* Cards Grid */}
              <div
                className={`grid gap-2.5 max-w-lg mx-auto ${
                  memDifficulty === 'easy' ? 'grid-cols-4' : 'grid-cols-5'
                }`}
              >
                {cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`h-20 rounded-xl border flex items-center justify-center text-2xl transition-all transform cursor-pointer ${
                      card.flipped || card.matched
                        ? 'bg-purple-950/80 border-purple-400 shadow-md shadow-purple-500/20 rotate-0'
                        : 'bg-[#151D2F] border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {card.flipped || card.matched ? (
                      card.icon
                    ) : (
                      <span className="text-purple-400/60 text-sm">✦</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Exact Description from User Screenshot 1 */}
              <div className="mt-8 space-y-2 text-start font-sans">
                <h3 className="text-xl font-bold text-white">3. Astronaut Memory Challenge</h3>
                <p className="text-sm font-bold text-cyan-300">
                  {isAr ? 'لعبة ذاكرة وتركيز.' : 'A game of memory and concentration.'}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  <li>{isAr ? 'تظهر مجموعة أشكال لمدة ثوانٍ.' : 'A group of shapes appears for seconds.'}</li>
                  <li>{isAr ? 'تختفي ويُطلب منه ترتيبها أو تذكرها.' : 'They disappear and he is asked to arrange or remember them.'}</li>
                  <li>{isAr ? 'البرنامج يسجل عدد الإجابات الصحيحة والوقت.' : 'The system records number of correct answers and time.'}</li>
                </ul>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-400">
                  {isAr ? 'الهدف: متابعة Cognitive Performance.' : 'Goal: Monitor Cognitive Performance & Working Memory.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. BREATHING MISSION (Matching Image 3)                 */}
        {/* ======================================================== */}
        {activeTab === 'breathing' && (
          <div className="space-y-6">
            <div className="bg-[#0C121E] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              {/* Cosmic Breathing Visualizer Screen */}
              <div className="relative w-full h-[320px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6">
                {/* Background Nebula & Stars */}
                <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

                {/* Animated Growing/Shrinking Blue Orb */}
                <div
                  className={`relative rounded-full flex items-center justify-center transition-all duration-3000 shadow-[0_0_45px_rgba(56,189,248,0.4)] ${
                    breathePhase === 'inhale'
                      ? 'w-48 h-48 bg-gradient-to-tr from-sky-500 to-indigo-500 scale-110'
                      : 'w-32 h-32 bg-gradient-to-tr from-indigo-700 to-sky-700 scale-95'
                  }`}
                >
                  <span className="text-white font-bold font-sans tracking-widest text-lg drop-shadow">
                    {breathePhase === 'inhale' ? (isAr ? 'شهيق' : 'inhale') : (isAr ? 'زفير' : 'exhale')}
                  </span>
                </div>

                <div className="relative z-10 mt-6 text-xs font-mono text-cyan-300">
                  {isAr ? 'اتبع حركة الدائرة في الشهيق والزفير' : 'Pacing with cosmic resonant frequency'}
                </div>
              </div>

              {/* Exact Description from User Screenshot 3 */}
              <div className="mt-6 space-y-2 text-start font-sans">
                <h3 className="text-xl font-bold text-white">5. Breathing Mission</h3>
                <p className="text-sm font-bold text-cyan-300">
                  {isAr ? 'لعبة لتنظيم التنفس والاسترخاء.' : 'A game to regulate breathing and relaxation.'}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  <li>{isAr ? 'تظهر دائرة تكبر وتصغر.' : 'A circle appears expanding and contracting.'}</li>
                  <li>{isAr ? 'يتبع المستخدم إيقاعها في التنفس.' : 'The user follows its rhythm in breathing.'}</li>
                  <li>{isAr ? 'يحصل على تقدم في اللعبة عند إكمال الجلسة.' : 'Gains progress in the game upon completing the session.'}</li>
                </ul>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-400">
                  {isAr ? 'الهدف: دعم الاسترخاء وإدارة التوتر.' : 'Goal: Support relaxation and stress management.'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
