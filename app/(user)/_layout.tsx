import { useEffect, useState } from 'react';

import { Stack, Redirect } from 'expo-router';

import { getCurrentUser, Role } from '../../constants/auth';

export default function UserLayout() {
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

  if (!user || user.role !== 'user') {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack />;
}
