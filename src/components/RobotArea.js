import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArenaRow from "./ArenaRow";
import ArenaColumn from "./ArenaColumn";
import RobotImage from "./RobotImage";
import Buttons from "./Buttons";
import { Alert, Grid, Snackbar } from "@mui/material";
import robotService, { getLastStatus, sendScript } from "../service/robotService";

const ARENA_HEIGHT = 5;
const ARENA_WIDTH = 5;

const arenaArray = [...Array(ARENA_HEIGHT)]
  .fill(0)
  .map(() => [...Array(ARENA_WIDTH)].fill(0));

const fillZero = (arena) => {
  return arena.map((column) => column.fill(0));
};

function RobotArea() {
  const [arena, setArena] = useState([]);
  const [robotPosition, setRobotPosition] = useState({ x: 2, y: 2 });
  const [direction, setDirection] = useState("right");
  const [lastUpdate, setLastUpdate] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [turnAround, setTurnAround] = useState(false);
  const [realDate, setRealDate] = useState("");
  // const [turnAroundArray, setTurnAroundArray] = useState([robotPosition]);
  // const [turnAroundIndex, setTurnAroundIndex] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const buttonsRef = useRef(null);

  const clearArena = () => {
    setArena((prevState) => 
       fillZero(prevState)
    );
  };

  const clearAndAddRobot = (previousPosition, nextPosition) => {
    const { x, y } = nextPosition;
    setArena((prevState) => {
      prevState[previousPosition.y][previousPosition.x] = 0;
      prevState[y][x] = 1;
      return prevState;
    });
  };

  const handleClick = (event) => {
    const scriptText = buttonsRef.current.script;
    sendScript(scriptText)
      .then((res) => {
        setRobotAndArenaDetails(res);
        // handleMove();
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        setMessage(message);
        setOpen(true);
        console.log(message);
      });
  };

  const startTurnAround = () => {
    const { x, y } = robotPosition;
    const updatedX = x === 4 ? x - 1 : x + 1;
    const updatedY = y === 4 ? y - 1 : y + 1;
    return [
      { x, y },
      { x: updatedX, y },
      { x: updatedX, y: updatedY },
      { x, y: updatedY },
    ];
  };

  const handleMove = () => {
    const turnAroundArray = startTurnAround();
    const i = 0;
    const obj = { i, turnAroundArray };
    const id = setInterval(() => move(obj), 100);
    setTimerId(id);
  };

  const stop = () => {
    clearInterval(timerId);
  };

  const move = (obj) => {
    obj.i = obj.i + 1 === 4 ? 0 : obj.i + 1;
    forward(obj);
  };

  const forward = (obj) => {
    setRobotPosition((prevState) => {
      const newCoordinates = obj.turnAroundArray[obj.i];
      clearAndAddRobot(prevState, newCoordinates);
      return newCoordinates;
    });
  };
  // console.log("turnAround",turnAroundArray)
  // console.log("robotPos",robotPosition)

  const drawArena = () => {
    setArena(arenaArray);
  };

  const renderRobot = (column) => {
    return column === 1 && <RobotImage direction={direction} />;
  };

  useEffect(() => {
    if (turnAround) {
      stop();
      handleMove();
    } else {
      stop();
    }
  }, [realDate]);

  useEffect(() => {
    drawArena();
  }, []);

  useEffect(() => {
    getLastStatus()
      .then((res) => {
        setRobotAndArenaDetails(res);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setRobotAndArenaDetails = (response) => {
    const { xcoordinate, ycoordinate, direction, updatedDate } = response.data;
    const newCoordinates = { x: xcoordinate, y: ycoordinate };
    clearArena();
    clearAndAddRobot(robotPosition, newCoordinates);
    setRobotPosition(newCoordinates);
    setDirection(direction.toLowerCase());
    setLastUpdate(new Date(updatedDate).toLocaleString());
    setTurnAround(response.data.turnAround);
    setRealDate(updatedDate);
  };

  return (
    <Container container>
      <Arena item md={6}>
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
      <Grid item md={6} width="100%">
        <Buttons
          ref={buttonsRef}
          handleClick={handleClick}
          lastUpdate={lastUpdate}
          handleMove={handleMove}
          stop={stop}
        />
      </Grid>
    </Container>
  );
}

export default RobotArea;

const Container = styled(Grid)`
  display: flex;
`;

const Arena = styled(Grid)`
  width: 500px;
  height: 500px;
`;
