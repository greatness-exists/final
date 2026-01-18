import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Simple mock auth check - real security is handled by .htaccess basic auth on the server
    const checkAuth = () => {
      const isAuth = localStorage.getItem('admin_authenticated') === 'true';
      setAuthenticated(isAuth);
      setLoading(false);
    };

    checkAuth();
   
    // Listen for storage changes (optional)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen font-serif text-2xl">Entering Sanctuary...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
