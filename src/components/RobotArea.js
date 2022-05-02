import { Button, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArenaRow from "./ArenaRow"
import ArenaColumn from "./ArenaColumn"
import Buttons from "./Buttons"
import RobotImage from "./RobotImage"

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

  const clearRobotFromArena = (position) => {
    const { x, y } = position;
    setArena((prevState) => {
      prevState[y][x] = 0;
      return prevState;
    });
  };

  const addRobotToArea = (position) => {
    const { x, y } = position;
    setArena((prevState) => {
      prevState[y][x] = 1;
      return prevState;
    });
  };

  const generateNewPosition = (position, positionName) => {
    let { x, y } = position;
    const step = buttonsRef.current.step;
    const stepCount = parseInt(step);
    switch (positionName) {
      case "right":
        x = checkBorders(x + stepCount, ARENA_WIDTH);
        break;
      case "left":
        x = checkBorders(x - stepCount, ARENA_WIDTH);
        break;
      case "up":
        console.log(checkBorders(y - stepCount, ARENA_HEIGHT));
        y = checkBorders(y - stepCount, ARENA_HEIGHT);
        break;
      case "down":
        y = checkBorders(y + stepCount, ARENA_HEIGHT);
        break;
      default:
        break;
    }
    return { x, y };
  };

  const checkBorders = (prevPosition, limit) => {
    const val = prevPosition % limit;
    if (val < 0) {
      const absVal = Math.abs(val);
      return limit - absVal;
    }
    return val;
  };

  const handleClick = (event) => {
    const name = event.target.name;
    setRobotPosition((prevState) => {
      const newPosition = generateNewPosition(prevState, name);
      clearRobotFromArena(prevState);
      addRobotToArea(newPosition);
      return newPosition;
    });
  };

  const drawArena = () => {
    const coordY = Math.floor(Math.random() * (ARENA_WIDTH + 1));
    const coordX = Math.floor(Math.random() * (ARENA_HEIGHT + 1));
    arenaArray[2][2] = 1;
    setArena(arenaArray);
  };

  const getImage = () => {
    return (
      <Image
        alt="robot"
        src="https://st3.depositphotos.com/1007566/14054/v/380/depositphotos_140546660-stock-illustration-electric-robot-avatar-character.jpg?forcejpeg=true"
        height={100}
        width={100}
      />
    );
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
