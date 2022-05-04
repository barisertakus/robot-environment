import styled from "styled-components";
import Colors from "../utils/Colors";

export default styled.div`
  border: 1px solid ${Colors.border};
  border-right: none;
  border-bottom: none;
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.robot ? Colors.white : Colors.box)};
  position: relative;

  > h1 {
    color: white;
    margin: 0;
  }
`;
