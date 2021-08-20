import React, { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import MeasuresInput from "./MeasuresInput/MeasureInput";
import MeasurementListEntry from "./MeasurementListEntry/MeasurementListEntry";
import MeasurementContext from "../MeasurementContext";
import { v4 as uuidv4 } from "uuid";
function MeasurementForm(props) {
  const { register, handleSubmit, watch, formState, reset } = useForm();
  const { measurements, addMeasurement } = useContext(MeasurementContext);
  function onFormSubmit(data) {
    for (let prop in data) {
      let propNum = parseFloat(data[prop]);
      if (!isNaN(propNum)) {
        data[prop] = propNum;
      }
    }
    addMeasurement(data);

    reset();
  }
  //todo  - add import from excel/CSV functionallity
  return (
    <>
      <StyledTitle>Log</StyledTitle>
      <StyledMeasurementsList>
        {measurements.map((measurement) => (
          <MeasurementListEntry key={uuidv4()} measurement={measurement} />
        ))}
      </StyledMeasurementsList>
      <StyledTitle>Enter your measurements </StyledTitle>
      <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
        <MeasuresInput
          watch={watch}
          errors={formState.errors}
          register={register}
        />
        <Button>submit</Button>
      </StyledForm>
    </>
  );
}
MeasurementForm.propTypes = {
  addMeasurement: PropTypes.func,
  measurements: PropTypes.array,
};
export default MeasurementForm;
const Button = styled.button`
  color: black;
  width: 5rem;
  padding: 0.5rem;
  cursor: pointer;
`;
const StyledTitle = styled.h3`
  margin-bottom: var(--margin-unit);
`;
const StyledMeasurementsList = styled.ul`
  width: 400px;
  margin: 3rem auto;
  display: flex;
  text-align: left;
  min-height: 10em;
  flex-direction: column;
  max-height: 10em;
  overflow: auto;
  width: 30em;
  border-radius: 5px;
  justify-content: start;
  & li {
    padding: 1rem;
    display: flex;

    justify-content: space-around;
    background: #1b1b1b63;
    box-shadow: 0px 0px 6px -3px black;
  }
  & span {
    flex-grow: 1;
    text-align: center;
    width: 33%;
  }
`;
const StyledForm = styled.form`
  width: 50%;
  margin: auto;
  position: relative;
  display: flex;
  background: #c5c5c522;
  height: 80%;
  max-height: 300px;
  align-items: center;
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: space-around;

  & fieldset {
    width: 70%;
    border: none;
  }
`;
