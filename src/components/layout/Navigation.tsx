import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/button';
import { DASHBOARD, SURVEY } from '../../constants/routes';

export const Navigation = () => {
  const { appUser, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to={DASHBOARD} className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Leadership Loom
              </h1>
            </Link>

            <div className="hidden md:flex space-x-4">
              <Link
                to={DASHBOARD}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(DASHBOARD)
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to={SURVEY}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(SURVEY)
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                New Assessment
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
              {appUser?.name || appUser?.email}
            </span>

            <Button
              onClick={() => signOut()}
              variant="outline"
              size="sm"
              className="dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
