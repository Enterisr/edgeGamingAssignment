import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Toggle from "../../../CommonComponents/Toggle";
import { MeasurementTypes } from "engine/MeasurementTypes";

function MeasuresInput(props) {
  const measureOptions = React.useMemo(() => {
    return Object.entries(MeasurementTypes).map(([typeName, type]) => {
      //key is typename, it serves as our ID.
      return { value: typeName, label: type.name };
    });
  }, [MeasurementTypes]);

  const valueFieldType = React.useMemo(() => {
    const selectedMeasure = props.watch("type");
    let meausreObject;
    Object.entries(MeasurementTypes).forEach(([typeName, typeValue]) => {
      if (typeName === selectedMeasure) meausreObject = typeValue;
    });
    if (meausreObject) return meausreObject.inputType;
  }, [props.watch("type")]);

  return (
    <>
      <StyledFieldset>
        <label>time: </label>
        <span>
          <Input
            {...props.register("time", {
              required: "Required",
              pattern: "[0.9]",
            })}
            type="number"
          />
          ms
        </span>
        {props.errors.time && <ErrorSpan> needs to be a number</ErrorSpan>}
      </StyledFieldset>
      <StyledFieldset>
        <label>type: </label>
        <div className="selectWrap">
          <select {...props.register("type")}>
            {measureOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </StyledFieldset>
      <StyledFieldset>
        <label>value: </label>
        <>
          {valueFieldType === "bool" && (
            <input
              type="checkbox"
              {...props.register("value", {
                required: false,
              })}
            />
          )}
          {valueFieldType === "number" && (
            <Input
              {...props.register("value", {
                required: true,
                pattern: "[0.9]",
              })}
              type="number"
            />
          )}
        </>
      </StyledFieldset>
    </>
  );
}
MeasuresInput.propTypes = {
  measurement: PropTypes.object,
  register: PropTypes.func,
  errors: PropTypes.object,
  watch: PropTypes.func,
};
const ErrorSpan = styled.span`
  color: red;
  z-index: 4;
`;
const StyledFieldset = styled.fieldset`
  display: flex;
  flex-shrink: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  & .reactselect__menu {
    color: black;
  }
  & select {
    padding: 0.4rem;
  }
  & option {
    width: 5rem;
    text-align: center;
  }
  & label {
    margin-right: 1em;
  }
`;
const Input = styled.input.attrs({
  type: "number",
})`
  background-color: #1b1b1b;
  border-radius: 0.5em;
  color: white;
  padding: 0.4rem;
  border: none;
`;
export default MeasuresInput;
