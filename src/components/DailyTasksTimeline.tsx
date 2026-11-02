/**
 * Astronaut Daily Flight Tasks & Schedule Menu
 * Interactive timeline of scheduled clinical routines, ARED workouts,
 * hydration checks, and circadian sleep transitions for the day.
 */

import React, { useState } from 'react';
import {
  CheckCircle2, Circle, Clock, Plus, Dumbbell, Droplets,
  Heart, Sparkles, Moon, Sun, Trash2, Calendar
} from 'lucide-react';

interface FlightTask {
  id: string;
  timeMET: string;
  titleEn: string;
  titleAr: string;
  category: 'exercise' | 'medical' | 'nutrition' | 'circadian';
  completed: boolean;
  priority: 'high' | 'normal';
}

interface DailyTasksTimelineProps {
  language: 'en' | 'ar';
}

export const DailyTasksTimeline: React.FC<DailyTasksTimelineProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [tasks, setTasks] = useState<FlightTask[]>([
    {
      id: '1',
      timeMET: '06:30 MET',
      titleEn: 'Wakeup & 490nm Photoperiod Lighting Sync',
      titleAr: 'الاستيقاظ وتنشيط إضاءة الكابينة المدارية (490 نانومتر)',
      category: 'circadian',
      completed: true,
      priority: 'high',
    },
    {
      id: '2',
      timeMET: '07:15 MET',
      titleEn: 'Morning Resting Vitals & Urine Hydration Test',
      titleAr: 'فحص العلامات الحيوية الصباحية وقياس تركيز الترطيب',
      category: 'medical',
      completed: true,
      priority: 'high',
    },
    {
      id: '3',
      timeMET: '08:45 MET',
      titleEn: 'ARED Resistive Loading: Squat 135kg & Deadlift',
      titleAr: 'تمرين المقاومة ARED: القرفصاء 135 كجم والرفعة الميتة',
      category: 'exercise',
      completed: true,
      priority: 'high',
    },
    {
      id: '4',
      timeMET: '11:30 MET',
      titleEn: 'CEVIS Cycle HIIT (20-Min Anaerobic Interval)',
      titleAr: 'تمرين الدراجة الهوائية CEVIS (20 دقيقة مكثفة)',
      category: 'exercise',
      completed: false,
      priority: 'normal',
    },
    {
      id: '5',
      timeMET: '13:00 MET',
      titleEn: 'Metabolic Meal + 35g Leucine / Protein Shake',
      titleAr: 'الوجبة الأيضية مع 35 جم من مكمل الليوسين والبروتين',
      category: 'nutrition',
      completed: false,
      priority: 'normal',
    },
    {
      id: '6',
      timeMET: '15:15 MET',
      titleEn: 'Lower Body Negative Pressure (LBNP) SANS Shield',
      titleAr: 'جلسة الضغط السلبي السفلي (LBNP) لحماية النظر من SANS',
      category: 'medical',
      completed: false,
      priority: 'high',
    },
    {
      id: '7',
      timeMET: '17:30 MET',
      titleEn: 'Earth & Nature Sensory Hub (15 Min Ocean Calm)',
      titleAr: 'جلسة واحة الطبيعة والأرض (15 دقيقة لأصوات المحيط)',
      category: 'circadian',
      completed: false,
      priority: 'normal',
    },
    {
      id: '8',
      timeMET: '19:45 MET',
      titleEn: 'Daily Clinical Intercom Check-In with Dr. ASTRA',
      titleAr: 'مكالمة الفحص الطبي اليومي اللاسلكية مع الدكتورة أسترا',
      category: 'medical',
      completed: false,
      priority: 'high',
    },
    {
      id: '9',
      timeMET: '21:30 MET',
      titleEn: 'Red-Shift Lighting (630nm) & Orbital Sleep Lock',
      titleAr: 'تفعيل إضاءة النوم الحمراء (630 نانومتر) وإغلاق الدورة',
      category: 'circadian',
      completed: false,
      priority: 'normal',
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('14:00 MET');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: FlightTask = {
      id: Date.now().toString(),
      timeMET: newTaskTime || 'MET 12:00',
      titleEn: newTaskTitle,
      titleAr: newTaskTitle,
      category: 'medical',
      completed: false,
      priority: 'normal',
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="bg-[#0E1524] border border-cyan-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl my-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              MISSION FLIGHT DAY 42
            </span>
            <span className="text-xs text-slate-400 font-mono">DAILY PROTOCOL TIMELINE</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span>{isAr ? 'قائمة مهام اليوم والجدول الزمني المداري' : 'Daily Flight Tasks & Timeline Schedule'}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr
              ? 'متابعة التمارين الرياضية اليومية، فحص السوائل، جلسات الضغط السلبي، ودورات النوم'
              : 'Structured schedule of physical countermeasures, hydration milestones, and circadian rest.'}
          </p>
        </div>

        {/* Daily Progress Counter */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <span className="text-[11px] font-mono text-slate-400 block">{isAr ? 'إنجاز مهام اليوم:' : 'DAILY COMPLETION:'}</span>
            <span className="text-base font-mono font-black text-emerald-400">
              {completedCount} / {tasks.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90">
              <circle cx="24" cy="24" r="18" stroke="#1e293b" strokeWidth="4" fill="none" />
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#06B6D4"
                strokeWidth="4"
                fill="none"
                strokeDasharray="113"
                strokeDashoffset={113 - (113 * progressPercent) / 100}
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute text-[10px] font-mono font-bold text-white">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
              task.completed
                ? 'bg-slate-950/40 border-slate-800/80 opacity-70'
                : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer shrink-0"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {task.timeMET}
                  </span>
                  {task.priority === 'high' && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      MANDATORY
                    </span>
                  )}
                </div>
                <h4
                  className={`text-sm font-medium mt-0.5 ${
                    task.completed ? 'line-through text-slate-500' : 'text-white'
                  }`}
                >
                  {isAr ? task.titleAr : task.titleEn}
                </h4>
              </div>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-slate-600 hover:text-rose-400 transition-colors p-1"
              title={isAr ? 'حذف المهمة' : 'Delete task'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Flight Task Form */}
      <form onSubmit={handleAddTask} className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
        <input
          type="text"
          value={newTaskTime}
          onChange={(e) => setNewTaskTime(e.target.value)}
          placeholder="MET Time"
          className="w-28 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
        />
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder={isAr ? 'إضافة مهمة جديدة لجدول اليوم...' : 'Add new daily flight task...'}
          className="flex-1 min-w-[200px] px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة' : 'Add Task'}</span>
        </button>
      </form>
    </div>
  );
};
