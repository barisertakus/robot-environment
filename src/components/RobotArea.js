import { Button, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArenaRow from "./ArenaRow";
import ArenaColumn from "./ArenaColumn";
import Buttons from "./Buttons";
import RobotImage from "./RobotImage";

const ARENA_HEIGHT = 5;
const ARENA_WIDTH = 5;

const arenaArray = [...Array(ARENA_HEIGHT)]
  .fill(0)
  .map(() => [...Array(ARENA_WIDTH)].fill(0));

function RobotArea() {
  const [arena, setArena] = useState([]);
  const [robotPosition, setRobotPosition] = useState({ x: 2, y: 2 });
  const [direction, setDirection] = useState("right");

  const buttonsRef = useRef(null);


  const handleClick = (event) => {
    const name = event.target.name;
    setRobotPosition((prevState) => {
      const newPosition = generateNewPosition(prevState, name);
      clearRobotFromArena(prevState);
      addRobotToArea(newPosition);
      return newPosition;
    });
  };

  const clearAndAddRobot = (previousPosition, nextPosition) => {
    const { x, y } = nextPosition;
    setArena((prevState) => {
      prevState[previousPosition.y][previousPosition.x] = 0;
      prevState[y][x] = 1;
      return prevState;
    });
  };

  const drawArena = () => {
    const coordY = Math.floor(Math.random() * (ARENA_WIDTH + 1));
    const coordX = Math.floor(Math.random() * (ARENA_HEIGHT + 1));
    arenaArray[2][2] = 1;
    setArena(arenaArray);
  };

  const renderRobot = (column) => {
    return column === 1 && <RobotImage direction={direction} />;
  };

  useEffect(() => {
    drawArena();
  }, []);

  return (
    <Container>
      <Arena>
        {arena.map((row, i) => (
          <ArenaRow key={i}>
            {row.map((column, i) => (
              <ArenaColumn key={i} robot={column === 1 ? true : false}>
                {renderRobot(column)}
              </ArenaColumn>
            ))}
          </ArenaRow>
        ))}
      </Arena>
      <Buttons ref={buttonsRef} handleClick={handleClick} />
    </Container>
  );
}

export default RobotArea;

const Container = styled.div`
  display: flex;
`;

const Arena = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid red;
`;
