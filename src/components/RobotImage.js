import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";
import Image from "next/image";
import Lottie from "lottie-react";
import talkingRobot from "./talking-robot.json";

const IMAGE_URL =
  "https://st3.depositphotos.com/1007566/14054/v/380/depositphotos_140546660-stock-illustration-electric-robot-avatar-character.jpg?forcejpeg=true";

function RobotImage({ direction }) {
  const renderIcon = () => {
    switch (direction) {
      case "right":
        return <StyledForwardIcon />;
      case "left":
        return <StyledBackIcon />;
      case "down":
        return <StyledDownwardIcon />;
      case "up":
        return <StyledUpwardIcon />;
    }
  };

  return (
    <ImageContainer direction={direction}>
      <ImageWrapper>
        <Lottie animationData={talkingRobot} loop />
      </ImageWrapper>
      {renderIcon()}
    </ImageContainer>
  );
}

export default RobotImage;

// right => justify start
// bottom => align start

const ImageContainer = styled.div`
  height: 100%;
  > div {
    justify-content: ${({ direction }) =>
      direction === "right"
        ? "flex-start"
        : direction === "left"
        ? "flex-end"
        : "center"};
    align-items: ${({ direction }) =>
      direction === "down"
        ? "flex-start"
        : direction === "up"
        ? "flex-end"
        : "center"};
  }
  > svg {
    position: absolute;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  height: 100%;
  svg {
    width: 80px !important;
    height: 80px !important;
  }
`;

const StyledForwardIcon = styled(ArrowForwardIcon)`
  right: 0;
  bottom: 40px;
`;

const StyledBackIcon = styled(ArrowBackIcon)`
  left: 0;
  bottom: 40px;
`;

const StyledUpwardIcon = styled(ArrowUpwardIcon)`
  top: 0;
  left: 35px;
`;

const StyledDownwardIcon = styled(ArrowDownwardIcon)`
  bottom: 0;
  left: 35px;
`;
