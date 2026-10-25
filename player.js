import { MARKS } from "./gameConfig.js";

export default function createPlayer(name, mark) {
	if (!mark || ![MARKS.X, MARKS.O].includes(mark)) {
		throw new Error("Invalid 'mark' parameter");
	}

	const isComputer = name === "Computer";

	function getMark() {
		return mark;
	}

	function getName() {
		return name;
	}

	return { isComputer, getMark, getName };
}
