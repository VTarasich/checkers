import {
  CellsMap, CellState, Coordinate, Direction, DirectionOffset, Piece, PlayerType, Route, RouteItem,
} from '../types';
import { getCellCoordinateFromIndex, getCellIndex } from './common';

const getOffsetCoordinate = (
  { rowIndex, colIndex }: Coordinate,
  { rowOffset, colOffset }: DirectionOffset,
): Coordinate => ({
  rowIndex: rowIndex + rowOffset,
  colIndex: colIndex + colOffset,
});

const getRoute = (
  state: CellsMap,
  directionOffset: DirectionOffset,
  startingPiece: Piece,
  coordinate: Coordinate,
  result: RouteItem[],
): RouteItem[] => {
  const cellIndex = getCellIndex(coordinate);

  const currentCell = state[cellIndex];

  if (!currentCell) {
    return result;
  }

  const nextCellCoordinates = getOffsetCoordinate(coordinate, directionOffset);
  const nextCellIndex = getCellIndex(nextCellCoordinates);

  const nextCell = state[nextCellIndex];
  const prevRouteElement = result[result.length - 1];

  const currentRouteItem = {
    coordinate,
    cell: currentCell,
  };

  /* eslint-disable no-else-return */
  if (currentCell.piece === null) {
    // if king piece search for last piece in the route
    if (prevRouteElement.cell.piece) {
      return [
        ...result,
        currentRouteItem,
      ];
    } else {
      // if king piece - do recursive
      return result;
    }
  } else {
    const currentPiece = currentCell.piece;

    if (prevRouteElement.cell.piece === null) {
      // if king piece - do recursive
      return result;
    }

    if (currentPiece.color !== startingPiece.color) {
      if (!nextCell || nextCell.piece) {
        return result;
      }

      return getRoute(
        state,
        directionOffset,
        startingPiece,
        nextCellCoordinates,
        [
          ...result,
          currentRouteItem,
        ],
      );
    } else {
      return result;
    }
  }
  /* eslint-enable no-else-return */
};

const directionOffsets = {
  'top-right': {
    rowOffset: -1,
    colOffset: 1,
  },
  'top-left': {
    rowOffset: -1,
    colOffset: -1,
  },
  'bottom-right': {
    rowOffset: 1,
    colOffset: 1,
  },
  'bottom-left': {
    rowOffset: 1,
    colOffset: -1,
  },
};

const getDirectionOffset = (direction: Direction): DirectionOffset => directionOffsets[direction];

const getAvailableDirections = (
  state: CellsMap,
  coordinate: Coordinate,
): Direction[] => Object.entries(directionOffsets)
  .filter(([direction, directionOffset]) => {
    const { piece } = state[getCellIndex(coordinate)];

    if (piece === null) {
      return false;
    }

    const availableCell = state[getCellIndex(getOffsetCoordinate(coordinate, directionOffset))];

    if (!availableCell) {
      return false;
    }

    // piece exists in current direction
    if (availableCell.piece) {
      return availableCell.piece.color !== piece.color;
    }

    // cell is empty in current direction
    // todo: queen piece
    if (piece.color === 'black') {
      return direction === 'bottom-left' || direction === 'bottom-right';
    }

    return direction === 'top-left' || direction === 'top-right';
  }).map(([direction]) => direction as Direction);

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

export const routeContainsCell = (route: RouteItem[], cellCoordinate: Coordinate): boolean => route
  .some((routeItem) => getCellIndex(routeItem.coordinate) === getCellIndex(cellCoordinate));

export const getRouteWithCell = (
  routes: Route[],
  cellCoordinate: Coordinate,
): RouteItem[] | undefined => routes
  .find((availableRoute) => routeContainsCell(availableRoute, cellCoordinate));

export const getStateWithMovedPiece = (
  cellsState: CellsMap,
  fromCoordinate: Coordinate,
  toCoordinate: Coordinate,
): CellsMap => {
  const cellIndexFrom = getCellIndex(fromCoordinate);
  const cellIndexTo = getCellIndex(toCoordinate);
  const cellFrom = cellsState[cellIndexFrom];
  const cellTo = cellsState[cellIndexTo];

  if (!cellFrom || !cellTo) {
    return cellsState;
  }

  const { piece } = cellFrom;

  return {
    ...cellsState,
    [cellIndexFrom]: {
      ...cellFrom,
      piece: null,
    },
    [cellIndexTo]: {
      ...cellTo,
      piece,
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

  if (!cellFrom || !cellTo || !cellHit || !cellHit.piece) {
    return cellsState;
  }

  const { piece } = cellFrom;

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
      piece,
    },
  };
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
