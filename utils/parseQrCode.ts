interface StaticQRData {
  type: 'static';
  merchant: string;
  stableCoin: string;
  amount?: string;
  adminFee?: string;
  total?: string;
}

interface DynamicQRData {
  type: 'dynamic';
  merchant: string;
  stableCoin: string;
  amount: string;
  adminFee: string;
  total: string;
}

type QRData = StaticQRData | DynamicQRData;

export const parseQRData = (qrString: string): QRData | null => {
  try {
    const parsedData = JSON.parse(qrString);

    if (parsedData.merchant && parsedData.stableCoin) {
      return parsedData as QRData;
    }

    return null;
  } catch {
    try {
      if (qrString.startsWith('http')) {
        const url = new URL(qrString);
        const params = url.searchParams;

        const merchant = params.get('merchant');
        const stableCoin = params.get('stableCoin');
        const amount = params.get('amount');
        const adminFee = params.get('adminFee');
        const total = params.get('total');
        const type = params.get('type') as 'static' | 'dynamic';

        if (merchant && stableCoin) {
          if (type === 'dynamic' && amount && adminFee && total) {
            return {
              type: 'dynamic',
              merchant,
              stableCoin,
              amount,
              adminFee,
              total,
            };
          } else {
            return {
              type: 'static',
              merchant,
              stableCoin,
            };
          }
        }
      }

      const parts = qrString.split(':');
      if (parts.length >= 2) {
        return {
          type: 'static',
          merchant: parts[0],
          stableCoin: parts[1],
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
