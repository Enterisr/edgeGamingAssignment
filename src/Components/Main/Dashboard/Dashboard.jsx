import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import ListGraphOptions from "./GraphOptions/GraphOptions";
import {
  MapMeasurementsToSkills,
  GradeMeasurements,
  MeasurementsTimes,
  GetAvgGradeUntilMS,
} from "engine/MapGradesToSkill";
import MeasurementContext from "../MeasurementContext";
function Dashboard() {
  const context = useContext(MeasurementContext);
  const skillsMeasures = React.useMemo(() => {
    const res = MapMeasurementsToSkills(
      GradeMeasurements(context?.measurements)
    );
    return res;
  }, [context?.measurements]);
  console.log(skillsMeasures);
  return (
    <>
      Dashboard
      <StyledDashboard>
        {Object.entries(skillsMeasures).map(([skill, measures]) => {
          const eventTimes = MeasurementsTimes(measures);
          const dataValues = eventTimes.map((eventTime) =>
            GetAvgGradeUntilMS(measures, eventTime)
          );
          return (
            <div>
              <Line
                data={{
                  labels: eventTimes,
                  datasets: [
                    {
                      label: skill,
                      data: dataValues,
                      backgroundColor: ["orange"],
                    },
                  ],
                }}
                options={ListGraphOptions}
              />{" "}
            </div>
          );
        })}
      </StyledDashboard>
    </>
  );
}
Dashboard.propTypes = {};
export default Dashboard;
const StyledDashboard = styled.div`
  background: var(--accent-color);
  padding: 3rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 70vh;
  overflow: auto;
  color: white;
  & > div {
    margin: auto;
    width: 50%;
  }
`;
