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

export const PRINCIPAL_ID =
  'pzq44-pn54p-dv4ys-bjwvu-oi6ph-a23jl-n7dkp-jothd-jo5wq-ngmrm-iqe';

export const OWNER =
  '4pzfl-o35wy-m642s-gm3ot-5j4aq-zywlz-2b3jt-d2rlw-36q7o-nmtcx-oqe';
