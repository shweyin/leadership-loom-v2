import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ScatterPlot } from '../components/dashboard/ScatterPlot';
import { NineBoxGrid } from '../components/dashboard/NineBoxGrid';
import { EmployeeTable } from '../components/dashboard/EmployeeTable';
import { getAllSurveyResults } from '../services/survey';
import { SURVEY } from '../constants/routes';
import type { SurveyResult } from '../types/database';

export const Dashboard = () => {
  const { appUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<SurveyResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const data = await getAllSurveyResults();
        setSurveys(data);
      } catch (error) {
        console.error('Error loading surveys:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, []);

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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome, {appUser?.name || 'User'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Evaluate your team's leadership potential and succession readiness.
            </p>
          </div>

          <div className="mb-6">
            <Link to={SURVEY}>
              <Button size="lg">Start New Assessment</Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Loading surveys...
            </div>
          ) : surveys.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No surveys completed yet. Start your first assessment!
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Scatter Plot */}
              <Card>
                <CardHeader>
                  <CardTitle>Leadership Potential vs Performance</CardTitle>
                  <CardDescription>
                    Click any data point to view detailed employee report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScatterPlot
                    surveys={surveys}
                    onEmployeeClick={(id) => navigate(`/dashboard/employee/${id}`)}
                  />
                </CardContent>
              </Card>

              {/* 9-Box Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>9-Box Talent Matrix</CardTitle>
                  <CardDescription>
                    Employee distribution across performance and potential dimensions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NineBoxGrid surveys={surveys} />
                </CardContent>
              </Card>

              {/* Employee Table */}
              <Card>
                <CardHeader>
                  <CardTitle>All Assessments</CardTitle>
                  <CardDescription>
                    Click any row to view detailed employee report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmployeeTable surveys={surveys} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
