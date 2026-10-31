# ❌⭕ Tic Tac Toe (Web Edition)

A clean, modular, and responsive web implementation of the classic Tic Tac Toe game. Built using vanilla JavaScript, modern CSS architecture, and ES Modules as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## 🚀 Demo & Deployment

- **Live Demo:** Hosted on GitHub Pages _(https://mohamedmostafakhudari.github.io/tic-tac-toe-TOP/)_
- **Development Environment:** Requires an HTTP server environment (e.g., VS Code Live Server) to support ES Module imports (`file://` protocol is not supported).

---

## ✨ Features

- **Multiple Game Modes:**
  - **Player vs. Player (PvP):** Local two-player mode.
  - **Player vs. AI:** Single-player mode against a random-choice AI opponent.
- **Custom Setup Screen:** Customize game mode and pick marks/symbols before starting a match.
- **Persistent Scoreboard:** Tracks wins for Player 1, Player 2 / AI, and total ties across rounds.
- **Interactive UI:** Smooth transitions between setup screen and gameplay view, complete with interactive icons and reset controls.
- **Input & State Safeguards:** Strict validation prevents overwriting selected cells or triggering out-of-turn moves.

---

## 🛠️ Architecture & Design Patterns

The project follows a modified **Model-View-Controller (MVC)** architectural pattern using modern JavaScript (ES Modules), Factory Functions, and encapsulation:

### 🏛️ Model Layer (`js/models/`)

- **`gameboard.js`**: Manages internal board state array, cell marking, and grid resetting.
- **`game.js`**: Handles turn swapping, move validation, and game loop orchestration.
- **`player.js`**: Represents player state (name, symbol, AI vs Human flag).
- **`score.js`**: Manages win/loss/tie tallying across multiple matches.

### 👁️ View Layer (`js/views/`)

- **`setup-screen-view.js`**: Controls the configuration UI where players pick modes and symbols.
- **`gameplay-screen-view.js`**: Handles rendering grid updates, active player indicators, match outcome modal/overlays, and live score displays.

### 🎮 Controller Layer (`js/main.js`)

- **`GameController`**: Acts as the central orchestrator connecting the DOM events from the View components with the underlying Model state logic.

### ⚡ Utility Modules

- **`winner.js`**: Contains pure, deterministic functions (`getWinner`, draw checks, and `WINNING_LINES`) separated from DOM operations for easy testing (`tests.js`).
- **`gameConfig.js`**: Holds global configuration metrics (e.g., board size, marker configurations).

---

## 🎨 CSS Architecture

Styles are organized using a clean modular approach:

- `reset.css`: Modern CSS reset.
- `global.css`: Global design tokens, CSS custom properties, and base element styles.
- `components.css`: Reusable UI component styling (cards, buttons, icons).
- `utilities.css`: Single-purpose utility classes.
- `style.css`: Primary stylesheet.

---

## 📦 Getting Started Locally

Because this application uses native JavaScript **ES Modules** (`import` / `export`), running `index.html` directly via `file://` in a web browser will result in CORS issues.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Serve the project over HTTP:**
   - **Using VS Code:** Right-click `index.html` and select **"Open with Live Server"**.
   - **Using Node.js:**
     ```bash
     npx http-server .
     ```
   - **Using Python:**
     ```bash
     python3 -m http.server 8000
     ```

3. Open your browser and navigate to `http://localhost:8000` (or the port specified by your local server).

---

## 📂 Project Structure

```
├── index.html
├── README.md
├── css/
│   ├── reset.css
│   ├── global.css
│   ├── components.css
│   ├── utilities.css
│   └── style.css
├── js/
│   ├── main.js                  # Entry point (GameController setup)
│   ├── gameConfig.js            # Global configuration parameters
│   ├── winner.js                # Pure logic for win & draw checks
│   ├── tests.js                 # Verification/test script
│   ├── models/                  # Domain logic entities
│   │   ├── gameboard.js
│   │   ├── game.js
│   │   ├── player.js
│   │   └── score.js
│   └── views/                   # UI DOM renderers & event listeners
│       ├── setup-screen-view.js
│       └── gameplay-screen-view.js
└── assets/                      # SVG icons and visual assets
```
