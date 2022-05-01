import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ARENA_HEIGHT = 5;
const ARENA_WIDTH = 5;

const arenaArray = [...Array(ARENA_HEIGHT)]
  .fill(0)
  .map(() => [...Array(ARENA_WIDTH)].fill(0));

function RobotArea() {
  const [arena, setArena] = useState([]);

  const drawArena = () => {
    const coordY = Math.floor(Math.random() * (ARENA_WIDTH + 1));
    const coordX = Math.floor(Math.random() * (ARENA_HEIGHT + 1));
    arenaArray[2][2] = 1;
    setArena(arenaArray);
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
                <h3>Robot is here</h3> 
              </Column>
            ))}
          </Row>
        ))}
      </Arena>
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

  > h3 {
    color: white;
    margin: 0;
  }
`;