import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSurveyProgress } from '../hooks/useSurveyProgress';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { MetadataForm } from '../components/survey/MetadataForm';
import { ExperienceForm } from '../components/survey/ExperienceForm';
import { LeadershipForm } from '../components/survey/LeadershipForm';
import { AdaptForm } from '../components/survey/AdaptForm';
import { WorkingWithPeopleForm } from '../components/survey/WorkingWithPeopleForm';
import { BusinessAcumenForm } from '../components/survey/BusinessAcumenForm';
import { SettingGoalsForm } from '../components/survey/SettingGoalsForm';
import { PlanningForm } from '../components/survey/PlanningForm';
import { StrategicThinkingForm } from '../components/survey/StrategicThinkingForm';
import { PersonalCharacteristicsForm } from '../components/survey/PersonalCharacteristicsForm';
import { PastPerformanceForm } from '../components/survey/PastPerformanceForm';
import evaluate from '../services/evaluate';
import { supabase } from '../lib/supabase';
import { DASHBOARD } from '../constants/routes';
import {
  category2x1Questions,
  category2x2Questions,
  category2x3Questions,
  category2x4Questions,
  category2x5Questions,
  category2x6Questions,
  category2x7Questions,
  category3Questions,
  category4Questions,
} from '../constants/proprietary';

const TOTAL_STEPS = 11;

const STEP_TITLES = [
  'Employee Information',
  'Experience & Credentials',
  'Leadership',
  'Adapting and Responding to Change',
  'Working with People',
  'Business Acumen',
  'Setting Goals and Delivering Results',
  'Planning and Organizing',
  'Strategic Thinking and Action',
  'Personal Characteristics',
  'Past Performance',
];

export function Survey() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { step, setStep, surveyData, updateSurveyData, clearDraft } = useSurveyProgress();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate completion percentage for current step
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    calculateCompletion();
  }, [step, surveyData]);

  const calculateCompletion = () => {
    let filledCount = 0;
    let totalCount = 0;

    switch (step) {
      case 0: // Metadata
        totalCount = 3;
        if (surveyData.metadata.empname) filledCount++;
        if (surveyData.metadata.empid) filledCount++;
        if (surveyData.metadata.empjobtitle) filledCount++;
        break;
      case 1: // Experience - not required
        setCompletion(100);
        return;
      case 2: // Leadership
        totalCount = category2x1Questions.length;
        filledCount = Object.keys(surveyData.category2_1).length;
        break;
      case 3: // Adapt
        totalCount = category2x2Questions.length;
        filledCount = Object.keys(surveyData.category2_2).length;
        break;
      case 4: // Working with People
        totalCount = category2x3Questions.length;
        filledCount = Object.keys(surveyData.category2_3).length;
        break;
      case 5: // Business Acumen
        totalCount = category2x4Questions.length;
        filledCount = Object.keys(surveyData.category2_4).length;
        break;
      case 6: // Setting Goals
        totalCount = category2x5Questions.length;
        filledCount = Object.keys(surveyData.category2_5).length;
        break;
      case 7: // Planning
        totalCount = category2x6Questions.length;
        filledCount = Object.keys(surveyData.category2_6).length;
        break;
      case 8: // Strategic Thinking
        totalCount = category2x7Questions.length;
        filledCount = Object.keys(surveyData.category2_7).length;
        break;
      case 9: // Personal Characteristics
        totalCount = category3Questions.radioQuestions.length + category3Questions.yesNoQuestions.length;
        filledCount = Object.keys(surveyData.category3).length;
        break;
      case 10: // Past Performance
        totalCount = category4Questions.length;
        filledCount = Object.keys(surveyData.category4).length;
        break;
    }

    const percent = totalCount > 0 ? (filledCount / totalCount) * 100 : 0;
    setCompletion(Math.round(percent));
  };

  const handleNext = async () => {
    // Validate before proceeding (except for Experience which is optional)
    if (step !== 1 && completion < 100) {
      setError('Please complete all required fields before continuing.');
      return;
    }

    setError(null);

    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit survey
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
      setError(null);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Your session has expired. Please sign in again to submit the survey.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Evaluate the survey data
      const evaluated = evaluate(surveyData);

      // Save to database
      const { error: dbError } = await supabase.from('survey_results').insert({
        user_id: user.id,
        emp_name: surveyData.metadata.empname,
        emp_id: surveyData.metadata.empid,
        emp_job_title: surveyData.metadata.empjobtitle,
        experience: surveyData.category1.experience,
        licensing: surveyData.category1.licensing,
        other_experience: surveyData.category1.other,
        leadership_potential: surveyData.category2_1,
        adapt_respond: surveyData.category2_2,
        working_with_people: surveyData.category2_3,
        business_acumen: surveyData.category2_4,
        setting_goals: surveyData.category2_5,
        planning_organizing: surveyData.category2_6,
        strategic_thinking: surveyData.category2_7,
        personal_characteristics: surveyData.category3,
        past_performance: surveyData.category4,
        total_score: evaluated.totals.total_score,
        total_leadership_potential: evaluated.totals.leadership_potential,
        total_personal_characteristics: evaluated.totals.personal_characteristics,
        total_learning: evaluated.totals.learning,
        total_past_performance: evaluated.totals.past_performance,
        leadership_breakdown: evaluated.leadership,
        personal_breakdown: evaluated.personal,
        past_performance_breakdown: evaluated.pastPerformance,
      });

      if (dbError) throw dbError;

      // Clear the draft
      clearDraft();

      // Navigate to dashboard
      navigate(DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Failed to submit survey');
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <MetadataForm
            data={surveyData.metadata}
            onChange={(field, value) =>
              updateSurveyData({ metadata: { ...surveyData.metadata, [field]: value } })
            }
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={surveyData.category1}
            onChange={(field, value) =>
              updateSurveyData({ category1: { ...surveyData.category1, [field]: value } })
            }
          />
        );
      case 2:
        return (
          <LeadershipForm
            data={surveyData.category2_1}
            onChange={(questionId, value) =>
              updateSurveyData({ category2_1: { ...surveyData.category2_1, [questionId]: value } })
            }
          />
        );
      case 3:
        return (
          <AdaptForm
            data={surveyData.category2_2}
            onChange={(questionId, value) =>
              updateSurveyData({ category2_2: { ...surveyData.category2_2, [questionId]: value } })
            }
          />
        );
      case 4:
        return (
          <WorkingWithPeopleForm
            data={surveyData.category2_3}
            onChange={(questionId, value) =>
              updateSurveyData({ category2_3: { ...surveyData.category2_3, [questionId]: value } })
            }
          />
        );
      case 5:
        return (
          <BusinessAcumenForm
            data={surveyData.category2_4}
            onChange={(questionId, value) =>
              updateSurveyData({ category2_4: { ...surveyData.category2_4, [questionId]: value } })
            }
          />
        );
      case 6:
        return (
          <SettingGoalsForm
            data={surveyData.category2_5}
            onChange={(questionId, value) =>
              updateSurveyData({ category2_5: { ...surveyData.category2_5, [questionId]: value } })
            }
          />
        );
      case 7:
        return (
          <PlanningForm
            data={surveyData.category2_6}
            onChange={(questionId, value) =>
              updateSurveyData({ category2_6: { ...surveyData.category2_6, [questionId]: value } })
            }
          />
        );
      case 8:
        return (
          <StrategicThinkingForm
            data={surveyData.category2_7}
            onChange={(questionId, value) =>
              updateSurveyData({ category2_7: { ...surveyData.category2_7, [questionId]: value } })
            }
          />
        );
      case 9:
        return (
          <PersonalCharacteristicsForm
            data={surveyData.category3}
            onChange={(questionId, value) =>
              updateSurveyData({ category3: { ...surveyData.category3, [questionId]: value } })
            }
          />
        );
      case 10:
        return (
          <PastPerformanceForm
            data={surveyData.category4}
            onChange={(questionId, value) =>
              updateSurveyData({ category4: { ...surveyData.category4, [questionId]: value } })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leadership Assessment Survey</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Step {step + 1} of {TOTAL_STEPS}: {STEP_TITLES[step]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
            <span className="font-semibold">{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</span>
          </div>
          <Progress value={((step + 1) / TOTAL_STEPS) * 100} className="h-3" />
        </div>

        {/* Current Step Completion */}
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Step Completion</span>
            <span className="font-semibold">{completion}%</span>
          </div>
          <Progress value={completion} className="h-2" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Form Content */}
        <Card className="mb-6">
          <CardContent className="p-8">{renderCurrentStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 0 || loading}
          >
            Previous
          </Button>
          <Button onClick={handleNext} disabled={loading}>
            {loading ? 'Submitting...' : step === TOTAL_STEPS - 1 ? 'Submit Survey' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
