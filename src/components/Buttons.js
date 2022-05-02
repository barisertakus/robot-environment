import { Button, TextField } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";

const Buttons = forwardRef(({ handleClick }, ref) => {
  const [step, setStep] = useState(0);

  const handleChange = (event) => {
    setStep(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    step,
  }));

  return (
    <Container>
      <TextField
        name="step"
        value={step}
        onChange={handleChange}
        type="number"
      />
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
    </Container>
  );
});

Buttons.displayName = "Buttons";

export default Buttons;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex;
  align-items: center;
  width: 100%;

  > button {
    margin: 2px;
  }
`;
