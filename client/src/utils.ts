import { TileType, WorldCoords, AltitudeType, TemperatureType } from 'common-types';

export const tileTypeToColor = {
  [TileType.UNKNOWN]: 'grey',
  [TileType.WATER]: '#3C91E6',
  [TileType.SAND]: '#EFDD6F',
  [TileType.TREE]: '#0A8754', //
  [TileType.STUMP]: '#0A8754', //
  [TileType.CHEST]: '#53F4FF', //
  [TileType.FARM]: '#0A8754',
  [TileType.WINDMILL]: '#0A8754', //
  [TileType.GRASS]: '#0A8754',
  [TileType.SNOW]: '#FFFAFA',
  [TileType.STONE]: '#918E85',
  [TileType.ICE]: '#D6FFFA', //
};

export const seedToTileAttrs = (coords: WorldCoords, perlin: number): TileType => {
  const height = perlin;

  let altitudeType = AltitudeType.SEA;
  if (height > 40) {
    altitudeType = AltitudeType.MOUNTAINTOP;
  } else if (height > 37) {
    altitudeType = AltitudeType.MOUNTAIN;
  } else if (height > 32) {
    altitudeType = AltitudeType.LAND;
  } else if (height > 30) {
    altitudeType = AltitudeType.BEACH;
  }

  let tileType = TileType.UNKNOWN;

  if (altitudeType === AltitudeType.MOUNTAINTOP) {
    tileType = TileType.SNOW;
  } else if (altitudeType === AltitudeType.MOUNTAIN) {
    tileType = TileType.STONE;
  } else if (altitudeType === AltitudeType.LAND) {
    tileType = TileType.GRASS;
  } else if (altitudeType === AltitudeType.BEACH) {
    tileType = TileType.SAND;
  } else {
    tileType = TileType.WATER;
  }

  return tileType;
};

export const getRandomActionId = () => {
  const hex = '0123456789abcdef';

  let ret = '';
  for (let i = 0; i < 10; i += 1) {
    ret += hex[Math.floor(hex.length * Math.random())];
  }
  return ret;
};
