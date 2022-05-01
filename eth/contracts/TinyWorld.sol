// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "./TinyWorldStorage.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";
import "./Perlin.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";

contract TinyWorld is OwnableUpgradeable, TinyWorldStorage {
    function initialize(
        uint256 _seed,
        uint256 _worldWidth,
        uint256 _worldScale
    ) public initializer {
        __Ownable_init();
        seed = _seed;
        worldWidth = _worldWidth;
        worldScale = _worldScale;
    }

    // Map parametrisation
    function getRaritySeed(Coords memory coords) private pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(coords.x, coords.y))) % 8;
    }

    function euclidDistance(Coords memory coordsA, Coords memory coordsB)
        internal
        pure
        returns (int256)
    {
        return
            ABDKMath64x64.toInt(
                ABDKMath64x64.sqrt(
                    ABDKMath64x64.fromInt(
                        (int256(coordsA.x) - int256(coordsB.x)) *
                            (int256(coordsA.x) - int256(coordsB.x)) +
                            (int256(coordsA.y) - int256(coordsB.y)) *
                            (int256(coordsA.y) - int256(coordsB.y))
                    )
                )
            );
    }

    function seedToTileType(
        Coords memory coords,
        uint256 perlin1,
        uint256 perlin2
    ) internal pure returns (TileType) {
        uint256 height = perlin1;
        uint256 temperature = perlin2;
        Coords memory center = Coords(50, 50);
        height += uint256(40 - euclidDistance(coords, center));

        AltitudeType altitudeType = AltitudeType.SEA;
        if (height > 40) {
            altitudeType = AltitudeType.MOUNTAINTOP;
        } else if (height > 38) {
            altitudeType = AltitudeType.MOUNTAIN;
        } else if (height > 30) {
            altitudeType = AltitudeType.LAND;
        } else if (height > 22) {
            altitudeType = AltitudeType.BEACH;
        }

        TemperatureType temperatureType = TemperatureType.COLD;
        if (temperature > 42) {
            temperatureType = TemperatureType.HOT;
        } else if (temperature > 22) {
            temperatureType = TemperatureType.NORMAL;
        }

        TileType tileType = TileType.UNKNOWN;
        if (temperatureType == TemperatureType.COLD) {
            if (altitudeType == AltitudeType.MOUNTAINTOP) {
                tileType = TileType.SNOW;
            } else if (altitudeType == AltitudeType.MOUNTAIN) {
                tileType = TileType.SNOW;
            } else if (altitudeType == AltitudeType.LAND) {
                tileType = TileType.SNOW;
            } else if (altitudeType == AltitudeType.BEACH) {
                tileType = TileType.SNOW;
            } else {
                tileType = TileType.WATER;
            }
        } else if (temperatureType == TemperatureType.NORMAL) {
            if (altitudeType == AltitudeType.MOUNTAINTOP) {
                tileType = TileType.SNOW;
            } else if (altitudeType == AltitudeType.MOUNTAIN) {
                tileType = TileType.STONE;
            } else if (altitudeType == AltitudeType.LAND) {
                tileType = TileType.GRASS;
            } else if (altitudeType == AltitudeType.BEACH) {
                tileType = TileType.SAND;
            } else {
                tileType = TileType.WATER;
            }
        } else {
            if (altitudeType == AltitudeType.MOUNTAINTOP) {
                tileType = TileType.STONE;
            } else if (altitudeType == AltitudeType.MOUNTAIN) {
                tileType = TileType.SAND;
            } else if (altitudeType == AltitudeType.LAND) {
                tileType = TileType.SAND;
            } else if (altitudeType == AltitudeType.BEACH) {
                tileType = TileType.SAND;
            } else {
                tileType = TileType.WATER;
            }
        }
        return tileType;
    }

    function coordsToTile(Coords memory coords) private view returns (Tile memory) {
        uint256 perlin1 = Perlin.computePerlin(
            uint32(coords.x),
            uint32(coords.y),
            uint32(seed),
            uint32(worldScale)
        );
        uint256 perlin2 = Perlin.computePerlin(
            uint32(coords.x),
            uint32(coords.y),
            uint32(seed + 1),
            uint32(worldScale)
        );

        uint256 raritySeed = getRaritySeed(coords);
        TileType tileType = seedToTileType(coords, perlin1, perlin2);

        return
            Tile({
                coords: coords,
                perlin: [perlin1, perlin2],
                raritySeed: raritySeed,
                tileType: tileType
            });
    }

    // Mapping
    function getTile(Coords memory coords) public returns (Tile memory) {
        if (cachedTiles[coords.x][coords.y].tileType == TileType.UNKNOWN) {
            cachedTiles[coords.x][coords.y] = coordsToTile(coords);
            touchedCoords.push(coords);
        }
        return cachedTiles[coords.x][coords.y];
    }

    function confirmTile(Coords memory coords, TileType localTileType) public {
        Tile memory tile = getTile(coords);
        require(tile.tileType == localTileType, "Tile type mismatch");
    }
}
