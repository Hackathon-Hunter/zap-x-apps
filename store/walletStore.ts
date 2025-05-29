// store/walletStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProvider } from '@walletconnect/modal-react-native';
import { Chain } from 'viem';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface WalletState {
  isConnected: boolean;
  walletName: string;
  address: string;
  truncatedAddress: string;
  chainName: string;
  balance: string; // Store formatted balance as string
  chain: Chain | null;
  provider: IProvider | null;

  // Actions
  setWalletData: (data: {
    walletName: string;
    address: string;
    truncatedAddress: string;
    chainName: string;
    balance: string;
    chain: Chain;
    provider?: IProvider;
  }) => void;

  updateBalance: (balance: string) => void;
  updateChain: (chain: Chain) => void;
  disconnect: () => void;
}

const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      isConnected: false,
      walletName: '',
      address: '',
      truncatedAddress: '',
      chainName: '',
      balance: '0',
      chain: null,
      provider: null,

      setWalletData: (data) =>
        set({
          isConnected: true,
          walletName: data.walletName,
          address: data.address,
          truncatedAddress: data.truncatedAddress,
          chainName: data.chainName,
          balance: data.balance,
          chain: data.chain,
          provider: data.provider,
        }),

      updateBalance: (balance) =>
        set((state) => ({
          ...state,
          balance,
        })),

      updateChain: (chain) =>
        set((state) => ({
          ...state,
          chain,
          chainName: chain.name,
        })),

      disconnect: () =>
        set({
          isConnected: false,
          walletName: '',
          address: '',
          truncatedAddress: '',
          chainName: '',
          balance: '0',
          chain: null,
          provider: null,
        }),
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isConnected: state.isConnected,
        walletName: state.walletName,
        address: state.address,
        truncatedAddress: state.truncatedAddress,
        chainName: state.chainName,
        balance: state.balance,
        chain: state.chain,
      }),
    }
  )
);

export default useWalletStore;
