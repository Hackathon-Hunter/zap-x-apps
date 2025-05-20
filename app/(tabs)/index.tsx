import { Image } from 'expo-image';
import { Button, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useWalletConnectModal, WalletConnectModal } from "@walletconnect/modal-react-native";
import { useEffect, useState } from 'react';
import { Address, createPublicClient, formatEther, http } from "viem";
import { mainnet } from "viem/chains";
import './../../polyfills';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http("https://eth-mainnet.g.alchemy.com/v2/UHBAZE98I0zYLOiYg7cC6lmMPkjM1vy7"),
})

const projectId = 'a8939eb579704ac1cfe8a6b7bf5b2fc9'

const providerMetadata = {
  name: 'Zap X',
  description: 'Zap X is a wallet that allows you to send and receive crypto assets.',
  url: 'https://callstack.com/',
  icons: ['https://example.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

export default function HomeScreen() {
  const [blockNumber, setBlockNumber] = useState(0n)
  const [gasPrice, setGasPrice] = useState(0n)
  const { open, isConnected, provider, address: wcAddress } = useWalletConnectModal()
  const address = wcAddress as Address | undefined;

  useEffect(() => {
    const getNetworkData = async () => {
      const [blockNumber, gasPrice] = await Promise.all([
          publicClient.getBlockNumber(),
          publicClient.getGasPrice(),
      ])

      setBlockNumber(blockNumber)
      setGasPrice(gasPrice)
    }

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
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Block number: {String(blockNumber)}</ThemedText>
        <ThemedText type="subtitle">Gas price: {formatEther(gasPrice)} ETH </ThemedText>

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

        <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata}/>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  block: {
    marginTop: 32,
  },
});
