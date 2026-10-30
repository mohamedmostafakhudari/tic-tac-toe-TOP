export default function createScore() {
	let playerXScore = 0;
	let playerOScore = 0;
	let ties = 0;

	function reset() {
		playerXScore = 0;
		playerOScore = 0;
		ties = 0;
	}

	function incrementPlayerXScore() {
		playerXScore += 1;
	}

	function incrementPlayerOScore() {
		playerOScore += 1;
	}

	function incrementTies() {
		ties += 1;
	}

	return {
		playerXScore,
		playerOScore,
		ties,
		reset,
		incrementPlayerXScore,
		incrementPlayerOScore,
		incrementTies,
	};
}
