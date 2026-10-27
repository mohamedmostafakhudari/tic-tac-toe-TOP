# Tic Tac Toe (CLI Version)

A command-line implementation of the classic Tic Tac Toe game, built as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.

This version focuses on clean code structure, Object-Oriented Programming (OOP) concepts, module separation, and pure logic validation before introducing a graphical user interface (GUI).

---

## 🚀 Features

- **Game Modes:** Play against another human locally (Player vs. Player) or against a computer opponent (Player vs. AI).
- **Interactive Terminal Board:** Dynamically prints an indexed board grid ($0$ through $8$) so players can easily pick available moves.
- **Input Validation:** Prevents invalid inputs or moves on already-occupied cells without breaking the game loop.
- **Zero External Dependencies:** Built entirely with standard Node.js native packages.

---

## 🛠️ Architecture & Design Patterns

The project heavily leverages modern JavaScript patterns, closures, and encapsulation principles:

- **Factory Functions & Closures:** Utilized for `Game`, `GameBoard`, and `Player` models. This allows factory functions to be cleanly exported while keeping state variables private via lexical scoping.
- **Modular Design:**
  - `main.js`: Handles the Command-Line Interface (CLI) input/output loop using `node:readline/promises` and `node:process`.
  - `gameConfig.js`: Stores central game-wide constants (e.g., `BOARD_SIZE`).
  - `winner.js`: Contains pure, deterministic functions (`getWinner`, draw checks, and `WINNING_LINES`) separated from the game loop to facilitate easy unit testing and state validation.

---

## 📦 Prerequisites

- **Node.js** (v14+ recommended for native `node:readline/promises` support)

---

## 🎮 How to Run

1. Clone or navigate to the repository directory.
2. Run the main entry point:

```bash
node main.js
```

---

## 🖥️ Example Gameplay

```text
Pick a position to play from 0 to 8: 5

|  o  |  1  |  x  |
|  x  |  4  |  o  |
|  6  |  x  |  8  |
```

---

## 📂 Project Structure

```text
├── main.js        # CLI interface & game execution loop
├── gameConfig.js  # Global configuration constants
├── winner.js      # Pure functions for win/draw detection
└── models/        # Factory functions (Game, GameBoard, Player)
```
