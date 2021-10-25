// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "./TinyWorldStorage.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";
import "./ProveTileVerifier.sol";

contract TinyWorld is OwnableUpgradeable, TinyWorldStorage {
    event TileUpdated(Tile);
    event PlayerUpdated(Coords);

    function seedToTileType(
        Coords memory coords,
        uint256 perlin1,
        uint256 perlin2,
        uint256 raritySeed
    ) private pure returns (TileType) {
        uint256 height = perlin1;
        uint256 temperature = perlin2;
        temperature = uint256(int256(temperature) + (int256(coords.x) - 50) / 2);

        AltitudeType altitudeType = AltitudeType.SEA;
        if (height > 40) {
            altitudeType = AltitudeType.MOUNTAINTOP;
        } else if (height > 37) {
            altitudeType = AltitudeType.MOUNTAIN;
        } else if (height > 32) {
            altitudeType = AltitudeType.LAND;
        } else if (height > 30) {
            altitudeType = AltitudeType.BEACH;
        }

        TemperatureType temperatureType = TemperatureType.COLD;
        if (temperature > 42) {
            temperatureType = TemperatureType.HOT;
        } else if (temperature > 22) {
            temperatureType = TemperatureType.NORMAL;
        }

        if (temperatureType == TemperatureType.COLD) {
            if (altitudeType == AltitudeType.MOUNTAINTOP) {
                return TileType.SNOW;
            } else if (altitudeType == AltitudeType.MOUNTAIN) {
                return TileType.SNOW;
            } else if (altitudeType == AltitudeType.LAND) {
                return TileType.SNOW;
            } else if (altitudeType == AltitudeType.BEACH) {
                if (raritySeed < 12) {
                    return TileType.ICE;
                }
                return TileType.SNOW;
            } else {
                if (raritySeed < 2) {
                    return TileType.ICE;
                }
                return TileType.WATER;
            }
        } else if (temperatureType == TemperatureType.NORMAL) {
            if (altitudeType == AltitudeType.MOUNTAINTOP) {
                return TileType.SNOW;
            } else if (altitudeType == AltitudeType.MOUNTAIN) {
                return TileType.STONE;
            } else if (altitudeType == AltitudeType.LAND) {
                if (raritySeed < 1) {
                    return TileType.TREE;
                }
                return TileType.GRASS;
            } else if (altitudeType == AltitudeType.BEACH) {
                return TileType.SAND;
            } else {
                return TileType.WATER;
            }
        } else {
            if (altitudeType == AltitudeType.MOUNTAINTOP) {
                return TileType.STONE;
            } else if (altitudeType == AltitudeType.MOUNTAIN) {
                if (raritySeed < 8) {
                    return TileType.STONE;
                }
                return TileType.SAND;
            } else if (altitudeType == AltitudeType.LAND) {
                return TileType.SAND;
            } else if (altitudeType == AltitudeType.BEACH) {
                if (raritySeed < 6) {
                    return TileType.GRASS;
                }
                return TileType.SAND;
            } else {
                return TileType.WATER;
            }
        }
    }

    function abs(int256 x) private pure returns (uint256) {
        return uint256(x >= 0 ? x : -x);
    }

    function dist(Coords memory a, Coords memory b) private pure returns (uint256) {
        return abs(int256(a.x) - int256(b.x)) + abs(int256(a.y) - int256(b.y));
    }

    modifier isClose(Coords memory loc) {
        require(playerInited[msg.sender], "Player not inited");
        require(dist(playerLocation[msg.sender], loc) <= 1, "Location too far");
        _;
    }

    function initialize(
        uint256 _seed,
        uint256 _worldWidth,
        uint256 _worldScale
    ) public initializer {
        __Ownable_init();
        seed = _seed;
        worldWidth = _worldWidth;
        worldScale = _worldScale;
        transitions[TileType.TREE][TileType.STUMP] = true;
        transitions[TileType.GRASS][TileType.FARM] = true;
        transitions[TileType.GRASS][TileType.WINDMILL] = true;
        transitions[TileType.FARM][TileType.GRASS] = true;
    }

    function transitionTile(Coords memory coords, TileType toTileType) public isClose(coords) {
        require(
            cachedTiles[coords.x][coords.y].currentTileType != TileType.UNKNOWN,
            "Tile not proven"
        );
        TileType fromTileType = cachedTiles[coords.x][coords.y].currentTileType;
        require(transitions[fromTileType][toTileType] == true, "Cannot make transition");
        cachedTiles[coords.x][coords.y].currentTileType = toTileType;
        emit TileUpdated(cachedTiles[coords.x][coords.y]);
    }

    function buildFarm(Coords memory coords) public {
        transitionTile(coords, TileType.FARM);
    }

    function collectWood(Coords memory coords) public {
        transitionTile(coords, TileType.STUMP);
        woodScore[msg.sender]++;
    }

    function harvestWheat(Coords memory coords) public {
        require(block.timestamp >= lastHarvested[coords.x][coords.y] + 60, "Harvesting too soon");
        transitionTile(coords, TileType.GRASS);
        wheatScore[msg.sender] += 3;
        lastHarvested[coords.x][coords.y] = block.timestamp;
    }

    function makeWindmill(Coords memory coords) public {
        require(woodScore[msg.sender] >= 10, "Not enough wood");
        woodScore[msg.sender] -= 10;
        transitionTile(coords, TileType.WINDMILL);
    }

    function makeBread(Coords memory coords) public isClose(coords) {
        require(wheatScore[msg.sender] >= 3, "Not enough wheat");
        require(
            cachedTiles[coords.x][coords.y].currentTileType == TileType.WINDMILL,
            "Not a Windmill"
        );
        wheatScore[msg.sender] -= 3;
        breadScore[msg.sender] += 1;
    }

    function initPlayerLocation(Coords memory coords) public {
        require(playerInited[msg.sender] == false, "Already inited");
        playerLocation[msg.sender] = coords;
        playerInited[msg.sender] = true;
        emit PlayerUpdated(coords);
    }

    function movePlayer(Coords memory coords) public isClose(coords) {
        require(
            cachedTiles[coords.x][coords.y].currentTileType != TileType.UNKNOWN,
            "Tile not proven"
        );
        playerLocation[msg.sender] = coords;
        emit PlayerUpdated(coords);
    }

    function editTransition(
        TileType from,
        TileType to,
        bool isValid
    ) public onlyOwner {
        transitions[from][to] = isValid;
    }

    function proveTile(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[7] memory publicSignals
    ) public isClose(Coords(publicSignals[3], publicSignals[4])) {
        require(Verifier.verifyMainProof(a, b, c, publicSignals), "Failed ZK check");

        uint256 perlinBase1 = publicSignals[0];
        uint256 perlinBase2 = publicSignals[1];
        uint256 raritySeed = publicSignals[2];
        uint256 x = publicSignals[3];
        uint256 y = publicSignals[4];
        uint256 claimedSeed = publicSignals[5];
        uint256 claimedScale = publicSignals[6];

        require(x < worldWidth);
        require(y < worldWidth);
        require(claimedScale == worldScale);
        require(claimedSeed == seed);

        Coords memory coords = Coords(x, y);
        TileType tileType = seedToTileType(coords, perlinBase1, perlinBase2, raritySeed);
        Tile memory tile = Tile({
            coords: Coords(x, y),
            perlin: [perlinBase1, perlinBase2],
            raritySeed: raritySeed,
            currentTileType: tileType
        });
        cachedTiles[x][y] = tile;
        touchedTiles.push(coords);
        emit TileUpdated(cachedTiles[x][y]);
    }
}
