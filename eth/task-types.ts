// @ts-ignore because they don't exist before first compile
import type { TinyWorld, Perlin } from 'common-contracts/typechain';

export { TinyWorld, Perlin };
export interface TinyWorldCoreReturn {
  blockNumber: number;
  contract: TinyWorld;
}

export interface LibraryContracts {
  perlin: Perlin;
}
