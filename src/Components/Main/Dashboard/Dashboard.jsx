import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import ListGraphOptions from "./GraphOptions/GraphOptions";
import {
  GetMeasurementsGrades,
  MapGradesToSkill,
  GetSkillsGrades,
} from "engine/MapGradesToSkill";
import MeasurementContext from "../MeasurementContext";
function Dashboard() {
  const context = useContext(MeasurementContext);
  // const {xLables,yLabels}
  console.log(GetMeasurementsGrades(context?.measurements));
  return (
    <>
      Dashboard
      <StyledDashboard>
        <Line
          data={{
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
              },
            ],
          }}
          options={ListGraphOptions}
        />
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
  color: white;
`;
