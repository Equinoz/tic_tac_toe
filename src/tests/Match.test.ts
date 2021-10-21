import { Match } from "../utils/Match";

describe("Initialize new match", () => {
	it("\"isOver\" property should return false", () => {
		const match = new Match();
		expect(match.isOver).toBe(false);
	});

	it("\"isWinner\" property should return false", () => {
		const match = new Match();
		expect(match.isWinner).toBe(false);
	});

	it("Board sould be empty", () => {
		const match = new Match();
		expect(match.getBoard()).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
	});

	it("Computer first: getComputerMove should return an array with two digits", () => {
		const match = new Match();
		const response = match.getComputerMove();
		expect(Array.isArray(response)).toBe(true);
		expect(response).toHaveLength(2);
		expect(Number.isInteger((Array.isArray(response)) ? response[0] : false)).toBe(true);
		expect(Number.isInteger((Array.isArray(response)) ? response[1] : false)).toBe(true);
	});

	it("Computer first: playerMove should return false", () => {
		const match = new Match();
		expect(match.playerMove(1, 1)).toBe(false);
	});

	it("Player first: getComputerMove should return false", () => {
		const match = new Match(false);
		expect(match.getComputerMove()).toBe(false);
	});
  
	it("Player first: playerMove should return true", () => {
		const match = new Match(false);
		expect(match.playerMove(1, 1)).toBe(true);
	});
});

describe("Handle moves", () => {
	it("Forbidden move: should return false", () => {
		const match = new Match(false);
		let response = match.playerMove(1, 1);
		expect(response).toBe(true);
		match.getComputerMove();
		response = match.playerMove(1, 1);
		expect(response).toBe(false);
	});

	it("Computer first, allowed move: at least one square should be filled with value \"1\"", () => {
		const match = new Match();
		const computerMove = match.getComputerMove();
		const board = match.getBoard();
		expect((Array.isArray(computerMove)) ? board[computerMove[1]][computerMove[0]] : board[3][3]).toEqual(1);
	});

	it("Player first, allowed move: player's move square should be filled with value \"1\", computer's move square with value \"2\"", () => {
		const match = new Match(false);
		match.playerMove(1, 1);
		const computerMove = match.getComputerMove();
		const board = match.getBoard();
		expect(board[1][1]).toEqual(1);
		expect((Array.isArray(computerMove)) ? board[computerMove[1]][computerMove[0]] : board[3][3]).toEqual(2);
	});
});

describe("Handle end match", () => {
	it("\"isOver\" property should return true", () => {
		const match = new Match();
		match["_movesCount"] = 6;
		match["_board"] = [1, 1, 1, 2, 0, 2, 0, 2, 0];
		match["_checkMatch"](1);
		expect(match.isOver).toBe(true);
	});

	it("getComputerMove should return false", () => {
		const match = new Match();
		match["_movesCount"] = 6;
		match["_board"] = [1, 1, 1, 2, 0, 2, 0, 2, 0];
		match["_checkMatch"](1);
		expect(match.getComputerMove()).toBe(false);
	});

	it("playerMove should return false", () => {
		const match = new Match();
		match["_movesCount"] = 6;
		match["_board"] = [1, 1, 1, 2, 0, 2, 0, 2, 0];
		match["_checkMatch"](1);
		expect(match.playerMove(2, 2)).toBe(false);
	});

	it("\"isWinner\" property should return value \"0\"", () => {
		const match = new Match();
		match["_movesCount"] = 9;
		match["_board"] = [1, 1, 2, 2, 2, 1, 1, 1, 2];
		match["_checkMatch"](1);
		expect(match.isWinner).toBe(0);
	});

	it("\"isWinner\" property should return value \"1\"", () => {
		const match = new Match(false);
		match["_movesCount"] = 6;
		match["_board"] = [1, 0, 2, 1, 2, 0, 2, 0, 1];
		match["_checkMatch"](2);
		expect(match.isWinner).toBe(1);
	});

	it("\"isWinner\" property should return value \"2\"", () => {
		const match = new Match();
		match["_movesCount"] = 6;
		match["_board"] = [1, 0, 2, 0, 1, 2, 1, 0, 2];
		match["_checkMatch"](2);
		expect(match.isWinner).toBe(2);
	});
});
