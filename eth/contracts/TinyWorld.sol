// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "./TinyWorldStorage.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";
import "./Perlin.sol";

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

    function seedToTileType(uint256 perlin) internal pure returns (TileType) {
        return perlin > 30 ? TileType.WATER : TileType.GRASS;
    }

    function coordsToTile(Coords memory coords) private view returns (Tile memory) {
        uint256 perlin = Perlin.computePerlin(
            uint32(coords.x),
            uint32(coords.y),
            uint32(seed),
            uint32(worldScale)
        );
        uint256 raritySeed = getRaritySeed(coords);
        TileType tileType = seedToTileType(perlin);

        return Tile({coords: coords, perlin: perlin, raritySeed: raritySeed, tileType: tileType});
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
