import { MARKS } from "./gameConfig.js";
import createGame from "./models/game.js";
import createPlayer from "./models/player.js";
import { GameplayScreenView } from "./views/gameplay-screen-view.js";
import { SetupScreenView } from "./views/setup-screen-view.js";

class GameController {
	constructor() {
		this.game = null;
		this.setupScreenView = new SetupScreenView(
			document.querySelector("#app"),
			document.querySelector("#setup-screen-template"),
		);
		this.gameplayScreenView = new GameplayScreenView(
			document.querySelector("#app"),
			document.querySelector("#gameplay-screen-template"),
		);
	}

	handleSetupSubmit({ playerOneMark, mode }) {
		this.setupScreenView.destroy();

		const playerOne = createPlayer("Player One", playerOneMark);
		const playerTwo = createPlayer(
			mode === "ai" ? "ai" : "Player Two",
			playerOneMark === MARKS.X ? MARKS.O : MARKS.X,
			mode === "ai",
		);
		this.game = createGame(playerOne, playerTwo);

		const state = this.game.startANewGame();

		this.gameplayScreenView.bindPlaceMark(this.handlePlaceMark.bind(this));
		this.gameplayScreenView.bindNextRound(this.handleNextRound.bind(this));
		this.gameplayScreenView.bindRestartGame(this.handleRestartGame.bind(this));
		this.gameplayScreenView.render(state);
	}

	handlePlaceMark(position) {
		const state = this.game.play(position);
		this.gameplayScreenView.render(state);
	}

	handleNextRound() {
		const state = this.game.nextRound();
		this.gameplayScreenView.render(state);
	}

	handleRestartGame() {
		this.gameplayScreenView.destroy();
		this.setupScreenView.bindSubmit(this.handleSetupSubmit.bind(this));
		this.setupScreenView.render();
	}

	init() {
		this.setupScreenView.bindSubmit(this.handleSetupSubmit.bind(this));
		this.setupScreenView.render();
	}
}

const game = new GameController();
game.init();
