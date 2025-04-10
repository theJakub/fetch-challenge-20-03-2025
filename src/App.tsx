import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import { queryClient } from './queries/queryClient';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { DogsProvider } from './context/DogsContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated:', isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    <Navigate to={isAuthenticated ? '/' : '/login'} />;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <DogsProvider>
                      <HomePage />
                    </DogsProvider>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
