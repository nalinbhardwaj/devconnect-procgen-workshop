// @ts-ignore because they don't exist before first compile
import type { TinyWorld, TinyWorldGetters, Perlin } from 'common-contracts/typechain';

export { TinyWorld, TinyWorldGetters, Perlin };
export interface TinyWorldCoreReturn {
  blockNumber: number;
  contract: TinyWorld;
}

export interface LibraryContracts {
  perlin: Perlin;
}
