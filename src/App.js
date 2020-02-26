import React from "react";
import "./style.css";
import Square from "./components/Square/Square";
import Header from "./components/Header/Header";
import {
  tableSize,
  snakeColor,
  startPosition,
  arrowCode,
  width,
  BODY,
  FOOD
} from "./config";

class App extends React.Component {
  state = {
    direction: arrowCode.down,
    snakeBody: [],
    board: [],
    gameOver: false,
    foodPlace: [],
    bestScore: 0
  };

  componentDidMount() {
    this.start();
  }
  async start() {
    this.keyController();
    this.getBestScoreFromLocaleStorage();
    await this.initializeState();
    this.game();
  }

  setBestScoreToLocaleStorage() {
    localStorage.setItem("bestscore", this.state.bestScore);
  }

  getBestScoreFromLocaleStorage() {
    const bestScore = localStorage.getItem("bestscore");
    if (bestScore) {
      // get from locastorage and set to state

      const value = parseInt(bestScore);
      console.log(value);
      this.setState({
        bestScore: value
      });
    } else {
      // initialize local storage
      localStorage.setItem("bestscore", 0);
    }
  }

  initializeState() {
    const board = [];
    for (let i = 0; i < tableSize * tableSize; i++) {
      board[i] = null;
    }
    board[startPosition] = BODY;
    const snakeBody = [startPosition];
    this.setState({
      board,
      snakeBody,
      gameOver: false
    });
  }

  game() {
    const moveSnake = async () => {
      // 5 upgrade state board
      // 1. change snake position, remove last position in array and add new to the beginning
      // 2. respawn food if it is not on the table
      // 3 check if snake bite itself
      // 4 check if snake eat food
      this.upgradeBoard();
      const nextPosition = this.getNextMovePosition();
      this.removeTailAndAddNewHead(nextPosition);
      this.spawnFood();
      this.gameOverController();
      this.eatFoodController();
      if (this.state.gameOver) {
        clearInterval(timer);
        this.start();
      }
    };
    const timer = setInterval(moveSnake, 100);
  }

  eatFoodController() {
    const { foodPlace, snakeBody, bestScore } = this.state;
    const head = snakeBody[0];
    if (foodPlace.includes(head)) {
      // if eat food
      // 1. remove food from table
      // 2. enlarge snake
      // 3. check if present score is > bestscore
      foodPlace.pop();
      snakeBody.push(head);
      if (snakeBody.length > bestScore) {
        this.setState({
          bestScore: snakeBody.length
        });
      }
    }
  }

  gameOverController() {
    const { snakeBody } = this.state;
    const length = snakeBody.length;
    if (length !== new Set(snakeBody).size) {
      // game over
      this.setBestScoreToLocaleStorage();
      this.setState({
        gameOver: true
      });
    }
  }

  keyController() {
    document.addEventListener("keydown", e => {
      const oldDirection = this.state.direction;
      let newDirection;
      // if clicked other key than arrows keys, leave old state, thats why i initialize with new direction old direction
      // need protection for change oposite directory
      if (
        (e.keyCode === arrowCode.left && oldDirection === arrowCode.right) ||
        (e.keyCode === arrowCode.right && oldDirection === arrowCode.left) ||
        (e.keyCode === arrowCode.down && oldDirection === arrowCode.up) ||
        (e.keyCode === arrowCode.up && oldDirection === arrowCode.down)
      ) {
        newDirection = oldDirection;
      } else {
        newDirection = oldDirection;
        e.keyCode === arrowCode.left && (newDirection = arrowCode.left);
        e.keyCode === arrowCode.right && (newDirection = arrowCode.right);
        e.keyCode === arrowCode.up && (newDirection = arrowCode.up);
        e.keyCode === arrowCode.down && (newDirection = arrowCode.down);
      }
      this.setState({
        direction: newDirection
      });
    });
  }

  upgradeBoard() {
    const { board, foodPlace, snakeBody } = this.state;
    for (let i = 0; i < tableSize * tableSize; i++) {
      board[i] = null;
    }
    snakeBody.forEach(square => (board[square] = BODY));
    foodPlace.forEach(square => (board[square] = FOOD));
  }

  removeTailAndAddNewHead(nextPosition) {
    const snakeBody = this.state.snakeBody;
    snakeBody.pop();
    snakeBody.unshift(nextPosition);
    this.setState({
      snakeBody
    });
  }

  getNextMovePosition() {
    const oldHeadPosition = this.state.snakeBody[0];
    let newHeadPosition;
    switch (this.state.direction) {
      case 37:
        //left
        if (oldHeadPosition % tableSize === 0) {
          // oldheadposition is on left edge
          newHeadPosition = oldHeadPosition + tableSize - 1;
        } else {
          newHeadPosition = oldHeadPosition - 1;
        }
        break;

      case 39:
        //right
        if ((oldHeadPosition + 1) % tableSize <= 0) {
          // oldheadposition is on left edge
          newHeadPosition = oldHeadPosition - tableSize + 1;
        } else {
          newHeadPosition = oldHeadPosition + 1;
        }
        break;

      case 38:
        //up
        if (Math.floor(oldHeadPosition / tableSize) < 1) {
          newHeadPosition = oldHeadPosition + tableSize * (tableSize - 1);
        } else {
          newHeadPosition = oldHeadPosition - tableSize;
        }
        break;

      case 40:
        //down
        if (Math.floor(oldHeadPosition / tableSize) + 1 >= tableSize) {
          newHeadPosition = oldHeadPosition - tableSize * (tableSize - 1);
        } else {
          newHeadPosition = oldHeadPosition + tableSize;
        }
        break;

      default:
        break;
    }
    return newHeadPosition;
  }

  spawnFood() {
    const board = this.state.board;
    const food = board.filter(square => square === 2);
    if (food.length === 0) {
      const availablePlace = board.reduce((result, element, index) => {
        if (element === null) return [...result, index];
        return result;
      }, []);
      // now i have in availablePlace index of empty squares
      const freeSquares = availablePlace.length;
      const foodSquare = Math.round(Math.random() * freeSquares);
      const squareIndex = availablePlace[foodSquare];
      board[squareIndex] = FOOD;
      const foodPlace = [squareIndex];
      this.setState({
        board,
        foodPlace
      });
    }
  }

  render() {
    return (
      <>
        <Header
          score={this.state.snakeBody.length}
          bestScore={this.state.bestScore}
        />
        <Square
          board={this.state.board}
          head={this.state.snakeBody[0]}
          tail={this.state.snakeBody[this.state.snakeBody.length - 1]}
        />
      </>
    );
  }
}

export default App;
