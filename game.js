import createGameBoard from "./gameboard.js";
import { EMPTY } from "./gameConfig.js";

export default function createGame(playerOne, playerTwo) {
	const gameboard = createGameBoard();

	let currentPlayer = playerOne;

	let errorMessage = "";
	let winner = null;

	function switchPlayerTurn() {
		// referential equality
		currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
	}

	function calculateAvailablePositions() {
		return gameboard.getBoard().reduce((result, sq, i) => {
			if (sq === EMPTY) {
				result.push(i);
			}
			return result;
		}, []);
	}

	function pickRandomPosition() {
		const availablePositions = calculateAvailablePositions();

		return availablePositions[
			Math.floor(Math.random() * availablePositions.length)
		];
	}

	function getState() {
		return { board: gameboard.getBoard(), winner, error: errorMessage };
	}

	function restart() {
		gameboard.resetBoard();
		winner = null;
		errorMessage = "";
		currentPlayer = playerOne;
	}

	function playerMove(position) {
		if (!calculateAvailablePositions().includes(position)) return false;

		gameboard.placeMark(currentPlayer.getMark(), position);
		return true;
	}

	function computerMove() {
		const randomPosition = pickRandomPosition();

		if (randomPosition === undefined) return;

		gameboard.placeMark(currentPlayer.getMark(), randomPosition);
	}

	function checkResult() {}

	function playRound(position) {
		errorMessage = "";

		if (!playerMove(position)) {
			errorMessage = "That square is taken";
			return getState();
		}
		switchPlayerTurn();
		checkResult();
		computerMove();
		switchPlayerTurn();
		checkResult();

		return getState();
	}

	return { getState, playRound, restart };
}
