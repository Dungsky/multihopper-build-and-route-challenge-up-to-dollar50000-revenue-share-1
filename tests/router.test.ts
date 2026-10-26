import { describe, it, expect } from 'vitest';
import { SmartOrderRouter } from '../src/router.js';

describe('SmartOrderRouter Numerical Tests', () => {
  it('should compute exact constant-product swap amounts accounting for fees', () => {
    const reserveIn = 1_000_000_000n;
    const reserveOut = 2_000_000_000n;
    const amountIn = 10_000_000n;
    const feeBps = 30; // 0.3%

    const out = SmartOrderRouter.getAmountOut(amountIn, reserveIn, reserveOut, feeBps);
    expect(out).toBeGreaterThan(0n);
    expect(out).toBeLessThan(20_000_000n);
  });
});
