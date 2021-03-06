import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import { CORE_CONTRACT_ADDRESS } from 'common-contracts';
import GameManager from '../backend/GameManager';
import { EthConnection } from 'exgrasia-network';
import { getEthConnection } from '../backend/Blockchain';
import {
  address,
  DEV_TEST_PRIVATE_KEY,
  EthAddress,
  Tile,
  TileType,
  WorldCoords,
} from 'common-types';
import { tileTypeToColor } from '../utils';
import { useLocation, useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Tooltip, Text, Loading, Grid, Card } from '@nextui-org/react';

const enum LoadingStep {
  NONE,
  LOADED_ETH_CONNECTION,
  LOADED_GAME_MANAGER,
  LOADED_PLUGIN_MANAGER,
}

export default function Game() {
  const [gameManager, setGameManager] = useState<GameManager | undefined>();
  const [ethConnection, setEthConnection] = useState<EthConnection | undefined>();
  const [step, setStep] = useState(LoadingStep.NONE);
  const [error, setError] = useState('no errors');
  const [tiles, setTiles] = useState<Tile[][]>([]);
  const privateKey = DEV_TEST_PRIVATE_KEY[0];

  useEffect(() => {
    getEthConnection()
      .then(async (ethConnection) => {
        ethConnection.setAccount(privateKey);
        setEthConnection(ethConnection);
        setStep(LoadingStep.LOADED_ETH_CONNECTION);
        const gm = await GameManager.create(ethConnection);
        window.gm = gm;
        setGameManager(gm);
        setStep(LoadingStep.LOADED_GAME_MANAGER);
        setTiles(gm ? gm.getTiles() : []);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }, []);

  const onGridClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    coords: WorldCoords
  ) => {
    event.preventDefault();
    console.log('coords', coords);
    gameManager?.confirmTile(tiles[coords.x][coords.y]);
  };

  return (
    <>
      <Page>
        {gameManager && tiles ? (
          <>
            <FullScreen>
              <TransformWrapper initialScale={2} minScale={0.25}>
                <TransformComponent
                  wrapperStyle={{
                    maxWidth: '100%',
                    maxHeight: 'calc(100vh - 0.1px)',
                  }}
                >
                  {tiles.map((coordRow, i) => {
                    if (i == 0) return null;
                    return (
                      <GridRow key={i}>
                        {coordRow.map((tile, j) => {
                          if (j == 0) return null;
                          return (
                            <GridSquare
                              key={100 * i + j}
                              style={{
                                backgroundColor: tinycolor(
                                  tileTypeToColor[tile.tileType]
                                ).toHexString(),
                              }}
                              onContextMenu={(event) => onGridClick(event, { x: i, y: j })}
                            />
                          );
                        })}
                      </GridRow>
                    );
                  })}
                </TransformComponent>
              </TransformWrapper>
            </FullScreen>
          </>
        ) : (
          <FullScreen>
            <Title>
              <Text h1 size={96} color='secondary'>
                defcon procgen workshop
              </Text>
            </Title>
            <SubTitle>
              <Text h2 size={64} color='secondary'>
                Loading
                <Loading type='points-opacity' size='lg' color='secondary' />
              </Text>
              {error != 'no errors' && (
                <Text h2 size={64} color='secondary'>
                  {error}
                </Text>
              )}
            </SubTitle>
          </FullScreen>
        )}
      </Page>
    </>
  );
}

const Page = styled.div`
  color: black;
  font-size: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const GridSquare = styled.div`
  width: 22px;
  height: 22px;
  border-color: rgba(0, 0, 0, 0.15);
  border-style: solid;
  border-width: 1px;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url('/public/assets/clouds.svg');
  background-repeat: repeat;
  background-size: 20%;
  height: 100%;
  user-select: none;
`;

export const Title = styled.div`
  vertical-align: middle;
  margin: 0;
  position: absolute;
  top: 20%;
  left: 25%;
  user-select: none;
`;

export const SubTitle = styled.div`
  vertical-align: middle;
  margin: 0;
  position: absolute;
  top: 65%;
  right: 25%;
`;
