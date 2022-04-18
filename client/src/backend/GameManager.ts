import { perlin, PerlinConfig, getRaritySeed } from 'common-procgen-utils';
import { Tile, WorldCoords } from 'common-types';
import { EventEmitter } from 'events';
import { seedToTileAttrs } from '../utils';

class GameManager extends EventEmitter {
  private readonly worldSeed: number;
  private readonly worldWidth: number;
  private readonly worldScale: number;

  private readonly tiles: Tile[][];

  private readonly perlinConfig1: PerlinConfig;
  private readonly perlinConfig2: PerlinConfig;

  private constructor(worldSeed: number, worldWidth: number, worldScale: number) {
    super();

    this.worldSeed = worldSeed;
    this.worldWidth = worldWidth;
    this.worldScale = worldScale;
    this.tiles = [];
    this.perlinConfig1 = {
      seed: worldSeed,
      scale: worldScale,
      mirrorX: false,
      mirrorY: false,
      floor: true,
    };
    this.perlinConfig2 = {
      seed: worldSeed + 1,
      scale: worldScale,
      mirrorX: false,
      mirrorY: false,
      floor: true,
    };

    for (let i = 0; i < worldWidth; i++) {
      this.tiles.push([]);
      for (let j = 0; j < worldWidth; j++) {
        const coords = { x: i, y: j };
        const perl1 = perlin(coords, this.perlinConfig1);
        const perl2 = perlin(coords, this.perlinConfig2);
        const raritySeed = getRaritySeed(coords.x, coords.y);
        const tileAttrs = seedToTileAttrs(coords, perl1, perl2);
        this.tiles[i].push({
          coords: coords,
          perlin: [perl1, perl2],
          raritySeed: raritySeed,
          tileType: tileAttrs.tileType,
          temperatureType: tileAttrs.temperatureType,
          altitudeType: tileAttrs.altitudeType,
        });
      }
    }
  }

  static async create() {
    const worldSeed = 43;
    const worldWidth = 50;
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
