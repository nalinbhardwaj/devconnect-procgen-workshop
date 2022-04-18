import { ethers, upgrades } from 'hardhat';
import { TinyWorld } from 'common-contracts/typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

export interface TestContracts {
  core: TinyWorld;
}

export interface World {
  contracts: TestContracts;
  user1: SignerWithAddress;
  user2: SignerWithAddress;
  deployer: SignerWithAddress;
  user1Core: TinyWorld;
  user2Core: TinyWorld;
}

export async function initializeContracts(): Promise<TestContracts> {
  const CoreFactory = await ethers.getContractFactory('TinyWorld');
  const core = (await upgrades.deployProxy(CoreFactory, [243, 20])) as TinyWorld;

  return {
    core,
  };
}

export async function initializeWorld(): Promise<World> {
  const contracts = await initializeContracts();
  const [deployer, user1, user2] = await ethers.getSigners();

  return {
    contracts,
    user1,
    user2,
    deployer,
    user1Core: contracts.core.connect(user1),
    user2Core: contracts.core.connect(user2),
  };
}
