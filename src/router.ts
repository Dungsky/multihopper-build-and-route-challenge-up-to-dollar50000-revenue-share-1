export interface LiquidityPool {
  id: string;
  tokenA: string;
  tokenB: string;
  reserveA: bigint;
  reserveB: bigint;
  feeTierBps: number;
}

export interface RouteQuote {
  path: string[];
  expectedOutput: bigint;
  priceImpactPct: number;
}

export class SmartOrderRouter {
  private pools: Map<string, LiquidityPool[]> = new Map();

  addPool(pool: LiquidityPool) {
    const key = `${pool.tokenA}-${pool.tokenB}`;
    const reverseKey = `${pool.tokenB}-${pool.tokenA}`;
    
    if (!this.pools.has(key)) this.pools.set(key, []);
    if (!this.pools.has(reverseKey)) this.pools.set(reverseKey, []);
    
    this.pools.get(key)!.push(pool);
    this.pools.get(reverseKey)!.push(pool);
  }

  /**
   * Computes constant product output with fee deduction.
   */
  static getAmountOut(amountIn: bigint, reserveIn: bigint, reserveOut: bigint, feeBps: number): bigint {
    const amountInWithFee = amountIn * BigInt(10_000 - feeBps);
    const numerator = amountInWithFee * reserveOut;
    const denominator = (reserveIn * 10_000n) + amountInWithFee;
    return numerator / denominator;
  }
}
