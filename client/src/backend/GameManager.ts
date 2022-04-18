import { perlin, PerlinConfig, getRaritySeed } from 'common-procgen-utils';
import { Tile, WorldCoords } from 'common-types';
import { EventEmitter } from 'events';
import { seedToTileAttrs } from '../utils';

class GameManager extends EventEmitter {
  private readonly worldSeed: number;
  private readonly worldWidth: number;
  private readonly worldScale: number;

  private readonly tiles: Tile[][];

  private readonly perlinConfig: PerlinConfig;

  private constructor(worldSeed: number, worldWidth: number, worldScale: number) {
    super();

    this.worldSeed = worldSeed;
    this.worldWidth = worldWidth;
    this.worldScale = worldScale;
    this.tiles = [];
    this.perlinConfig = {
      seed: worldSeed,
      scale: worldScale,
      floor: true,
    };

    for (let i = 0; i < worldWidth; i++) {
      this.tiles.push([]);
      for (let j = 0; j < worldWidth; j++) {
        const coords = { x: i, y: j };
        const perl = perlin(coords, this.perlinConfig);
        const raritySeed = getRaritySeed(coords.x, coords.y);
        const tileType = seedToTileAttrs(coords, perl);
        this.tiles[i].push({
          coords: coords,
          perlin: perl,
          raritySeed: raritySeed,
          tileType: tileType,
        });
      }
    }
  }

  static async create() {
    const worldSeed = 0;
    const worldWidth = 100;
    const worldScale = 8;

    const gameManager = new GameManager(worldSeed, worldWidth, worldScale);

    return gameManager;
  }

  getWorldSeed(): number {
    return this.worldSeed;
  }

  getWorldWidth(): number {
    return this.worldWidth;
  }

  getWorldScale(): number {
    return this.worldScale;
  }

  getTiles(): Tile[][] {
    return this.tiles;
  }
}

export default GameManager;
