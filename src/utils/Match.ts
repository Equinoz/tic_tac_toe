/** Class representing a match of tic-tac-toe */
export class Match {
  private static readonly CROSS: number = 1;
  private static readonly CIRCLE: number = 2;
  private static readonly GRIDLINES: Array<Array<number>> = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  private _first: boolean;
  private _computerSymbol: number;
  private _playerSymbol: number;
  private _movesCount: number;
  private _board: Array<number>;
  private _isOver: boolean;
  private _isWinner: number | false;

  /**
   * Create a new match
   * @param {boolean} first - true if the computer starts the match
   */
  constructor (first = true) {
  	this._first = first;
  	this._computerSymbol = (this._first) ? Match.CROSS : Match.CIRCLE;
  	this._playerSymbol = (!this._first) ? Match.CROSS : Match.CIRCLE;
  	this._movesCount = 0;
  	this._board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  	this._isOver = false;
  	this._isWinner = false;
  }

  /**
   * Check the board to determine the next computer's move
   * @param {number} symbol - the move's symbol
   * @param {boolean} empty - true to find lines with two empty cells
   * @return {number} - if determined index of the next move, -1 otherwise
   */
  private _checkBoard = (symbol: number, empty = false): number => {
  	const symbolsAmount = (empty) ? 1 : 2,
  		emptyCellsAmount = (empty) ? 2 : 1;

  	for (const cells of Match.GRIDLINES) {
  		const line = [this._board[cells[0]], this._board[cells[1]], this._board[cells[2]]];

  		if (
  			(line.filter(elt => elt === symbol).length === symbolsAmount) &&
        (line.filter(elt => elt === 0).length === emptyCellsAmount)
  		) {
  			if (empty) {
  				return (this._board[cells[1]]) ?
  					cells[[0, 2][Math.floor(Math.random() * 2)]] :
  					cells[1];
  			}
  			else {
  				const index = line.findIndex(elt => elt !== symbol);
  				return cells[index];
  			}
  		}
  	}

  	return -1;
  }

  /**
   * Check if the match is over, and if so determine the winner
   * @param {number} symbol - the move's symbol
   */
  private _checkMatch = (symbol: number) => {
  	if (this._movesCount < 5) {
  		return;
  	}

  	for (const cells of Match.GRIDLINES) {
  		const line = [this._board[cells[0]], this._board[cells[1]], this._board[cells[2]]];

  		if (line.every(elt => elt === symbol)) {
  			this._isOver = true;
  			this._isWinner = (symbol === this._computerSymbol) ? 1 : 2;
  		}
  	}

  	if (!this._isOver && this._movesCount > 8) {
  		this._isOver = true;
  		this._isWinner = 0;
  	}
  }

  /**
   * Get the "isOver" value
   * @return {boolean} the "isOver" property value
   */
  public get isOver(): boolean {
  	return this._isOver;
  }

  /**
   * Get the "isWinner" value
   * @return {number|false} the "isWinner" property value
   */
  public get isWinner(): number | false {
  	return this._isWinner;
  }

  /**
   * Get the match's board
   * @return {array<array<number>>} a bidirectionnal array representing the board
   */
  public getBoard = (): Array<Array<number>> => [
  	this._board.slice(0, 3),
  	this._board.slice(3, 6),
  	this._board.slice(-3)
  ];

  /**
   * Get the next computer's move
   * @return {array<number>} a numbers' array representing the next computer's move
   */
  public getComputerMove = (): Array<number> | false => {
  	const isEvenMove = !(this._movesCount % 2);
  	if (
  		this._isOver ||
      (this._first && !isEvenMove) ||
      (!this._first && isEvenMove)
  	) {
  		return false;
  	}

  	let index = -1;

  	if (this._movesCount === 0) {
  		index = [0, 2, 6, 8][Math.floor(Math.random() * 4)];
  	}

  	if (this._movesCount === 1) {
  		index = (this._board[4] === 0) ? 4 : [0, 2, 6, 8][Math.floor(Math.random() * 4)];
  	}

  	if (this._movesCount === 2) {
  		for (const corners of [
  			[this._board[0], this._board[8]],
  			[this._board[2], this._board[6]]
  		]) {
  			if (corners.includes(1) && corners.includes(2)) {
  				index = 4;
  			}
  		}
  	}

  	if (index === -1) {
  		index = this._checkBoard(this._computerSymbol);
  	}

  	if (index === -1) {
  		index = this._checkBoard(this._playerSymbol);
  	}
    
  	if (index === -1) {
  		index = this._checkBoard(this._computerSymbol, true);
  	}

  	while (index === -1) {
  		const randomPosition = Math.floor(Math.random() * 9);
  		if (this._board[randomPosition] === 0) {
  			index = randomPosition;
  		}
  	}

  	this._movesCount++;
  	this._board[index] = this._computerSymbol; 
  	this._checkMatch(this._computerSymbol);
  	return [index % 3, Math.floor(index / 3)];
  };

  /**
   * Set the next player's move
   * @param {number} x - player move's abscissa
   * @param {number} y - player move's ordinate
   */
  public playerMove = (x: number, y: number): boolean => {
  	const isEvenMove = !(this._movesCount % 2);
  	if (
  		this._isOver ||
      x < 0 ||
      x > 2 ||
      y < 0 ||
      y > 2 ||
      (this._first && isEvenMove) ||
      (!this._first && !isEvenMove)
  	) {
  		return false;
  	}

  	const index = y * 3 + x;
  	if (this._board[index] !== 0) {
  		return false;
  	}
  	else {
  		this._movesCount++;
  		this._board[index] = this._playerSymbol; 
  		this._checkMatch(this._playerSymbol);
  		return true;
  	}
  };
}
