import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { IDL } from '@dfinity/candid';

// Token canister IDs
const TOKEN_CANISTERS = {
    ICP: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
    USDT: 'cngnf-vqaaa-aaaar-qag4q-cai',
    USDC: 'xevnm-gaaaa-aaaar-qafnq-cai',
    DCT: 'ggi4a-wyaaa-aaaai-actqq-cai'
} as const;

const tokenDecimals: { [canisterId: string]: number } = {};

// Create the Candid IDL factory for ICRC-1
const icrc1Interface: IDL.InterfaceFactory = ({ IDL }) => {
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
    });

    return IDL.Service({
        icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
        icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query'])
    });
};

// Create an actor for interacting with ICRC-1 tokens
const createTokenActor = async (canisterId: string, identity: Identity) => {
    const agent = new HttpAgent({
        host: 'https://icp-api.io',
        identity
    });

    return Actor.createActor(icrc1Interface, {
        agent,
        canisterId
    });
};

// Convert e8s (8 decimal places) to human readable format
const fromDecimals = (amount: bigint | number, decimals: number): number => {
    const divisor = 10 ** decimals;
    if (typeof amount === 'bigint') {
        return Number(amount) / divisor;
    }
    return amount / divisor;
};

// Fetch balance for a specific token
const fetchTokenBalance = async (
    canisterId: string,
    tokenName: string,
    identity: Identity,
    principal: Principal
): Promise<number> => {
    try {
        const actor = await createTokenActor(canisterId, identity);

        let numDecimals = tokenDecimals[canisterId];
        if (numDecimals === undefined) {
            numDecimals = (await actor.icrc1_decimals()) as number;
            tokenDecimals[canisterId] = numDecimals;
        }

        const balance = await actor.icrc1_balance_of({
            owner: principal,
            subaccount: []
        });

        // Convert balance to number before passing to fromE8s
        const balanceNum = typeof balance === 'bigint' ? balance : BigInt(String(balance));
        const tokenBalance = fromDecimals(balanceNum, numDecimals);
        console.log(`Fetched ${tokenName} balance: ${tokenBalance} ${tokenName}`);
        return tokenBalance;
    } catch (error) {
        console.error(`Error fetching balance for canister ${canisterId}:`, error);
        return 0;
    }
};

// Fetch all token balances for a user
export const fetchUserBalances = async (
    identity: Identity,
    principal: Principal
) => {
    const [icp, ckUsdt, ckUsdc, dct] = await Promise.all([
        fetchTokenBalance(TOKEN_CANISTERS.ICP, "ICP", identity, principal),
        fetchTokenBalance(TOKEN_CANISTERS.USDT, "USDT", identity, principal),
        fetchTokenBalance(TOKEN_CANISTERS.USDC, "USDC", identity, principal),
        fetchTokenBalance(TOKEN_CANISTERS.DCT, "DCT", identity, principal)
    ]);

    return {
        icp,
        ckUsdt,
        ckUsdc,
        dct
    };
};
