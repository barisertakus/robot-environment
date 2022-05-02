import styled from "styled-components";

export default styled.div`
  border: 1px solid black;
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.robot ? "white" : "lightblue")};
  position: relative;

  > h1 {
    color: white;
    margin: 0;
  }
`;
