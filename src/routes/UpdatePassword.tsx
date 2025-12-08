import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SIGN_IN, PASSWORD_RESET } from '../constants/routes';

export const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase automatically exchanges the URL hash tokens for a session
    // We need to check if the session exists after the token exchange
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Session error:', error);
          setError('Invalid or expired password reset link. Please request a new one.');
          setValidSession(false);
        } else if (!session) {
          setError('Invalid or expired password reset link. Please request a new one.');
          setValidSession(false);
        } else {
          // Valid session exists
          setValidSession(true);
        }
      } catch (err) {
        console.error('Error checking session:', err);
        setError('An error occurred. Please try again.');
        setValidSession(false);
      } finally {
        setCheckingSession(false);
      }
    };

    // Wait a moment for Supabase to process the URL hash
    const timer = setTimeout(checkSession, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting to update password...');

      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      console.log('Update response:', { data, error });

      if (error) {
        console.error('Password update error:', error);
        throw error;
      }

      console.log('Password updated successfully');
      setSuccess(true);

      // Redirect to sign in after 2 seconds
      setTimeout(() => {
        navigate(SIGN_IN);
      }, 2000);
    } catch (error: any) {
      console.error('Caught error:', error);
      setError(error.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Set new password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleUpdatePassword}>
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              {!validSession && (
                <button
                  type="button"
                  onClick={() => navigate(PASSWORD_RESET)}
                  className="mt-2 text-sm text-red-800 dark:text-red-200 underline hover:no-underline"
                >
                  Request a new password reset link
                </button>
              )}
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 dark:bg-green-900 p-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                Password updated successfully! Redirecting to sign in...
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={success}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={success}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || success || !validSession}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </div>

          {!validSession && !error && (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Link expired or invalid
              </p>
              <button
                type="button"
                onClick={() => navigate(PASSWORD_RESET)}
                className="text-sm text-primary hover:text-primary/80 underline"
              >
                Request a new password reset link
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
