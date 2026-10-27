import { BOARD_SIZE, MARKS, EMPTY } from "../gameConfig.js";

export default function createGameBoard() {
	let board = Array.from({ length: BOARD_SIZE }).fill(EMPTY);

	function getBoard() {
		return [...board];
	}

	function placeMark(mark, position) {
		if (!mark || ![MARKS.X, MARKS.O].includes(mark)) {
			throw new Error("Not supported 'mark' parameter");
		}

		if (
			!Number.isInteger(position) ||
			position < 0 ||
			position > BOARD_SIZE - 1 ||
			board[position] !== EMPTY
		) {
			throw new Error(`Invaild position: ${position}`);
		}

		board[position] = mark;
	}

	function resetBoard() {
		board = Array.from({ length: BOARD_SIZE }).fill(EMPTY);
	}

	return { getBoard, placeMark, resetBoard };
}
