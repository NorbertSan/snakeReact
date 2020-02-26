import React from "react";
import "./style.css";
import Square from "./components/Square/Square";
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
    direction: arrowCode.up,
    snakeBody: [],
    board: [],
    gameOver: false
  };

  componentDidMount() {
    this.start();
  }
  start() {
    const board = [];
    for (let i = 0; i < tableSize * (tableSize - 1); i++) {
      board[i] = null;
    }
    board[startPosition] = BODY;
    // board[4] = FOOD;
    const snakeBody = [startPosition];
    this.setState(
      {
        board,
        snakeBody
      },
      () => this.gameLogic()
    );
  }

  gameLogic() {
    const moveSnake = async () => {
      const nextPosition = this.getNextMovePosition();
      await this.removeTailAndAddNewHead(nextPosition);
      this.spawnFood();
    };

    const timer = setInterval(moveSnake, 1500);
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
      console.log(squareIndex);
      this.setState({
        board
      });
    }
  }

  render() {
    return <Square />;
  }
}

export default App;
