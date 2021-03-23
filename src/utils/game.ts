import {
  CellsMap, Coordinate, Direction, Piece, PlayerType, Route, RouteItem,
} from '../types';
import { getCellCoordinateFromIndex, getCellIndex, getOffsetCoordinate } from './common';
import { getAvailableDirections, getDirectionOffset } from './directions';

// gets dummy route just two cells ahead
// recursion can be used to get routes for queen cells
const getDummyAvailableRoute = (
  state: CellsMap,
  direction: Direction,
  coordinate: Coordinate,
): RouteItem[] => {
  const nextCellCoordinate = getOffsetCoordinate(coordinate, getDirectionOffset(direction));
  const nextCell = state[getCellIndex(nextCellCoordinate)];

  if (nextCell.piece === null) {
    return [{
      cell: nextCell,
      coordinate: nextCellCoordinate,
    }];
  }

  const nextAfterNextCellCoordinate = getOffsetCoordinate(
    nextCellCoordinate,
    getDirectionOffset(direction),
  );
  const nextAfterNextCell = state[getCellIndex(nextAfterNextCellCoordinate)];

  if (nextAfterNextCell && nextAfterNextCell.piece === null) {
    return [{
      cell: nextCell,
      coordinate: nextCellCoordinate,
    }, {
      cell: nextAfterNextCell,
      coordinate: nextAfterNextCellCoordinate,
    }];
  }

  return [];
};

export const isRouteWithHitPiece = (route: RouteItem[]): boolean => route
  .some((routeItem) => routeItem.cell.piece);

export const routeContainsCell = (route: RouteItem[], cellCoordinate: Coordinate): boolean => route
  .some((routeItem) => getCellIndex(routeItem.coordinate) === getCellIndex(cellCoordinate));

export const getAvailableRoutes = (
  state: CellsMap,
  coordinate: Coordinate,
): Route[] => {
  const cell = state[getCellIndex(coordinate)];

  if (!cell || !cell.piece) {
    return [];
  }

  const availableDirections = getAvailableDirections(state, coordinate);

  const availableRoutes = availableDirections
    .map((direction) => getDummyAvailableRoute(state, direction, coordinate))
    .filter((route) => route.length);

  const routesWithHit = availableRoutes.filter(isRouteWithHitPiece);

  return routesWithHit.length ? routesWithHit : availableRoutes;
};

export const getRouteWithCell = (
  routes: Route[],
  cellCoordinate: Coordinate,
): RouteItem[] | undefined => routes
  .find((availableRoute) => routeContainsCell(availableRoute, cellCoordinate));

const getIsQueen = (piece: Piece | null, movedTo: Coordinate): boolean => {
  if (!piece) {
    return false;
  }

  return piece.isQueen
    || (piece.color === 'white' && movedTo.rowIndex === 0)
    || (piece.color === 'black' && movedTo.rowIndex === 7);
};

export const getMandatoryTurnPieceAfterHitCoordinate = (
  stateAfterHit: CellsMap,
  coordinateAfterHit: Coordinate,
): Coordinate | null => {
  const availableRoutes = getAvailableRoutes(stateAfterHit, coordinateAfterHit);

  const hasHitRoute = availableRoutes
    .some(isRouteWithHitPiece);

  return hasHitRoute ? coordinateAfterHit : null;
};

const getPlayerPiecesCoordinates = (state: CellsMap, player: PlayerType) => Object.entries(state)
  .reduce((result, [key, cell]) => {
    if (!cell.piece || cell.piece.color !== player) {
      return result;
    }

    return [...result, getCellCoordinateFromIndex(key)];
  }, [] as Coordinate[]);

export const getAvailableTurnPieces = (
  state: CellsMap,
  player: PlayerType,
): Coordinate[] => {
  const currentPlayerPiecesCoordinates = getPlayerPiecesCoordinates(state, player);

  const piecesWithTurns = currentPlayerPiecesCoordinates.reduce((result, coordinate) => {
    const availableRoutes = getAvailableRoutes(state, coordinate);

    return availableRoutes.length ? [...result, {
      coordinate,
      availableRoutes,
    }] : result;
  }, [] as { coordinate: Coordinate, availableRoutes: Route[] }[]);

  const piecesWithHits = piecesWithTurns
    .filter((pieceWithRoute) => pieceWithRoute.availableRoutes
      .some(isRouteWithHitPiece));

  const result = piecesWithHits.length ? piecesWithHits : piecesWithTurns;

  return result.map((pieceWithRoute) => pieceWithRoute.coordinate);
};

export const getNextPlayer = (
  currentPlayer: PlayerType,
  hasAdditionalHitTurn: boolean,
): PlayerType => {
  if (hasAdditionalHitTurn) {
    return currentPlayer;
  }

  return currentPlayer === 'white' ? 'black' : 'white';
};

export const getWinner = (state: CellsMap): PlayerType | null => {
  const whitePlayerPieces = getPlayerPiecesCoordinates(state, 'white');
  const blackPlayerPieces = getPlayerPiecesCoordinates(state, 'black');

  if (!whitePlayerPieces.length) {
    return 'black';
  }

  if (!blackPlayerPieces.length) {
    return 'white';
  }

  const hasMovesWhite = whitePlayerPieces.some((coordinate) => {
    const availableRoutes = getAvailableRoutes(state, coordinate);

    return availableRoutes.length;
  });

  if (!hasMovesWhite) {
    return 'black';
  }

  const hasMovesBlack = blackPlayerPieces.some((coordinate) => {
    const availableRoutes = getAvailableRoutes(state, coordinate);

    return availableRoutes.length;
  });

  if (!hasMovesBlack) {
    return 'white';
  }

  return null;
};

export const getStateWithMovedPiece = (
  cellsState: CellsMap,
  fromCoordinate: Coordinate,
  toCoordinate: Coordinate,
): CellsMap => {
  const cellIndexFrom = getCellIndex(fromCoordinate);
  const cellIndexTo = getCellIndex(toCoordinate);
  const cellFrom = cellsState[cellIndexFrom];
  const cellTo = cellsState[cellIndexTo];

  if (!cellFrom || !cellTo || !cellFrom.piece) {
    return cellsState;
  }

  const { piece } = cellFrom;
  const isQueen = getIsQueen(piece, toCoordinate);

  return {
    ...cellsState,
    [cellIndexFrom]: {
      ...cellFrom,
      piece: null,
    },
    [cellIndexTo]: {
      ...cellTo,
      piece: {
        ...piece,
        isQueen,
      },
    },
  };
};

export const getStateWithHitPiece = (
  cellsState: CellsMap,
  fromCoordinate: Coordinate,
  hitPieceCoordinate: Coordinate,
  toCoordinate: Coordinate,
): CellsMap => {
  const cellIndexFrom = getCellIndex(fromCoordinate);
  const cellIndexHit = getCellIndex(hitPieceCoordinate);
  const cellIndexTo = getCellIndex(toCoordinate);
  const cellFrom = cellsState[cellIndexFrom];
  const cellHit = cellsState[cellIndexFrom];
  const cellTo = cellsState[cellIndexTo];

  if (!cellFrom || !cellTo || !cellHit || !cellHit.piece || !cellFrom.piece) {
    return cellsState;
  }

  const { piece } = cellFrom;
  const isQueen = getIsQueen(piece, toCoordinate);

  return {
    ...cellsState,
    [cellIndexFrom]: {
      ...cellFrom,
      piece: null,
    },
    [cellIndexHit]: {
      ...cellFrom,
      piece: null,
    },
    [cellIndexTo]: {
      ...cellTo,
      piece: {
        ...piece,
        isQueen,
      },
    },
  };
};
