import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MeasurementContext from "./MeasurementContext";
import MeasurementForm from "./MeasurementForm/MeasurementForm";
import Dashboard from "./Dashboard/Dashboard";
import Toggle from "../CommonComponents/Toggle";
function Main() {
  const [measurements, setMeasurements] = useState([]);
  const [isInputMode, setIsInputMode] = useState(true);
  function toggleInputMode() {
    setIsInputMode(!isInputMode);
  }
  function addMeasurement(measurement) {
    let measurementsClone = [...measurements];
    const time = parseInt(measurement?.time);
    if (!isNaN(time)) {
      //ensure ordered list
      const locationIdx = measurements.findIndex(
        (measure) => measure.time > time
      ); //find the first row thats after this new input, chronoloogicly
      if (locationIdx !== -1) {
        measurementsClone = [
          ...measurements.slice(0, locationIdx),
          measurement,
          ...measurements.slice(locationIdx),
        ];
      } else {
        measurementsClone.push(measurement);
      }
      setMeasurements(measurementsClone);
    }
  }
  return (
    <StyledMain>
      <MeasurementContext.Provider value={{ measurements, addMeasurement }}>
        <ToggleWrap>
          <label>{isInputMode ? "Input Mode" : "View Mode"}</label>
          <Toggle isChecked={isInputMode} onChange={toggleInputMode} />
        </ToggleWrap>
        {isInputMode ? <MeasurementForm /> : <Dashboard />}
      </MeasurementContext.Provider>
    </StyledMain>
  );
}
Main.propTypes = {};
export default Main;
const StyledMain = styled.main`
  height: 70vh;
  padding: 1rem;
`;
const ToggleWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;

  text-align: center;
  align-items: center;
  & label {
    margin-right: var(--margin-unit);
  }
`;
