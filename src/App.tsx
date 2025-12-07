import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { SignIn } from './routes/SignIn';
import { SignUp } from './routes/SignUp';
import { PasswordReset } from './routes/PasswordReset';
import { Dashboard } from './routes/Dashboard';
import { Survey } from './routes/Survey';
import { EmployeeDetail } from './routes/EmployeeDetail';
import { SIGN_IN, SIGN_UP, PASSWORD_RESET, DASHBOARD, SURVEY } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to={SIGN_IN} replace />} />
          <Route path={SIGN_IN} element={<SignIn />} />
          <Route path={SIGN_UP} element={<SignUp />} />
          <Route path={PASSWORD_RESET} element={<PasswordReset />} />
          <Route
            path={DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={SURVEY}
            element={
              <ProtectedRoute>
                <Survey />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/employee/:id"
            element={
              <ProtectedRoute>
                <EmployeeDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
