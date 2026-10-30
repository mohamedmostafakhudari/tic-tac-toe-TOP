import createGameBoard from "./gameboard.js";
import { EMPTY, MARKS } from "../gameConfig.js";
import { getWinner, isDraw } from "../winner.js";

export default function createGame(playerOne, playerTwo) {
	const gameboard = createGameBoard();
	let errorMessage = "";
	let winner = null;
	let draw = false;
	let gameCount = 0;

	let currentPlayer = playerOne.getMark() === MARKS.X ? playerOne : playerTwo;

	function switchPlayerTurn() {
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

	function swapMarks() {
		const playerOneMark = playerOne.getMark();
		playerOne.setMark(playerTwo.getMark());
		playerTwo.setMark(playerOneMark);
	}

	function incrementGameCount() {
		gameCount += 1;
	}

	function resetState() {
		gameboard.resetBoard();
		winner = null;
		draw = false;
		errorMessage = "";
	}

	function checkResult() {
		const board = gameboard.getBoard();

		return { winner: getWinner(board), draw: isDraw(board) };
	}

	function isOver() {
		return winner !== null || draw;
	}

	function playTurn(position) {
		// One turn by whoever is the current player
		if (isOver()) {
			errorMessage = "The game is over";
			return false;
		}
		if (!calculateAvailablePositions().includes(position)) {
			errorMessage = "That square is not available";
			return false;
		}

		gameboard.placeMark(currentPlayer.getMark(), position);

		const result = checkResult();
		if (result.winner) {
			winner = currentPlayer;
		} else if (result.draw) {
			draw = true;
		} else {
			switchPlayerTurn();
		}
		return true;
	}

	function getState() {
		return {
			board: gameboard.getBoard(),
			winner: winner && {
				name: winner.getName(),
				mark: winner.getMark(),
			},
			draw,
			error: errorMessage,
		};
	}

	function startANewGame() {
		resetState();
		incrementGameCount();

		if (gameCount > 1) {
			swapMarks();
		}

		// it's always the player with mark X that got to start the game
		currentPlayer = playerOne.getMark() === MARKS.X ? playerOne : playerTwo;

		if (currentPlayer.isComputer) {
			playTurn(pickRandomPosition());
		}

		return getState();
	}

	function play(position) {
		errorMessage = "";

		if (playTurn(position)) {
			// let computer player take their turn
			while (!isOver() && currentPlayer.isComputer) {
				playTurn(pickRandomPosition());
			}
		}

		return getState();
	}

	return { getState, play, startANewGame };
}
