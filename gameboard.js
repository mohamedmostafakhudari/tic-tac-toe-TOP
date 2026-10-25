const gameboard = (function () {
	let board = Array.from({ length: 9 }).fill("");

	function getBoard() {
		return [...board];
	}

	function placeMark(mark, position) {
		if (!mark || !["x", "o"].includes(mark)) {
			throw new Error("Not supported 'mark' parameter");
		}
		if (position < 0 || position > 8 || board[position] !== "") {
			throw new Error("Invaild position");
		}

		board[position] = mark;
	}

	function resetBoard() {
		board = Array.from({ length: 9 }).fill("");
	}

	return { getBoard, placeMark, resetBoard };
})();

export default gameboard;
