import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import createGame from "./models/game.js";
import { MARKS, EMPTY } from "./gameConfig.js";
import createPlayer from "./models/player.js";
function printBoard(board) {
	let str = "";
	for (let i = 0; i < board.length; i++) {
		if (i % 3 === 0) {
			str += "\n";
		}
		str += `|  ${board[i] !== EMPTY ? board[i] : i}  `;
	}
	console.log(str);
}

async function main() {
	const rl = readline.createInterface({ input, output });

	const playerOneName = (await rl.question("Player One Name: ")).trim();
	const playerOneMark = (await rl.question("Player One Mark: ")).trim();
	console.log(playerOneMark);

	const playerTwoName = (
		await rl.question("Player Two Name (leave empty against computer): ")
	).trim();
	const playerTwoMark = playerOneMark === MARKS.X ? MARKS.O : MARKS.X;

	const playerOne = createPlayer(playerOneName, playerOneMark);
	const playerTwo = createPlayer(
		playerTwoName || "Computer",
		playerTwoMark,
		!playerTwoName,
	);

	const game = createGame(playerOne, playerTwo);

	await runGame(rl, game);

	let playAgain = await rl.question(
		"Play Again? ( 'y' for yes. leave blank to exit ): ",
	);

	while (playAgain === "y") {
		await runGame(rl, game);
		playAgain = await rl.question(
			"Play Again? ( 'y' for yes. leave blank to exit ): ",
		);
	}

	rl.close();
}

async function runGame(rl, game) {
	game.startANewGame();

	let gameState = game.getState();

	printBoard(gameState.board);

	while (!gameState.winner && !gameState.draw) {
		const playerChosenPosition = await rl.question(
			"Pick a position to play from 0 to 8: ",
		);

		const currentState = game.play(+playerChosenPosition);

		gameState = currentState;

		printBoard(gameState.board);

		if (gameState.winner) {
			const winnerPlayer = gameState.winner;
			console.log(`${winnerPlayer.getName()} just won the game!`);
		} else if (gameState.draw) {
			console.log(`this is a draw.`);
		}
	}
}

main();
