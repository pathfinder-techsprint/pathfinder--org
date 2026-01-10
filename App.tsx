
import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Loader2, 
  RefreshCcw,
  Target,
  X,
  TrendingUp,
  Info,
  ExternalLink,
  BookOpen,
  Zap,
  ShieldCheck,
  Star,
  Compass,
  Layout,
  Briefcase,
  Layers,
  Award,
  Upload,
  User,
  Activity,
  Code,
  Terminal,
  PlayCircle,
  FileText,
  History,
  Languages,
  Palette,
  Github,
  Youtube,
  Globe,
  FileCode
} from 'lucide-react';
import { AnalysisResult, RoadmapResult, RoadmapCard, RoadmapPage } from './types';
import { analyzeResume, generateRoadmap, translateContent } from './careerService';
import MatchCard from './MatchCard';
import { SUPPORTED_LANGUAGES, UI_STRINGS, THEMES, ThemeConfig } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [lang, setLang] = useState('en');
  const [themeId, setThemeId] = useState('slate');
  const [resumeText, setResumeText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResult | null>(null);
  
  const [activeTab, setActiveTab] = useState<'short' | 'mid' | 'long'>('short');
  const [selectedCard, setSelectedCard] = useState<RoadmapCard | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = UI_STRINGS[lang] || UI_STRINGS['en'];
  const currentLangLabel = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.label || 'English';
  const currentTheme: ThemeConfig = THEMES[themeId] || THEMES['slate'];

  // Instant display-layer update on language change
  useEffect(() => {
    const syncLanguage = async () => {
      if (!analysis || !analysis.dashboard) return;
      setLoading(true);
      try {
        const translatedAnalysis = await translateContent(analysis, currentLangLabel);
        if (translatedAnalysis && translatedAnalysis.dashboard) {
          setAnalysis(translatedAnalysis);
        }
        
        if (roadmap) {
          const translatedRoadmap = await translateContent(roadmap, currentLangLabel);
          setRoadmap(translatedRoadmap);
        }
      } catch (err) {
        console.error("Language sync failed", err);
      } finally {
        setLoading(false);
      }
    };

    const currentDataLang = (analysis as any)?.language;
    if (analysis && analysis.dashboard && currentDataLang !== currentLangLabel) {
      syncLanguage();
    }
  }, [lang]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setResumeText(text);
      setIsUploading(false);
    };
    reader.readAsText(file);
  };

  const handleResumeAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!resumeText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeResume(resumeText, currentLangLabel, lang);
      if (result && result.dashboard) {
        setAnalysis(result);
        if (!selectedRole) setSelectedRole(result.dashboard.user_profile.primary_role);
      } else {
        throw new Error("The profile analysis was incomplete. Please check your resume text.");
      }
    } catch (err: any) {
      setError(err.message || 'Analysis initiation failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoadmapGeneration = async () => {
    if (!selectedRole || !analysis || !analysis.dashboard) return;
    setLoading(true);
    setError(null);
    try {
      const skillsStr = analysis.dashboard.current_skills.map(s => s.skill).join(', ');
      const result = await generateRoadmap(skillsStr, selectedRole, currentLangLabel, lang);
      if (result && result.short_term) {
        setRoadmap(result);
        if (step !== 3) setStep(3);
      } else {
        throw new Error("Could not generate a valid roadmap for this role.");
      }
    } catch (err: any) {
      setError(err.message || 'Roadmap generation failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setAnalysis(null);
    setSelectedRole(null);
    setRoadmap(null);
    setSelectedCard(null);
    setActiveTab('short');
    setResumeText('');
    setLoading(false);
    setError(null);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'documentation': return <Globe className="w-3 h-3 text-blue-400" />;
      case 'tutorial': return <Youtube className="w-3 h-3 text-red-400" />;
      case 'project': return <Github className="w-3 h-3 text-slate-400" />;
      case 'best-practice': return <Award className="w-3 h-3 text-emerald-400" />;
      default: return <BookOpen className="w-3 h-3 text-slate-500" />;
    }
  };

  const activePage = roadmap ? (activeTab === 'short' ? roadmap.short_term : activeTab === 'mid' ? roadmap.mid_term : roadmap.long_term) : null;

  return (
    <div 
      className={`min-h-screen flex flex-col items-center p-3 md:p-4 relative transition-colors duration-500 ${currentTheme.bgClass} ${currentTheme.textClass} ${lang === 'ar' ? 'rtl' : 'ltr'}`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Deep Resource Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className={`${currentTheme.id === 'minimal' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'} border w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[94vh] flex flex-col`}>
            <div className="p-4 md:p-6 overflow-y-auto">
              <div className={`flex justify-between items-start mb-4 border-b pb-4 ${currentTheme.id === 'minimal' ? 'border-slate-100' : 'border-slate-800'}`}>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${currentTheme.id === 'terminal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{selectedCard.category}</span>
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{selectedCard.difficulty}</span>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${currentTheme.id === 'minimal' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>{selectedCard.estimated_time}</span>
                  </div>
                  <h3 className={`text-xl font-black ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{selectedCard.title}</h3>
                </div>
                <button onClick={() => setSelectedCard(null)} className="p-1.5 hover:bg-slate-800/20 rounded-lg text-slate-500 hover:text-white transition-all"><X className="w-5 h-5" /></button>
              </div>

              <div className="grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                  <section>
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> {t.importance}</h4>
                    <p className={`text-xs leading-relaxed font-medium ${currentTheme.id === 'minimal' ? 'text-slate-600' : 'text-slate-300'}`}>{selectedCard.why_it_matters}</p>
                    <p className={`mt-2 text-[11px] leading-relaxed ${currentTheme.id === 'minimal' ? 'text-slate-500' : 'text-slate-400'}`}>{selectedCard.detailed_description}</p>
                  </section>

                  <section className={`${currentTheme.id === 'minimal' ? 'bg-slate-50 border-slate-200' : 'bg-blue-600/5 border-blue-500/10'} border p-4 rounded-xl`}>
                     <h4 className={`text-[9px] font-black uppercase tracking-widest mb-2 flex items-center gap-1.5 ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-blue-400'}`}><Briefcase className="w-3.5 h-3.5" /> {t.practicalScope}</h4>
                     <p className={`text-xs font-bold mb-2 ${currentTheme.id === 'minimal' ? 'text-slate-800' : 'text-blue-200'}`}>Build: {selectedCard.what_you_will_build}</p>
                     <ul className="grid md:grid-cols-2 gap-x-4 gap-y-1.5">
                        {selectedCard.learning_scope.map((item, idx) => (
                          <li key={idx} className={`flex items-start gap-1.5 text-[10px] ${currentTheme.id === 'minimal' ? 'text-slate-600' : 'text-slate-300'}`}>
                             <CheckCircle2 className={`w-3 h-3 mt-1 shrink-0 ${currentTheme.id === 'minimal' ? 'text-slate-400' : 'text-blue-500'}`} /> {item}
                          </li>
                        ))}
                     </ul>
                  </section>

                  <section>
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {t.resourceCluster} (Deep Expansion)</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {selectedCard.resources.map((res, idx) => (
                        <a key={idx} href={res.url} target="_blank" rel="noopener noreferrer" 
                           className={`flex items-center gap-2.5 p-2.5 border rounded-lg transition-all group overflow-hidden ${currentTheme.id === 'minimal' ? 'bg-white border-slate-200 hover:border-slate-900' : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800'}`}>
                           <div className="shrink-0">{getResourceIcon(res.type)}</div>
                           <div className="min-w-0">
                             <div className={`text-[9px] font-bold group-hover:text-white truncate ${currentTheme.id === 'minimal' ? 'text-slate-700 group-hover:text-slate-900' : 'text-slate-300'}`}>{res.label}</div>
                             <div className="text-[7px] uppercase font-black text-slate-600 tracking-tighter">{res.type}</div>
                           </div>
                        </a>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                   <section className={`p-4 rounded-xl border ${currentTheme.id === 'minimal' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/30 border-slate-800'}`}>
                      <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">{t.checkpoints}</h4>
                      <div className="space-y-2">
                        {selectedCard.completion_criteria.map((c, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[9px] text-slate-400 leading-tight">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {c}
                          </div>
                        ))}
                      </div>
                   </section>
                   <section className={`p-4 rounded-xl border ${currentTheme.id === 'minimal' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/30 border-slate-800'}`}>
                      <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">{t.prerequisites}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCard.prerequisites.map((p, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-500 text-[8px] font-black rounded border border-slate-700 uppercase tracking-tighter">{p}</span>
                        ))}
                      </div>
                   </section>
                </div>
              </div>
            </div>
            <div className={`p-4 border-t flex justify-end ${currentTheme.id === 'minimal' ? 'border-slate-100' : 'border-slate-800'}`}>
              <button onClick={() => setSelectedCard(null)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] rounded-lg transition-all shadow-lg">{t.dismiss}</button>
            </div>
          </div>
        </div>
      )}

      {/* COMPACT VIEWPORT HEADER */}
      <header className="w-full max-w-6xl mb-3 flex items-center justify-between px-2 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1 rounded-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-sm font-black ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{t.title}</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t.version}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Selector */}
          <div className="relative group">
            <button className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-[9px] font-black transition-all uppercase ${currentTheme.id === 'minimal' ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'}`}>
              <Palette className="w-3 h-3" /> {currentTheme.id}
            </button>
            <div className={`absolute ${lang === 'ar' ? 'left-0' : 'right-0'} top-full mt-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 hidden group-hover:block z-50 min-w-[100px]`}>
              {Object.values(THEMES).map(theme => (
                <button 
                  key={theme.id} 
                  onClick={() => setThemeId(theme.id)}
                  className={`w-full text-left px-2.5 py-1 text-[9px] font-bold hover:bg-slate-800 transition-colors ${themeId === theme.id ? 'text-blue-400 bg-slate-800/50' : 'text-slate-400'}`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative group">
            <button className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-[9px] font-black transition-all uppercase ${currentTheme.id === 'minimal' ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'}`}>
              <Languages className="w-3 h-3" /> {lang}
            </button>
            <div className={`absolute ${lang === 'ar' ? 'left-0' : 'right-0'} top-full mt-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 hidden group-hover:block z-50 min-w-[90px]`}>
              {SUPPORTED_LANGUAGES.map(l => (
                <button 
                  key={l.code} 
                  onClick={() => setLang(l.code)}
                  className={`w-full text-left px-2.5 py-1 text-[9px] font-bold hover:bg-slate-800 transition-colors ${lang === l.code ? 'text-blue-400 bg-slate-800/50' : 'text-slate-500'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-black border transition-all ${step >= s ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-700'}`}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl px-2 flex-1 flex flex-col">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-0.5 bg-slate-900/10 z-[60]">
             <div className="h-full bg-blue-500 animate-[loading_1.5s_infinite]" style={{ width: '40%' }} />
          </div>
        )}
        
        {error && (
          <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center gap-2 text-[10px] animate-in slide-in-from-top-1">
            <RefreshCcw className="w-3.5 h-3.5 flex-shrink-0" /> <p className="font-bold">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-300 hover:text-white"><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

        {/* Step 1: Deterministic Audit */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-1 duration-300 flex-1 flex flex-col justify-center">
            {(!analysis || !analysis.dashboard) ? (
              <div className="max-w-2xl mx-auto w-full space-y-4 pt-4">
                <div className="text-center space-y-1">
                  <h2 className={`text-2xl font-black leading-tight ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{t.artifactAnalysis}</h2>
                  <p className="text-slate-500 text-[11px] font-medium">{t.deterministicTag}</p>
                </div>
                
                <form onSubmit={(e) => handleResumeAnalysis(e)} className="space-y-3">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`group border border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-inner ${currentTheme.id === 'minimal' ? 'bg-white border-slate-200 hover:border-slate-400' : 'bg-slate-900/10 border-slate-800 hover:border-blue-500/30'}`}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.docx,.txt" className="hidden" />
                    {isUploading ? <Loader2 className="w-6 h-6 text-blue-500 animate-spin" /> : <Upload className={`w-6 h-6 ${currentTheme.id === 'terminal' ? 'text-emerald-900 group-hover:text-emerald-500' : 'text-slate-700 group-hover:text-blue-500'}`} />}
                    <div className="text-center">
                      <p className={`text-[11px] font-bold ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{t.uploadResume}</p>
                      <p className="text-[9px] text-slate-600">{t.supportFormat}</p>
                    </div>
                  </div>

                  <textarea 
                    className={`w-full border rounded-lg p-3 text-[10px] focus:ring-1 focus:ring-blue-500/30 outline-none min-h-[120px] resize-none ${currentTheme.id === 'minimal' ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-950/50 border-slate-800 text-slate-300 placeholder:text-slate-800'}`}
                    placeholder={t.pasteRaw}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />

                  <button type="submit" disabled={loading || !resumeText} className={`w-full py-2.5 rounded-lg font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg relative ${currentTheme.id === 'minimal' ? 'bg-slate-900 hover:bg-slate-800 text-white' : currentTheme.id === 'terminal' ? 'bg-emerald-600 hover:bg-emerald-500 text-black' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                    {loading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {t.loading}</span> : t.runAudit}
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-lg font-black ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{t.calibratedDashboard}</h2>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t.currentBenchmark}: <span className={currentTheme.id === 'terminal' ? 'text-emerald-400' : 'text-blue-400'}>{analysis.dashboard?.user_profile?.primary_role}</span></p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={reset} className={`px-3 py-1 border rounded-lg text-[9px] font-black transition-colors ${currentTheme.id === 'minimal' ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'}`}>{t.reset}</button>
                    <button onClick={() => setStep(2)} className={`px-4 py-1 rounded-lg text-[9px] font-black flex items-center gap-1.5 shadow-md ${currentTheme.id === 'terminal' ? 'bg-emerald-600 text-black' : 'bg-blue-600 text-white'}`}>{t.viewPaths} <ArrowRight className={`w-3 h-3 ${lang === 'ar' ? 'rotate-180' : ''}`} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                  <div className={`${currentTheme.cardClass} lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between shadow-lg`}>
                    <div className="space-y-3">
                      <div className={`flex items-center gap-1.5 ${currentTheme.id === 'terminal' ? 'text-emerald-500' : 'text-blue-500'}`}>
                        <User className="w-3.5 h-3.5" />
                        <h3 className="font-bold text-[10px] uppercase tracking-widest">{t.profileArtifact}</h3>
                      </div>
                      <div>
                        <div className="text-[8px] uppercase font-black text-slate-600 tracking-widest">{t.seniority}</div>
                        <div className={`text-2xl font-black ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{analysis.dashboard?.user_profile?.experience_level}</div>
                      </div>
                      <p className={`text-[10px] leading-snug font-medium italic border-l pl-2.5 ${currentTheme.id === 'minimal' ? 'border-slate-300 text-slate-500' : 'border-blue-500/30 text-slate-400'}`}>"{analysis.dashboard?.user_profile?.evidence_based_summary}"</p>
                    </div>
                  </div>

                  <div className={`${currentTheme.cardClass} lg:col-span-8 p-5 rounded-xl border shadow-lg`}>
                    <div className="flex items-center gap-1.5 text-emerald-500 mb-3">
                      <Activity className="w-3.5 h-3.5" />
                      <h3 className="font-bold text-[10px] uppercase tracking-widest">{t.skillValidation}</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {analysis.dashboard?.current_skills?.map((s, i) => (
                        <div key={i} className={`p-2 rounded-lg border flex flex-col gap-1 ${currentTheme.id === 'minimal' ? 'bg-white border-slate-100' : 'bg-slate-950/50 border-slate-800'}`}>
                          <span className={`text-[9px] font-bold truncate ${currentTheme.id === 'minimal' ? 'text-slate-800' : 'text-white'}`}>{s.skill}</span>
                          <span className={`text-[7px] font-black px-1 py-0.5 rounded border w-fit uppercase ${s.status === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{s.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Transitions */}
        {step === 2 && analysis && analysis.dashboard && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-lg font-black ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{t.strategicTransitions}</h2>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t.tier}: <span className={currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}>{analysis.dashboard.user_profile?.experience_level}</span></p>
              </div>
              <button onClick={() => setStep(1)} className={`flex items-center gap-1.5 text-[9px] font-black uppercase transition-colors ${currentTheme.id === 'minimal' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-500 hover:text-white'}`}><ChevronRight className={`w-3.5 h-3.5 ${lang === 'ar' ? '' : 'rotate-180'}`} /> {t.calibratedDashboard}</button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
               <div className="lg:col-span-9 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                     {analysis.role_matches?.slice(0, 3).map((match) => (
                       <MatchCard key={match.role} role={match.role} percentage={match.match_percentage} difficulty={match.difficulty as any} reasoning={match.transition_reasoning} isSelected={selectedRole === match.role} onSelect={() => setSelectedRole(match.role)} />
                     ))}
                  </div>
                  <button onClick={handleRoadmapGeneration} disabled={loading || !selectedRole} className={`w-full py-3 rounded-lg font-black text-xs flex items-center justify-center gap-2 shadow-lg relative transition-all ${currentTheme.id === 'terminal' ? 'bg-emerald-600 text-black hover:bg-emerald-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}>
                     {loading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {t.loading}</span> : `${t.engineerRoadmap} ${selectedRole}`}
                  </button>
               </div>
               <div className="lg:col-span-3">
                 <div className={`${currentTheme.cardClass} p-5 rounded-xl border h-full flex flex-col justify-center gap-3 text-center shadow-lg`}>
                    <Compass className={`w-6 h-6 mx-auto ${currentTheme.id === 'terminal' ? 'text-emerald-500' : 'text-blue-500'}`} />
                    <p className="text-[9px] text-slate-500 font-medium italic">"{selectedRole}" path locked. {currentTheme.label} layer synchronized.</p>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Step 3: Roadmap Explorer */}
        {step === 3 && roadmap && activePage && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className={`w-5 h-5 ${currentTheme.id === 'terminal' ? 'text-emerald-500' : 'text-blue-500'}`} />
                <h2 className={`text-lg font-black ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{t.dominanceFlow} <span className={currentTheme.id === 'terminal' ? 'text-emerald-500 ml-1.5' : 'text-blue-500 ml-1.5'}>{selectedRole}</span></h2>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => setStep(2)} className={`px-3 py-1 border rounded-lg text-[9px] font-black transition-colors ${currentTheme.id === 'minimal' ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'}`}>{t.change}</button>
                <button onClick={reset} className={`px-3 py-1 rounded-lg text-[9px] font-black hover:opacity-90 transition-all ${currentTheme.id === 'terminal' ? 'bg-emerald-600 text-black' : 'bg-blue-600 text-white'}`}>{t.newAudit}</button>
              </div>
            </div>

            <div className={`flex gap-1 border-b ${currentTheme.id === 'minimal' ? 'border-slate-200' : 'border-slate-800'}`}>
               {[
                 { id: 'short', label: t.short, icon: <Zap className="w-3 h-3" /> },
                 { id: 'mid', label: t.mid, icon: <Layers className="w-3 h-3" /> },
                 { id: 'long', label: t.long, icon: <Award className="w-3 h-3" /> }
               ].map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={`flex items-center gap-1.5 px-5 py-2.5 font-black uppercase text-[9px] tracking-widest transition-all relative
                     ${activeTab === tab.id ? (currentTheme.id === 'terminal' ? 'text-emerald-400' : 'text-blue-400') : 'text-slate-600 hover:text-slate-400'}`}
                 >
                   {tab.icon} {tab.label}
                   {activeTab === tab.id && <div className={`absolute bottom-[-0.5px] left-0 w-full h-0.5 rounded-full ${currentTheme.id === 'terminal' ? 'bg-emerald-500' : 'bg-blue-500'}`} />}
                 </button>
               ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-3 animate-in fade-in duration-300">
              <div className={`${currentTheme.cardClass} lg:col-span-4 p-6 rounded-xl border h-full flex flex-col justify-between relative overflow-hidden shadow-lg`}>
                 <div className="space-y-3">
                    <h3 className={`text-lg font-black leading-tight ${currentTheme.id === 'minimal' ? 'text-slate-900' : 'text-white'}`}>{activePage.title}</h3>
                    <p className={`text-[10px] leading-relaxed ${currentTheme.id === 'minimal' ? 'text-slate-600' : 'text-slate-400'}`}>{activePage.description}</p>
                    <div className="space-y-1.5 mt-4">
                       <h4 className="text-[8px] font-black uppercase text-slate-600 tracking-widest">{t.gapAudit}</h4>
                       <div className="grid gap-1">
                          {roadmap?.gap_analysis?.slice(0, 4).map((gap, i) => (
                            <div key={i} className={`flex items-center gap-1.5 text-[9px] font-bold ${currentTheme.id === 'minimal' ? 'text-slate-800' : 'text-slate-300'}`}>
                               <ChevronRight className={`w-3 h-3 text-orange-500 shrink-0 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                               <span>{gap}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-2">
                 {activePage.roadmap_cards?.map((card) => (
                   <button
                     key={card.id}
                     onClick={() => setSelectedCard(card)}
                     className={`group border p-4 rounded-xl text-left transition-all flex gap-5 items-center shadow-md ${currentTheme.id === 'minimal' ? 'bg-white border-slate-200 hover:border-slate-400' : 'bg-slate-900 border-slate-800 hover:border-blue-500/40'}`}
                   >
                      <div className={`p-2.5 rounded-lg border transition-all ${currentTheme.id === 'minimal' ? 'bg-slate-50 border-slate-100 group-hover:bg-slate-900 group-hover:text-white' : 'bg-slate-800 border-slate-700 group-hover:bg-blue-600/10'}`}>
                         <Layers className={`w-5 h-5 ${currentTheme.id === 'minimal' ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-blue-500'}`} />
                      </div>
                      <div className="space-y-1 flex-1 overflow-hidden">
                        <div className="flex items-center gap-1.5">
                           <span className="text-[7px] font-black uppercase text-slate-600 border border-slate-800 px-1 py-0.5 rounded tracking-tighter">{card.difficulty}</span>
                           <span className="text-[7px] font-black uppercase text-slate-600 border border-slate-800 px-1 py-0.5 rounded tracking-tighter">{card.estimated_time}</span>
                        </div>
                        <h4 className={`text-base font-black transition-colors truncate ${currentTheme.id === 'minimal' ? 'text-slate-900 group-hover:text-slate-900' : 'text-white group-hover:text-blue-400'}`}>{card.title}</h4>
                        <p className={`text-[9px] line-clamp-1 ${currentTheme.id === 'minimal' ? 'text-slate-500' : 'text-slate-500'}`}>{card.why_it_matters}</p>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 text-slate-700 transition-all ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} ${currentTheme.id === 'minimal' ? 'group-hover:text-slate-900' : 'group-hover:text-blue-400'}`} />
                   </button>
                 ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto py-3 text-slate-800 text-[8px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
        <span>Stable Intelligence</span>
        <div className="w-1 h-1 bg-slate-800 rounded-full" />
        <span className="opacity-50">{currentTheme.label} Display Layer</span>
      </footer>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default App;
