import React from "react";
import fruitIcon from "../../assets/icons/fruit.svg";
import trophyIcon from "../../assets/icons/trophy.svg";

const Header = ({ score, bestScore }) => (
  <header>
    <div>
      <img src={fruitIcon} alt="fruitIcon" />
      <h2>
        Score : <span>{score}</span>
      </h2>
    </div>
    <div>
      <img src={trophyIcon} alt="trophy" />
      <h2>
        Best score : <span>{bestScore}</span>
      </h2>
    </div>
  </header>
);

export default Header;
