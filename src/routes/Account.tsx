import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Construction } from 'lucide-react';

export function Account() {
  const { appUser } = useAuth();

  return (
    <div className="py-2">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Construction className="w-5 h-5 text-orange-500" />
              Work in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Account management features are coming soon.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Currently signed in as:
              </p>
              <p className="font-medium">{appUser?.name || 'User'}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {appUser?.email}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
