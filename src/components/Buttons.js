import { Button, TextField } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import HelpDialog from "./HelpDialog";

const Buttons = forwardRef(({ handleClick, lastUpdate }, ref) => {
  const [script, setScript] = useState("");

  const handleChange = (event) => {
    setScript(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    script,
  }));

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleClick();
  };

  return (
    <Container>
      <Script>
        <TextField
          name="script"
          value={script}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          label="Script"
          autoComplete="off"
        />
        <Button name="right" variant="contained" onClick={handleClick}>
          SEND
        </Button>
        {/* <Button variant="outlined">Help</Button> */}
        <HelpDialog />
      </Script>
      {lastUpdate && <div>Last Update : {lastUpdate}</div>}
    </Container>
  );
});

Buttons.displayName = "Buttons";

export default Buttons;

const Container = styled.div`
  width: 100%;
  min-width: 500px;
  margin-top: 20px;
  > div {
    width: 100%;
    text-align: center;
  }
`;

const Script = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  button {
    /* margin-left: 20px; */
    padding: 10px 20px;
    margin-left: 20px;
  }
`;
