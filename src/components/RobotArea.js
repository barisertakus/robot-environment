import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArenaRow from "./ArenaRow";
import ArenaColumn from "./ArenaColumn";
import RobotImage from "./RobotImage";
import Buttons from "./Buttons";
import { Grid } from "@mui/material";
import ErrorSnack from "./ErrorSnack";
import robotService from "../service/robotService";
import { getLocaleString } from "../utils/dateUtils";
import { getErrorMessage } from "../utils/errorUtils";
import { fillZero, initArenaArray } from "../utils/arenaDetails";

function RobotArea() {
  const [arena, setArena] = useState([]);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("right");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [turnAround, setTurnAround] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("");
  const [realDate, setRealDate] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const buttonsRef = useRef(null);

  const clearArena = () => {
    setArena((prevState) => fillZero(prevState));
  };

  const clearAndAddRobot = (previousPosition, nextPosition) => {
    const { x, y } = nextPosition;

    setArena((prevState) => {
      prevState[previousPosition.y][previousPosition.x] = 0;
      prevState[y][x] = 1;
      return prevState;
    });
  };

  const generateTurnAroundArray = () => {
    const { x, y } = robotPosition;
    const { updatedX, updatedY } = calculateTurnAroundCoordinates(x, y);
    return [
      { x, y },
      { x: updatedX, y },
      { x: updatedX, y: updatedY },
      { x, y: updatedY },
    ];
  };

  const calculateTurnAroundCoordinates = (x, y) => {
    const updatedX = x === 4 ? x - 1 : x + 1;
    const updatedY = y === 4 ? y - 1 : y + 1;
    return { updatedX, updatedY };
  };

  const startTurnAround = () => {
    const turnArray = generateTurnAroundArray();
    const turnMoveIndex = 0;
    const turnAround = { turnMoveIndex, turnArray };
    const timerId = setInterval(() => startTurnMove(turnAround), 100);
    setTimerId(timerId);
  };

  const stop = () => {
    clearInterval(timerId);
  };

  const startTurnMove = (turnAround) => {
    calculateTurnMoveIndex(turnAround);
    startForward(turnAround);
  };

  const calculateTurnMoveIndex = (turnAround) => {
    const { turnMoveIndex } = turnAround;
    turnAround.turnMoveIndex = turnMoveIndex + 1 === 4 ? 0 : turnMoveIndex + 1;
  };

  const startForward = (turnAround) => {
    const { turnMoveIndex, turnArray } = turnAround;
    setRobotPosition((prevState) => {
      const newCoordinates = turnArray[turnMoveIndex];
      clearAndAddRobot(prevState, newCoordinates);
      return newCoordinates;
    });
  };

  const getCurrentScript = () => {
    return buttonsRef.current?.script;
  };

  const handleClick = () => {
    const scriptText = getCurrentScript();
    robotService
      .sendScript(scriptText)
      .then((res) => {
        setRobotPositionAndArena(res);
      })
      .catch((error) => {
        setErrorAndShowPopup(error);
        console.log(error);
      });
  };

  const getLastAppStatus = () => {
    robotService
      .getLastStatus()
      .then((res) => {
        setRobotPositionAndArena(res);
      })
      .catch((error) => {
        setErrorAndShowPopup(error);
        console.log(error);
      });
  };

  const setErrorAndShowPopup = (error) => {
    setMessage(getErrorMessage(error));
    setOpen(true);
  };

  const setRobotPositionAndArena = (response) => {
    const { xcoordinate, ycoordinate, direction, updatedDate, turnAround } =
      response.data;
    handleNewPositions(xcoordinate, ycoordinate);
    setTurnAround(turnAround);
    handleDirectionAndDate(direction, updatedDate);
  };

  const handleNewPositions = (xcoordinate, ycoordinate) => {
    const newCoordinates = { x: xcoordinate, y: ycoordinate };
    clearArena();
    clearAndAddRobot(robotPosition, newCoordinates);
    setRobotPosition(newCoordinates);
  };

  const handleDirectionAndDate = (direction, updatedDate) => {
    setDirection(direction.toLowerCase());
    setLastUpdate(getLocaleString(updatedDate));
    setRealDate(updatedDate);
  };

  const drawArena = () => {
    setArena(initArenaArray);
  };

  const renderRobot = (column) => {
    return isRobot(column) && <RobotImage direction={direction} />;
  };

  const isRobot = (column) => {
    return column === 1;
  }

  useEffect(() => {
    if (turnAround) {
      stop();
      startTurnAround();
    } else {
      stop();
    }
  }, [realDate]);

  useEffect(() => {
    drawArena();
  }, []);

  useEffect(() => {
    getLastAppStatus();
    //eslint-disable-next-line
  }, []);

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
        />
      </Grid>
      <ErrorSnack open={open} message={message} handleClose={handleClose} />
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
