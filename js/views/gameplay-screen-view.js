import { GAME_MODES, MARKS } from "../gameConfig.js";
export class GameplayScreenView {
	constructor(containerElement, template) {
		this.container = containerElement;
		this.template = template;
		this.gameResultDialog = null;
		this.abortController = null;
	}

	bindPlaceMark(callback) {
		if (this.abortController === null) {
			// this line is important because abortController is a single-use object so we need to re-instantiate it to be able to bind listeners again after destroy when the controller decides to show this screen again

			this.abortController = new AbortController();
		}

		this.container.addEventListener(
			"click",
			(e) => {
				const cell = e.target.closest("[data-cell]");
				if (!cell || !this.container.contains(cell)) return;
				callback(Number(cell.dataset.cell));
			},
			{ signal: this.abortController.signal },
		);
	}

	bindNextRound(callback) {
		if (this.abortController === null) {
			this.abortController = new AbortController();
		}

		this.container.addEventListener(
			"click",
			(e) => {
				const nextBtn = e.target.closest(".btn-next");
				if (!nextBtn || !this.container.contains(nextBtn)) return;
				callback();
			},
			{ signal: this.abortController.signal },
		);
	}

	bindRestartGame(callback) {
		if (this.abortController === null) {
			this.abortController = new AbortController();
		}

		this.container.addEventListener(
			"click",
			(e) => {
				const restartBtn = e.target.closest(".restart-btn");
				if (!restartBtn || !this.container.contains(restartBtn)) return;
				callback();
			},
			{
				signal: this.abortController.signal,
			},
		);
	}
	destroy() {
		this.abortController?.abort(); // removes every listener, any event type
		this.abortController = null;
		this.container.innerHTML = "";
	}

	render(data) {
		const fragment = this.template.content.cloneNode(true);
		this.container.innerHTML = "";

		const {
			gameMode,
			board,
			playerWithXMark,
			playerWithOMark,
			currentPlayer,
			winner,
			winningCells,
			draw,
			scores,
			error,
		} = data;
		const currentTurnDisplay = fragment.querySelector("#current-turn-display");
		currentTurnDisplay.querySelector(".mark > .x-mark").hidden =
			currentPlayer.mark !== "x";
		currentTurnDisplay.querySelector(".mark > .o-mark").hidden =
			currentPlayer.mark !== "o";

		const cells = fragment.querySelectorAll("#gameboard [data-cell]");
		cells.forEach(function (cell) {
			cell.querySelector(".x-mark").hidden = board[+cell.dataset.cell] !== "x";
			cell.querySelector(".o-mark").hidden = board[+cell.dataset.cell] !== "o";
			if (
				winner &&
				winningCells.length &&
				winningCells.includes(+cell.dataset.cell)
			) {
				cell.classList.add("win-cell");
			}
		});

		const playerXWinCount = fragment.querySelector("#player-x-win-count");
		const tieCount = fragment.querySelector("#tie-count");
		const playerOWinCount = fragment.querySelector("#player-o-win-count");
		playerXWinCount.textContent = scores.playerXScore;
		tieCount.textContent = scores.ties;
		playerOWinCount.textContent = scores.playerOScore;

		const playerXScoreLabel = fragment.querySelector("#player-x-score-label");
		const playerOScoreLabel = fragment.querySelector("#player-o-score-label");
		playerXScoreLabel.textContent = `x (${
			gameMode === GAME_MODES.AI && !playerWithXMark.isComputer
				? "you"
				: playerWithXMark.name
		})`;
		playerOScoreLabel.textContent = `o (${
			gameMode === GAME_MODES.AI && !playerWithOMark.isComputer
				? "you"
				: playerWithOMark.name
		})`;

		this.container.appendChild(fragment);

		this.gameResultDialog = document.querySelector("#game-result-dialog");

		if (winner || draw) {
			const dialogHead = this.gameResultDialog.querySelector(".dialog-head");
			const declareWinner =
				this.gameResultDialog.querySelector(".declare-winner");

			if (winner) {
				dialogHead.textContent =
					GAME_MODES.AI && winner.isComputer
						? "you lost!"
						: GAME_MODES.AI && !winner.isComputer
							? "you won!"
							: `${winner.name} won!`;
				declareWinner.querySelector(".x-mark").hidden =
					winner.mark !== MARKS.X;
				declareWinner.querySelector(".o-mark").hidden =
					winner.mark !== MARKS.O;
			}

			if (draw) {
				dialogHead.textContent = "it's a tie!";
				declareWinner.hidden = true;
			}

			this.gameResultDialog.showModal();
		}
	}
}
