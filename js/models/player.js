import { MARKS } from "../gameConfig.js";

export default function createPlayer(name, mark, isComputer = false) {
	if (!mark || ![MARKS.X, MARKS.O].includes(mark)) {
		throw new Error("Invalid 'mark' parameter");
	}

	function getMark() {
		return mark;
	}

	function setMark(newMark) {
		if (!mark || ![MARKS.X, MARKS.O].includes(mark)) {
			throw new Error("Invalid 'mark' parameter");
		}

		mark = newMark;
	}

	function getName() {
		return name;
	}

	function getState() {
		return {
			name: name,
			mark: mark,
			isComputer: isComputer,
		};
	}

	return { isComputer, getMark, getName, setMark, getState };
}
