export default function createScore() {
	let playerOneScore = 0;
	let playerTwoScore = 0;
	let ties = 0;

	function reset() {
		playerOneScore = 0;
		playerTwoScore = 0;
		ties = 0;
	}

	function getPlayerOneScore() {
		return playerOneScore;
	}

	function getPlayerTwoScore() {
		return playerTwoScore;
	}

	function getTies() {
		return ties;
	}

	function incrementPlayerOneScore() {
		playerOneScore += 1;
	}

	function incrementPlayerTwoScore() {
		playerTwoScore += 1;
	}

	function incrementTies() {
		ties += 1;
	}

	return {
		getPlayerOneScore,
		getPlayerTwoScore,
		getTies,
		reset,
		incrementPlayerOneScore,
		incrementPlayerTwoScore,
		incrementTies,
	};
}
