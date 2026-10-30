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

		const { board, winner, draw, error } = data;

		const cells = fragment.querySelectorAll("#gameboard [data-cell]");
		cells.forEach(function (cell) {
			cell.querySelector(".x-mark").hidden = board[+cell.dataset.cell] !== "x";
			cell.querySelector(".o-mark").hidden = board[+cell.dataset.cell] !== "o";
		});

		this.container.appendChild(fragment);
	}
}
