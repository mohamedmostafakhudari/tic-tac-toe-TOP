import createGameBoard from "./gameboard.js";
import createGame from "./game.js";
import createPlayer from "./player.js";
import { MARKS } from "./gameConfig.js";
import { getWinner, isDraw, WIN_LINES } from "./winner.js";

function test(name, fn) {
	try {
		fn();
		console.log(`✓ ${name}`);
	} catch (err) {
		console.error(`✗ ${name}: ${err.message}`);
	}
}

function assertEqual(actual, expected) {
	if (actual !== expected) {
		throw new Error(`expected ${expected}, got ${actual}`);
	}
}

function initializeGame() {
	const name = "CyberFrost"; // user input;
	const chosenMark = "x"; // user input;

	const playerOne = createPlayer(name, chosenMark);
	const playerTwo = createPlayer(
		"Computer",
		chosenMark === MARKS.X ? MARKS.O : MARKS.X,
		true,
	);

	const game = createGame(playerOne, playerTwo);

	return game;
}

test("placing on an occupied square throws", () => {
	const board = createGameBoard();
	board.placeMark("x", 0);
	let threw = false;
	try {
		board.placeMark("o", 0);
	} catch {
		threw = true;
	}
	assertEqual(threw, true);
});

test("getBoard returns a copy", () => {
	const board = createGameBoard();
	board.getBoard()[0] = "x";
	assertEqual(board.getBoard()[0], "");
});

test("playRound(0) places an x and returns a board with one x and one o", () => {
	const game = initializeGame();

	const gameState = game.play(0);
	const XCount = gameState.board.filter((item) => item === "x").length;
	const OCount = gameState.board.filter((item) => item === "o").length;

	assertEqual(XCount, 1);
	assertEqual(OCount, 1);
});

const emptyBoard = () => Array(9).fill("");

// 1. Every winning line, for both marks
for (const mark of ["x", "o"]) {
	for (const line of WIN_LINES) {
		test(`${mark} wins on line ${line}`, () => {
			const board = emptyBoard();
			line.forEach((i) => (board[i] = mark));
			assertEqual(getWinner(board), mark);
		});
	}
}

// 2. No winner
test("empty board has no winner", () => {
	assertEqual(getWinner(emptyBoard()), null);
});

test("two in a row is not a win", () => {
	const board = emptyBoard();
	board[0] = "x";
	board[1] = "x";
	assertEqual(getWinner(board), null);
});

test("three empty squares in a line are not a win", () => {
	assertEqual(getWinner(emptyBoard()), null);
});

// 3. Draw vs win on a full board
test("full board with no winner is a draw", () => {
	const board = ["x", "o", "x", "x", "o", "o", "o", "x", "x"];
	assertEqual(getWinner(board), null);
	assertEqual(isDraw(board), true);
});

test("full board with a winner is NOT a draw", () => {
	const board = ["x", "x", "x", "o", "o", "x", "o", "x", "o"];
	assertEqual(getWinner(board), "x");
	assertEqual(isDraw(board), false);
});

test("unfinished board is not a draw", () => {
	assertEqual(isDraw(emptyBoard()), false);
});
