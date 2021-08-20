import ReactSelect from "react-select";
import styled from "styled-components";

export default styled(ReactSelect)`
  & .Select__indicator Select__dropdown-indicator {
    border: 3px red;
  }
  & .Select__control {
    color: black;
  }
  & .Select__Menu {
    color: black;
  }
`;
