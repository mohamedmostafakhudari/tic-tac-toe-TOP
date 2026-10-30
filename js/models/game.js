import createGameBoard from "./gameboard.js";
import { EMPTY, MARKS, GAME_MODES } from "../gameConfig.js";
import { getWinner, isDraw } from "../winner.js";
import createScore from "./score.js";

export default function createGame(playerOne, playerTwo) {
	const gameboard = createGameBoard();
	const score = createScore();
	const gameMode = playerTwo.isComputer ? GAME_MODES.AI : GAME_MODES.PVP;
	let errorMessage = "";
	let winner = null;
	let winningCells = [];
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
		score.reset();
		errorMessage = "";
		winner = null;
		winningCells = [];
		draw = false;
		gameCount = 0;
	}

	function checkResult() {
		const board = gameboard.getBoard();

		return { winner: getWinner(board), draw: isDraw(board) };
	}

	function isOver() {
		return winner !== null || draw;
	}

	function updateScores() {
		if (winner) {
			winner.getMark() === MARKS.X
				? score.incrementPlayerXScore()
				: score.incrementPlayerOScore();
		} else if (draw) {
			score.incrementTies();
		}
	}

	function getPlayerWithXMark() {
		if (playerOne.getMark() === MARKS.X) {
			return {
				name: playerOne.getName(),
				mark: playerOne.getMark(),
				isComputer: playerOne.isComputer,
			};
		}
		return {
			name: playerTwo.getName(),
			mark: playerTwo.getMark(),
			isComputer: playerTwo.isComputer,
		};
	}

	function getPlayerWithOMark() {
		if (playerOne.getMark() === MARKS.O) {
			return {
				name: playerOne.getName(),
				mark: playerOne.getMark(),
				isComputer: playerOne.isComputer,
			};
		}
		return {
			name: playerTwo.getName(),
			mark: playerTwo.getMark(),
			isComputer: playerTwo.isComputer,
		};
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
			winningCells = result.winner.winningCells;
			updateScores();
		} else if (result.draw) {
			draw = true;
			updateScores();
		} else {
			switchPlayerTurn();
		}
		return true;
	}

	function getState() {
		return {
			gameMode,
			winningCells,
			draw,
			error: errorMessage,
			board: gameboard.getBoard(),
			scores: score.getScores(),
			playerWithXMark: getPlayerWithXMark(),
			playerWithOMark: getPlayerWithOMark(),
			currentPlayer: currentPlayer && {
				name: currentPlayer.getName(),
				mark: currentPlayer.getMark(),
				isComputer: currentPlayer.isComputer,
			},
			winner: winner && {
				name: winner.getName(),
				mark: winner.getMark(),
				isComputer: winner.isComputer,
			},
		};
	}

	function nextRound() {
		gameboard.resetBoard();
		errorMessage = "";
		winner = null;
		winningCells = [];
		draw = false;

		incrementGameCount();
		swapMarks();

		return getState();
	}
	function startANewGame() {
		resetState();

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

	return { getState, play, startANewGame, nextRound };
}
