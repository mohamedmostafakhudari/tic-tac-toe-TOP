import createGame from "./game.js";
import { MARKS } from "./gameConfig";
import createPlayer from "./player.js";

const name = "CyberFrost"; // user input;
const chosenMark = "x"; // user input;

const playerOne = createPlayer(name, chosenMark);
const playerTwo = createPlayer(
	"Computer",
	chosenMark === MARKS.X ? MARKS.O : MARKS.X,
);

const game = createGame(playerOne, playerTwo);
