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
    gameOver: false,
    food: []
  };

  componentDidMount() {
    this.start();
  }
  start() {
    const board = [];
    board = board[startPosition] = true;
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
      if (this.state.food.length === 0) {
        this.spawnFood();
      }
    };

    const timer = setInterval(moveSnake, 1000);
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
    // available squares means that is empty place, no snake, no food
    // const snake = this.state.snakeBody;
  }

  render() {
    return <Square />;
  }
}

export default App;
