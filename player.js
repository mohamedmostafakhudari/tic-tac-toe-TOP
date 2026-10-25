export default function createPlayer(mark, name = "Computer") {
	let name = name;
	let mark = mark;

	function getMark() {
		return mark;
	}

	function getName() {
		return name;
	}

	function setMark(newMark) {
		if (!newMark || ["x", "o"].includes(newMark)) {
			throw new Error("Invalid 'newMark' parameter");
		}

		mark = newMark;
	}

	return { getMark, getName, setMark };
}
