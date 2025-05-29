export interface StaticQRData {
  type: 'static';
  merchant: string;
  currency: string;
  amount?: string;
  adminFee?: string;
  total?: string;
}

export interface DynamicQRData {
  type: 'dynamic';
  merchant: string;
  currency: string;
  amount: string;
  adminFee: string;
  total: string;
}

type QRData = StaticQRData | DynamicQRData;

export const parseQRData = (qrString: string): QRData | null => {
  try {
    const parsedData = JSON.parse(qrString);

    if (parsedData.merchant && parsedData.currency) {
      return parsedData as QRData;
    }

    return null;
  } catch {
    try {
      if (qrString.startsWith('http')) {
        const url = new URL(qrString);
        const params = url.searchParams;

        const merchant = params.get('merchant');
        const currency = params.get('currency');
        const amount = params.get('amount');
        const adminFee = params.get('adminFee');
        const total = params.get('total');
        const type = params.get('type') as 'static' | 'dynamic';

        if (merchant && currency) {
          if (type === 'dynamic' && amount && adminFee && total) {
            return {
              type: 'dynamic',
              merchant,
              currency,
              amount,
              adminFee,
              total,
            };
          } else {
            return {
              type: 'static',
              merchant,
              currency,
            };
          }
        }
      }

      const parts = qrString.split(':');
      if (parts.length >= 2) {
        return {
          type: 'static',
          merchant: parts[0],
          currency: parts[1],
        };
      }

      return null;
    } catch {
      return null;
    }
  }
};

export const determineQRType = (data: any): 'static' | 'dynamic' => {
  if (data.amount && data.adminFee && data.total) {
    return 'dynamic';
  }
  return 'static';
};
