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
      [IDL.Record({ name: IDL.Text, email: IDL.Text })],
      [IDL.Bool],
      []
    ),
    getMerchant: IDL.Func([IDL.Text], [IDL.Opt(Merchant)], ['query']),
    whoami: IDL.Func([], [IDL.Text], ['query']),
  });
};

interface MerchantActor {
  registerMerchant: (request: {
    name: string;
    email: string;
  }) => Promise<boolean>;
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
      const request = {
        name,
        email,
      };

      const success = await this.actor.registerMerchant(request);

      console.log('Registration response:', success);

      if (success) {
        const principal = this.getPrincipal();
        let merchant = null;

        if (principal) {
          merchant = await this.getMerchant(principal);
        }

        return {
          success: true,
          merchant: merchant,
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
