# Leadership Loom v2

A modern succession planning and leadership assessment application built with React, Vite, Tailwind CSS, shadcn/ui, and Supabase.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email + Google OAuth)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Development Status

### ✅ Phase 1 Complete: Foundation

- [x] Project initialization
- [x] Dependencies installed
- [x] Folder structure created
- [x] Database schema and RLS policies
- [x] Survey questions migrated (621 lines)
- [x] Scoring algorithm migrated (exact preservation)
- [x] Supabase client setup

### 🚧 Next Steps

- Build authentication system
- Set up React Router
- Install shadcn/ui components
- Create survey forms
- Build dashboard

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Critical Files

⚠️ These files preserve exact business logic from legacy app:

1. **src/constants/proprietary.ts** - All survey questions
2. **src/services/evaluate.ts** - Scoring algorithm

**DO NOT modify without approval**

## Queries

```
SELECT
-- Survey metadata
sr.created_at AS "Survey Date",
u.name AS "Submitted By",
u.email AS "Submitter Email",

-- Employee being evaluated
sr.emp_name AS "Employee Name",
sr.emp_id AS "Employee ID",
sr.emp_job_title AS "Job Title",

-- Experience
sr.experience AS "Experience Level",
sr.licensing AS "Licensing/Certifications",
sr.other_experience AS "Other Experience",

-- Scores
sr.total_score AS "Total Score (0-300)",
sr.total_leadership_potential AS "Leadership Potential (0-280)",
sr.total_personal_characteristics AS "Personal Characteristics (0-194)",
sr.total_learning AS "Learning (0-100)",
sr.total_past_performance AS "Past Performance (0-6)",

-- Leadership Potential (Category 2.1)
sr.leadership_potential->>'leadership-potential-1' AS "LP1: Co-ordinates group activities",
sr.leadership_potential->>'leadership-potential-2' AS "LP2: Keeps team focused on goals",
sr.leadership_potential->>'leadership-potential-3' AS "LP3: Provides clear direction",
sr.leadership_potential->>'leadership-potential-4' AS "LP4: Clarifies roles and expectations",
sr.leadership_potential->>'leadership-potential-5' AS "LP5: Offers clear/constructive feedback",
sr.leadership_potential->>'leadership-potential-6' AS "LP6: Addresses inappropriate behaviour",
sr.leadership_potential->>'leadership-potential-7' AS "LP7: Takes action when expectations not met",
sr.leadership_potential->>'leadership-potential-8' AS "LP8: Coaches staff for success",
sr.leadership_potential->>'leadership-potential-9' AS "LP9: Pushes empowerment downwards",
sr.leadership_potential->>'leadership-potential-10' AS "LP10: Delegates based on skills/interests",

-- Adapt & Respond (Category 2.2)
sr.adapt_respond->>'adapt-respond-1' AS "AR1: Adjusts to change positively",
sr.adapt_respond->>'adapt-respond-2' AS "AR2: Adapts work style to circumstances",
sr.adapt_respond->>'adapt-respond-3' AS "AR3: Accepts new ideas",
sr.adapt_respond->>'adapt-respond-4' AS "AR4: Supports change initiatives",
sr.adapt_respond->>'adapt-respond-5' AS "AR5: Adapts interpersonal style",
sr.adapt_respond->>'adapt-respond-6' AS "AR6: Functions when direction lacking",
sr.adapt_respond->>'adapt-respond-7' AS "AR7: Remains confident in uncertainty",
sr.adapt_respond->>'adapt-respond-8' AS "AR8: Maintains control in difficult situations",
sr.adapt_respond->>'adapt-respond-9' AS "AR9: Bounces back from setbacks",
sr.adapt_respond->>'adapt-respond-10' AS "AR10: Uses criticism to grow",

-- Working with People (Category 2.3)
sr.working_with_people->>'working-with-people-1' AS "WP1: Interest in understanding others",
sr.working_with_people->>'working-with-people-2' AS "WP2: Acknowledges contributions",
sr.working_with_people->>'working-with-people-3' AS "WP3: Shows tolerance/consideration",
sr.working_with_people->>'working-with-people-4' AS "WP4: Encourages others to share views",
sr.working_with_people->>'working-with-people-5' AS "WP5: Encourages teamwork climate",
sr.working_with_people->>'working-with-people-6' AS "WP6: Aligns style with team",
sr.working_with_people->>'working-with-people-7' AS "WP7: Treats others with dignity",
sr.working_with_people->>'working-with-people-8' AS "WP8: Listens attentively",
sr.working_with_people->>'working-with-people-9' AS "WP9: Creates team spirit",
sr.working_with_people->>'working-with-people-10' AS "WP10: Reads non-verbal behaviour",

-- Business Acumen (Category 2.4)
sr.business_acumen->>'business-acumen-1' AS "BA1: Understands org functions",
sr.business_acumen->>'business-acumen-2' AS "BA2: Keeps up with policies/trends",
sr.business_acumen->>'business-acumen-3' AS "BA3: Understands strategic priorities",
sr.business_acumen->>'business-acumen-4' AS "BA4: Draws on external expertise",
sr.business_acumen->>'business-acumen-5' AS "BA5: Understands financial management",
sr.business_acumen->>'business-acumen-6' AS "BA6: Adjusts service delivery",
sr.business_acumen->>'business-acumen-7' AS "BA7: Strengthens delivery capacity",
sr.business_acumen->>'business-acumen-8' AS "BA8: Understands value of own services",

-- Setting Goals (Category 2.5)
sr.setting_goals->>'set-goals-deliver-results-1' AS "SG1: Translates strategy to unit goals",
sr.setting_goals->>'set-goals-deliver-results-2' AS "SG2: Links goals to org objectives",
sr.setting_goals->>'set-goals-deliver-results-3' AS "SG3: Communicates goals clearly",
sr.setting_goals->>'set-goals-deliver-results-4' AS "SG4: Communicates goals timely",
sr.setting_goals->>'set-goals-deliver-results-5' AS "SG5: Works to meet/exceed expectations",
sr.setting_goals->>'set-goals-deliver-results-6' AS "SG6: Achieves results sustainably",
sr.setting_goals->>'set-goals-deliver-results-7' AS "SG7: Targets essential activities",
sr.setting_goals->>'set-goals-deliver-results-8' AS "SG8: Adapts methods to achieve goals",
sr.setting_goals->>'set-goals-deliver-results-9' AS "SG9: Takes risks, owns outcomes",
sr.setting_goals->>'set-goals-deliver-results-10' AS "SG10: Seeks challenges/development",

-- Planning & Organizing (Category 2.6)
sr.planning_organizing->>'planning-organizing-1' AS "PO1: Designs clear objectives",
sr.planning_organizing->>'planning-organizing-2' AS "PO2: Sets challenging objectives",
sr.planning_organizing->>'planning-organizing-3' AS "PO3: Prioritizes activities",
sr.planning_organizing->>'planning-organizing-4' AS "PO4: Creates plans in advance",
sr.planning_organizing->>'planning-organizing-5' AS "PO5: Manages time effectively",
sr.planning_organizing->>'planning-organizing-6' AS "PO6: Estimates realistic timeframes",
sr.planning_organizing->>'planning-organizing-7' AS "PO7: Identifies/organizes resources",
sr.planning_organizing->>'planning-organizing-8' AS "PO8: Secures resources in advance",
sr.planning_organizing->>'planning-organizing-9' AS "PO9: Monitors progress",
sr.planning_organizing->>'planning-organizing-10' AS "PO10: Aware of hindering factors",

-- Strategic Thinking (Category 2.7)
sr.strategic_thinking->>'leadership-potential-1' AS "ST1: Wide range of org issues",
sr.strategic_thinking->>'leadership-potential-2' AS "ST2: Aware of issues in own work",
sr.strategic_thinking->>'leadership-potential-3' AS "ST3: Works for long-term goals",
sr.strategic_thinking->>'leadership-potential-4' AS "ST4: Considers future trends",
sr.strategic_thinking->>'leadership-potential-5' AS "ST5: Considers impact on future",
sr.strategic_thinking->>'leadership-potential-6' AS "ST6: Encourages long-term thinking",
sr.strategic_thinking->>'leadership-potential-7' AS "ST7: Aligns strategy with org",
sr.strategic_thinking->>'leadership-potential-8' AS "ST8: Revises strategy as needed",
sr.strategic_thinking->>'leadership-potential-9' AS "ST9: Explores future possibilities",

-- Personal Characteristics (Category 3) - Radio questions
sr.personal_characteristics->>'personal-characteristics-1' AS "PC1: Learns new materials quickly",
sr.personal_characteristics->>'personal-characteristics-2' AS "PC2: Articulates innovation drivers",
sr.personal_characteristics->>'personal-characteristics-3' AS "PC3: Creates learning structure",
sr.personal_characteristics->>'personal-characteristics-4' AS "PC4: Concentrates to learn",
sr.personal_characteristics->>'personal-characteristics-5' AS "PC5: Perseveres until mastery",
sr.personal_characteristics->>'personal-characteristics-6' AS "PC6: Secures learning resources",

-- Personal Characteristics (Category 3) - Yes/No questions
sr.personal_characteristics->>'personal-characteristics-7' AS "PC7: Expressed Aspiration",
sr.personal_characteristics->>'personal-characteristics-8' AS "PC8: Intent to Stay",
sr.personal_characteristics->>'personal-characteristics-9' AS "PC9: Discretionary Effort",
sr.personal_characteristics->>'personal-characteristics-10' AS "PC10: Motivation",

-- Past Performance (Category 4)
sr.past_performance->>'past-performance-1' AS "PP1: Satisfactory Performance Appraisals",
sr.past_performance->>'past-performance-2' AS "PP2: Cost Management Awareness",
sr.past_performance->>'past-performance-3' AS "PP3: Has Active IDP"

FROM survey_results sr
LEFT JOIN users u ON sr.user_id = u.id
ORDER BY sr.created_at DESC;
```
