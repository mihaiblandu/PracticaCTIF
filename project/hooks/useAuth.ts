
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/tokenStorage';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
    })();
  }, []);

  return isAuthenticated;
}
