import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import { queryClient } from './queries/queryClient';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import { DogsProvider } from './context/DogsContext';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Layout wrapper for all dog-related pages
const DogLayout = () => {
  return (
    <DogsProvider>
      <Outlet />
    </DogsProvider>
  );
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    <Navigate to={isAuthenticated ? '/' : '/login'} />;
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <DogLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/search" replace />} />
                  <Route
                    path="search/:filters?"
                    element={<HomePage activeTab="search" />}
                  />
                  <Route
                    path="favorites"
                    element={<HomePage activeTab="favorites" />}
                  />
                  <Route
                    path="match"
                    element={<HomePage activeTab="match" />}
                  />
                  <Route path="*" element={<Navigate to="/search" replace />} />
                </Route>
              </Routes>
            </AuthProvider>
          </Router>
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
