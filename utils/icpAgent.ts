import { HttpAgent, Actor, Identity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';

const CANISTER_ID = '3ykjv-vqaaa-aaaaj-a2beq-cai';

const idlFactory = ({ IDL }: { IDL: any }) => {
  const Merchant = IDL.Record({
    id: IDL.Text,
    name: IDL.Text,
    email: IDL.Text,
    principal_id: IDL.Text,
    created_at: IDL.Nat64,
  });

  return IDL.Service({
    registerMerchant: IDL.Func(
      [
        IDL.Opt(IDL.Principal),
        IDL.Record({
          name: IDL.Opt(IDL.Text),
          businessType: IDL.Opt(IDL.Text),
          email: IDL.Opt(IDL.Text),
          website: IDL.Opt(IDL.Text),
          registrationDate: IDL.Opt(IDL.Nat64),
          phoneNumber: IDL.Opt(IDL.Text),
          icpAddress: IDL.Opt(IDL.Text),
          location: IDL.Opt(IDL.Text),
        }),
      ],
      [IDL.Bool],
      []
    ),
    getMerchant: IDL.Func([IDL.Text], [IDL.Opt(Merchant)], ['query']),
    whoami: IDL.Func([], [IDL.Text], ['query']),
  });
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

  async registerMerchant(name: string, email: string) {
    if (!this.actor) {
      throw new Error('Agent not initialized. Call init() first.');
    }

    try {
      // Get the principal if available
      let principalArg: [] | [Principal] = [];
      if (this.identity) {
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
