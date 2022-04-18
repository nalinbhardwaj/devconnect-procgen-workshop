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

export const seedToTileType = (perlin: number): TileType => {
  return TileType.UNKNOWN;
};

export const perlinToGreyscaleHex = (perlin: number) => {
  let val = Math.floor(perlin) * 12 - 192;
  val = Math.max(Math.min(val, 255), 0);
  let hexString = val.toString(16);
  while (hexString.length < 2) {
    hexString = '0' + hexString;
  }
  return `#${hexString}${hexString}${hexString}`;
};

export const getRandomActionId = () => {
  const hex = '0123456789abcdef';

  let ret = '';
  for (let i = 0; i < 10; i += 1) {
    ret += hex[Math.floor(hex.length * Math.random())];
  }
  return ret;
};
