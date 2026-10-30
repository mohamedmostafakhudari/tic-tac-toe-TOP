import { EMPTY } from "./gameConfig.js";

export const WIN_LINES = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export function getWinner(board) {
	for (const [a, b, c] of WIN_LINES) {
		if (board[a] !== EMPTY && board[a] === board[b] && board[a] === board[c]) {
			return { mark: board[a], winningCells: [a, b, c] };
		}
	}
	return null;
}

export function isDraw(board) {
	return getWinner(board) === null && !board.includes(EMPTY);
}
