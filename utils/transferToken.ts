import {
  parseUnits,
  formatUnits,
  type Address,
  encodeFunctionData,
} from 'viem';

import { publicClient } from '@/constants/ConnectWallet';
import { ERC20_ABI, Token } from '@/constants/SupportedTokens';

import { getRawTokenBalance } from './getTokenBalance';

export interface TransferParams {
  token: Token;
  fromAddress: string;
  toAddress: string;
  amount: string; // Amount in token units (e.g., "1.5" for 1.5 ETH)
  provider?: any; // WalletConnect provider
}

export interface TransferResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

/**
 * Transfer ERC20 tokens using WalletConnect
 * @param params - Transfer parameters
 * @returns Promise<TransferResult>
 */
export const transferToken = async (
  params: TransferParams
): Promise<TransferResult> => {
  const { token, fromAddress, toAddress, amount, provider } = params;

  try {
    // Validate addresses
    if (!isValidAddress(fromAddress) || !isValidAddress(toAddress)) {
      return { success: false, error: 'Invalid address format' };
    }

    // Convert amount to wei/smallest unit
    const amountInWei = parseUnits(amount, token.decimal);

    // Check if user has sufficient balance
    const balance = await getRawTokenBalance(token, fromAddress);
    if (balance < amountInWei) {
      const readableBalance = formatUnits(balance, token.decimal);
      return {
        success: false,
        error: `Insufficient balance. Available: ${readableBalance} ${token.symbol}`,
      };
    }

    // Prepare transaction data
    const txData = {
      to: token.address as Address,
      data: encodeFunctionData({
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [toAddress as Address, amountInWei],
      }),
      from: fromAddress as Address,
    };

    // Send transaction using WalletConnect provider
    if (!provider) {
      return { success: false, error: 'Wallet not connected' };
    }

    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [txData],
    });

    return { success: true, transactionHash: txHash };
  } catch (error: any) {
    console.error('Token transfer error:', error);

    if (error.message?.includes('User rejected')) {
      return { success: false, error: 'Transaction rejected by user' };
    }

    if (error.message?.includes('insufficient funds')) {
      return { success: false, error: 'Insufficient funds for gas' };
    }

    return {
      success: false,
      error: error.message || 'Transaction failed',
    };
  }
};

/**
 * Check if user has sufficient balance for transfer including gas
 * @param token - Token to transfer
 * @param fromAddress - Sender address
 * @param amount - Amount to transfer
 * @returns Promise<boolean>
 */
export const checkSufficientBalance = async (
  token: Token,
  fromAddress: string,
  amount: string
): Promise<{ sufficient: boolean; balance: string; required: string }> => {
  try {
    const amountInWei = parseUnits(amount, token.decimal);
    const balance = await getRawTokenBalance(token, fromAddress);

    const balanceFormatted = formatUnits(balance, token.decimal);

    return {
      sufficient: balance >= amountInWei,
      balance: balanceFormatted,
      required: amount,
    };
  } catch (error) {
    console.error('Balance check error:', error);
    return {
      sufficient: false,
      balance: '0',
      required: amount,
    };
  }
};

/**
 * Validate Ethereum address format
 * @param address - Address to validate
 * @returns boolean
 */
const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Wait for transaction confirmation
 * @param txHash - Transaction hash
 * @param maxWaitTime - Maximum wait time in milliseconds
 * @returns Promise<boolean>
 */
export const waitForTransactionConfirmation = async (
  txHash: string,
  maxWaitTime: number = 60000
): Promise<boolean> => {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const receipt = await publicClient.getTransactionReceipt({
        hash: txHash as Address,
      });

      if (receipt && receipt.status === 'success') {
        return true;
      }

      if (receipt && receipt.status === 'reverted') {
        return false;
      }

      // Wait 2 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      // Transaction not found yet, continue waiting
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return false; // Timeout
};
