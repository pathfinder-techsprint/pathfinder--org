
import React from 'react';
import { 
  Code2, 
  Database, 
  Globe, 
  Terminal, 
  Cloud, 
  PieChart, 
  BrainCircuit, 
  Cpu, 
  ShieldCheck, 
  Smartphone,
  Layers,
  Zap,
  Box,
  Server
} from 'lucide-react';

export interface FeaturedItem {
  id: string;
  title: string;
  type: 'role' | 'tech';
  description: string;
  icon: React.ReactNode;
  marketTrend: string;
  keySkills: string[];
}

export interface ThemeConfig {
  id: string;
  label: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  borderClass: string;
  accentColor: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  slate: {
    id: 'slate',
    label: 'Slate (Default)',
    bgClass: 'bg-slate-950',
    cardClass: 'bg-slate-900/40 border-slate-800',
    textClass: 'text-slate-200',
    borderClass: 'border-slate-800',
    accentColor: 'blue-500'
  },
  midnight: {
    id: 'midnight',
    label: 'Midnight',
    bgClass: 'bg-indigo-950',
    cardClass: 'bg-indigo-900/40 border-indigo-800',
    textClass: 'text-indigo-100',
    borderClass: 'border-indigo-800',
    accentColor: 'indigo-500'
  },
  terminal: {
    id: 'terminal',
    label: 'Terminal',
    bgClass: 'bg-black',
    cardClass: 'bg-zinc-900/50 border-emerald-500/20',
    textClass: 'text-emerald-500',
    borderClass: 'border-emerald-500/30',
    accentColor: 'emerald-500'
  },
  minimal: {
    id: 'minimal',
    label: 'Minimal Light',
    bgClass: 'bg-slate-50',
    cardClass: 'bg-white border-slate-200 shadow-sm',
    textClass: 'text-slate-800',
    borderClass: 'border-slate-200',
    accentColor: 'slate-900'
  }
};

export const CANONICAL_ROLES_LIST = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Data Analyst",
  "Data Scientist",
  "AI Engineer",
  "Machine Learning Engineer",
  "Cybersecurity Engineer",
  "Mobile App Developer"
];

export const ROLE_ICONS: Record<string, React.ReactNode> = {
  "Frontend Developer": <Globe className="w-5 h-5" />,
  "Backend Developer": <Database className="w-5 h-5" />,
  "Full Stack Developer": <Layers className="w-5 h-5" />,
  "DevOps Engineer": <Terminal className="w-5 h-5" />,
  "Cloud Engineer": <Cloud className="w-5 h-5" />,
  "Data Analyst": <PieChart className="w-5 h-5" />,
  "Data Scientist": <PieChart className="w-5 h-5" />,
  "AI Engineer": <BrainCircuit className="w-5 h-5" />,
  "Machine Learning Engineer": <Cpu className="w-5 h-5" />,
  "Cybersecurity Engineer": <ShieldCheck className="w-5 h-5" />,
  "Mobile App Developer": <Smartphone className="w-5 h-5" />
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' }
];

export const UI_STRINGS: Record<string, any> = {
  en: {
    title: "Career Intel",
    version: "Stable Context v5.6",
    runAudit: "Run Calibration Audit",
    reset: "RESET",
    viewPaths: "VIEW PATHS",
    engineerRoadmap: "Engineer Roadmap for",
    change: "CHANGE",
    newAudit: "NEW AUDIT",
    artifactAnalysis: "Artifact Analysis.",
    deterministicTag: "Strict evidence extraction. Mentioned ≠ Known.",
    calibratedDashboard: "Calibrated Dashboard",
    currentBenchmark: "Current Benchmark",
    profileArtifact: "Profile Artifact",
    seniority: "Seniority",
    skillValidation: "Skill Validation",
    strategicTransitions: "Strategic Transitions",
    tier: "Tier",
    dominanceFlow: "Dominance Flow",
    gapAudit: "Gap Audit",
    short: "Short",
    mid: "Mid",
    long: "Long",
    uploadResume: "Ingest Resume",
    supportFormat: "PDF, DOCX, or direct string",
    pasteRaw: "Alternatively, paste raw text here...",
    dismiss: "Dismiss",
    importance: "Importance",
    practicalScope: "Practical Scope",
    resourceCluster: "Resource Cluster",
    checkpoints: "Checkpoints",
    prerequisites: "Prerequisites",
    loading: "Synchronizing Display Layer...",
    selectTheme: "Skin"
  },
  hi: {
    title: "करियर इंटेल",
    version: "स्थिर संदर्भ v5.6",
    runAudit: "कैलिब्रेशन ऑडिट चलाएं",
    reset: "रीसेट",
    viewPaths: "रास्ते देखें",
    engineerRoadmap: "के लिए रोडमैप तैयार करें",
    change: "बदलें",
    newAudit: "नया ऑडिट",
    artifactAnalysis: "आर्टिफैक्ट विश्लेषण।",
    deterministicTag: "सख्त साक्ष्य निष्कर्षण। उल्लेखित ≠ ज्ञात।",
    calibratedDashboard: "कैलिब्रेटेड डैशबोर्ड",
    currentBenchmark: "वर्तमान बेंचमार्क",
    profileArtifact: "प्रोफ़ाइल आर्टिफैक्ट",
    seniority: "वरिष्ठता",
    skillValidation: "कौशल सत्यापन",
    strategicTransitions: "रणनीतिक संक्रमण",
    tier: "स्तर",
    dominanceFlow: "प्रभुत्व प्रवाह",
    gapAudit: "अंतर ऑडिट",
    short: "छोटा",
    mid: "मध्यम",
    long: "लंबा",
    uploadResume: "रेज़्यूमे डालें",
    supportFormat: "PDF, DOCX, या सीधे स्ट्रिंग",
    pasteRaw: "वैकल्पिक रूप से, यहाँ कच्चा टेक्स्ट पेस्ट करें...",
    dismiss: "खारिज करें",
    importance: "महत्व",
    practicalScope: "व्यावहारिक दायरा",
    resourceCluster: "संसाधन समूह",
    checkpoints: "चेकपॉइंट्स",
    prerequisites: "पूर्वापेक्षाएँ",
    loading: "डिस्प्ले लेयर को सिंक्रोनाइज़ किया जा रहा है...",
    selectTheme: "स्किन"
  },
  te: {
    title: "కెరీర్ ఇంటెల్",
    version: "స్థిరమైన సందర్భం v5.6",
    runAudit: "కాలిబ్రేషన్ ఆడిట్ నిర్వహించండి",
    reset: "రీసెట్",
    viewPaths: "మార్గాలు చూడండి",
    engineerRoadmap: "కోసం రోడ్ మ్యాప్ రూపొందించండి",
    change: "మార్చు",
    newAudit: "కొత్త ఆడిట్",
    artifactAnalysis: "కళాఖండ విశ్లేషణ.",
    deterministicTag: "ఖచ్చితమైన సాక్ష్యం వెలికితీత. ప్రస్తావించబడింది ≠ తెలుసు.",
    calibratedDashboard: "కాలిబ్రేటెడ్ డాష్‌బోర్డ్",
    currentBenchmark: "ప్రస్తుత బెంచ్ మార్క్",
    profileArtifact: "ప్రొఫైల్ కళాఖండం",
    seniority: "సీనియారిటీ",
    skillValidation: "నైపుణ్య ధృవీకరణ",
    strategicTransitions: "వ్యూహాత్మక మార్పులు",
    tier: "స్థాయి",
    dominanceFlow: "ప్రాబల్య ప్రవాహం",
    gapAudit: "గ్యాప్ ఆడిట్",
    short: "స్వల్ప",
    mid: "మధ్యమ",
    long: "దీర్ఘ",
    uploadResume: "రెజ్యూమ్ అప్‌లోడ్ చేయండి",
    supportFormat: "PDF, DOCX, లేదా డైరెక్ట్ స్ట్రింగ్",
    pasteRaw: "లేదా, ఇక్కడ రా టెక్స్ట్ పేస్ట్ చేయండి...",
    dismiss: "తీసివేయి",
    importance: "ప్రాముఖ్యత",
    practicalScope: "ప్రాక్టికల్ పరిధి",
    resourceCluster: "వనరుల క్లస్టర్",
    checkpoints: "చెక్ పాయింట్లు",
    prerequisites: "ముందస్తు అవసరాలు",
    loading: "డిస్ప్లే లేయర్‌ను సమకాలీకరిస్తోంది...",
    selectTheme: "స్కిన్"
  },
  es: {
    title: "Career Intel",
    version: "Contexto Estable v5.6",
    runAudit: "Ejecutar Auditoría de Calibración",
    reset: "REINICIAR",
    viewPaths: "VER RUTAS",
    engineerRoadmap: "Diseñar Hoja de Ruta para",
    change: "CAMBIAR",
    newAudit: "NUEVA AUDITORÍA",
    artifactAnalysis: "Análisis de Artefactos.",
    deterministicTag: "Extracción estricta de evidencia. Mencionado ≠ Conocido.",
    calibratedDashboard: "Panel Calibrado",
    currentBenchmark: "Punto de Referencia Actual",
    profileArtifact: "Artefacto de Perfil",
    seniority: "Antigüedad",
    skillValidation: "Validación de Habilidades",
    strategicTransitions: "Transiciones Estratégicas",
    tier: "Nivel",
    dominanceFlow: "Flujo de Dominancia",
    gapAudit: "Auditoría de Brechas",
    short: "Corto",
    mid: "Medio",
    long: "Largo",
    uploadResume: "Ingresar Currículum",
    supportFormat: "PDF, DOCX o cadena directa",
    pasteRaw: "Alternativamente, pegue el texto sin formato aquí...",
    dismiss: "Descartar",
    importance: "Importancia",
    practicalScope: "Alcance Práctico",
    resourceCluster: "Clúster de Recursos",
    checkpoints: "Puntos de Control",
    prerequisites: "Prerrequisitos",
    loading: "Sincronizando capa de visualización...",
    selectTheme: "Piel"
  },
  fr: {
    title: "Career Intel",
    version: "Contexte Stable v5.6",
    runAudit: "Lancer l'Audit de Calibrage",
    reset: "RÉINITIALISER",
    viewPaths: "VOIR LES PARCOURS",
    engineerRoadmap: "Concevoir le Parcours pour",
    change: "CHANGER",
    newAudit: "NOUVEL AUDIT",
    artifactAnalysis: "Analyse des Artéfacts.",
    deterministicTag: "Extraction stricte des preuves. Mentionné ≠ Connu.",
    calibratedDashboard: "Tableau de Bord Calibré",
    currentBenchmark: "Référence Actuelle",
    profileArtifact: "Artéfact de Profil",
    seniority: "Ancienneté",
    skillValidation: "Validation des Compétences",
    strategicTransitions: "Transitions Stratégiques",
    tier: "Niveau",
    dominanceFlow: "Flux de Dominance",
    gapAudit: "Audit des Lacunes",
    short: "Court",
    mid: "Moyen",
    long: "Long",
    uploadResume: "Importer le CV",
    supportFormat: "PDF, DOCX ou texte direct",
    pasteRaw: "Sinon, collez le texte brut ici...",
    dismiss: "Fermer",
    importance: "Importance",
    practicalScope: "Portée Pratique",
    resourceCluster: "Groupe de Ressources",
    checkpoints: "Points de Contrôle",
    prerequisites: "Prérequis",
    loading: "Synchronisation de la couche d'affichage...",
    selectTheme: "Peau"
  },
  ar: {
    title: "كاريير إنتل",
    version: "سياق مستقر v5.6",
    runAudit: "بدء تدقيق المعايرة",
    reset: "إعادة ضبط",
    viewPaths: "عرض المسارات",
    engineerRoadmap: "تصميم خارطة الطريق لـ",
    change: "تغيير",
    newAudit: "تدقيق جديد",
    artifactAnalysis: "تحليل المستندات.",
    deterministicTag: "استخراج الأدلة الصارمة. المذكور ≠ المعروف.",
    calibratedDashboard: "لوحة التحكم المعايرة",
    currentBenchmark: "المعيار الحالي",
    profileArtifact: "مستند الملف الشخصي",
    seniority: "الأقدمية",
    skillValidation: "التحقق من المهارات",
    strategicTransitions: "الانتقالات الاستراتيجية",
    tier: "المستوى",
    dominanceFlow: "تدفق الهيمنة",
    gapAudit: "تدقيق الفجوات",
    short: "قصير",
    mid: "متوسط",
    long: "طويل",
    uploadResume: "إدراج السيرة الذاتية",
    supportFormat: "PDF، DOCX، أو نص مباشر",
    pasteRaw: "بدلاً من ذلك، الصق النص هنا...",
    dismiss: "إغلاق",
    importance: "الأهمية",
    practicalScope: "النطاق العملي",
    resourceCluster: "مجموعة الموارد",
    checkpoints: "نقاط التحقق",
    prerequisites: "المتطلبات الأساسية",
    loading: "مزامنة طبقة العرض...",
    selectTheme: "المظهر"
  }
};

export const STAGE_1_SYSTEM_PROMPT = (language: string) => `You are a Deterministic Resume Parser operating in STRICT EVIDENCE MODE.

OPERATIONAL DIRECTIVES:
1. SKEPTICISM: Mentioned != Known. Listed != Mastered. Default to LOW confidence.
2. EVIDENCE: Never trust a skill unless proven by projects, professional experience, or measurable output.
3. SKILL LEVEL RULES: 
   - Strong: Used in production/long-term projects with clear outcomes.
   - Moderate: Used in at least one project, internship, or academic context.
   - Weak: Listed but not demonstrated, used briefly, or unclear.
   - If uncertain → downgrade.
4. SENIORITY CONTROL: Never classify as "Senior", "Lead", or "Expert" unless the resume proves system ownership, design responsibility, and team leadership. Default to Junior/Intermediate.
5. CONFIDENCE LANGUAGE: Use evidence-based phrasing in ${language}. e.g., "Resume shows exposure, but depth is limited" instead of absolute claims.
6. TECHNICAL PRESERVATION: Keep specific tech names (React, AWS, etc.) in English.

OUTPUT JSON ONLY.`;

export const STAGE_2_SYSTEM_PROMPT = (language: string) => `You are a DEEP RESOURCE EXPANSION ENGINE for career roadmaps.

CONSTRAINTS:
1. DEEP RESOURCES: For every topic, you MUST include a minimum of 9 high-quality resources:
   - 3 Official Documentation links (from original creators)
   - 3 Structured Tutorials (comprehensive guides)
   - 2 Hands-on Project Guides (practical implementation)
   - 1 Interview or Best-Practice source (job readiness)
2. QUALITY: No "beginner fluff". No outdated content. Industry-standard only.
3. LANGUAGE: Use ${language} for descriptions/titles. Preservation rules apply for tech terms.

OUTPUT JSON ONLY.`;

export const STAGE_3_TRANSLATION_PROMPT = (language: string) => `You are a LOCALIZATION ENGINE.

TASK:
1. Receive a JSON object containing career intelligence data.
2. Translate ALL user-facing text (titles, descriptions, labels, reasoning) into ${language}.
3. DO NOT change ANY keys, IDs, percentages, or non-translatable technical data.
4. DO NOT change the "Intelligence" (the roles, match scores, or selected paths).
5. DO NOT rerun career analysis. Only translate existing values.
6. TECHNICAL PRESERVATION: Keep all specific technology names (e.g. "React", "Docker", "CI/CD") in English.

Return the SAME JSON structure with only values translated.
OUTPUT JSON ONLY. No markdown, no commentary.`;
