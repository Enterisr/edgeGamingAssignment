import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
function Toggle(props) {
  return (
    <>
      <Rail isChecked={props.isChecked} onClick={props.onChange}>
        <AltCheckbox
          role="checkbox"
          {...props}
          isChecked={props.isChecked}
          onClick={props.onChange}
        />
      </Rail>
    </>
  );
}
Toggle.propTypes = { isChecked: PropTypes.bool, onChange: PropTypes.func };
export default Toggle;
const Rail = styled.div`
  display: flex;
  height: 1rem;
  width: 3rem;
  border-radius: 0.7rem;
  cursor: pointer;
  border: solid black 1px;
  align-items: center;
  background-color: ${(props) =>
    props.isChecked ? "var(--second-color)" : "white"};
`;
const AltCheckbox = styled.span`
  position: relative;
  display: block;
  border: solid black 1px;
  cursor: pointer;
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  background: var(--accent-color);
  transition: ease 0.1s all;
  transform: ${(props) =>
    props.isChecked ? "translateX(100%)" : "translateX(0)"};
`;
