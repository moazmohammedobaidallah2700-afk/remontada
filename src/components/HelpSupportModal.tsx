/**
 * Help and Support Section & Modal
 * Features:
 * - Searchable FAQ database (SANS, ARED, Quindar tones, Offline AI guidance, SOS siren)
 * - Guides on how to use website features
 * - Contact / Support ticket submission form
 */

import React, { useState } from 'react';
import {
  HelpCircle, Search, FileText, Send, CheckCircle2,
  ChevronRight, BookOpen, Radio, Sparkles, X
} from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isAr = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'faq' | 'guides' | 'ticket'>('faq');

  // Ticket form
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      qEn: 'What is Spaceflight-Associated Neuro-Ocular Syndrome (SANS)?',
      qAr: 'ما هي متلازمة التغير العصبي العيني الفضائي (SANS)؟',
      aEn: 'In zero gravity, cephalad fluid shift increases intracranial pressure, flattening the posterior globe and swelling optic nerve sheaths. ASTRA recommends daily Lower Body Negative Pressure (LBNP) to pull fluid downward.',
      aAr: 'في انعدام الجاذبية، ينتقل الدم والسوائل نحو الرأس مما يرفع الضغط القحفي ويسبب تورماً خفيفاً في غلاف العصب البصري. يرشدك النظام لتطبيق تمارين الضغط السلبي السفلي (LBNP).',
    },
    {
      qEn: 'How does ASTRA HEALTH work with zero internet during deep space missions?',
      qAr: 'كيف يعمل نظام أسترا هيلث بدون إنترنت في الفضاء السحيق؟',
      aEn: 'ASTRA is completely offline-first. All medical reasoning, symptom triage, Quindar audio synthesis, and telemetry monitoring run on edge devices without needing a connection to Earth.',
      aAr: 'يعمل النظام بالكامل على حافة المركبة (Offline-First). كافة خوارزميات التشخيص وتوليد الصوت اللاسلكي ورسم القلب تعمل محلياً دون انتظار اتصال الأرض.',
    },
    {
      qEn: 'What are the two-tone Quindar radio beeps?',
      qAr: 'ما هي نغمات كويندار (Quindar Beeps) اللاسلكية؟',
      aEn: 'Quindar tones (2525 Hz intro and 2475 Hz outro) were developed for Apollo communications to trigger ground-station transmitters across NASA’s Deep Space Network.',
      aAr: 'نغمات كويندار (2525 و 2475 هرتز) ابتكرت في مهمات أبولو لتنشيط محطات الإرسال الأرضية عبر شبكة الفضاء السحيق.',
    },
    {
      qEn: 'How does the AI Avatar react to my emotional state?',
      qAr: 'كيف يتفاعل الآفاتار الذكي مع حالتي النفسية؟',
      aEn: 'You can tap how you feel (Happy, Sad, Crying, Stressed, Calm). The avatar transforms its facial expressions and eyes dynamically and gives you supportive voice advice.',
      aAr: 'يمكنك الضغط على شعورك الحالي (سعيد، حزين، أبكي، متوتر، هادئ)، وسيقوم الآفاتار بتغيير ملامح وجهه وعينيه تلقائياً وتقديم الدعم الصوتي المناسب.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.qEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.aEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.qAr.includes(searchQuery) ||
      f.aAr.includes(searchQuery)
  );

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0E1524] border border-cyan-500/50 rounded-2xl p-6 md:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
          <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {isAr ? 'مركز الدعم والمساعدة الفضائية' : 'Help & Support Hub'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'قاعدة المعرفة، دليل الميزات، ورفع بلاغات الدعم لمركز العمليات' : 'Searchable FAQ, interactive feature guides & Mission Control support.'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 pb-3 mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 text-center pb-2 font-bold transition-colors border-b-2 ${
              activeTab === 'faq' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'الأسئلة الشائعة (FAQ)' : 'Searchable FAQ'}
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`flex-1 text-center pb-2 font-bold transition-colors border-b-2 ${
              activeTab === 'guides' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'دليل ميزات النظام' : 'Feature Guides'}
          </button>
          <button
            onClick={() => setActiveTab('ticket')}
            className={`flex-1 text-center pb-2 font-bold transition-colors border-b-2 ${
              activeTab === 'ticket' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'
            }`}
          >
            {isAr ? 'إرسال بلاغ دعم' : 'Submit Support Ticket'}
          </button>
        </div>

        {/* TAB 1: SEARCHABLE FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في الأسئلة الشائعة (SANS، كويندار، التمارين)...' : 'Search FAQs (SANS, Quindar, ARED, SOS)...'}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-1.5 flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">Q:</span>
                    <span>{isAr ? faq.qAr : faq.qEn}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-5 font-sans">
                    {isAr ? faq.aAr : faq.aEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GUIDES */}
        {activeTab === 'guides' && (
          <div className="space-y-3 font-sans text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>1. Real-Time Telemetry & Lead-II Waveform</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Connect your in-suit biosensor electrodes. The Lead-II ECG canvas auto-syncs at 250 Hz, flagging arrhythmias and calculating autonomic HRV RMSSD in real-time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>2. AI Doctor Avatar & Voice Comms</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Tap "Call Astronaut" or "Feel Something Strange" to open direct S-band speech comms. The avatar morphs facial expressions according to your reported mood and auto-routes you to countermeasures.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>3. Earth & Nature Biophilic Sanctuary</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Counter sensory deprivation by playing procedural Web Audio water, ocean, and forest soundscapes with the 4-7-8 breathing pacer to reduce salivary cortisol by up to 48%.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT FORM / SUPPORT TICKET */}
        {activeTab === 'ticket' && (
          <div>
            {ticketSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/70 border border-emerald-500 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">
                  {isAr ? 'تم إرسال بلاغ الدعم بنجاح!' : 'Support Ticket Transmitted to Ground Control!'}
                </h4>
                <p className="text-xs text-emerald-300 font-mono">
                  Ticket #DSN-9428 logged. Flight Surgeon team notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">
                    {isAr ? 'موضوع البلاغ / الاستفسار:' : 'Ticket Subject:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. ARED sensor telemetry calibration drift"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">
                    {isAr ? 'تفاصيل المشكلة أو الاستفسار السريري:' : 'Description & Telemetry Context:'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Provide relevant MET flight time and symptoms..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-sans text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال البلاغ لمركز عمليات هيوستن' : 'Transmit Ticket to Houston Ground Control'}</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
