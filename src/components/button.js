import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { theme } from '../utils/theme';

const Button = ({ children, ...props }) => {
  return (
    <StyledButton href='#test' {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;

const StyledButton = styled.a`
  text-transform: uppercase;
  text-decoration: none;
  background-color: ${theme.primary};
  color: ${theme.text};
  font-size: 25px;
  line-height: 25px;
  padding: 10px 10px;
  margin: 0 5px;
  width: 45px;
  height: 45px;
  text-align: center;

  --notchSize: 10px;

  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    calc(100% - var(--notchSize)) 0%,
    100% var(--notchSize),
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    var(--notchSize) 100%,
    0% calc(100% - var(--notchSize))
  );

  .visually-hidden {
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  :hover {
    color: #fff;
    transition: color 0.5s, background 0.5s;
    background: ${theme.text};
  }
`;