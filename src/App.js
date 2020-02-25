import React from "react";
import GlobalStyles from "./GlobalStyles/GlobalStyles";
import styled from "styled-components";
import {
  tableSize,
  snakeColor,
  startPosition,
  arrowCode,
  width
} from "./config";
import Square from "./components/Square/Square";

const StyledWrapper = styled.div`
  display: grid;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 100%;
  width: ${tableSize * width}px;
  grid-template-columns: repeat(${tableSize}, 1fr);
  grid-template-rows: repeat(${tableSize}, 40px);
`;

class App extends React.Component {
  state = {
    direction: arrowCode.left,
    headPosition: startPosition,
    snakeColor: snakeColor,
    bodySnake: startPosition
  };
  componentDidMount() {
    this.setSquares();
  }

  setSquares() {
    const squares = [];
    for (let i = 0; i < tableSize; i++) {
      for (let j = 0; j < tableSize; j++) {
        squares.push(<Square key={`${i}:${j}`} />);
      }
    }
    this.setState({
      squares
    });
  }
  setHead() {}

  render() {
    return (
      <>
        <GlobalStyles />
        <StyledWrapper>{this.state.squares}</StyledWrapper>
      </>
    );
  }
}

export default App;
