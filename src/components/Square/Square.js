import React from "react";
import { widthSquare, snakeColor, tableSize, BODY, FOOD } from "../../config";

const Square = ({ board }) => {
  const squares = [];
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      squares.push(
        <div
          style={{ width: widthSquare, height: widthSquare }}
          // className="square"
          className={
            board[i * tableSize + j] === BODY
              ? "snakeBody square"
              : board[i * tableSize + j] === FOOD
              ? "food square"
              : "square"
          }
          key={i * tableSize + j}
        ></div>
      );
    }
  }

  return (
    <div
      style={{
        width: widthSquare * tableSize,
        height: widthSquare * tableSize
      }}
      className="board"
    >
      {squares}
    </div>
  );
};

export default Square;
