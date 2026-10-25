import createGameBoard from "./gameboard.js";
import createGame from "./game.js";
import createPlayer from "./player.js";
import { MARKS } from "./gameConfig.js";

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
	const name = "CyberFrost"; // user input;
	const chosenMark = "x"; // user input;

	const playerOne = createPlayer(name, chosenMark);
	const playerTwo = createPlayer(
		"Computer",
		chosenMark === MARKS.X ? MARKS.O : MARKS.X,
	);

	const game = createGame(playerOne, playerTwo);

	const gameState = game.playRound(0);
	const XCount = gameState.board.filter((item) => item === "x").length;
	const OCount = gameState.board.filter((item) => item === "o").length;

	assertEqual(XCount, 1);
	assertEqual(OCount, 1);
});
