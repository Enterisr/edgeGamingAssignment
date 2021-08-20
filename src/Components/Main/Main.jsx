import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MeasurementContext from "./MeasurementContext";
import MeasurementForm from "./MeasurementForm/MeasurementForm";
import Dashboard from "./Dashboard/Dashboard";
import Toggle from "../CommonComponents/Toggle";
import SnackbarProvider from "react-simple-snackbar";

import DefaultMeasurements from "DefaultMeasurements";
function Main() {
  //const [measurements, setMeasurements] = useState();
  const [measurements, setMeasurements] = useState(DefaultMeasurements);
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
    <SnackbarProvider>
      <StyledMain>
        <MeasurementContext.Provider value={{ measurements, addMeasurement }}>
          <ToggleWrap>
            <Toggle isChecked={isInputMode} onChange={toggleInputMode} />{" "}
            <label>{isInputMode ? "Input Mode" : "View Mode"}</label>
          </ToggleWrap>
          {isInputMode ? <MeasurementForm /> : <Dashboard />}
        </MeasurementContext.Provider>
      </StyledMain>{" "}
    </SnackbarProvider>
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
    margin-left: var(--margin-unit);
  }
`;
