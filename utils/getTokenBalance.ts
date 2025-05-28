import { formatUnits } from 'viem';

import { publicClient } from '@/constants/ConnectWallet';
import { ERC20_ABI, Token } from '@/constants/SupportedTokens';

export const getTokenBalance = async (
  token: Token,
  accountAddress: string
): Promise<string> => {
  try {
    const cleanTokenAddress = token.address.replace(/^0x/i, '');
    const cleanAccountAddress = accountAddress.replace(/^0x/i, '');

    const result = await publicClient.readContract({
      address: `0x${cleanTokenAddress}` as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [`0x${cleanAccountAddress}` as `0x${string}`],
    });

    const formattedBalance = formatUnits(result as bigint, token.decimal);

    const balanceNumber = parseFloat(formattedBalance);

    return formatTokenBalance(balanceNumber, token.decimal);
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch ${token.symbol} balance`);
  }
};

/**
 * Format token balance with appropriate decimal places
 * @param balance - The balance as a number
 * @param decimals - Token decimals for context
 * @returns Formatted balance string
 */
const formatTokenBalance = (balance: number, decimals: number): string => {
  if (balance === 0) return '0';

  if (balance < 0.001) {
    return balance.toFixed(Math.min(8, decimals));
  }

  if (balance < 1) {
    return balance.toFixed(6);
  }

  if (balance < 1000) {
    return balance.toFixed(4);
  }

  if (balance < 1000000) {
    return balance.toFixed(2);
  }

  return formatLargeNumber(balance);
};

/**
 * Format large numbers with K, M, B abbreviations
 * @param num - The number to format
 * @returns Formatted string with abbreviation
 */
const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
};

/**
 * Get raw token balance without formatting (useful for calculations)
 * @param token - Token information
 * @param accountAddress - Account address
 * @returns Raw balance as bigint
 */
export const getRawTokenBalance = async (
  token: Token,
  accountAddress: string
): Promise<bigint> => {
  try {
    const cleanTokenAddress = token.address.replace(/^0x/i, '');
    const cleanAccountAddress = accountAddress.replace(/^0x/i, '');

    const result = await publicClient.readContract({
      address: `0x${cleanTokenAddress}` as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [`0x${cleanAccountAddress}` as `0x${string}`],
    });

    return result as bigint;
  } catch (error) {
    console.error(`Error fetching raw balance for ${token.symbol}:`, error);
    throw new Error(`Failed to fetch ${token.symbol} balance`);
  }
};

/**
 * Get formatted token balance with custom decimal places
 * @param token - Token information
 * @param accountAddress - Account address
 * @param decimalPlaces - Custom decimal places (optional)
 * @returns Formatted balance string
 */
export const getFormattedTokenBalance = async (
  token: Token,
  accountAddress: string,
  decimalPlaces?: number
): Promise<string> => {
  try {
    const rawBalance = await getRawTokenBalance(token, accountAddress);
    const formattedBalance = formatUnits(rawBalance, token.decimal);
    const balanceNumber = parseFloat(formattedBalance);

    if (decimalPlaces !== undefined) {
      return balanceNumber.toFixed(decimalPlaces);
    }

    return formatTokenBalance(balanceNumber, token.decimal);
  } catch (error) {
    console.error(
      `Error fetching formatted balance for ${token.symbol}:`,
      error
    );
    throw new Error(`Failed to fetch ${token.symbol} balance`);
  }
};
