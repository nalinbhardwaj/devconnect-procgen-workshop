import { TileType, WorldCoords, AltitudeType, TemperatureType } from 'common-types';

export const tileTypeToColor = {
  [TileType.UNKNOWN]: 'grey',
  [TileType.LAVA_A]: '#FE432A',
  [TileType.LAVA_B]: '#e56520',
  [TileType.SAND]: '#6F4644',
  [TileType.TREE]: '#0A8754', //
  [TileType.STUMP]: '#0A8754', //
  [TileType.CHEST]: '#53F4FF', //
  [TileType.FARM]: '#0A8754',
  [TileType.WINDMILL]: '#0A8754', //
  [TileType.GRASS]: '#685F70',
  [TileType.SNOW]: '#1B4745',
  [TileType.STONE]: '#605898',
  [TileType.ICE]: '#1B4745', //
};

export const seedToTileType = (coords: WorldCoords, perlin1: number, perlin2: number): TileType => {
  const height = perlin1;
  let temperature = perlin2;
  temperature += Math.floor((coords.x - 50) / 2);

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

  let temperatureType = TemperatureType.COLD;
  if (temperature > 42) {
    temperatureType = TemperatureType.HOT;
  } else if (temperature > 22) {
    temperatureType = TemperatureType.NORMAL;
  }

  let tileType = TileType.UNKNOWN;

  if (temperatureType === TemperatureType.COLD) {
    if (altitudeType === AltitudeType.MOUNTAINTOP) {
      tileType = TileType.SNOW;
    } else if (altitudeType === AltitudeType.MOUNTAIN) {
      tileType = TileType.SNOW;
    } else if (altitudeType === AltitudeType.LAND) {
      tileType = TileType.SNOW;
    } else if (altitudeType === AltitudeType.BEACH) {
      tileType = TileType.SNOW;
    } else {
      tileType = TileType.LAVA_A;
    }
  } else if (temperatureType === TemperatureType.NORMAL) {
    if (altitudeType === AltitudeType.MOUNTAINTOP) {
      tileType = TileType.SNOW;
    } else if (altitudeType === AltitudeType.MOUNTAIN) {
      tileType = TileType.STONE;
    } else if (altitudeType === AltitudeType.LAND) {
      tileType = TileType.GRASS;
    } else if (altitudeType === AltitudeType.BEACH) {
      tileType = TileType.SAND;
    } else {
      tileType = TileType.LAVA_A;
    }
  } else {
    if (altitudeType === AltitudeType.MOUNTAINTOP) {
      tileType = TileType.STONE;
    } else if (altitudeType === AltitudeType.MOUNTAIN) {
      tileType = TileType.SAND;
    } else if (altitudeType === AltitudeType.LAND) {
      tileType = TileType.SAND;
    } else if (altitudeType === AltitudeType.BEACH) {
      tileType = TileType.SAND;
    } else {
      tileType = TileType.LAVA_B;
    }
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
