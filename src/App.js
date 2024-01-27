import { useState } from 'react';

// value: a variable that keeps a state value of a square
// xIsNext: a boolean variable that keeps information about whose turn it is to play
// squares: a list of squares and their values
// history: an array that keeps track of all previous board layouts with past turns and plays of each player
// currentMove: keeps the last (current) move on the board
// currentSquares: a state variable that keeps current state of the filed and its values.

// Function "Square" is a function that that returns a React object to be used for rendering later.
function Square({ value, onSquareClick }) {
  return (
      // This function sets the layout and functionality of each individual square on the field.
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
  );
}

// This is the function that is responsible for handling proper display and functionality of the whole board
function Board({ xIsNext, squares, onPlay }) {

  // This is a function that implements functionality of a click to a Square on the board
  function handleClick(i) {
    // The IF statement checks if there are available squares to play and whether either of player have already won.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // A shallow copy of the 'squares' array
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  // Checking if there is a winner or if the game should be continued with the next player.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
      // This part returns the html element to be rendered on the page
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </>
  );
}

// This is the main function that contains the whole game data
export default function Game() {
  // Declaration of the state variables and methods that set their values
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Updating the field and values after a turn
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Function that lets the player review previous turns
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    // This function shows previous moves
    return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    );
  });

  return (
      // Render of the whole game board
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
  );
}

// This function is to calculate if there is a winner at the moment
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Checking the board value for the winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
