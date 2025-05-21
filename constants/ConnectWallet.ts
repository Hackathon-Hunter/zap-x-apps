import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.EXPO_PUBLIC_ALCHEMY_API_KEY}`
    ),
});

export const projectId = process.env.EXPO_PUBLIC_KEY_PROJECT_ID;

export const providerMetadata = {
    name: 'Zap X',
    description:
        'Zap X is a wallet that allows you to send and receive crypto assets.',
    url: 'https://callstack.com/',
    icons: ['https://example.com/'],
    redirect: {
        native: 'YOUR_APP_SCHEME://',
        universal: 'YOUR_APP_UNIVERSAL_LINK.com',
    },
};
