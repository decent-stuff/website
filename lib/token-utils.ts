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
interface ICRC1Actor {
    icrc1_balance_of: (account: { owner: Principal; subaccount: [] }) => Promise<bigint>;
    icrc1_decimals: () => Promise<number>;
}

const createTokenActor = async (canisterId: string, identity: Identity): Promise<ICRC1Actor> => {
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
): Promise<{
    icp: number;
    ckUsdt: number;
    ckUsdc: number;
    dct: number;
}> => {
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

export interface Token {
    metrics?: {
        price?: number;
        volume_24h?: number;
        total_supply?: number;
        market_cap?: number;
        tvl?: number;
        updated_at?: string;
        price_change_24h?: number | null;
    };
    logo_url?: string;
    address?: string;
    fee?: number;
    fee_fixed?: string;
    token?: string;
    token_type?: string;
    chain?: string;
    pool_symbol?: string;
    pools: Array<{
        id: string;
        symbol: string;
    }>;
}

export const fetchDctPrice = async (): Promise<number> => {
    try {
        const tokens = await fetchTokensByCanisterId([TOKEN_CANISTERS.DCT]);
        return tokens[0]?.metrics?.price ?? 0;
    } catch (error) {
        console.error('Error fetching DCT price:', error);
        return 0;
    }
};

interface TokenResponse {
    tokens: KongSwapTokenDataRaw[];
}

export const fetchTokensByCanisterId = async (canisterIds: string[]): Promise<Token[]> => {
    const response = await fetch("https://api.kongswap.io/api/tokens/by_canister", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ canister_ids: canisterIds })
    });
    const data = await response.json() as TokenResponse;
    return data.tokens.map(parseTokenData);
};

// Example response
// {
//     "tokens": [
//       {
//         "address": null,
//         "canister_id": "ggi4a-wyaaa-aaaai-actqq-cai",
//         "decimals": 9,
//         "fee": 0.001,
//         "fee_fixed": "1_000_000",
//         "icrc1": true,
//         "icrc2": false,
//         "icrc3": false,
//         "is_removed": false,
//         "logo_url": "/static/images/tokens/258-logo.svg",
//         "metrics": {
//           "market_cap": "187640.67000000",
//           "price": "0.00893527",
//           "price_change_24h": null,
//           "total_supply": "21000000000000000",
//           "tvl": "0.17733320",
//           "updated_at": "2025-01-28T09:25:25.487983+00:00",
//           "volume_24h": "0"
//         },
//         "name": "Decent Cloud",
//         "symbol": "DC",
//         "token_id": 258,
//         "token_type": "IC"
//       }
//     ]
// }


interface KongSwapTokenDataRaw {
    address?: string | null;
    canister_id?: string;
    decimals?: number;
    fee?: number;
    fee_fixed?: string;
    icrc1?: boolean;
    icrc2?: boolean;
    icrc3?: boolean;
    is_removed?: boolean;
    logo_url?: string;
    metrics?: {
        market_cap?: string;
        price?: string;
        price_change_24h?: string | null;
        total_supply?: string;
        tvl?: string;
        updated_at?: string;
        volume_24h?: string;
    };
    name?: string;
    symbol?: string;
    token_id?: number;
    token_type?: string;
    chain?: string;
    pool_symbol?: string;
}

const parseTokenData = (token: KongSwapTokenDataRaw): Token => {
    const parseMetricValue = (value: string | undefined | null): number => {
        if (!value) return 0;
        return parseFloat(value.replaceAll(",", "")) || 0;
    };

    const parsePriceChange = (value: string | null | undefined): number | null => {
        if (value === null || value === undefined) return null;
        return parseFloat(value.replaceAll(",", "")) || 0;
    };

    return {
        metrics: {
            price: parseMetricValue(token?.metrics?.price),
            volume_24h: parseMetricValue(token?.metrics?.volume_24h),
            total_supply: parseMetricValue(token?.metrics?.total_supply),
            market_cap: parseMetricValue(token?.metrics?.market_cap),
            tvl: parseMetricValue(token?.metrics?.tvl),
            updated_at: token?.metrics?.updated_at,
            price_change_24h: parsePriceChange(token?.metrics?.price_change_24h)
        },
        logo_url: token?.logo_url ? (token.logo_url.startsWith('http') ? token.logo_url : `https://api.kongswap.io${token.logo_url.startsWith('/') ? '' : '/'}${token.logo_url}`) : "",
        address: token.address || token.canister_id || "",
        fee: Number(token.fee || 0),
        fee_fixed: BigInt(token?.fee_fixed?.replaceAll("_", "") || "0").toString(),
        token: token.token_type || '',
        token_type: token.token_type || '',
        chain: token.token_type === 'IC' ? 'ICP' : token.chain || '',
        pool_symbol: token.pool_symbol || "Pool not found",
        pools: [],
    };
};
