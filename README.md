# Casino Jackpot Client

Welcome to the Casino Jackpot Client! This React application simulates a simple slot machine game with a twist, allowing users to spin for credits and cash out their winnings. The game ensures the house always wins in the long run.

## Coding Guidelines

#### When writing the code for the Casino Jackpot Client, the following guidelines were followed:

- **Code Structure**: Ensure the code is modular and divided into clear, reusable components.
- **Comments**: Add comments to explain the purpose of functions and complex logic to improve code readability and maintainability.
- **State Management**: Use React's state management efficiently to handle the application's state.
- **API Integration**: Ensure API calls are handled properly with error handling and proper response processing.
- **Styling**: Use CSS classes for styling components to maintain a clean and organized design.
- **Local Storage**: Store the session ID in local storage to maintain user sessions across page reloads.
- **Responsiveness**: Ensure the application is responsive and works well on different screen sizes.
- **Security**: Handle user inputs and API calls securely to prevent potential vulnerabilities.


## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Getting Started

To get started with the Casino Jackpot Client, follow these steps:

### Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/casino-jackpot-client.git
    ```

2. Navigate to the project directory:

    ```sh
    cd casino-jackpot-client
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

### Running the Application

To start the development server, run:

```sh
npm start
```
### Project Structure
#### The project structure is as follows:

```sh
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── App.js
│   ├── App.css
│   ├── ServerAPI.js
│   └── ...
├── package.json
└── README.md

```
- public/: Contains the HTML file and static assets.
- src/: Contains the React components and API handling logic.
- App.js: Main component that renders the application.
- App.css: Styling for the application.
- ServerAPI.js: Handles API calls to the backend server.

 ### Features
- Slot Machine Simulation: Spin the slots to try your luck.
- Session Management: Unique session IDs for each user, stored in local storage.
- Credit Management: Start with 10 credits, win more by matching symbols, and cash out your winnings.
- Persistent State: Credits and session ID are persistent across page reloads.

 ### Usage
#### Spinning the Slots
1. Click the "Spin" button to spin the slots.
2. The slots will spin and stop one by one, showing the result.
3. If all three slots match, you win credits based on the symbol.
4. Each spin costs 1 credit.

   
### Cashing Out
1. Click the "Cash Out" button to cash out your winnings.
2. The remaining credits will be saved to your session.
3. You will see a message showing your remaining credits and a "Play More" button.
Playing More
1. Click the "Play More" button to restart the game with the same session ID.
2. Your credits will be fetched from the server, and you can continue playing.


### API Endpoints
#### The client interacts with the backend server through the following API endpoints:
- POST /initialize: Initialize a user session.
- POST /spin: Spin the slots and get the result.
- POST /cashout: Cash out the remaining credits.


### Contributing
#### Contributions are welcome! If you would like to contribute to the project, please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature-name).
5. Open a Pull Request.
