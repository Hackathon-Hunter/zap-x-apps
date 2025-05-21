import { useEffect, useState } from 'react';

import { Button, Text, View } from 'react-native';

import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import { Image } from 'expo-image';
import { Address, formatEther } from 'viem';
import { publicClient, projectId, providerMetadata, styles } from '@/constants/ConnectWallet';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import './../../polyfills';

export default function HomeScreen() {
  const [blockNumber, setBlockNumber] = useState(0n);
  const [gasPrice, setGasPrice] = useState(0n);
  const {
    open,
    isConnected,
    provider,
    address: wcAddress,
  } = useWalletConnectModal();
  const address = wcAddress as Address | undefined;

  useEffect(() => {
    const getNetworkData = async () => {
      const [blockNumber, gasPrice] = await Promise.all([
        publicClient.getBlockNumber(),
        publicClient.getGasPrice(),
      ]);

      setBlockNumber(blockNumber);
      setGasPrice(gasPrice);
    };

    getNetworkData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Block number: {String(blockNumber)}
        </ThemedText>
        <ThemedText type="subtitle">
          Gas price: {formatEther(gasPrice)} ETH{' '}
        </ThemedText>

        {isConnected && (
          <View style={styles.block}>
            <Text numberOfLines={1}>Address: {address}</Text>
          </View>
        )}

        <View style={styles.block}>
          {isConnected ? (
            <Button
              title="Disconnect"
              onPress={() => provider?.disconnect()}
              color="red"
            />
          ) : (
            <Button title="Connect" onPress={() => open()} />
          )}
        </View>

        <WalletConnectModal
          projectId={projectId ?? 'defaultProjectId'}
          providerMetadata={providerMetadata}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

