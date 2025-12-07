import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getSurveyById } from '../services/survey';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LeadershipBarChart } from '../components/employee/LeadershipBarChart';
import { PersonalBarChart } from '../components/employee/PersonalBarChart';
import { ScatterPlot } from '../components/dashboard/ScatterPlot';
import type { SurveyResult } from '../types/database';

export const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { signOut, appUser } = useAuth();
  const [survey, setSurvey] = useState<SurveyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('leadership');

  useEffect(() => {
    const loadSurvey = async () => {
      if (!id) return;

      try {
        const data = await getSurveyById(id);
        setSurvey(data);
      } catch (error) {
        console.error('Error loading survey:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurvey();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Survey not found
          </h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Leadership Loom
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {appUser?.name || appUser?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              ← Back to Dashboard
            </Button>
          </div>

          {/* Employee Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {survey.emp_name}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {survey.emp_job_title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Assessed on {new Date(survey.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="space-y-8">
            {/* Score Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {survey.total_score || 0}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">out of 300</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Leadership Potential
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {survey.total_leadership_potential || 0}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">out of 280</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Personal Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {survey.total_personal_characteristics || 0}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">out of 194</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Past Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {survey.total_past_performance || 0}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">out of 6</p>
                </CardContent>
              </Card>
            </div>

            {/* Individual Scatter Plot */}
            <Card>
              <CardHeader>
                <CardTitle>Position on Scatter Plot</CardTitle>
                <CardDescription>
                  Leadership potential vs total performance score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScatterPlot surveys={[survey]} />
              </CardContent>
            </Card>

            {/* Success Report Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Success Report</CardTitle>
                <CardDescription>
                  Detailed breakdown of leadership dimensions and personal characteristics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="leadership">Leadership Dimensions</TabsTrigger>
                    <TabsTrigger value="personal">Personal Characteristics</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                  </TabsList>

                  <TabsContent value="leadership">
                    {survey.leadership_breakdown ? (
                      <LeadershipBarChart leadershipBreakdown={survey.leadership_breakdown} />
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No leadership data available
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="personal">
                    {survey.personal_breakdown ? (
                      <PersonalBarChart personalBreakdown={survey.personal_breakdown} />
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No personal characteristics data available
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="experience">
                    <div className="space-y-4 mt-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Experience
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {survey.experience || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Licensing
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {survey.licensing || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Other Experience
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {survey.other_experience || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
