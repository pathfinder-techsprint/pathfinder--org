
export enum CanonicalRole {
  Frontend = "Frontend Developer",
  Backend = "Backend Developer",
  FullStack = "Full Stack Developer",
  DevOps = "DevOps Engineer",
  Cloud = "Cloud Engineer",
  DataAnalyst = "Data Analyst",
  DataScientist = "Data Scientist",
  AIEngineer = "AI Engineer",
  MLEngineer = "Machine Learning Engineer",
  Cybersecurity = "Cybersecurity Engineer",
  Mobile = "Mobile App Developer"
}

export interface SkillItem {
  skill: string;
  status: "Strong" | "Moderate" | "Weak";
}

export interface UpcomingSkill {
  skill: string;
  reason: string;
}

export interface TrendingSkill {
  skill: string;
  trend: "Rising" | "High Demand" | "Stable";
}

export interface DashboardData {
  user_profile: {
    experience_level: "Junior" | "Intermediate" | "Senior" | "Lead";
    primary_role: string;
    confidence_score: number;
    evidence_based_summary: string;
  };
  current_skills: SkillItem[];
  upcoming_skills: UpcomingSkill[];
  trending_skills: TrendingSkill[];
}

export interface RoleMatch {
  role: string;
  match_percentage: number;
  difficulty: "Easy" | "Medium" | "Hard";
  transition_reasoning: string;
}

export interface AnalysisResult {
  dashboard: DashboardData;
  role_matches: RoleMatch[];
}

export interface Resource {
  label: string;
  url: string;
  type: "documentation" | "tutorial" | "project" | "best-practice";
}

export interface RoadmapCard {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimated_time: string;
  why_it_matters: string;
  what_you_will_build: string;
  learning_scope: string[];
  resources: Resource[];
  detailed_description: string;
  prerequisites: string[];
  completion_criteria: string[];
}

export interface RoadmapPage {
  title: string;
  description: string;
  roadmap_cards: RoadmapCard[];
}

export interface RoadmapResult {
  short_term: RoadmapPage;
  mid_term: RoadmapPage;
  long_term: RoadmapPage;
  gap_analysis: string[];
}
