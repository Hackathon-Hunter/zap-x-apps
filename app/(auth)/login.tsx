import { Button, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { setItem } from '@/utils/storage';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (role: 'user' | 'merchant') => {
    await setItem('role', role);
    await setItem('name', role === 'user' ? 'Budi' : 'Toko Makmur');
    router.replace(`/${role === 'user' ? '(user)' : '(merchant)'}/dashboard`);
  };

  return (
    <View>
      <Text>Login </Text>
      <Button title="Login as User" onPress={() => handleLogin('user')} />
      <Button
        title="Login as Merchant"
        onPress={() => handleLogin('merchant')}
      />
    </View>
  );
}
