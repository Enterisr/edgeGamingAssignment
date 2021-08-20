import React, { useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import LineGraphOptions from "../GraphOptions/GraphOptions";

import {
  GetSkillGrade,
  MeasurementsTimes,
  GetAvgGradeUntilMS,
} from "engine/Calculator";
function LineGraph(props) {
  const eventTimes = useMemo(
    () => MeasurementsTimes(props.measures),
    [props.measures]
  );
  const dataValues = useMemo(
    () =>
      eventTimes.map((eventTime) =>
        GetAvgGradeUntilMS(props.measures, eventTime)
      ),
    [eventTimes]
  );
  return (
    <>
      <LineWrap>
        {" "}
        <h2>
          {props.skill}
          <br />
          Score:<b>{GetSkillGrade(props.measures).toFixed(2)}</b>
        </h2>
        <Line
          data={{
            labels: eventTimes,
            datasets: [
              {
                label: props.skill,
                data: dataValues,
                backgroundColor: ["orange"],
              },
            ],
          }}
          options={LineGraphOptions}
        />
      </LineWrap>
    </>
  );
}
LineGraph.propTypes = {
  skill: PropTypes.string,
  measures: PropTypes.array,
};
export default LineGraph;
const LineWrap = styled.div`
  width: 50%;
  background-color: #00000036;
  border-radius: 30px;
  margin-left: var(--margin-unit);

  & h2 {
    background-color: #1a1a1a;
    padding: 0.5rem;
    font-weight: 100;
  }
  & b {
    color: var(--second-color);
  }
  @media (max-width: 760px) {
    width: 80%;
    margin: auto;

    margin-top: var(--margin-unit);
  }
`;
