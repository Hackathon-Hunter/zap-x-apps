import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { getCurrentUser, Role } from '../../constants/auth';
import { Redirect } from 'expo-router';

export default function MerchantLayout() {
  const [user, setUser] = useState<{ role: Role; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return null; 

  if (!user || user.role !== 'merchant') {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack />;
}
