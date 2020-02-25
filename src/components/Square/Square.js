import React from "react";
import styled, { css } from "styled-components";
import { width, snakeColor } from "../../config";

const Square = styled.div`
  border: 1px solid black;
  background: grey;
  width: ${width}px;
  height: ${width}px;
  ${({ bodySnake }) =>
    bodySnake &&
    css`
      background: ${snakeColor};
    `}
`;

export default Square;
