// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "./TinyWorldStorage.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";
import "./ProveTileVerifier.sol";

contract TinyWorld is OwnableUpgradeable, TinyWorldStorage {
    event TileUpdated(Tile);

    function seedToTileType(
        uint256 perlin1,
        uint256 perlin2,
        uint256 raritySeed
    ) private pure returns (TileType) {
        if (perlin1 > 18 && raritySeed < 3) {
            return TileType.TREE;
        } else if (perlin1 > 15) {
            return TileType.GRASS;
        } else if (perlin1 > 13) {
            return TileType.SAND;
        } else {
            return TileType.WATER;
        }
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

    function transitionTile(Coords memory coords, TileType toTileType) public {
        console.log("Checking transition tile");
        require(cachedTiles[coords.x][coords.y].currentTileType != TileType.UNKNOWN);
        TileType fromTileType = cachedTiles[coords.x][coords.y].currentTileType;
        require(transitions[fromTileType][toTileType] == true);
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
        require(block.timestamp >= lastHarvested[coords.x][coords.y] + 60);
        transitionTile(coords, TileType.GRASS);
        wheatScore[msg.sender] += 3;
        lastHarvested[coords.x][coords.y] = block.timestamp;
    }

    function makeWindmill(Coords memory coords) public {
        require(woodScore[msg.sender] >= 10);
        woodScore[msg.sender] -= 10;
        transitionTile(coords, TileType.WINDMILL);
    }

    function makeBread(Coords memory coords) public {
        require(wheatScore[msg.sender] >= 3);
        require(cachedTiles[coords.x][coords.y].currentTileType == TileType.WINDMILL);
        wheatScore[msg.sender] -= 3;
        breadScore[msg.sender] += 1;
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
    ) public {
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

        TileType tileType = seedToTileType(perlinBase1, perlinBase2, raritySeed);

        Coords memory coords = Coords(x, y);
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
