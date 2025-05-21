import { getItem } from '@/utils/storage';

export type Role = 'user' | 'merchant';

export const getCurrentUser = async () => {
  const role = await getItem('role');
  const name = await getItem('name');

  if (!role || !name) return null;

  return {
    role: role as Role,
    name,
  };
};
