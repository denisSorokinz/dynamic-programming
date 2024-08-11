/*
input:
board: [number[]], positionFigureA: number[], positionFigureB: number[], stepsFigureA: number = 0, stepsFigureB: number = 0

output:
figureIdx (more steps)
*/

/*
play(board, posFigA, posFigB, stepsFigA, stepsFigB):
nextPositionFigureA = moveFigure(board, positionFigureA, 1): null | typeof positionFigureA
nextPositionFigureB = moveFigure(board, positionFigureB, 2): null | typeof positionFigureB
if(!(nextPositionFigureA && nextPositionFigureB)) return [stepsFigureA, stepsFigureB];

nextBoard = [...board];
nextBoard[nextPositionFigureA[0]][nextPositionFigureA[1]] = 1
nextBoard[nextPositionFigureB[0]][nextPositionFigureB[1]] = 2

return play(nextBoard, nextPosFigA, nextPosFigB, stepsFigA+1, stepsFigB+1)
*/

/*
moveFigure(board, currPos, figIdx):

*/

/*

play(board, posFigA, posFigB, stepsFigA, stepsFigB)
1. determine nextPos of figA: getNextPos(board, currPos, figIdx: 1 | 2)
2. determine nextPos of figB: getNextPos(board, currPos, figIdx: 1 | 2)
3. if !nextPosA && !nextPosB -> return getWinningFigIdx()
4. nextBoard = getNextBoard(board, nextPosA, nextPosB)
5. return play(nextBoard, nextPosA, nextPos, stepsFigA + 1, stepsFigB + 1)

*/

const validateDirection = (board, initialPos, direction, figIdx, currPos = initialPos, enemyCells = 0) => {
  const enemyIdx = figIdx === 1 ? 2 : 1;

  const nextPos = [currPos[0] + direction[0], currPos[1] + direction[1]];

  const didLeaveBoard = nextPos[0] < 0 || nextPos[0] >= board.length || nextPos[1] < 0 || nextPos[1] >= board[0].length;
  if (didLeaveBoard) {
    const didMove = !(initialPos[0] === currPos[0] && initialPos[1] === currPos[1]);
    const reachedFriendlyCell = board[currPos[0]][currPos[1]] === figIdx;
    const reachedEnemyCell = board[currPos[0]][currPos[1]] === enemyIdx;

    return didMove && !reachedFriendlyCell && !reachedEnemyCell;
  }

  if (board[nextPos[0]][nextPos[1]] === enemyIdx) enemyCells++;

  if (enemyCells >= 2) return false;

  return validateDirection(board, initialPos, direction, figIdx, nextPos, enemyCells);

  /*
  1. determine next position:
    nextPos[0] = currPos[0] + direction[0]
    nextPos[1] = currPos[1] + direction[1]

  2. if(nextPos[0] >= board.length || currPos[1] >= board[0].length)
  
  3. determine nextEnemyCells:
    if(board[nextPos[0]][nextPos[1]] === enemyIdx) nextEnemyCells++

  4. if(nextEnemyCells >= 2) return false;

  5. return validateDirection(board, nextPos, direction, enemyCells)
  */
};

const moveFigure = (board, currPos, direction, figIdx) => {
  const nextPos = [currPos[0] + direction[0], currPos[1] + direction[1]];
  const didLeaveBoard =
    nextPos[0] < 0 || nextPos[0] >= board.length || nextPos[1] < 0 || nextPos[1] >= board[0].length;
  if (didLeaveBoard) return;

  if (board[nextPos[0]][nextPos[1]] === 0) board[nextPos[0]][nextPos[1]] = figIdx;

  moveFigure(board, nextPos, direction, figIdx);
};

const makeMove = (
  board,
  currPos,
  figIdx,
  availableDirections = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
) => {
  const moveDirection = availableDirections.shift();
  if (!moveDirection) return null;

  const isDirectionValid = validateDirection(board, currPos, moveDirection, figIdx);

  if (isDirectionValid) {
    debugger;
    const nextPos = [];

    if (moveDirection[0] === -1) nextPos[0] = 0;
    if (moveDirection[0] === 0) nextPos[0] = currPos[0];
    if (moveDirection[0] === 1) nextPos[0] = board.length - 1;

    if (moveDirection[1] === -1) nextPos[1] = 0;
    if (moveDirection[1] === 0) nextPos[1] = currPos[1];
    if (moveDirection[1] === 1) nextPos[1] = board[0].length - 1;

    moveFigure(board, currPos, moveDirection, figIdx);

    return nextPos;
  }

  return makeMove(board, currPos, figIdx, availableDirections);

  /*
  1. pick the direction (toPos: [number[]])
  2. validate the direction (i.e. does it contain >= 2 enemy cells?)
  3. if valid -> return toPos
  4. if !valid ->
    return getNextPos(board, currPos, figIdx, availableDirections)
  */
};

const getWinner = (board) => {
  let scoreA = 0;
  let scoreB = 0;

  for (let row of board) {
    for (let cell of row) {
      if (cell === 1) scoreA++;
      if (cell === 2) scoreB++;
    }
  }

  if (scoreA === scoreB) return 0;
  return scoreA > scoreB ? 1 : 2;
};

const play = (board, posFigA, posFigB) => {
  const nextPosFigA = makeMove(board, posFigA, 1);
  const nextPosFigB = makeMove(board, posFigB, 2);

  if (!(nextPosFigA || nextPosFigB)) return { board, winner: getWinner(board) };

  return play(board, nextPosFigA || posFigA, nextPosFigB || posFigB);
};

const board = [
  [0, 0],
  [0, 1],
  [2, 0],
];

const winner = play(board, [1, 1], [2, 0]);
console.dir({ winner }, { depth: 10 });
