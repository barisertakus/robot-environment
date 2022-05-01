import { Button, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ARENA_HEIGHT = 5;
const ARENA_WIDTH = 5;

const arenaArray = [...Array(ARENA_HEIGHT)]
  .fill(0)
  .map(() => [...Array(ARENA_WIDTH)].fill(0));

function RobotArea() {
  const [arena, setArena] = useState([]);
  const [robotPosition, setRobotPosition] = useState({ x: 2, y: 2 });
  const [step, setStep] = useState(0);

  const handleChange = (event) => {
    setStep(event.target.value);
  };

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
    return column === 1 && getImage();
  };

  useEffect(() => {
    drawArena();
  }, []);

  return (
    <Container>
      <Arena>
        {arena.map((row, i) => (
          <Row key={i}>
            {row.map((column, i) => (
              <Column key={i} robot={column === 1 ? true : false}>
                {renderRobot(column)}
              </Column>
            ))}
          </Row>
        ))}
      </Arena>
      <Buttons>
        <TextField name="step" onChange={handleChange} type="number" />
        <Button name="right" variant="contained" onClick={handleClick}>
          Right
        </Button>
        <Button name="down" variant="contained" onClick={handleClick}>
          Down
        </Button>
        <Button name="left" variant="contained" onClick={handleClick}>
          Left
        </Button>
        <Button name="up" variant="contained" onClick={handleClick}>
          Up
        </Button>
      </Buttons>
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

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.robot ? "green" : "lightblue")};

`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex;
  align-items: center;
  width: 100%;

  > button {
    margin: 2px;
  }
`;
