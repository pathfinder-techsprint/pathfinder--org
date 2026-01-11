# 🧭 Path Finder – AI-Powered Career Intelligence Platform

**Path Finder** is a resume-first, AI-driven career guidance platform that analyzes a user’s resume, identifies verified skills, maps them to industry-standard roles, and generates realistic, evidence-based learning roadmaps — all through a modern, multilingual, and theme-aware dashboard.

Unlike traditional career tools, Path Finder prioritizes **accuracy over optimism**, **state stability over randomness**, and **UI-first experiences over raw diagrams**.

---

## 🚀 Core Philosophy

- Resume is the **single source of truth**
- AI must be **strict, deterministic, and evidence-based**
- UI changes (language/theme) must **never reset career paths**
- Roadmaps must be **actionable, resource-rich, and realistic**
- Prompts define behavior — not hardcoded logic

---

## 🧠 Key Features (Reviewed & Explained)

### 1️⃣ Resume-First Skill & Interest Extraction
**Prompt-driven behavior**
- Reads uploaded resume (PDF/DOCX)
- Extracts only **explicitly evidenced skills**
- Infers interests conservatively using projects, roles, and repetition
- Normalizes skills (e.g., JS → JavaScript)
- Produces **deterministic output** for the same resume every time

> ❗ Skills are downgraded unless proven by real usage  
> ❗ No inflated seniority or assumptions

---

### 2️⃣ Strict Resume Analyzer (Low-Trust Mode)
**Prompt-enforced strictness**
- Default confidence = LOW
- Skills marked Strong only if:
  - Used in production or long-term projects
- Senior / Architect labels blocked unless proven
- Evidence-based language replaces flattering claims

Result:
> A trustworthy career audit, not motivational fluff

---

### 3️⃣ Role Matching Using Industry Standards
**Prompt logic**
- Matches users to **roadmap.sh-style roles**
- Penalizes missing fundamentals
- Prefers safer, narrower roles over exaggerated matches
- Generates match percentages conservatively

Supported roles include:
- Frontend Developer
- Backend Developer
- Full Stack Developer
- DevOps Engineer
- Data Analyst
- AI / ML Engineer

---

### 4️⃣ Dashboard-First Experience
**Initial landing page**
- Current skill strength (Strong / Moderate / Weak)
- Upcoming skills to learn
- Trending skills relevant to user’s role
- Primary recommended role
- Confidence score

Dashboard is **stateful and stable** across navigation.

---

### 5️⃣ UI-First Roadmaps (No Raw Graphs)
**Prompt-enforced UI output**
- No Mermaid / graph syntax rendered to users
- Roadmaps displayed as:
  - Cards
  - Sections
  - Modals
  - Images (descriptive metadata)
- Short-term / Mid-term / Long-term are **separate pages**

Each roadmap topic includes:
- Why it matters
- What the user will build
- Estimated time
- Deep resource lists

---

### 6️⃣ Deep Learning Resources (Expanded Mode)
**Prompt-controlled resource depth**

For every roadmap topic:
- ≥ 3 official documentation links
- ≥ 3 structured tutorials
- ≥ 2 hands-on project guides
- ≥ 1 best-practice / interview reference

Resources are:
- Modern
- Industry-relevant
- Non-redundant
- Topic-specific

---

### 7️⃣ Multilingual Support (Dynamic & Global)
**Prompt-based language engine**
- Supports English, Hindi, Telugu, Spanish, French, Arabic
- Language can be switched **at any time**
- Switching language:
  - Updates UI text only
  - Does NOT change paths, roles, or recommendations
- Brand name “Path Finder” is never translated

RTL layouts supported for Arabic.

---

### 8️⃣ Theme System (State-Safe)
**Prompt-enforced separation**
- Multiple themes (dark, light, high-contrast, resume-based)
- Resume can influence default theme palette
- Theme changes:
  - Do NOT reload routes
  - Do NOT recompute career paths
  - Do NOT reset progress

Themes are visual skins only.

---

### 9️⃣ State Stability (Enterprise-Grade UX)
**Prompt-enforced rules**
- Career context is immutable once created
- Language change ≠ new analysis
- Theme change ≠ new roadmap
- URLs remain stable across UI changes

Behavior similar to:
> GitHub, Notion, Netflix

---

### 🔐 10️⃣ Security & Authorization
- Supabase authentication
- Server-side user validation
- No client-provided `userId` trusted
- Row-Level Security enforced at database layer
- Prevents user impersonation and data leakage

---

## 🛠 Tech Stack

- **AI**: Google Gemini (AI Studio)
- **Frontend**: Next.js + React (cards, modals, dashboards)
- **Backend**: Supabase (auth, storage, RLS)
- **Deployment**: Vercel
- **State Management**: Context-based career_context_id
- **Localization**: Prompt-driven i18n
- **Theming**: Resume-aware + user override

---

## 📌 Project Name

**Path Finder**  
(AI-powered system to discover, validate, and build the right career path.)

---

## 🎯 Goal

To provide students and professionals with a **realistic, honest, and actionable career navigation system** that turns a resume into a long-term growth plan — without exaggeration, randomness, or UI instability.

---

## 🤝 Contributions

This project is prompt-driven by design.
Contributions are welcome in:
- UI improvements
- Prompt refinements
- Resource expansion
- Accessibility
- Performance

---

## 📄 License

MIT License

---

> Path Finder is not a career quiz.  
> It is a career operating system.

