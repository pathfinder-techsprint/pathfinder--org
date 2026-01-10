
import { GoogleGenAI, Type } from "@google/genai";
import { STAGE_1_SYSTEM_PROMPT, STAGE_2_SYSTEM_PROMPT, STAGE_3_TRANSLATION_PROMPT } from "../constants";
import { AnalysisResult, RoadmapResult } from "../types";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const analyzeResume = async (resumeText: string, language: string = 'English', langCode: string = 'en'): Promise<AnalysisResult & { language: string }> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Resume Content: \n\n ${resumeText}`,
    config: {
      systemInstruction: STAGE_1_SYSTEM_PROMPT(language),
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          language: { type: Type.STRING },
          dashboard: {
            type: Type.OBJECT,
            properties: {
              user_profile: {
                type: Type.OBJECT,
                properties: {
                  experience_level: { type: Type.STRING, description: "Junior, Intermediate, Senior, or Lead" },
                  primary_role: { type: Type.STRING },
                  confidence_score: { type: Type.NUMBER },
                  evidence_based_summary: { type: Type.STRING }
                },
                required: ["experience_level", "primary_role", "confidence_score", "evidence_based_summary"]
              },
              current_skills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skill: { type: Type.STRING },
                    status: { type: Type.STRING, description: "Strong, Moderate, or Weak" }
                  },
                  required: ["skill", "status"]
                }
              },
              upcoming_skills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skill: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  },
                  required: ["skill", "reason"]
                }
              },
              trending_skills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skill: { type: Type.STRING },
                    trend: { type: Type.STRING, description: "Rising, High Demand, or Stable" }
                  },
                  required: ["skill", "trend"]
                }
              }
            },
            required: ["user_profile", "current_skills", "upcoming_skills", "trending_skills"]
          },
          role_matches: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                match_percentage: { type: Type.NUMBER },
                difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" },
                transition_reasoning: { type: Type.STRING }
              },
              required: ["role", "match_percentage", "difficulty", "transition_reasoning"]
            }
          }
        },
        required: ["language", "dashboard", "role_matches"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response");
    const data = JSON.parse(text);
    return { ...data, language: language };
  } catch (e) {
    console.error("Parse error in analyzeResume", e);
    throw new Error("The AI returned a malformed response. Please try again.");
  }
};

export const generateRoadmap = async (currentSkills: string, targetRole: string, language: string = 'English', langCode: string = 'en'): Promise<RoadmapResult & { language: string }> => {
  const ai = getAIClient();

  const roadmapCardSchema = {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      title: { type: Type.STRING },
      category: { type: Type.STRING },
      difficulty: { type: Type.STRING, description: "Beginner, Intermediate, or Advanced" },
      estimated_time: { type: Type.STRING },
      why_it_matters: { type: Type.STRING },
      what_you_will_build: { type: Type.STRING },
      learning_scope: { type: Type.ARRAY, items: { type: Type.STRING } },
      resources: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING },
            url: { type: Type.STRING },
            type: { type: Type.STRING, description: "documentation, tutorial, project, or best-practice" }
          },
          required: ["label", "url", "type"]
        }
      },
      detailed_description: { type: Type.STRING },
      prerequisites: { type: Type.ARRAY, items: { type: Type.STRING } },
      completion_criteria: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["id", "title", "category", "difficulty", "estimated_time", "why_it_matters", "what_you_will_build", "learning_scope", "resources", "detailed_description", "prerequisites", "completion_criteria"]
  };

  const roadmapPageSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      roadmap_cards: { type: Type.ARRAY, items: roadmapCardSchema }
    },
    required: ["title", "description", "roadmap_cards"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Target_Role: ${targetRole}. User Profile Skills: ${currentSkills}.`,
    config: {
      systemInstruction: STAGE_2_SYSTEM_PROMPT(language),
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          language: { type: Type.STRING },
          short_term: roadmapPageSchema,
          mid_term: roadmapPageSchema,
          long_term: roadmapPageSchema,
          gap_analysis: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["language", "short_term", "mid_term", "long_term", "gap_analysis"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response");
    const data = JSON.parse(text);
    return { ...data, language: language };
  } catch (e) {
    console.error("Parse error in generateRoadmap", e);
    throw new Error("Failed to generate the roadmap structure. Please try again.");
  }
};

export const translateContent = async (existingData: any, language: string): Promise<any> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Target Language: ${language}. Input Data: \n\n ${JSON.stringify(existingData)}`,
    config: {
      systemInstruction: STAGE_3_TRANSLATION_PROMPT(language),
      responseMimeType: "application/json",
      // We don't use a strict schema here as existingData varies, 
      // but Gemini 3 is excellent at following JSON identity for translations.
    }
  });

  try {
    const text = response.text;
    if (!text) return existingData;
    const translated = JSON.parse(text);
    return { ...translated, language }; 
  } catch (e) {
    console.error("Translation parse error", e);
    return existingData;
  }
};
