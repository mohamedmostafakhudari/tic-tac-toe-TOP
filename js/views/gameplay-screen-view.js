export class GameplayScreenView {
	constructor(containerElement, template) {
		this.container = containerElement;
		this.template = template;
		this.abortController = new AbortController();
	}

	bindPlaceMark(callback) {
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

	destroy() {
		this.abortController.abort(); // removes every listener, any event type
		this.container.innerHTML = "";
	}

	render(data) {
		const fragment = this.template.content.cloneNode(true);
		this.container.innerHTML = "";

		const { board, currentPlayer, winner, draw, scores, error } = data;

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

		this.container.appendChild(fragment);
	}
}
