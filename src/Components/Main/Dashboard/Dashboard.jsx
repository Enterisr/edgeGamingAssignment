import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MapMeasurementsToSkills, GradeMeasurements } from "engine/Calculator";
import MeasurementContext from "../MeasurementContext";
import LineGraph from "./LineGraph/LineGraph";
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
      <StyledDashboard>
        {Object.entries(skillsMeasures).map(([skill, measures]) => {
          return <LineGraph skill={skill} measures={measures} />;
        })}
      </StyledDashboard>
    </>
  );
}
Dashboard.propTypes = {};
export default Dashboard;
const StyledDashboard = styled.div`
  background: var(--accent-color-half);
  padding: 3rem;
  box-shadow: 0px 0px 6px 0px black;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: var(--margin-unit);
  flex-wrap: nowrap;
  color: white;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;
