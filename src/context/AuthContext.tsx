import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { User } from '../types';
import { useLoginMutation, useLogoutMutation } from '../queries/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { mutate: login, isPending: loginPending } = useLoginMutation();
  const { mutate: logout, isPending: logoutPending } = useLogoutMutation();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = useCallback(
    async (userData: User) => {
      try {
        login(userData, {
          onSuccess: () => {
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            navigate('/home', { replace: true });
          },
        });
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    [login],
  );

  const handleLogout = useCallback(async () => {
    try {
      logout(undefined, {
        onSuccess: () => {
          localStorage.removeItem('user');
          setUser(null);
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading: isLoading || loginPending || logoutPending,
      login: handleLogin,
      logout: handleLogout,
    }),
    [user, isLoading, loginPending, logoutPending, handleLogin, handleLogout],
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate('/home', { replace: true });
    }
    setIsLoading(false);

    return () => {
      // console.log('Unmounting AuthProvider');
      // localStorage.removeItem('user');
      setUser(null);
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
