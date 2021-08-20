import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
function MeasurementList(props) {
  function resovleValue() {
    if (typeof props.measurement.value === "boolean") {
      return props.measurement.value ? "✌️" : "❌";
    }
    return "(" + props.measurement.value + ")";
  }
  return (
    <li>
      <span>ms {props.measurement.time}:</span>{" "}
      <BoldSpan>{props.measurement.type}</BoldSpan>{" "}
      <span>{resovleValue()}</span>
    </li>
  );
}
MeasurementList.propTypes = {
  measurement: PropTypes.object,
};
export default MeasurementList;
const BoldSpan = styled.span`
  font-weight: bold;
`;
