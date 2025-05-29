import { HttpAgent, Actor, Identity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';

const CANISTER_ID = '3ykjv-vqaaa-aaaaj-a2beq-cai';

export const idlFactory = ({ IDL }) => {
  const TransferError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
  });
  const TransferResult = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const MerchantData = IDL.Record({
    name: IDL.Opt(IDL.Text),
    businessType: IDL.Opt(IDL.Text),
    email: IDL.Opt(IDL.Text),
    website: IDL.Opt(IDL.Text),
    registrationDate: IDL.Opt(IDL.Int),
    phoneNumber: IDL.Opt(IDL.Text),
    icpAddress: IDL.Opt(IDL.Text),
    location: IDL.Opt(IDL.Text),
  });
  const TokenInfo = IDL.Record({
    fee: IDL.Nat,
    decimals: IDL.Nat8,
    name: IDL.Text,
    totalSupply: IDL.Nat,
    symbol: IDL.Text,
  });
  const TransactionStatus = IDL.Variant({
    Failed: IDL.Text,
    Completed: IDL.Null,
    Pending: IDL.Null,
  });
  const TransactionType = IDL.Variant({
    Burn: IDL.Null,
    Mint: IDL.Null,
    Transfer: IDL.Null,
    MerchantTransfer: IDL.Null,
  });
  const Transaction = IDL.Record({
    id: IDL.Nat,
    to: Account,
    status: TransactionStatus,
    transactionType: TransactionType,
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    reference: IDL.Opt(IDL.Text),
    tokenSymbol: IDL.Text,
    timestamp: IDL.Int,
    amount: IDL.Nat,
  });
  return IDL.Service({
    addAdmin: IDL.Func([IDL.Principal], [IDL.Bool], []),
    batchTransferFromOwner: IDL.Func(
      [
        IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat)),
        IDL.Variant({ ckIdr: IDL.Null, ckUsd: IDL.Null }),
        IDL.Opt(IDL.Text),
      ],
      [IDL.Vec(IDL.Tuple(IDL.Principal, TransferResult))],
      []
    ),
    burnFromAccount: IDL.Func(
      [Account, IDL.Variant({ ckIdr: IDL.Null, ckUsd: IDL.Null }), IDL.Nat],
      [TransferResult],
      []
    ),
    checkAuthorization: IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    clearAllMerchants: IDL.Func([], [IDL.Bool], []),
    clearMerchant: IDL.Func([IDL.Principal], [IDL.Bool], []),
    createAccountWithSubaccount: IDL.Func(
      [IDL.Principal, IDL.Vec(IDL.Nat8)],
      [Account],
      []
    ),
    emergencyPause: IDL.Func([], [IDL.Bool], []),
    emergencyResume: IDL.Func([], [IDL.Bool], []),
    getAdmins: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    getAllBalances: IDL.Func(
      [Account],
      [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
      []
    ),
    getAllMerchants: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, MerchantData))],
      ['query']
    ),
    getAllTokensInfo: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Text, TokenInfo))],
      []
    ),
    getAllTransactions: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [IDL.Vec(Transaction)],
      ['query']
    ),
    getBalance: IDL.Func([Account, IDL.Text], [IDL.Opt(IDL.Nat)], []),
    getMerchantCount: IDL.Func([], [IDL.Nat], ['query']),
    getMerchantData: IDL.Func(
      [IDL.Principal],
      [IDL.Opt(MerchantData)],
      ['query']
    ),
    getOwner: IDL.Func([], [IDL.Principal], ['query']),
    getTokenCanisters: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
      ['query']
    ),
    getTokenInfo: IDL.Func([IDL.Text], [IDL.Opt(TokenInfo)], []),
    getTransaction: IDL.Func([IDL.Nat], [IDL.Opt(Transaction)], ['query']),
    getTransactionsByStatus: IDL.Func(
      [TransactionStatus],
      [IDL.Vec(Transaction)],
      ['query']
    ),
    getTransactionsByType: IDL.Func(
      [Account, TransactionType],
      [IDL.Vec(Transaction)],
      ['query']
    ),
    getUserTransactions: IDL.Func([Account], [IDL.Vec(Transaction)], ['query']),
    initializeTokens: IDL.Func([IDL.Principal, IDL.Principal], [IDL.Bool], []),
    isReady: IDL.Func([], [IDL.Bool], ['query']),
    mintToMerchant: IDL.Func(
      [Account, IDL.Variant({ ckIdr: IDL.Null, ckUsd: IDL.Null }), IDL.Nat],
      [TransferResult],
      []
    ),
    principalToAccountPublic: IDL.Func([IDL.Principal], [Account], []),
    registerMerchant: IDL.Func(
      [IDL.Opt(IDL.Principal), MerchantData],
      [IDL.Bool],
      []
    ),
    removeAdmin: IDL.Func([IDL.Principal], [IDL.Bool], []),
    transferFromOwner: IDL.Func(
      [
        IDL.Principal,
        IDL.Variant({ ckIdr: IDL.Null, ckUsd: IDL.Null }),
        IDL.Nat,
        IDL.Opt(IDL.Text),
      ],
      [TransferResult],
      []
    ),
    transferOwnership: IDL.Func([IDL.Principal], [IDL.Bool], []),
    transferWithOwnerPrincipal: IDL.Func(
      [
        IDL.Principal,
        IDL.Principal,
        IDL.Variant({ ckIdr: IDL.Null, ckUsd: IDL.Null }),
        IDL.Nat,
        IDL.Opt(IDL.Text),
      ],
      [TransferResult],
      []
    ),
    updateMerchantProfile: IDL.Func(
      [IDL.Opt(IDL.Principal), MerchantData],
      [IDL.Bool],
      []
    ),
  });
};

export const init = ({ IDL }) => {
  return [];
};

interface MerchantActor {
  registerMerchant: (
    principal: [] | [Principal],
    request: {
      name: [] | [string];
      businessType: [] | [string];
      email: [] | [string];
      website: [] | [string];
      registrationDate: [] | [bigint];
      phoneNumber: [] | [string];
      icpAddress: [] | [string];
      location: [] | [string];
    }
  ) => Promise<boolean>;
  getMerchant: (principalId: string) => Promise<any[]>;
  whoami: () => Promise<string>;
}

class ICPAgent {
  agent: HttpAgent | null;
  actor: MerchantActor | null;
  identity: Identity | undefined;

  constructor() {
    this.agent = null;
    this.actor = null;
    this.identity = undefined;
  }

  async init(identity: Identity | undefined = undefined) {
    try {
      this.agent = new HttpAgent({
        host: 'https://icp0.io',
        identity: identity,
        fetchOptions: {
          reactNative: {
            textStreaming: false,
          },
        },
        verifyQuerySignatures: false,
      });

      if (process.env.NODE_ENV !== 'production') {
        await this.agent.fetchRootKey();
      }

      this.identity = identity;

      this.actor = Actor.createActor(idlFactory, {
        agent: this.agent,
        canisterId: CANISTER_ID,
      }) as unknown as MerchantActor;

      return true;
    } catch (error) {
      return false;
    }
  }

  async registerMerchant(name: string, email: string, principalId?: string) {
    if (!this.actor) {
      throw new Error('Agent not initialized. Call init() first.');
    }

    try {
      // Get the principal if available
      let principalArg: [] | [Principal] = [];
      if (principalId) {
        try {
          principalArg = [Principal.fromText(principalId)];
        } catch (err) {
          console.error('Failed to convert principalId to Principal:', err);
        }
      } else if (this.identity) {
        principalArg = [this.identity.getPrincipal()];
      }

      // Create request with all the fields the canister expects
      const merchantData: {
        name: [] | [string];
        email: [] | [string];
        businessType: [] | [string];
        website: [] | [string];
        registrationDate: [] | [bigint];
        phoneNumber: [] | [string];
        icpAddress: [] | [string];
        location: [] | [string];
      } = {
        name: [name],
        email: [email],
        businessType: ['1'],
        website: [''],
        registrationDate: [BigInt(Date.now())],
        phoneNumber: [''],
        icpAddress: [''],
        location: [''],
      };

      console.log('Sending merchant registration request:', {
        principal: principalArg.length ? principalArg[0].toString() : 'none',
        data: merchantData,
      });

      // Call the canister method
      const success = await this.actor.registerMerchant(
        principalArg,
        merchantData
      );
      console.log('Registration response:', success);

      if (success) {
        const principal = this.getPrincipal();
        let merchant = null;

        if (principal) {
          try {
            merchant = await this.getMerchant(principal);
          } catch (err) {
            console.error('Error fetching merchant data:', err);
          }
        }

        return {
          success: true,
          merchant: merchant || { principal_id: principal },
        };
      } else {
        return {
          success: false,
          error: 'Registration failed',
        };
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed';
      console.error('Registration error:', error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async getMerchant(principalId: string) {
    if (!this.actor) {
      throw new Error('Agent not initialized. Call init() first.');
    }

    try {
      const result = await this.actor.getMerchant(principalId);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Failed to get merchant:', error);
      return null;
    }
  }

  async transferFromOwner(
    currencyName: string,
    amount: number,
    principal: string
  ) {
    const agent = new HttpAgent({
      host: 'https://icp0.io',
    });
    const backendActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: '3ykjv-vqaaa-aaaaj-a2beq-cai',
    });

    try {
      const transferFromOwnerData: {
        principal: [] | [string];
        variant: [] | [string];
        amount: [] | [number];
      } = {
        principal: [principal],
        variant: [currencyName],
        amount: [amount],
      };

      const success = await backendActor.transferFromOwner(
        transferFromOwnerData
      );

      console.log(success, 'succes');
    } catch (error: unknown) {
      console.log(
        error,
        'error ***********************************************'
      );
      throw error;
    }
  }

  async whoami() {
    if (!this.actor) {
      throw new Error('Agent not initialized. Call init() first.');
    }

    try {
      const principal = await this.actor.whoami();
      return principal;
    } catch (error) {
      return null;
    }
  }

  getPrincipal() {
    return this.identity ? this.identity.getPrincipal().toString() : null;
  }
}

export const icpAgent = new ICPAgent();

export const createIdentityFromDelegation = (
  delegationChain: any,
  sessionKey: any
) => {
  try {
    const identity = Ed25519KeyIdentity.generate();
    return identity;
  } catch (error) {
    console.error('Failed to create identity from delegation:', error);
    return null;
  }
};

export { CANISTER_ID, Ed25519KeyIdentity };
